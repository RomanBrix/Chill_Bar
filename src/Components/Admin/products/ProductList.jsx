import { useEffect } from "react";
import { useState } from "react";
import useRequestsMethods from "../../../hook/useRequestsMethods";
import useProduct from "../../../hook/useProduct";
import ProductBlock from "./ProductBlock";
// import Select from "react-select/dist/declarations/src/Select";

export default function ProducList() {
    const [newProduct, setNewProduct] = useState(false);

    const { products, updateProductsData } = useProduct();
    useEffect(() => {
        // getProducts();
        updateProductsData();
    }, []);
    if (!products) return "Loading";
    console.log(products);
    return (
        <div className="admin">
            <div className="width-container">
                <div
                    className="head"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1>Product List</h1>
                    <button
                        onClick={() => {
                            setNewProduct(true);
                        }}
                    >
                        Добавить Продукт
                    </button>
                </div>
                <div className="product-list">
                    {newProduct && (
                        <ProductBlock
                            newProduct={newProduct}
                            closeLayer={setNewProduct}
                            updProducts={updateProductsData}
                        />
                    )}
                    {renderList(products)}
                </div>
            </div>
        </div>
    );

    function renderList(products) {
        return products.map((item, index) => {
            return (
                <ProductBlock
                    key={index}
                    product={item}
                    updProducts={updateProductsData}
                />
            );
        });
    }
}
