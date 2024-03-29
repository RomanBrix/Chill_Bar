import { useEffect, useState } from "react";
import useRequestsMethods from "../../../hook/useRequestsMethods";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
    const [orders, setOrders] = useState(null);
    const { getOrdersList } = useRequestsMethods();
    const navigate = useNavigate();
    useEffect(() => {
        getList();
    }, []);
    if (!orders) return "Loading";
    // console.log(orders);

    return (
        <div className="admin">
            <div className="width-container">
                <h1>Order List </h1>
                <div className="list">
                    <div className="list-item">
                        <div className="item">id</div>
                        <div className="item">Телефон</div>
                        <div className="item">Сумма</div>
                        <div className="item">Статус</div>
                        <div className="item">Оплата</div>
                        <div className="item">Дата</div>
                    </div>
                    {renderList(orders)}
                </div>
            </div>
        </div>
    );

    function renderList(list) {
        if (list.length === 0) {
            return <div className="list-item">Пока нет заказов!</div>;
        }

        return list.map((item, key) => {
            return (
                <div
                    className="list-item"
                    key={key}
                    onClick={() => {
                        navigate(`./${item._id}`);
                    }}
                >
                    <div className="item">{item.id}</div>
                    <div className="item">{item.user.phone}</div>
                    <div className="item">{item.summ}</div>
                    <div className="item">{getStatus(item.status)}</div>
                    <div className="item">{getPayStatus(item.pay)}</div>
                    <div className="item">
                        {moment(item.createdAt).format("HH:mm/DD.MM.YYYY")}
                    </div>
                </div>
            );
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
    function getList() {
        getOrdersList()
            .then(({ data }) => {
                // console.log(data);
                setOrders(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
