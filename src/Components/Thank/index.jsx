import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequestsMethods from "../../hook/useRequestsMethods";
import { toast } from "react-toastify";
import moment from "moment";

export default function ThankPage() {
    const [orderInfo, setOrderInfo] = useState(null);
    const { id } = useParams();
    const { socket } = useRequestsMethods();
    const navigate = useNavigate();
    useEffect(() => {
        socket
            .connect()
            .emit("join room", id)
            .on("order", (data) => {
                // setOrderInfo(data);
                console.log(data);
                if (data) {
                    setOrderInfo(data);
                } else {
                    toast.error("Замовлення не знайдено");
                    navigate("/", { replace: true });
                }
            });

        return () => {
            socket.off("order");
        };
    }, []);

    return (
        <div className="thank forContainer">
            <div className="container">
                <h1>Дякуємо за замовлення!</h1>
                <h2>Ваш заказ №{id}</h2>
                <p>
                    Перевірити своє замовлення завжди можливо за цим посиланням:{" "}
                    <a href={`https://chillbar.com.ua/thank/${id}`}>
                        chillbar.com.ua/thank/{id}
                    </a>
                </p>
                {!orderInfo ? (
                    <div className="laod">Loading...</div>
                ) : (
                    <ul>
                        <li>
                            Статус замовлення:{" "}
                            <span>{getStatus(orderInfo.status)}</span>
                        </li>
                        <li>
                            Оплата: <span>{getPayStatus(orderInfo.pay)}</span>
                        </li>
                        <li>
                            Ваш ТТН: <span>{orderInfo.ttn}</span>
                        </li>
                        <li>
                            Остання зміна:{" "}
                            <span>
                                {moment(orderInfo.updatedAt).format(
                                    "HH:mm/DD.MM.YYYY"
                                )}
                            </span>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );

    function getStatus(status) {
        switch (status) {
            // error, deleted, onDelivery, complete,
            case "new":
                return "Новий";
            case "error":
                return "Помилка";
            case "deleted":
                return "Видалений";
            case "onDelivery":
                return "Відправлений";
            case "complete":
                return "Готовий";

            default:
                return "Новий";
        }
    }

    function getPayStatus(status) {
        switch (status) {
            case "proccess":
                return "В процесі";
            case "processed":
                return "Оплачено";
            case "success":
                return "Оплачено";
            case "failed":
                return "Не вдалось";
            case "np":
                return "На почті";

            default:
                return "Не удалось";
        }
    }
}
