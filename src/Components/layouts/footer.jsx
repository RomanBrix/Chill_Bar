import CONTACT from '../../Contact';
import {ReactComponent as Logo} from '../svg/logo.svg';
import {ReactComponent as Telega} from '../svg/telega.svg';
import {ReactComponent as Insta} from '../svg/insta.svg';
import {ReactComponent as TikTok} from '../svg/tiktok.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import anime from 'animejs';
let TIMER;
let s = [
    ['а','в', 'e','C'],

    ['р','о','д','и','П']
]

function Footer(props) {
    const [ac, setAc] = useState(0);
    const [check, setCheck] = useState({
        one: false,
        four: false,
        eight: false,
        slava: false,
    })
    const navigate = useNavigate();
    useEffect(()=>{
        let ch = true
        for (const key in check) {
           ch = check[key];
        }

        if(ch){
            let s1 = s[0].reverse().join('');
            let s2 = s[1].reverse().join('');
            console.log(s1, s2)
            let newDiv = document.createElement("div");
                newDiv.className = 'sevka'
                newDiv.innerHTML = `<h1>${s1} ${s2}</h1>`;
                const root = document.getElementById('root');
                root.appendChild(newDiv);


                anime({
                    targets: newDiv,
                    opacity: [0, 1],
                    zIndex: 999999,
                
                })

                anime({
                    targets: newDiv,
                    fontSize: ['2em', '3em', '2em'],
                    loop: true,
                    duration: 3000
                })
        }
    }, [check])


    return (
        <div className="footer forContainer">
            <div className="bg-layer"/>
            <div className="container">
                <div className="left">
                    <Logo className='logo'/>
                    <p>© <span onClick={()=>a()}>2020</span>—{new Date().getFullYear()} Усі права захищені.</p>
                </div>

                <div className="right">
                    <ul>
                        <li onClick={()=>{navigate('/')}}>Головне меню</li>
                        <li onClick={()=>{navigate('/products')}}>Товари</li>
                        <li onClick={()=>{navigate('/about')}}>Про нас</li>
                        <li onClick={()=>{navigate('/contact')}}>Контакти</li>
                    </ul>
                    <ul>
                        <li>Клієнтам</li>
                        <li onClick={()=>{navigate('/ref')}}>Обмін та повернення</li>
                        <li onClick={()=>{navigate('/conf')}}>Політика конфіденційності</li>
                        <li onClick={()=>{navigate('/cookie')}}>Політика Cookie</li>
                    </ul>
                    <ul>
                        <li>Контактна інформація</li>
                        <li><a href={`tel:${CONTACT.telephone1}`}>{CONTACT.prettyTel1}</a></li>
                        <li><a href={`tel:${CONTACT.telephone2}`}>{CONTACT.prettyTel2}</a></li>
                        <li><a href={`mailto:${CONTACT.maiL}`}>{CONTACT.maiL}</a></li>
                    </ul>
                </div>
                <div className="bottom">
                    <div className="icons">
                        <Telega onClick={()=>{goTo(CONTACT.telega)}}/>
                        <Insta onClick={()=>{goTo(CONTACT.insta)}}/>
                        <TikTok onClick={()=>{goTo(CONTACT.tiktok)}}/>
                    </div>
                </div>
            </div>
        </div>
    )


    function a(){
        clearTimeout(TIMER);

        TIMER = setTimeout(()=>{
            checkVal(ac + 1)
        }, 2000)
    

        console.log(TIMER)
        setAc((prev)=>{
            return prev + 1
        });
       
    }
    function checkVal(zna) {
        // console.log(zna);
        switch (zna) {
            
            case 1:
                console.log('1 true');
                setCheck((prev)=>{
                    return {
                        ...prev,
                        one: true
                    }
                })
                break;
            case 4:
                console.log('4 true')
                setCheck((prev)=>{
                    return {
                        ...prev,
                        four: true
                    }
                })
                break;
            case 8:
                if(check.eight){
                    setCheck((prev)=>{
                        return {
                            ...prev,
                            slava: true
                        }
                    })
                }else{
                    setCheck((prev)=>{
                        return {
                            ...prev,
                            eight: true
                        }
                    })
                }
                break;
        
            default:
                console.log('0 true')

                setCheck({
                    one: false,
                    four: false,
                    eight: false,
                    slava: false,
                })
                break;


                
        }
        setAc(0);
    }
    function goTo(url) {
        window.open(url, '_blank').focus();
    }
}


export default Footer;