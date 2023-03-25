import axios from "axios";
import { useEffect, useState } from "react";
import useProduct from "../../hook/useProduct";
import { notifyAdmin } from "../../notify";
import Select from "react-select";
function SendRequest(props) {
    const [cities, setCities] = useState(null);
    const [searchedCities, setSearchedCities] = useState([]);

    const [addresses, setAddresses] = useState([]);
    const [searchAddresses, setSearchAddresses] = useState([]);

    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);

    const [inputs, setInputs] = useState({
        name: "",
        phone: "",
    });
    const { deleteAllProducts } = useProduct();

    useEffect(() => {
        const storageCities = window.localStorage.getItem("cities");
        const storageAddress = window.localStorage.getItem("adress");
        if (storageCities) {
            console.log("from cookie");
            setCities(JSON.parse(storageCities));
        } else {
            getCities();
        }
        if (storageAddress) {
            console.log("from cookie");
            setAddresses(JSON.parse(storageAddress));
        } else {
            getAdresses();
        }

        // console.log(storageCities);
    }, []);
    useEffect(() => {
        if (city) {
            //load address
            setSearchAddresses(
                addresses.filter((item) => item.cityRef === city.value)
            );
        } else {
            setSearchAddresses([]);
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
                {!cities ? (
                    "Завантаження міст"
                ) : (
                    <>
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
                                // console.log(val);
                                setCity(val);
                            }}
                            onInputChange={(val) => {
                                if (val.length > 2) {
                                    setSearchedCities(
                                        cities
                                            .filter((item) =>
                                                item.label
                                                    .toLowerCase()
                                                    .includes(val.toLowerCase())
                                            )
                                            .sort(
                                                (a, b) =>
                                                    a.label.length -
                                                    b.label.length
                                            )
                                    );
                                } else {
                                    setSearchedCities([]);
                                }
                            }}
                        />
                        <Select
                            className="basic-select second-select"
                            classNamePrefix="select"
                            // defaultValue={colourOptions[0]}
                            isDisabled={false}
                            placeholder={"Відділення"}
                            noOptionsMessage={() => "Виберіть місто спочатку"}
                            isLoading={false}
                            isClearable={true}
                            isRtl={false}
                            isSearchable={true}
                            name="address"
                            options={searchAddresses}
                            onChange={(val) => {
                                // console.log(val);
                                setAddress(val);
                            }}
                            onInputChange={(val) => {
                                //     setSearchedCities(
                                //         cities.filter((item) =>
                                //             item.label.includes(val)
                                //         )
                                //     );
                                // } else {
                                //     setSearchedCities([]);
                                // }
                            }}
                        />
                    </>
                )}
            </div>
            <div className="btn-send" onClick={sendOrder}>
                Замовити
            </div>
        </div>
    );

    function sendOrder() {
        const { name, phone } = inputs;
        if (name.length > 3 && phone.length > 7) {
            if (address.length === 0) return;
            if (city.length === 0) return;

            const { products, toggleCart } = props;
            const productText = products
                .map((product, index) => {
                    return `${index + 1}. ${
                        product.title + " " + product.version
                    } (${product.price} uah/шт) - ${product.count} шт.`;
                })
                .join("\n");
            const totalSumm = products.reduce((acc, product) => {
                return acc + product.price * product.count;
            }, 0);
            const text = `🤑 Замовлення!\n${productText}\n\n💸Загальна сума: ${totalSumm} uah\n\n🤴 ${name}\n📱 ${phone}\n\n🚚 Доставка:\n🌃 ${city.label}\n🏠 ${address.label}`;
            // console.log(text)
            notifyAdmin(text);
            setInputs({
                name: "",
                phone: "",
            });
            alert(
                "Замовлення відправлено! Ми зв'яжемося з вами найближчим часом!"
            );
            deleteAllProducts();
            toggleCart(false);
        } else {
            console.log("error");
        }
    }

    async function getAdresses() {
        const getWarehouses = {
            apiKey: "7ee651cbd1e4949ba3b7b2c70975317c",
            modelName: "Address",
            calledMethod: "getWarehouses",
        };
        try {
            const { data } = await axios.post(
                "https://api.novaposhta.ua/v2.0/json/",
                getWarehouses
            );
            console.log(data);
            const addressData = data.data.map((item) => {
                return {
                    label: item.Description,
                    value: item.Ref,
                    cityRef: item.CityRef,
                };
            });
            setAddresses(addressData);
            window.localStorage.setItem("adress", JSON.stringify(addressData));
            return data;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    async function getCities() {
        const citiesOption = {
            apiKey: "7ee651cbd1e4949ba3b7b2c70975317c",
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: {},
        };

        try {
            const { data } = await axios.post(
                "https://api.novaposhta.ua/v2.0/json/",
                citiesOption
            );
            console.log(data);
            const citiesData = data.data.map((item) => {
                return {
                    label: item.Description,
                    value: item.Ref,
                };
            });
            setCities(citiesData);
            window.localStorage.setItem("cities", JSON.stringify(citiesData));
            return data;
        } catch (err) {
            console.log(err);
            return err;
        }
        // return axios
        //     .post("https://api.novaposhta.ua/v2.0/json/", citiesOption)
        //     .then(({ data }) => {
        //         return data;
        //     })
        //     .catch((err) => err);
    }
    function changeInput(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
}

export default SendRequest;
