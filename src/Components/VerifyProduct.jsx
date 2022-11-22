import { useState } from "react";




export default function VerifyProduct(){
    const [secCode, setSecCode] = useState('');
    
    return (
        <div className="about forContainer verify">
            <div className="container">
                <h1>SECURITY CODE</h1>
                <img src="/src/barcode.webp" alt="" />
                <div className="block">
                    <p>Будь ласка, введіть тут свій код безпеки, щоб дізнатися, чи купили ви оригінальну електронну сигарету ChillBar чи ні.</p>
                    {/* <ul className="howto">
                        <li>1. Введіть 16 цифр без пробілів, який ви знайшли на упаковці вашої ChillBar.</li>
                        <li>2. Натисніть кнопку "Перевірити".</li>
                    </ul> */}
                    <input type="text" placeholder="security code" value={secCode} onChange={({target})=>{ setSecCode(target.value)}}/>
                    <button className="btn" onClick={checkCode}>Дізнатися</button>
                </div>
            </div>
        </div>
    )

    function checkCode(){
        if(secCode.length > 0){
            //send request to server
            alert('send request to server')
        }
    }
}