import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { redux_logoutUser } from "../../Redux/userControl";

export default function AdminHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className="side-head">
            <ul>
                <li
                    onClick={() => {
                        changeLocation("/orders");
                    }}
                >
                    Заказы
                </li>
                <li
                    onClick={() => {
                        changeLocation("/pays");
                    }}
                >
                    Платежи
                </li>
                <li
                    onClick={() => {
                        changeLocation("/products");
                    }}
                >
                    Продукты
                </li>
                <li
                    onClick={() => {
                        changeLocation("/Settings");
                    }}
                >
                    настройки
                </li>
                <li
                    onClick={() => {
                        redux_logoutUser(dispatch);
                    }}
                >
                    Выход
                </li>
            </ul>
        </div>
    );
    function changeLocation(path) {
        navigate("/admin" + path);
    }
}
