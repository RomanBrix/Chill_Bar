import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ThankPage() {
    const [orderInfo, setOrderInfo] = useState(null);
    const { id } = useParams();

    return (
        <div className="thank forContainer">
            <div className="container">
                <h1>Дякуемо</h1>
                <h2>Ваш заказ №{id}</h2>
                {!orderInfo ? (
                    <div className="laod">Loading...</div>
                ) : (
                    <div className="info">Info</div>
                )}
            </div>
        </div>
    );
}
