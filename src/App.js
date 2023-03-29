import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./Components/about";
import Contacts from "./Components/contact";
import Layout from "./Components/layouts";
import Cart from "./Components/layouts/cart";
import Confid from "./Components/legals/conf";
import Cok from "./Components/legals/cookie";
import Ref from "./Components/legals/ref";
import MainPage from "./Components/main";
import Products from "./Components/products";
import VerifyProduct from "./Components/VerifyProduct";
import { ProductProvider } from "./hoc/porductProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Offer from "./Components/legals/offer";
import AdminLayout from "./Components/layouts/AdminLayout";
import Enter from "./Components/Admin/Enter";
import Orders from "./Components/Admin/orders";
import ThankPage from "./Components/Thank";
import Settings from "./Components/Admin/Settings";

function App() {
    const [cart, toggleCart] = useState(false);

    function handleToggleCart(state) {
        const blur = document.getElementById("blured");
        blur.classList.toggle("active-blured");
        toggleCart(state);
    }

    const location = useLocation();
    // console.log(location);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return (
        <div className="App">
            <ProductProvider>
                {cart ? <Cart toggleCart={handleToggleCart} /> : ""}
                <div id="blured">
                    <Routes>
                        <Route
                            path="/"
                            element={<Layout toggleCart={handleToggleCart} />}
                        >
                            <Route index element={<MainPage />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contacts />} />
                            <Route path="/thank/:id" element={<ThankPage />} />

                            <Route
                                path="/verify-product"
                                element={<VerifyProduct />}
                            />

                            <Route path="/conf" element={<Confid />} />
                            <Route path="/cookie" element={<Cok />} />
                            <Route path="/ref" element={<Ref />} />
                            <Route path="/offer" element={<Offer />} />
                        </Route>
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Enter />} />
                            <Route path="orders/*" element={<Orders />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </div>
                <ToastContainer />
            </ProductProvider>
        </div>
    );
}

export default App;
