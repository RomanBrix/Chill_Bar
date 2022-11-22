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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [cart, toggleCart] = useState(false);


    function handleToggleCart (state){
        const blur = document.getElementById('blured');
        blur.classList.toggle('active-blured');
        toggleCart(state);
    }

    const location = useLocation();
    console.log(location);

    useEffect(()=>{
      window.scrollTo(0,0)
    }, [location.pathname])
  return (
    <div className="App">
      <ProductProvider>
          {
              cart ? 
                <Cart toggleCart={handleToggleCart}/>
              : ''
          }
          <div id="blured">
        <Routes>
          <Route path="/" element={<Layout toggleCart={handleToggleCart}/>}>
            <Route index element={<MainPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacts />} />


            <Route path="/verify-product" element={<VerifyProduct />} />



            <Route path="/conf" element={<Confid />} />
            <Route path="/cookie" element={<Cok />} />
            <Route path="/ref" element={<Ref />} />

          </Route>
        </Routes>
        </div>
        <ToastContainer />
      </ProductProvider>
    </div>
  );
}

export default App;
