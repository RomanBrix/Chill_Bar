import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useRequestsMethods from "../../hook/useRequestsMethods";
import { redux_adminLogin } from "../../Redux/userControl";

export default function Enter() {
    const [inputs, setInputs] = useState({
        login: "",
        password: "",
    });
    const { loginAdmin, changeUserPassword } = useRequestsMethods();
    const dispatch = useDispatch();
    return (
        <div className="admin admin-enter">
            <div className="width-container">
                <div className="enter-container">
                    <h1>Enter</h1>
                    <input
                        type="text"
                        placeholder="login"
                        name="login"
                        value={inputs.login}
                        onChange={changeValue}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={inputs.password}
                        onChange={changeValue}
                        onKeyDown={handleKeyPress}
                    />
                    <button onClick={login}>Login</button>
                </div>

                {/* <button onClick={() => {}}>Create User</button> */}
            </div>
        </div>
    );

    // function newUser() {
    // const { login, password } = inputs;
    // newUserAdmin(login, password)
    //     .then(({data}) => {
    //         console.log(data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            login();
        }
    }
    function login() {
        const { login, password } = inputs;
        // console.log(inputs);
        loginAdmin(login, password)
            .then(({ data }) => {
                console.log(data);
                redux_adminLogin(dispatch, data);
            })
            .catch((err) => {
                if (err.response.data === "wrong input") {
                    toast.error("Wrong username or password");
                }
            });
        //
    }
    function changeValue({ target }) {
        setInputs((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    }
}
