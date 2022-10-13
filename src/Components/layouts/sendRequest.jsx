


function SendRequest(props) {
    console.log(props.products);
    return (
        <div className="container" onClick={(e)=>{e.stopPropagation()}} style={{width: 'auto', minWidth: 'auto'}}>
        <img src="/src/main/buble6.png" alt="" className="bgimg" />
        <div className="box-inputs">
            <input type="text" placeholder="Ваше ім'я"/>
            <input type="text" placeholder="Телефон"/>
            <input type="text" placeholder="Ваш мейл"/>
        </div>
        <div className="btn-send" onClick={()=>{alert('ok')}}>Замовити</div>
      </div>
    )
}


export default SendRequest;