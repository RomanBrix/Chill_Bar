import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import useRequestsMethods from "../hook/useRequestsMethods";
// import Cookies from 'js-cookie'

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
    // const checkCookie = Cookies.get('user') tovar
    const [products, setProduct] = useState([]);
    // const [products, setProduct] = useState(tovar);
    const [productsCounter, setProductsCounter] = useState(0);

    const { getProducts } = useRequestsMethods();

    useEffect(() => {
        updateProductsData();
        count();
    }, []);
    // console.log(products);

    function addProduct(id) {
        //add cookie
        // console.log("add: " + id);
        let savedProducts = Cookies.get("toBuy");
        if (savedProducts) {
            savedProducts = JSON.parse(savedProducts);
        } else {
            savedProducts = {};
        }

        if (isEmpty(savedProducts)) {
            savedProducts[id] = 1;
        } else {
            if (savedProducts[id]) {
                savedProducts[id] = +savedProducts[id] + 1;
            } else {
                savedProducts[id] = 1;
            }
        }

        //save in type: {id: count}
        Cookies.set("toBuy", JSON.stringify(savedProducts));

        count(savedProducts);
    }
    function deleteProduct(id) {
        let savedProducts = JSON.parse(Cookies.get("toBuy"));
        if (savedProducts[id] !== 1) {
            savedProducts[id] -= 1;
        } else {
            delete savedProducts[id];
        }
        Cookies.set("toBuy", JSON.stringify(savedProducts));
        count(savedProducts);

        // console.log(savedProducts);
    }
    function deleteAllProducts() {
        Cookies.remove("toBuy");
        count();
    }

    function getProductForBuy(id) {
        //get cookie

        let savedProducts = Cookies.get("toBuy");
        if (savedProducts) {
            savedProducts = JSON.parse(savedProducts);
        } else {
            return false;
        }
        const arrToReturn = [];

        for (const key in savedProducts) {
            const productPush = products.filter((item) => item._id === key);
            // console.log(productPush);
            // console.log(key);
            arrToReturn.push({
                ...productPush[0],
                count: savedProducts[key],
            });
        }
        // console.log(arrToReturn);
        return arrToReturn;
    }

    function getRandomProduct(id) {
        //get random products for slider
        const arr = [];
        // console.log("go");
        const avProd = products.filter((item) => item.availability);
        // console.log(avProd);
        if (products.length === 0) return [];
        const loopLength = avProd.length > 9 ? 9 : avProd.length;
        // console.log(loopLength);
        //variant DVA
        while (arr.length !== loopLength) {
            const rand = Math.floor(Math.random() * avProd.length);
            let check = true;
            arr.filter((arrItem) => {
                if (avProd[rand]._id === arrItem._id) check = false;
                // if (products[rand].id === arrItem.id) check = false;
            });
            if (check) arr.push(avProd[rand]);
        }
        // console.log(arr);
        return arr;
    }

    function updateProductsData() {
        getProducts()
            .then(({ data }) => {
                const naps = ownNapkinsData();
                setProduct([...data, ...naps]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const val = {
        products,
        addProduct,
        getProductForBuy,
        getRandomProduct,
        deleteProduct,
        deleteAllProducts,
        productsCounter,
        updateProductsData,
    };
    return (
        <ProductContext.Provider value={val}>
            {children}
        </ProductContext.Provider>
    );

    function count(toBuy) {
        let savedProducts = toBuy || {};

        let x = Cookies.get("toBuy");
        if (x) {
            savedProducts = JSON.parse(x);
        }

        //change counter
        let counter = 0;
        for (let key in savedProducts) {
            counter = savedProducts[key] + counter;
        }

        setProductsCounter(counter);
    }
}

function isEmpty(obj) {
    for (let key in obj) {
        // если тело цикла начнет выполняться - значит в объекте есть свойства
        return false;
    }
    return true;
}

function ownNapkinsData() {
    return [
        {
            _id: "nap_1",
            availability: true,
            createdAt: "2023-04-10T08:00:33.627Z",
            img: "/src/products/nap/nap1.png",
            info: "Упаковка із клапаном, Ароматизовані",
            price: 15,
            title: "Серветки вологі",
            tyagi: 0,
            type: "napkins",
            updatedAt: "2023-07-07T17:16:43.822Z",
            version: "Антибактеріальні з екстрактом алоє",
            country: "Україна",
            brand: "Chillbar",
            qnty: 1,
            qnty_papers: 15,
        },
        {
            _id: "nap_2",
            availability: true,
            createdAt: "2023-04-10T08:00:33.627Z",
            img: "/src/products/nap/nap2.png", //
            info: "Упаковка із клапаном, Ароматизовані", //
            price: 13, //
            title: "Серветки вологі", //
            tyagi: 0, //
            type: "napkins", //
            updatedAt: "2023-07-07T17:16:43.822Z",
            version: "Антибактеріальні з вітамінним комплексом",
            country: "Україна",
            brand: "Chillbar",
            qnty: 1,
            qnty_papers: 15,
        },
    ];
}
