import anime from "animejs";
import { useState } from "react";
import { toast } from "react-toastify";
import useProduct from "../../hook/useProduct";
import { ReactComponent as Cart } from "../svg/cart.svg";

import { ReactComponent as ChillBtn } from "../svg/chill.svg";
import { ReactComponent as MaskkBtn } from "../svg/maskking.svg";

function Products(props) {
    const { products, addProduct } = useProduct();
    const [type, setType] = useState("chill");
    const [activeFilters, setActiveFilters] = useState([]);

    return (
        <div
            className={`products forContainer ${
                type === "mask" && "black-product"
            }`}
        >
            <div className="container">
                <div className="btns-changer">
                    <div className="main-btns">
                        <div
                            className={`btn ${
                                type === "chill" && "active-toggle-btn"
                            }`}
                            onClick={() => {
                                setType("chill");
                                setActiveFilters([]);
                            }}
                        >
                            <ChillBtn />
                        </div>
                        <div
                            className={`btn ${
                                type === "mask" && "active-toggle-btn"
                            }`}
                            onClick={() => {
                                setType("mask");
                                setActiveFilters([]);
                            }}
                        >
                            <MaskkBtn />
                        </div>
                    </div>
                    <div className="filter-btns">{renderFilterBtns()}</div>
                </div>
                <div className="slider">{renderProduct()}</div>
            </div>
        </div>
    );

    function renderFilterBtns() {
        const allBtns = [
            ...new Set(
                products
                    .filter((item) => item.type === type)
                    .map((item) => item.tyagi)
            ),
        ];

        console.log(allBtns);
        // const uniqueBtns = [...new Set(allBtns)];
        return allBtns.map((item, index) => {
            return (
                <div
                    className={`btn ${
                        activeFilters.includes(item) && "active-filter-btn"
                    }`}
                    key={index}
                    onClick={() => {
                        if (activeFilters.includes(item)) {
                            setActiveFilters(
                                activeFilters.filter((i) => i !== item)
                            );
                        } else {
                            setActiveFilters([...activeFilters, item]);
                        }
                    }}
                >
                    {item}
                </div>
            );
        });
    }
    function renderProduct() {
        return products
            .filter((item) => item.type === type)
            .filter((item) => {
                if (activeFilters.length === 0) return true;
                return activeFilters.includes(item.tyagi);
            })
            .map((item, index) => {
                return (
                    <div className={`block`} key={index}>
                        <div className="front">
                            <div
                                className="img"
                                onClick={({ target }) => {
                                    let block = target;
                                    // if (target.classList.contains("img")) return;
                                    while (!block.classList.contains("img")) {
                                        console.log(block.parentNode);
                                        block = block.parentNode;
                                    }
                                    rotateBlock(block);
                                }}
                            >
                                <img src={item.img} alt={item.title} />
                                <div className="back">
                                    <p>Основні характеристики: {item.title}:</p>
                                    <p>{item.info}</p>
                                </div>
                            </div>
                            <div className="info">
                                <h2>{item.title}</h2>
                                <p>{item.version}</p>
                                <div className="price">{item.price} UAH</div>
                                <div
                                    className="cart"
                                    onClick={() => {
                                        addToCart(item.id);
                                        toast("Товар додано в корзину", {
                                            onClick: () => {
                                                // alert("click");
                                            },
                                        });
                                    }}
                                >
                                    <span>Замовити</span>
                                    <Cart className="product-cart" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
    }

    function rotateBlock(block) {
        if (block.classList.contains("anm")) return;

        block.classList.toggle("anm");

        // block.classList.toggle('anm');

        const showBack = anime.timeline({
            easing: "easeOutExpo",
            duration: 450,
            autoplay: false,
        });
        const showFornt = anime.timeline({
            easing: "easeOutExpo",
            duration: 450,
            autoplay: false,
        });

        //block
        const [img, back] = block.children;

        if (!block.classList.contains("rotated")) {
            showBack.add({
                targets: img,
                filter: "blur(4px)",
            });

            showBack.add(
                {
                    targets: back,
                    opacity: [0, 1],
                    delay: 0,
                },
                "-=300"
            );
        }

        if (block.classList.contains("rotated")) {
            showFornt.add({
                targets: back,
                opacity: [1, 0],
            });
            showFornt.add(
                {
                    targets: img,
                    filter: "blur(0px)",
                },
                "-=300"
            );
        }

        if (block.classList.contains("rotated")) {
            showFornt.play();
        } else {
            showBack.play();
        }
        block.classList.toggle("rotated");
        setTimeout(() => {
            block.classList.toggle("anm");
        }, 750);
    }

    function addToCart(id) {
        addProduct(id);
    }
}

export default Products;
