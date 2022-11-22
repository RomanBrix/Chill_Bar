import { useState } from "react";
import useProduct from "../../hook/useProduct";
import { notifyAdmin } from "../../notify";



function SendRequest(props) {
    console.log(props);
    const [inputs, setInputs] = useState({
        name: "",
        phone: "",
    });
    const { deleteAllProducts } = useProduct()
    
    return (
        <div className="container" onClick={(e)=>{e.stopPropagation()}} style={{width: 'auto', minWidth: 'auto'}}>
        <img src="/src/main/buble6.png" alt="" className="bgimg" />
        <div className="box-inputs">
            <input type="text" placeholder="Ваше ім'я" name='name' value={inputs.name} onChange={changeInput}/>
            <input type="text" placeholder="Телефон" name='phone' value={inputs.phone} onChange={changeInput}/>
            {/* <input type="text" placeholder="Ваш мейл"/> */}
        </div>
        <div className="btn-send" onClick={sendOrder}>Замовити</div>
      </div>
    )

    function sendOrder() {
        const {name, phone} = inputs;
        if(name.length > 3 && phone.length > 7) {
            const {products, toggleCart} = props;
            const productText = products.map((product, index) => {
                return `${index+1}. ${product.title + ' ' + product.version} (${product.price} uah/шт) - ${product.count} шт.`
            }).join('\n');
            const totalSumm = products.reduce((acc, product) => {
                return acc + product.price * product.count;
            }, 0);
            const text = `🤑 Замовлення!\n${productText}\n\n💸Загальна сума: ${totalSumm} uah\n\n🤴 ${name}\n📱 ${phone}`;
            // console.log(text)
            notifyAdmin(text);
            setInputs({
                name: "",
                phone: "",
            });
            alert('Замовлення відправлено! Ми зв\'яжемося з вами найближчим часом!');
            deleteAllProducts();
            toggleCart(false);
        }else{
            console.log('error')
        }
    } 
    function changeInput(e){
        setInputs({...inputs, [e.target.name]: e.target.value})
    }
}


export default SendRequest;