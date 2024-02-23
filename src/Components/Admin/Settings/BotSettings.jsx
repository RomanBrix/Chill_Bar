import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useRequestsMethods from "../../../hook/useRequestsMethods";
import moment from "moment";

export default function BotSettings() {
    const [token, setToken] = useState("");
    const [botSettings, setBotSettings] = useState(null);
    const { updToken, getToken, addBotUser, getBotUsers, removeBotUser } =
        useRequestsMethods();
    useEffect(() => {
        getBotSettings();
    }, []);

    return (
        <div className="block">
            <h2>Настройки бота</h2>
            {botSettings && renderStatusBlock()}
            <div className="inputs">
                <input
                    type="text"
                    id="token"
                    name="token"
                    placeholder="token"
                    value={token}
                    onChange={({ target }) => {
                        setToken((prev) => target.value);
                    }}
                />
                <label htmlFor="token">Api Token</label>
            </div>
            <button onClick={goUpdToken}>Сохранить токен</button>

            <div className="users-list">
                {botSettings && botSettings.status && (
                    <BotUserList
                        addBotUser={addBotUser}
                        getBotUsers={getBotUsers}
                        removeBotUser={removeBotUser}
                    />
                )}
            </div>
        </div>
    );

    function renderStatusBlock() {
        if (botSettings.status) {
            return (
                <>
                    <ul>
                        <li>
                            Статус Бота: <b>Включен</b>
                        </li>
                        <li>
                            Имя бота: <b>{botSettings.name}</b>
                        </li>
                        <li>
                            Линк:
                            <b>
                                <a
                                    href={`tg://resolve?domain=${botSettings.username}`}
                                >
                                    {botSettings.username}
                                </a>
                            </b>
                        </li>
                    </ul>
                </>
            );
        } else {
            return (
                <>
                    <ul>
                        <li>
                            Статус Бота: <b>Отключен</b>
                        </li>
                        {/* <li>Добавсьте апи бота </li> */}
                    </ul>
                </>
            );
        }
    }
    function getBotSettings() {
        getToken()
            .then(({ data }) => {
                console.log(data);
                // if (data.status) {
                setBotSettings(data);
                // }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function goUpdToken() {
        updToken(token)
            .then((res) => {
                console.log(res);
                if (res.data) {
                    toast.success("Бот включен!");
                    getBotSettings();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

function BotUserList({ addBotUser, getBotUsers, removeBotUser }) {
    const [userList, setUserList] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    if (!userList) return "Грузим список юзеров";
    // console.log(userList);
    return (
        <>
            <div className="how-to">
                <p>Как добавить пользователя:</p>
                <ol>
                    <li>Открыть бота по линку выше</li>
                    <li>Запустить бота</li>
                    <li>Написать "id"</li>
                    <li>Бот выдаст ваш ID</li>
                    <li>
                        Скопировать id, нажать кнопку "Добавить Пользователя",
                        вставить скопированный id
                    </li>
                    <li>Теперь Вам будут приходить заказы</li>
                </ol>
            </div>
            <button onClick={addUser}>Добавить Пользователя</button>
            <div className="list">
                <div className="list-item">
                    <div className="item">id</div>
                    <div className="item">UserName</div>
                    <div className="item">Date</div>
                    <div className="item">-</div>
                </div>
                {renderUserList()}
            </div>
        </>
    );
    function renderUserList() {
        if (userList.length === 0) return <p>Пока нет пользователей</p>;
        return userList.map((item, index) => {
            return (
                <div className="list-item" key={index}>
                    <div className="item">{item.id}</div>
                    <div className="item">{item.username}</div>
                    <div className="item">
                        {moment(item.createdAt).format("HH:mm/DD.MM.YYYY")}
                    </div>
                    <div className="item">
                        <button
                            onClick={() => {
                                deleteUser(item._id);
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            );
        });
    }

    function deleteUser(id) {
        if (!window.confirm("Удалить?")) return;

        removeBotUser(id)
            .then(({ data }) => {
                console.log(data);
                toast.success("Пользователь Удален");
                getUsers();
            })
            .catch((err) => {
                toast.error("Произошла ошибка при удалении!");
                console.log(err);
            });
    }
    function addUser() {
        const id = window.prompt("ID пользователя:");
        if (!id) return;

        addBotUser(id)
            .then(({ data }) => {
                if (data) {
                    toast.success("Пользователь добавлен");
                    getUsers();
                }
            })
            .catch((err) => {
                toast.error(
                    "Произошла ошибка при добавлении! Возможно пользователь уже есть"
                );
                console.log(err);
            });
    }
    function getUsers() {
        getBotUsers()
            .then(({ data }) => {
                setUserList(data);
            })
            .catch((err) => {
                console.log(err);
                toast.error(
                    "Не удалось загрузить пользователей! ошибка сервера"
                );
            });
    }
}
