import axios from "axios";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { redux_logoutUser } from "../Redux/userControl";

import { io } from "socket.io-client";

export const RequestsMethodsContext = createContext(null);

function RequestsMethodsProvider({ children }) {
    // const [protectedUrl, setProtected] = useState(null);
    const { currentUser, token } = useSelector(
        (state) => state.persistedReducer.user
    );
    const dispatch = useDispatch();
    const baseApi = "https://api.chillbar.com.ua/api/";
    // const baseApi = "http://localhost:1489/api/";
    const baseSocket = "https://api.chillbar.com.ua/";
    // const baseSocket = "http://localhost:1489/";
    // console.log(user);
    const publicRequest = () =>
        axios.create({
            baseURL: baseApi,
            // rejectUnauthorized: false,
        });

    const socket = io(baseSocket, { autoConnect: false });

    const protectedRequest = (token = null, user = null) => {
        const api = axios.create({
            baseURL: baseApi,
            headers: { token, user },
            // rejectUnauthorized: false, // ssl off while develop
        });
        api.interceptors.response.use(
            (response) => response,
            (error) => {
                //handle error at top level
                // console.log("handle error at top level");
                // console.log(error);

                if (error.response.data.auth) {
                    switch (error.response.data.auth) {
                        case "1":
                            toast.warning("Сессия устарела, перезайдите");
                            break;
                        case "2":
                            toast.error("Попытка подобрать юзера");
                            break;
                        default:
                            toast.warn("Перезайдите");
                            break;
                    }
                    redux_logoutUser(dispatch);
                }
                throw error;
            }
        );

        return api;
    };
    const loginAdmin = (username, password) => {
        return publicRequest().post("auth/admin", {
            username,
            password,
        });
    };
    //ORDERS
    const getOrdersList = () => {
        // console.log(currentUser);
        return protectedRequest(token, currentUser._id).get("order/list");
    };
    const createOrder = (order) => {
        // console.log(order);
        return publicRequest().post("order/new", order);
    };
    const createPayOrder = (order) => {
        // console.log(order);
        return publicRequest().post("pay/new", order);
    };
    const getSingleOrder = (id) => {
        return protectedRequest(token, currentUser._id).get(`order/${id}`);
    };
    const putOrderStatus = (id, status) => {
        return protectedRequest(token, currentUser._id).put(`order/status`, {
            id,
            status,
        });
    };

    //SETTINGS

    const getUsersList = () => {
        // console.log(currentUser);
        return protectedRequest(token, currentUser._id).get("user/list");
    };
    const changeUserPassword = (password, id = currentUser._id) => {
        // console.log(currentUser);
        return protectedRequest(token, currentUser._id).put(`user/${id}`, {
            password,
        });
    };
    const addUser = (user) => {
        // console.log(currentUser);
        return protectedRequest(token, currentUser._id).post(`user/new`, {
            user,
        });
    };
    const deleteUser = (id) => {
        // console.log(currentUser);
        return protectedRequest(token, currentUser._id).delete(`user/${id}`);
    };

    const updNp = () => {
        return protectedRequest(token, currentUser._id).post(`np/`);
    };
    const updToken = (botToken) => {
        return protectedRequest(token, currentUser._id).post(`bot/token`, {
            token: botToken,
        });
    };
    const getToken = () => {
        return protectedRequest(token, currentUser._id).get(`bot/token`);
    };
    const getBotUsers = () => {
        return protectedRequest(token, currentUser._id).get(`bot/users`);
    };
    const addBotUser = (id) => {
        return protectedRequest(token, currentUser._id).post(`bot/user`, {
            id,
        });
    };
    const removeBotUser = (id) => {
        return protectedRequest(token, currentUser._id).delete(`bot/${id}`);
    };

    //USER NP FIELDS
    const getNpCities = (city) => {
        return publicRequest().get("/np/city", { params: { city } });
    };
    const getNpWarhouses = (warhouse) => {
        return publicRequest().get("/np/warhouses", { params: { warhouse } });
    };
    const getDeliveryPrice = (city, totalSumm) => {
        return publicRequest().get("/np/price", {
            params: { city, totalSumm },
        });
    };

    //PRODUCTS
    const getProducts = () => {
        return publicRequest().get("/products/");
    };
    const crateProduct = (formData) => {
        return protectedRequest(token, currentUser._id).post(
            "/products/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    };
    const deleteProduct = (id) => {
        return protectedRequest(token, currentUser._id).delete("/products/", {
            params: {
                id,
            },
        });
    };

    const updateProduct = (FormData) => {
        return protectedRequest(token, currentUser._id).put(
            "/products/",
            FormData,

            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    };

    //payments
    const getPayments = () => {
        return protectedRequest(token, currentUser._id).get("/pay/");
    };

    const val = {
        publicRequest,
        loginAdmin,
        getOrdersList,
        createOrder,
        getUsersList,
        changeUserPassword,
        addUser,
        deleteUser,
        updNp,
        updToken,
        getToken,
        getBotUsers,
        addBotUser,
        removeBotUser,
        getNpCities,
        getNpWarhouses,
        getDeliveryPrice,
        getProducts,
        crateProduct,
        deleteProduct,
        updateProduct,
        createPayOrder,
        getPayments,
        getSingleOrder,
        putOrderStatus,

        socket,
    };
    return (
        <RequestsMethodsContext.Provider value={val}>
            {children}
        </RequestsMethodsContext.Provider>
    );
}

export default RequestsMethodsProvider;
