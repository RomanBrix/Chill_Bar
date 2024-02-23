import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import useRequestsMethods from "../../../hook/useRequestsMethods";

export default function ProductBlock({
    newProduct = false,
    product = null,
    closeLayer,
    updProducts,
}) {
    const [imgPrev, setImgPrev] = useState(null);
    const [blockState, setBlockState] = useState(newProduct ? true : false);
    const [productInfo, setProductInfo] = useState(defaultValueForAdd(product));

    const [selectTypeList] = useState([
        {
            value: "chill",
            label: "ChillBar",
        },
        {
            value: "mask",
            label: "Masking",
        },
    ]);
    // console.log(productInfo);
    const imgRef = useRef(null);
    // useEffect(() => {
    //     console.log(imgRef.current?.target?.files);
    // }, [imgRef]);
    // console.log(imgPrev);
    const { crateProduct, deleteProduct, updateProduct } = useRequestsMethods();
    return blockState ? getChangeBlock() : getViewBlock();

    function getChangeBlock() {
        return (
            <div className="item change">
                <div className="contain">
                    <div
                        className="photo"
                        onClick={() => {
                            imgRef.current.click();
                        }}
                        onChange={setImgFile}
                    >
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.svg"
                            ref={imgRef}
                        />
                        <img
                            src={
                                imgPrev
                                    ? prevImg(imgPrev)
                                    : productInfo.img.length > 0
                                    ? productInfo.img
                                    : "/src/placeholder.svg"
                            }
                            alt="/"
                        />
                    </div>
                    <div className="input title">
                        <input
                            type="text"
                            name="title"
                            placeholder="Название"
                            id={`title-${product ? product._id : "1"}`}
                            value={productInfo.title}
                            onChange={cahngeInputs}
                        />
                    </div>
                </div>

                <div className="input version">
                    <input
                        type="text"
                        name="version"
                        placeholder="Версия"
                        value={productInfo.version}
                        id={`version-${product ? product._id : "1"}`}
                        onChange={cahngeInputs}
                    />
                </div>
                <div className="input tyagi">
                    <input
                        type="text"
                        name="tyagi"
                        placeholder="Кол-во тяг"
                        value={productInfo.tyagi}
                        id={`tyagi-${product ? product._id : "1"}`}
                        onChange={cahngeInputs}
                    />
                </div>
                <div className="input type">
                    <Select
                        className="type"
                        classNamePrefix="type"
                        // defaultValue={colourOptions[0]}
                        isDisabled={false}
                        placeholder={"Тип"}
                        name="type"
                        options={selectTypeList}
                        defaultValue={
                            productInfo.type === "chill"
                                ? selectTypeList[0]
                                : selectTypeList[1]
                        }
                        onChange={(val) => {
                            setProductInfo((prev) => ({
                                ...prev,
                                type: val.value,
                            }));
                        }}
                    />
                </div>

                <div className="input price">
                    <input
                        type="text"
                        name="price"
                        id={`price-${product ? product._id : "1"}`}
                        placeholder="Цена"
                        value={productInfo.price}
                        onChange={cahngeInputs}
                    />
                </div>
                <div className="input availb">
                    <input
                        type="checkbox"
                        name="availability"
                        id={`availability-${product ? product._id : "1"}`}
                        checked={productInfo.availability}
                        onChange={cahngeInputs}
                    />
                    <label
                        htmlFor={`availability-${product ? product._id : "1"}`}
                    >
                        Наличие
                    </label>
                </div>
                <div className="input info">
                    <textarea
                        name="info"
                        id={`info-${product ? product._id : "1"}`}
                        cols="30"
                        rows="10"
                        value={productInfo.info}
                        placeholder="Большая информация"
                        onChange={cahngeInputs}
                    />
                </div>
                <div className="btns">
                    <button onClick={acceptData}>
                        {newProduct ? "Добавить" : "Сохранить"}
                    </button>
                    <button onClick={discard}>Отменить</button>
                </div>
            </div>
        );
    }
    function acceptData() {
        if (checkData()) {
            toast.error("Проверьте правильность полей");
            return;
        }
        if (newProduct) {
            addProduct();
        } else {
            updProduct();
        }
    }
    function addProduct() {
        if (!imgPrev) {
            toast.error("Добавьте фото");
            return;
        }
        const formData = new FormData();
        formData.append("file", imgPrev);
        const productDataToUpload = {
            ...productInfo,
            price: +productInfo.price, //ДА ЭТО МОЙ ТАЙПСКРИПТ, А ШО ТАКОЕ???
            tyagi: +productInfo.tyagi, // НУ РАБОТАЕТ ЖЕ !?!?!? - ХУЛИ
        };
        formData.append("data", JSON.stringify(productDataToUpload));
        crateProduct(formData)
            .then(({ data }) => {
                console.log(data);
                updProducts();
                toast.success("Продукт добавлен");
                discard(true);
            })
            .catch((err) => console.log(err));
    }
    function goDeleteProduct() {
        if (!window.confirm("Удалить?")) return;

        deleteProduct(product._id)
            .then(({ data }) => {
                if (data) {
                    updProducts();
                    toast.success("Продукт удален");
                }
            })
            .catch((err) => console.log(err));
    }
    function updProduct() {
        const formData = new FormData();

        if (imgPrev) {
            formData.append("file", imgPrev);
        }

        const productDataToUpload = {
            ...productInfo,
            _id: product._id,
            price: +productInfo.price, //ДА ЭТО МОЙ ТАЙПСКРИПТ, А ШО ТАКОЕ???
            tyagi: +productInfo.tyagi, // НУ РАБОТАЕТ ЖЕ !?!?!? - ХУЛИ
        };
        formData.append("data", JSON.stringify(productDataToUpload));

        updateProduct(formData)
            .then(({ data }) => {
                console.log(data);
                toast.success("Данные сохранены");
                updProducts();
                discard(true);
            })
            .catch((err) => console.log(err));
    }
    function discard(ok = false) {
        // console.log(ok);v
        if (ok !== true) {
            if (!window.confirm("Закрыть?")) return;
        }
        defaultValueForAdd();
        imgRef.current.value = "";
        setImgPrev(null);
        // console.log(imgRef.current.files);
        if (newProduct) {
            closeLayer(false);
        } else {
            setBlockState(false);
        }
    }

    function checkData() {
        let err = false;
        if (productInfo.title.length === 0) {
            err = true;
            console.log("title");
        }
        if (productInfo.version.length === 0) {
            err = true;
            console.log("version");
        }
        if (productInfo.tyagi.length === 0) {
            err = true;
            console.log("tyagi");
        }
        if (productInfo.price.length === 0) {
            err = true;
            console.log("price");
        }
        if (productInfo.info.length === 0) {
            err = true;
            console.log("info");
        }

        return err;
    }

    function prevImg(file) {
        return URL.createObjectURL(file);
    }
    function setImgFile({ target }) {
        if (target.files && target.files[0]) {
            // console.log(target.files[0]);
            setImgPrev((prev) => target.files[0]);
        }
    }

    function getViewBlock() {
        return (
            <div className="item">
                <div className="img">
                    <img src={product.img} alt="" />
                </div>
                <div className="type">
                    {product.type === "chill" ? "ChillBar" : "Masking"}
                </div>
                <div className="title">{product.title}</div>
                <div className="mg price">Цена: {product.price} UAH</div>
                <div className="mg version">{product.version}</div>
                <div className="mg tyagi">Тяги: {product.tyagi}</div>
                <div className="mg availability">
                    В наличии:{" "}
                    {product.availability ? (
                        <span className="ok">Да</span>
                    ) : (
                        <span className="ne-ok-nahui">Нет</span>
                    )}
                </div>
                <div className="mg info">{product.info}</div>
                <div className="btns">
                    <button
                        onClick={() => {
                            setBlockState(true);
                        }}
                    >
                        Изменить
                    </button>
                    <button onClick={goDeleteProduct}>Удалить</button>
                </div>
            </div>
        );
    }

    function cahngeInputs({ target }) {
        if (target.name === "availability") {
            setProductInfo((prev) => ({
                ...prev,
                [target.name]: !prev[target.name],
            }));
        } else {
            setProductInfo((prev) => ({
                ...prev,
                [target.name]: target.value,
            }));
        }
    }

    function defaultValueForAdd(product) {
        if (!product)
            return {
                title: "",
                img: "",
                version: "",
                tyagi: "",
                type: "chill", //mask
                price: "",
                availability: true,
                info: "",
            };

        return {
            title: product.title,
            img: product.img,
            version: product.version,
            tyagi: product.tyagi + "",
            type: product.type, //mask
            price: product.price + "",
            availability: product.availability,
            info: product.info,
        };
    }
}
