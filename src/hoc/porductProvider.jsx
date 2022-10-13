import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
// import Cookies from 'js-cookie'

export const ProductContext = createContext(null);

const tovar = [
  {
    title: "chillbar 1800",
    price: "200",
    version: "Соковитий лід",
    img: "/src/products/lushice.png",
    info: 'Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar.',
    id: "0",
  },
  {
    title: "chillbar 1800",
    price: "200",
    version: "Ананасовий лід",
    img: "/src/products/pineappleice.png",
    info: 'Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar.',
    id: "1",
  },
  {
    title: "chillbar 1800",
    price: "200",
    version: "Полуниця Ківі",
    img: "/src/products/strawberrykiwi.png",
    info: 'Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar.',
    id: "2",
  },
  {
    title: "chillbar 1800",
    price: "200",
    version: "Крижаний Skittles",
    img: "/src/products/iceskittles.png",
    info: 'Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar.',
    id: "3",
  },
  {
    title: "chillbar 1800",
    price: "200",
    version: "Персик Манго",
    img: "/src/products/peachmango.png",
    info: 'Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar.',
    id: "4",
  },
  {
    title: "chillbar 1800",
    price: "200",
    version: "Алое Виноград",
    img: "/src/products/aloegrape.png",
    info: 'Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar.',
    id: "5",
  },
  {
    title: "chillbar 2500",
    price: "250",
    version: "Апельсиновий лід",
    img: "/src/products/orangeice.png",
    info: 'Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar.',
    id: "6",
  },
  {
    title: "chillbar 2500",
    price: "250",
    version: "Алое чорна смородина",
    img: "/src/products/aloeblackcurrant.png",
    info: 'Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar.',
    id: "7",
  },
  {
    title: "chillbar 2500",
    price: "250",
    version: "Ягідний мікс",
    img: "/src/products/mixedberries.png",
    info: 'Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar.',
    id: "8",
  },
];

export function ProductProvider({ children }) {
  // const checkCookie = Cookies.get('user')
  const [products, setProduct] = useState(tovar);
  const [productsCounter, setProductsCounter] = useState(0);


  useEffect(()=>{
    count();
  },[])

  function addProduct(id) {
    //add cookie
    console.log('add: ' +id)
    let savedProducts = Cookies.get('toBuy');
    if(savedProducts){
      savedProducts = JSON.parse(savedProducts);
    }else{
      savedProducts = {}
    }

    if(isEmpty(savedProducts)){
      savedProducts[id] = 1;
    }else{
      if(savedProducts[id]){
        savedProducts[id] = savedProducts[id] + 1;
      }else{
        savedProducts[id] = 1;
      }
    }

    //save in type: {id: count}
    Cookies.set('toBuy', JSON.stringify(savedProducts));

    count(savedProducts);
    
  }
  function deleteProduct(id) {
    let savedProducts = JSON.parse(Cookies.get('toBuy'));
    if(savedProducts[id] !== 1){
      savedProducts[id] -= 1 
    }else{
      delete savedProducts[id];
    }
    Cookies.set('toBuy', JSON.stringify(savedProducts));
    count(savedProducts);

    console.log(savedProducts);
  }

  function getProductForBuy(id) {
    //get cookie

    let savedProducts = Cookies.get('toBuy');
    if(savedProducts){
      savedProducts = JSON.parse(savedProducts);
    }else{
      return false
    }
    const arrToReturn = [];

    for (const key in savedProducts) {
      arrToReturn.push({
        ...products[key],
        count: savedProducts[key]
      })
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
        let check = true
        arr.filter((arrItem)=>{
            if(products[rand].id === arrItem.id) check = false;
        })
        if(check) arr.push(products[rand]);
    }
    return arr;

  }

  const val = {
    products,
    addProduct,
    getProductForBuy,
    getRandomProduct,
    deleteProduct,
    productsCounter
  };
  return (
    <ProductContext.Provider value={val}>{children}</ProductContext.Provider>
  );





  function count(toBuy) {
    let savedProducts = toBuy || {};

    let x = Cookies.get('toBuy');
    if(x){
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