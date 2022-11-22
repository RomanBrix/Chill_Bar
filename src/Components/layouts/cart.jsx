import { useState } from "react";
import useProduct from "../../hook/useProduct";
import SendRequest from "./sendRequest";

function Cart(props) {
  const { getProductForBuy, addProduct, deleteProduct } = useProduct();
  const [request, setRequest] = useState(false);

  const [products, setProducts] = useState(getProductForBuy());
  // const [totalSumm, setTotalSumm] =useState(0);
  let totalSumm = 0;
  // console.log(products.length);
  // console.log(props.toggleCart)
  return (
    <div
      className="main-cart forContainer"
      onClick={() => {
        props.toggleCart(false);
      }}
    >
      {request ? (
        <SendRequest products={products} toggleCart={props.toggleCart}/>
      ) : (
        <div
          className="container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img src="/src/main/buble6.png" alt="" className="bgimg" />
          <div className="info">
            <div className="positions">
              {products && products.length > 0 ? (
                renderProducts()
              ) : (
                <h1>Пока нiчого нема =(</h1>
              )}
            </div>
            <div className="btns">
              <div
                className="btn back"
                onClick={() => {
                  props.toggleCart(false);
                }}
              >
                Продовжити покупки
              </div>
              <div className="btn btn-summ">
                {totalSumm} ₴
              </div>
              <div className="btn btn-buy" onClick={()=>{setRequest(true)}}>Оформити замовлення</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function renderProducts() {
    let summ = 0;
    const toRend = products.map((item, index) => {
      summ = summ + item.price * item.count;
      return (
        <div className="item" key={index}>
          <div className="img">
            <img src={item.img} alt={item.title} />
          </div>
          <div className="item-info">
            <div className="title">{item.title}</div>
            <div className="vers">{item.version}</div>
          </div>
          <div className="counters">
            <div
              className="minus"
              onClick={() => {
                iDontNeedToMuch(item.id);
              }}
            >
              -
            </div>
            <div className="count">{item.count}</div>
            <div
              className="plus"
              onClick={() => {
                addMore(item.id);
              }}
            >
              +
            </div>
          </div>
          <div className="summ">{item.count * item.price} ₴</div>
        </div>
      );
    });
    totalSumm = summ;
    //   setTotalSumm(summ);
    return toRend;
  }

  function addMore(id) {
    addProduct(id);

    setProducts(getProductForBuy());
  }

  function iDontNeedToMuch(id) {
    deleteProduct(id);
    setProducts(getProductForBuy());
  }
}

export default Cart;
