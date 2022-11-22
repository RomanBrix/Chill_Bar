import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
// import Cookies from 'js-cookie'

export const ProductContext = createContext(null);

const tovar = [
    {
        tyagi: 1800,
        type: "chill",
        title: "chillbar 1800",
        price: "345",
        version: "Соковитий лід",
        img: "/src/products/lushice.png",
        info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
        id: "0",
    },
    {
        tyagi: 1800,
        type: "chill",
        title: "chillbar 1800",
        price: "345",
        version: "Ананасовий лід",
        img: "/src/products/pineappleice.png",
        info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
        id: "1",
    },
    {
        tyagi: 1800,
        type: "chill",
        title: "chillbar 1800",
        price: "345",
        version: "Полуниця Ківі",
        img: "/src/products/strawberrykiwi.png",
        info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
        id: "2",
    },
    {
        tyagi: 1800,
        type: "chill",
        title: "chillbar 1800",
        price: "345",
        version: "Крижаний Skittles",
        img: "/src/products/iceskittles.png",
        info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
        id: "3",
    },
    {
        tyagi: 1800,
        type: "chill",
        title: "chillbar 1800",
        price: "345",
        version: "Персик Манго",
        img: "/src/products/peachmango.png",
        info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
        id: "4",
    },
    {
        tyagi: 1800,
        type: "chill",
        title: "chillbar 1800",
        price: "345",
        version: "Алое Виноград",
        img: "/src/products/aloegrape.png",
        info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
        id: "5",
    },
    {
        tyagi: 2500,
        type: "chill",
        title: "chillbar 2500",
        price: "400",
        version: "Апельсиновий лід",
        img: "/src/products/orangeice.png",
        info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
        id: "6",
    },
    {
        tyagi: 2500,
        type: "chill",
        title: "chillbar 2500",
        price: "400",
        version: "Алое чорна смородина",
        img: "/src/products/aloeblackcurrant.png",
        info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
        id: "7",
    },
    {
        tyagi: 2500,
        type: "chill",
        title: "chillbar 2500",
        price: "400",
        version: "Ягідний мікс",
        img: "/src/products/mixedberries.png",
        info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
        id: "8",
    },

    //MASSSSK
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Ананас лімонад",
        img: "/src/products/gt/ananasLimonad.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "9",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Апельсин",
        img: "/src/products/gt/apelsin.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "10",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Банан",
        img: "/src/products/gt/banan.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "11",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Кава-Табак",
        img: "/src/products/gt/coffetabak.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "12",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Кола - Лід",
        img: "/src/products/gt/colaIce.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "13",
    },

    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Диня",
        img: "/src/products/gt/dunya.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "14",
    },

    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Енергія",
        img: "/src/products/gt/energy.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "15",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Фруктовий мікс",
        img: "/src/products/gt/fruits.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "16",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Горіх",
        img: "/src/products/gt/gorih.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "17",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Зелене Яблуко",
        img: "/src/products/gt/greenApple.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "18",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Грейфрукт та чай з медом",
        img: "/src/products/gt/greyChaiMed.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "19",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Грейфрукт та полуниця",
        img: "/src/products/gt/greyPolun.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "20",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Гуава та Лід",
        img: "/src/products/gt/guavavIce.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "21",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Кавун",
        img: "/src/products/gt/yura.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "22",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Полуниця",
        img: "/src/products/gt/klubnika.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "23",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Кокос",
        img: "/src/products/gt/kokos.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "24",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Малина та смородина",
        img: "/src/products/gt/malina.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "25",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Манго та Лід",
        img: "/src/products/gt/mangoIce.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "26",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "М`ята",
        img: "/src/products/gt/myata.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "27",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "OMG",
        img: "/src/products/gt/omg.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "28",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Персик",
        img: "/src/products/gt/persik.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "29",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Ром та Лід",
        img: "/src/products/gt/rom.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "30",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Табак",
        img: "/src/products/gt/tabak.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "31",
    },
    {
        tyagi: 500,
        type: "mask",
        title: "Maskking gt",
        price: "230",
        version: "Ягодний мікс",
        img: "/src/products/gt/yagodi.png",
        info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
        id: "32",
    },

    //pro
    {
        tyagi: 1000,
        type: "mask",
        title: "Maskking Pro",
        price: "275",
        version: "OMG",
        img: "/src/products/pro/omg.png",
        info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
        id: "33",
    },
    {
        tyagi: 1000,
        type: "mask",
        title: "Maskking Pro",
        price: "275",
        version: "Ананасовий лімонад",
        img: "/src/products/pro/ananas.png",
        info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
        id: "34",
    },
    {
        tyagi: 1000,
        type: "mask",
        title: "Maskking Pro",
        price: "275",
        version: "Вишня",
        img: "/src/products/pro/cherry.png",
        info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
        id: "35",
    },
    {
        tyagi: 1000,
        type: "mask",
        title: "Maskking Pro",
        price: "275",
        version: "Кавун з льодом",
        img: "/src/products/pro/yura.png",
        info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
        id: "36",
    },
    {
        tyagi: 1000,
        type: "mask",
        title: "Maskking Pro",
        price: "275",
        version: "Солодкий банан",
        img: "/src/products/pro/banan.png",
        info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
        id: "37",
    },
    {
        tyagi: 1000,
        type: "mask",
        title: "Maskking Pro",
        price: "275",
        version: "Яблочне шампанське",
        img: "/src/products/pro/applShamp.png",
        info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
        id: "38",
    },
    {
        tyagi: 1000,
        type: "mask",
        title: "Maskking Pro",
        price: "275",
        version: "Ягідний мікс",
        img: "/src/products/pro/yagodu.png",
        info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
        id: "39",
    },

    // promax
    {
        tyagi: 1500,
        type: "mask",
        title: "Maskking Pro Max",
        price: "350",
        version: "Виноград",
        img: "/src/products/promax/grape.png",
        info: "Розмір 21,9 * 103 мм. Ємкість акумулятора 850 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1500. Нікотин 5%. Виробник Maskking",
        id: "40",
    },
    {
        tyagi: 1500,
        type: "mask",
        title: "Maskking Pro Max",
        price: "350",
        version: "Лимон та Ягоди",
        img: "/src/products/promax/lemon.png",
        info: "Розмір 21,9 * 103 мм. Ємкість акумулятора 850 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1500. Нікотин 5%. Виробник Maskking",
        id: "41",
    },
    {
        tyagi: 1500,
        type: "mask",
        title: "Maskking Pro Max",
        price: "350",
        version: "Гуава та Малина",
        img: "/src/products/promax/promax_guava.png",
        info: "Розмір 21,9 * 103 мм. Ємкість акумулятора 850 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1500. Нікотин 5%. Виробник Maskking",
        id: "41",
    },
];

export function ProductProvider({ children }) {
    // const checkCookie = Cookies.get('user')
    const [products, setProduct] = useState(tovar);
    const [productsCounter, setProductsCounter] = useState(0);

    useEffect(() => {
        count();
    }, []);

    function addProduct(id) {
        //add cookie
        console.log("add: " + id);
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
                savedProducts[id] = savedProducts[id] + 1;
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

        console.log(savedProducts);
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
            arrToReturn.push({
                ...products[key],
                count: savedProducts[key],
            });
        }
        // console.log(arrToReturn);
        return arrToReturn;
    }

    function getRandomProduct(id) {
        //get random products for slider
        const arr = [];

        //variant DVA
        while (arr.length !== 9) {
            const rand = Math.floor(Math.random() * products.length);
            let check = true;
            arr.filter((arrItem) => {
                if (products[rand].id === arrItem.id) check = false;
            });
            if (check) arr.push(products[rand]);
        }
        return arr;
    }

    const val = {
        products,
        addProduct,
        getProductForBuy,
        getRandomProduct,
        deleteProduct,
        deleteAllProducts,
        productsCounter,
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
