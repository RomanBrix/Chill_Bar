import {ReactComponent as Logo} from '../svg/logo.svg'
import {ReactComponent as Cart} from '../svg/cart.svg'
import {ReactComponent as CartG} from '../svg/cartG.svg'
import { useNavigate } from 'react-router-dom'
import useProduct from '../../hook/useProduct';
import anime from 'animejs';
// import { useEffect } from 'react';


function Header(props) {

    const navigate = useNavigate();
    const { productsCounter } = useProduct();
    const { toggleCart } = props;

    return (
        <div className="Header forContainer">
            <div className="bg-layer"/>
            <div className="container" id='cnt'>
                <div className="openmenu" onClick={()=>{
                    const menu = document.getElementsByClassName('menu')[0];
                    menu.classList.toggle('active-menu');
                    toggleMenu(menu)
                    // document.getElementById('blured').classList.toggle('active-blured')
                }}>
                    <div className="line"/>
                    <div className="line"/>
                    <div className="line"/>
                </div>
                <Logo className='logo' onClick={()=>{navigate('/')}}/>
                <ul className="menu" onClick={({target})=>{ 
                    const menu = document.getElementsByClassName('menu')[0];
                        if(menu.classList.contains('active-menu')) {
                            menu.classList.remove('active-menu');
                        }
                    }}>
                    <li onClick={()=>{navigate('/products')}}>Товари</li>
                    <li onClick={()=>{navigate('/about')}}>Про нас</li>
                    <li onClick={()=>{navigate('/contact')}}>Контакти</li>
                    <li onClick={()=>{
                        window.open('/verify-product.php', "_self")
                        // navigate('/verify-product.php')

                    }}>Перевірити ChillBar</li>
                </ul>
                <div className="cart-container" onClick={()=>{toggleCart(true)}}>
                    <span className="number" style={{
                        right: productsCounter < 10 ? '5px' : '0px'
                    }}>{productsCounter < 100 ? productsCounter : '99+'}</span>
                    <Cart className='cart'/>
                    <CartG className='cartG'/>
                </div>
            </div>
        </div>
    )



    function toggleMenu(menu,) {
        anime({
                targets: menu,
                opacity:  [0, 1],
                delay: 0,
                duration: 300,
                easing: "linear",

        })
    }

}


export default Header;
