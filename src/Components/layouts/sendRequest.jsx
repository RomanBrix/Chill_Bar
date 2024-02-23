// import axios from "axios";
import { useEffect, useState } from "react";
import useProduct from "../../hook/useProduct";
import { useNavigate } from "react-router-dom";
// import { notifyAdmin } from "../../notify";
import Select from "react-select";
import useRequestsMethods from "../../hook/useRequestsMethods";
import { toast } from "react-toastify";
function SendRequest(props) {
    const [searchedCities, setSearchedCities] = useState([]);
    const [totalSumm] = useState(
        props.products.reduce((acc, product) => {
            return acc + product.price * product.count;
        }, 0)
    );
    const [loadingState, setLoadingState] = useState(false);
    // const [deliveryCost, setDeliveryCost] = useState(null);
    const [payType, setPayType] = useState("card");
    // const totalSumm = ;
    const [storeAddresses, setStoreAddresses] = useState(false);
    const [searchAddresses, setSearchAddresses] = useState([]);

    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);

    const [inputs, setInputs] = useState({
        name: "",
        phone: "",
        lastName: "",
    });
    const navigate = useNavigate();

    const { deleteAllProducts } = useProduct();
    const {
        createOrder,
        getNpCities,
        getNpWarhouses,
        getDeliveryPrice,
        createPayOrder,
    } = useRequestsMethods();

    useEffect(() => {
        setSearchAddresses([]);
        setAddress(null);
        // setDeliveryCost(null);
        if (city) {
            //load warhaose
            getNpWarhouses(city.value)
                .then(({ data }) => {
                    if (data.length > 0) {
                        const wh = data.map((item) => ({
                            ...item,
                            value: item.ref,
                            label: item.warehouse,
                        }));
                        if (wh.length > 100) {
                            setStoreAddresses(wh);
                        } else {
                            setSearchAddresses(wh);
                        }
                    } else {
                        setSearchAddresses([]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Ошибка");
                });

            // getDeliveryPrice(city.value, totalSumm)
            //     .then(({ data }) => {
            //         // console.log(res);
            //         setDeliveryCost(data);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }
    }, [city]);
    // console.log(city);
    // console.log(address);
    return (
        <div
            className="container container-request"
            onClick={(e) => {
                e.stopPropagation();
            }}
            style={{ width: "auto", minWidth: "auto" }}
        >
            <img src="/src/main/buble6.png" alt="" className="bgimg" />
            <div className="box-inputs">
                <input
                    type="text"
                    placeholder="Ваше ім'я"
                    name="name"
                    value={inputs.name}
                    onChange={changeInput}
                />
                <input
                    type="text"
                    placeholder="Ваше прізвище"
                    name="lastName"
                    value={inputs.lastName}
                    onChange={changeInput}
                />
                <input
                    type="text"
                    placeholder="Телефон"
                    name="phone"
                    value={inputs.phone}
                    onChange={changeInput}
                />
                <p className="head">Адреса "нової пошти":</p>
                <Select
                    className="basic-select first-select"
                    classNamePrefix="select"
                    // defaultValue={colourOptions[0]}
                    isDisabled={false}
                    placeholder={"Місто"}
                    noOptionsMessage={() =>
                        "Почніть вводити назву вашого міста"
                    }
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="city"
                    options={searchedCities}
                    onChange={(val) => {
                        setCity(val);
                    }}
                    onInputChange={(val) => {
                        getCities(val);
                    }}
                />
                <Select
                    className="basic-select second-select"
                    classNamePrefix="select"
                    // defaultValue={colourOptions[0]}
                    isDisabled={false}
                    placeholder={"Відділення"}
                    noOptionsMessage={() => {
                        if (storeAddresses) {
                            return "Варіантів забагато, почніть вводити адресу, номер відділення тощо (наприклад '№10')";
                        }
                        return "Виберіть місто спочатку";
                    }}
                    isLoading={false}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="address"
                    options={searchAddresses}
                    onChange={(val) => {
                        setAddress(val);
                    }}
                    onInputChange={(val) => {
                        if (storeAddresses) {
                            if (val.length > 1) {
                                setSearchAddresses(() => {
                                    return storeAddresses.filter((item) =>
                                        item.label.includes(val)
                                    );
                                });
                            }
                        }
                    }}
                />
            </div>
            {/* {deliveryCost && (
                <p className="dev-cost">
                    Приблизна вартість доставки:{" "}
                    <span> {deliveryCost} Грн.</span>
                </p>
            )} */}

            <div className="radios">
                <div className="head">Тип оплати:</div>

                <div className="box">
                    <input
                        type="radio"
                        name="pay"
                        id="card"
                        checked={payType === "card"}
                        onChange={({ target }) => {
                            setPayType(target.id);
                        }}
                    />
                    <label htmlFor="card">Картою</label>
                </div>
                <div className="box">
                    <input
                        type="radio"
                        name="pay"
                        id="postpay"
                        checked={payType === "postpay"}
                        onChange={({ target }) => {
                            setPayType(target.id);
                        }}
                    />
                    <label htmlFor="postpay">На почті</label>
                </div>
            </div>
            <div className="btn-send" onClick={sendOrder}>
                {loadingState ? "Зачекайте" : "Замовити"}
            </div>
        </div>
    );

    function sendOrder() {
        const { name, phone, lastName } = inputs;
        if (loadingState) return;

        setLoadingState(true);
        if (name.length > 3 && lastName.length > 3 && phone.length > 7) {
            if (address?.label.length === 0) return;
            if (city?.label.length === 0) return;

            const { products, toggleCart } = props;

            const order = {
                products,
                user: {
                    name: lastName + " " + name,
                    phone,
                    wearhouse: address.label,
                    city: city.label,
                },
                pay: payType === "card" ? "proccess" : "np",
                summ: totalSumm,
                np: {
                    lastName: lastName,
                    name: name,
                    cityRef: city.value,
                    warehouseRef: address.warehouseRef,
                },
            };
            //CREATE SELECT TYPE OF PAY

            if (payType === "card") {
                // go create order then payment then link and redirect
                // alert("oplata");
                createPayOrder(order).then(({ data }) => {
                    console.log(data);
                    if (data.status) {
                        // window.open(data.payLink, "_blank");
                        setLoadingState(false);

                        window.location.href = data.payLink;
                    }
                });
            } else {
                createOrder(order)
                    .then(({ data }) => {
                        console.log(data);
                        deleteAllProducts();
                        setLoadingState(false);
                        toggleCart(false);
                        navigate("/thank/" + data.id);
                        //чистим и редиректим на спасибо и ид заказа
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error(
                            "Замовлення не додалося. Перевірте правильність введених даних або зв'яжіться з нами"
                        );
                    });
            }

            // setLoadingState(false);

            // console.log(text)
            // notifyAdmin(text);
            // setInputs({
            //     name: "",
            //     phone: "",
            // });
            // alert(
            //     "Замовлення відправлено! Ми зв'яжемося з вами найближчим часом!"
            // );
            // deleteAllProducts();
            // toggleCart(false);
        } else {
            console.log("error");
            toast.error("Щось пішло не так...");
            setLoadingState(false);
        }
    }

    async function getCities(val) {
        if (val.length < 3) {
            setSearchedCities([]);
        } else {
            // setIsLoading(true);

            getNpCities(val)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setSearchedCities(
                            data
                                .map((item) => ({
                                    value: item.ref,
                                    label: item.city,
                                }))
                                .sort((a, b) => a.label.length - b.label.length)
                        );
                    } else {
                        setSearchedCities([]);
                    }

                    // setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    function changeInput(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
}

export default SendRequest;
