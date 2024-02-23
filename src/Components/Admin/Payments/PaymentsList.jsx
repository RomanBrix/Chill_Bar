import { useEffect, useState } from "react";
import useRequestsMethods from "../../../hook/useRequestsMethods";
import moment from "moment";

export default function PaymentsList() {
    const [list, setList] = useState(null);
    const { getPayments } = useRequestsMethods();

    useEffect(() => {
        getPayments()
            .then(({ data }) => {
                setList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (!list) return "Loading";

    return (
        <div className="admin">
            <div className="width-container">
                <h1>Список Платежей</h1>
                <div className="list">
                    <div className="list-item">
                        <div className="item">id</div>
                        <div className="item">Телефон</div>
                        <div className="item">Сумма</div>
                        <div className="item">Статус</div>
                        <div className="item">Дата</div>
                    </div>

                    {renderList(list)}
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
                    <div className="item">{item.phone}</div>
                    <div className="item">{item.summ}</div>
                    <div className="item">{getPayStatus(item.status)}</div>
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

            default:
                return "Не удалось";
        }
    }
}
