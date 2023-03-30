import { useEffect, useState } from "react";
import useRequestsMethods from "../../../hook/useRequestsMethods";

export default function OrderList() {
    const [orders, setOrders] = useState(null);
    const { getOrdersList } = useRequestsMethods();
    useEffect(() => {
        getList();
    }, []);
    if (!orders) return "Loading";
    console.log(orders);
    return (
        <div className="admin">
            <div className="width-container">
                <h1>Order List</h1>
                <div className="list">
                    <div className="list-item">
                        <div className="item">id</div>
                        <div className="item">Телефон</div>
                        <div className="item">Сумма</div>
                        <div className="item">Статус</div>
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
        // console.log()
        return list.map((item, key) => {
            return (
                <div className="list-item" key={key}>
                    <div className="item">{item.id}</div>
                    <div className="item">{item.user.phone}</div>
                    <div className="item">{item.summ}</div>
                    <div className="item">{item.status}</div>
                    <div className="item">{item.createdAt}</div>
                </div>
            );
        });
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
