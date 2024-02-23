import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequestsMethods from "../../../hook/useRequestsMethods";
import moment from "moment";

export default function SingleOrder() {
    // const props =
    // console.log(useProps);
    const { id } = useParams();
    const navigate = useNavigate();
    const { getSingleOrder, putOrderStatus } = useRequestsMethods();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        if (id) {
            getOrderData();
        } else {
            navigate(-1, { replace: true });
        }
    }, []);

    if (!orderData) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="admin">
            <div className="width-container flex-container">
                <h1>Order #{orderData.id}</h1>

                <div className="block">
                    <h2>Клиент</h2>
                    <ul className="info">
                        <li>
                            Имя: <span>{orderData.user.name}</span>
                        </li>
                        <li>
                            Телефон: <span>{orderData.user.phone}</span>
                        </li>
                        <li>
                            Город: <span>{orderData.user.city}</span>
                        </li>
                        <li>
                            Отделение: <span>{orderData.user.wearhouse}</span>
                        </li>
                    </ul>
                </div>

                <div className="block">
                    <h2>Заказ</h2>
                    <div className="status-list">
                        <span className="head">
                            {getStatus(orderData.status)}
                        </span>
                        <ul className="list-container" onClick={changeStatus}>
                            <li data-status="new">Новый</li>
                            <li data-status="onDelivery">Отправлен</li>
                            <li data-status="complete">Выполнен</li>
                            <li data-status="error">Ошибка</li>
                            <li data-status="deleted">Удален</li>
                        </ul>
                    </div>
                    <ul className="info">
                        <li>
                            Оплата: <span>{getPayStatus(orderData.pay)}</span>
                        </li>
                        <li>
                            ТТН:{" "}
                            <span>
                                {orderData.ttn ? orderData.ttn : "Создать"}
                            </span>
                        </li>
                        <li>
                            Дата создания:{" "}
                            <span>
                                {moment(orderData.createdAt).format(
                                    "HH:mm/DD.MM.YYYY"
                                )}
                            </span>
                        </li>
                        <li>
                            Сума: <span>{orderData.summ}</span>
                        </li>
                    </ul>
                </div>

                <div className="block full-block">
                    <h2>Продукты</h2>
                    <div className="list">
                        <div className="list-item">
                            <div className="item">Фото</div>
                            <div className="item">Название</div>
                            <div className="item">Версия</div>
                            <div className="item">Тяги</div>
                            <div className="item">Цена (шт)</div>
                            <div className="item">Кол-Во</div>
                        </div>
                        {renderProducts(orderData.products)}
                    </div>
                </div>
            </div>
        </div>
    );

    function renderProducts(arr) {
        return arr.map((item, index) => {
            return (
                <div className="list-item" key={index}>
                    <div className="item">
                        <img src={item.img} alt="" />
                    </div>
                    <div className="item">{item.title}</div>
                    <div className="item">{item.version}</div>
                    <div className="item">{item.tyagi}</div>
                    <div className="item">{item.price}</div>
                    <div className="item">{item.count}</div>
                </div>
            );
        });
    }
    function changeStatus({ target }) {
        // console.log();
        const status = target.dataset.status;
        putOrderStatus(orderData._id, status)
            .then(({ data }) => {
                if (data) {
                    // console.log(data);
                    getOrderData();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getPayStatus(status) {
        switch (status) {
            case "proccess":
                return "В процессе";
            case "processed":
                return "Оплачено";
            case "success":
                return "Оплачено";
            case "failed":
                return "Не удалось";
            case "np":
                return "На почте";

            default:
                return "Не удалось";
        }
    }

    function getStatus(status) {
        switch (status) {
            // error, deleted, onDelivery, complete,
            case "new":
                return "Новый";
            case "error":
                return "Ошибка";
            case "deleted":
                return "Удален";
            case "onDelivery":
                return "Отправлен";
            case "complete":
                return "Выполнен";

            default:
                return "Новый";
        }
    }

    function getOrderData() {
        getSingleOrder(id)
            .then(({ data }) => {
                // console.log(data);
                setOrderData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
