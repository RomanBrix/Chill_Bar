import axios from "axios";
import { useEffect, useState } from "react";
import useProduct from "../../hook/useProduct";
import { notifyAdmin } from "../../notify";
import Select from "react-select";
import useRequestsMethods from "../../hook/useRequestsMethods";
import { toast } from "react-toastify";
function SendRequest(props) {
    const [searchedCities, setSearchedCities] = useState([]);

    const [storeAddresses, setStoreAddresses] = useState(false);
    const [searchAddresses, setSearchAddresses] = useState([]);

    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);

    const [inputs, setInputs] = useState({
        name: "",
        phone: "",
    });
    const { deleteAllProducts } = useProduct();
    const { createOrder, getNpCities, getNpWarhouses } = useRequestsMethods();

    useEffect(() => {
        setSearchAddresses([]);
        setAddress(null);
        if (city) {
            //load warhaose
            getNpWarhouses(city.value)
                .then(({ data }) => {
                    if (data.length > 0) {
                        const wh = data.map((item) => ({
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
        }
    }, [city]);
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
            <div className="radios">
                <div className="head">Тип оплаты:</div>
                <input type="radio" name="pay" id="card" />
                <label htmlFor="card">Картой</label>
                <input type="radio" name="pay" id="postpay" />
                <label htmlFor="postpay">На почте</label>
            </div>
            <div className="btn-send" onClick={sendOrder}>
                Замовити
            </div>
        </div>
    );

    function sendOrder() {
        const { name, phone } = inputs;
        if (name.length > 3 && phone.length > 7) {
            if (address?.label.length === 0) return;
            if (city?.label.length === 0) return;

            const { products, toggleCart } = props;
            const totalSumm = products.reduce((acc, product) => {
                return acc + product.price * product.count;
            }, 0);
            const order = {
                products,
                user: {
                    name,
                    phone,
                    wearhouse: address.label,
                    city: city.label,
                },
                summ: totalSumm,
            };
            //CREATE SELECT TYPE OF PAY

            createOrder(order).then((res) => {
                console.log(res);
            });
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
