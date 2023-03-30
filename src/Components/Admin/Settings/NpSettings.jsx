import { useState } from "react";
import { toast } from "react-toastify";
import useRequestsMethods from "../../../hook/useRequestsMethods";

export default function NpSettings() {
    const [loading, setLoading] = useState(false);
    const { updNp } = useRequestsMethods();
    return (
        <div className="block">
            <h2>Обновление новой почты</h2>
            <p>
                Обновление таблиц улиц и городов для новой почты. Рекомендуемо
                делать это раз в пару месяцев
            </p>
            <button onClick={goUpdNp}>Обновить</button>
            <p>{loading && "Обновляем... Подождите"}</p>
        </div>
    );

    function goUpdNp() {
        if (loading) return;

        setLoading(true);

        updNp()
            .then(({ data }) => {
                if (data) {
                    setLoading(false);
                    toast.success("Таблица обновленна!");
                }
            })
            .catch((err) => {
                toast.error("Произошла ошибка =(");
                setLoading(false);
                console.log(err);
            });
    }
}
