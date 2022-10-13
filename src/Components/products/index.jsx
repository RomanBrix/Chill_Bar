import anime from "animejs";
import useProduct from "../../hook/useProduct";
import { ReactComponent as Cart } from "../svg/cart.svg";

function Products(props) {
  const { products, addProduct } = useProduct();

  return (
    <div className="products forContainer">
      <div className="container">
        <div className="slider">{renderProduct()}</div>
      </div>
    </div>
  );

  function renderProduct() {
    return products.map((item, index) => {
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
                <p>
                  {item.info}
                </p>
              </div>
            </div>
            <div className="info">
              <h2>{item.title}</h2>
              <p>{item.version}</p>
              <div className="price">{item.price} UAH</div>
              <div className="cart">
                <Cart
                  className="product-cart"
                  onClick={() => {
                    addToCart(item.id);
                  }}
                />
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
