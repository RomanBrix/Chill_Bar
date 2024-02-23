import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useRequestsMethods from "../../../hook/useRequestsMethods";
import moment from "moment";

export default function UsersControl() {
    const [blockState, setBlockState] = useState(false);
    const [usersList, setUsersList] = useState(false);
    const { getUsersList, changeUserPassword, addUser, deleteUser } =
        useRequestsMethods();
    useEffect(() => {
        updateUsersInfo();
    }, []);
    return (
        <div className="block">
            <h2>Управление пользователями</h2>
            <ul className="mini-head">
                <li
                    onClick={() => {
                        setBlockState(false);
                    }}
                    className={`${!blockState ? "active" : ""}`}
                >
                    Список Польозвателей
                </li>
                <li
                    onClick={() => {
                        setBlockState(true);
                    }}
                    className={`${blockState ? "active" : ""}`}
                >
                    Добавить
                </li>
            </ul>

            {!blockState ? (
                <UsersList
                    list={usersList}
                    changeUserPassword={changeUserPassword}
                    deleteUser={deleteUser}
                    updateUsersInfo={updateUsersInfo}
                />
            ) : (
                <AddUser
                    addUser={addUser}
                    updateUsersInfo={updateUsersInfo}
                    setBlockState={setBlockState}
                />
            )}
        </div>
    );

    function updateUsersInfo() {
        getUsersList()
            .then((res) => {
                // console.log(res);
                setUsersList(res.data);
            })
            .catch((err) => console.log(err));
    }
}

//LIST COMPONENT
function UsersList({ list, changeUserPassword, updateUsersInfo, deleteUser }) {
    const {
        currentUser: { _id },
    } = useSelector((state) => state.persistedReducer.user);
    return (
        <div className="list">
            <div className="list-item">
                <div className="item">Username</div>
                <div className="item">Date</div>
                <div className="item func-item">-</div>
            </div>
            {renderList()}
        </div>
    );

    function renderList() {
        if (!list) return "Loading...";
        return list.map((item, index) => {
            return (
                <div className="list-item" key={index}>
                    <div className="item">
                        {item.username} {item._id === _id && <>(Это вы)</>}
                    </div>
                    <div className="item">
                        {moment(item.createdAt).format("HH:mm/DD.MM.YYYY")}
                    </div>
                    <div className="item func-item">
                        {item._id === _id ? (
                            "-"
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        goDeleteUser(item._id);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => {
                                        changePassword(item._id);
                                    }}
                                >
                                    Change Password
                                </button>
                            </>
                        )}
                    </div>
                </div>
            );
        });
    }

    function goDeleteUser(id) {
        if (!window.confirm("Удалить?")) return;
        deleteUser(id)
            .then(({ data }) => {
                if (data) {
                    toast.success("Пользователь удален");
                    updateUsersInfo();
                } else {
                    throw new Error();
                }
            })
            .catch((err) => {
                toast.error("Произошла ошибка");
                console.log(err);
            });
    }

    function changePassword(id) {
        const newPassword = window.prompt("Введи новый пароль");
        if (newPassword) {
            changeUserPassword(newPassword, id)
                .then(({ data }) => {
                    // console.log(res);
                    if (data) {
                        toast.success("Пароль изменён");
                    } else {
                        throw new Error();
                    }
                })
                .catch((err) => {
                    toast.error("Произошла ошибка");
                    console.log(err);
                });
        }
    }
}

// CREATE NEW USER COMPONENT
function AddUser({ addUser, updateUsersInfo, setBlockState }) {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    return (
        <>
            <div className="inputs">
                <input
                    type="text"
                    placeholder="nickname"
                    value={inputs.username}
                    name="username"
                    onChange={cahgneInput}
                    id="username"
                />
                <label htmlFor="username">Username</label>
            </div>
            <div className="inputs">
                <input
                    type="text"
                    placeholder="pass"
                    value={inputs.password}
                    name="password"
                    onChange={cahgneInput}
                    id="password"
                />
                <label htmlFor="password">Password</label>
                <div
                    className="gen"
                    onClick={() => {
                        genPass();
                    }}
                >
                    G
                </div>
            </div>
            <button onClick={goAdd}>Добавить пользователя</button>
        </>
    );
    function goAdd() {
        const { password, username } = inputs;

        if (username.length !== 0 && password.length !== 0) {
            addUser({
                username,
                password,
                isAdmin: true,
            })
                .then(({ data }) => {
                    if (data) {
                        toast.success("Пользователь добавлен!");
                        updateUsersInfo();
                        setBlockState(false);
                    } else {
                        throw new Error();
                    }
                })
                .catch((err) => {
                    toast.error("Произошла ошибка");
                    console.log(err);
                });
        }
    }

    function genPass() {
        setInputs((prev) => ({
            ...prev,
            password: generatePassword(),
        }));
    }

    function cahgneInput({ target }) {
        setInputs((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    }
}

function generatePassword(n = 5) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < n; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}
