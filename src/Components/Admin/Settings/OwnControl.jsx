import { useState } from "react";
import { toast } from "react-toastify";
import useRequestsMethods from "../../../hook/useRequestsMethods";

export default function OwnControl() {
    const [inputs, setInputs] = useState({
        password: "",
        rePass: "",
    });
    const { changeUserPassword } = useRequestsMethods();
    return (
        <div className="block">
            <h2>Свои настройки</h2>
            <div className="inputs">
                <input
                    type="password"
                    name="password"
                    id="newPassword"
                    placeholder="Пароль"
                    value={inputs.password}
                    onChange={changeInput}
                />
                <label htmlFor="newPassword">Новый Пароль</label>
            </div>

            <div className="inputs">
                <input
                    type="password"
                    name="rePass"
                    id="rePass"
                    placeholder="Повторите Пароль"
                    value={inputs.rePass}
                    onChange={changeInput}
                />
                <label htmlFor="rePass">Повторите Пароль</label>
            </div>
            <button onClick={changePass}>Сменить пароль</button>
        </div>
    );
    function changePass() {
        const { password, rePass } = inputs;
        if (password.length !== 0) {
            if (password !== rePass) {
                toast.warning("Пароли должны совпадать");
                return;
            }

            changeUserPassword(password)
                .then(({ data }) => {
                    if (data) {
                        toast.success("Пароль изминен");
                    }
                })
                .catch((err) => {
                    toast.error("Произошла ошибка");
                });
        }
    }
    function changeInput({ target }) {
        setInputs((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    }
}
