import useProduct from "../../hook/useProduct";
import { ReactComponent as Cart } from "../svg/cart.svg";
import { ReactComponent as ArrowLeft } from "../svg/arrowLeft.svg";
import { ReactComponent as ArrowRight } from "../svg/arrowRight.svg";
import { useRef, useState } from "react";
import anime from "animejs";

function Slider(props) {
  const [activeSlide, setActiveSlide] = useState(1);
  const { getRandomProduct, addProduct } = useProduct();
  const [products] = useState(getRandomProduct());

  const containerWidth = useRef();

  return (
    <div className="slider forContainer">
      <div className="container" id="ct" ref={containerWidth}>
        <div className="arrow a-left">
          <ArrowLeft
            className="ar-l"
            onClick={() => {
              prevSilde();
            }}
          />
        </div>

        <div className="slider">{renderSliderProduct()}</div>

        <div className="arrow a-right">
          <ArrowRight
            className="ar-r"
            onClick={() => {
              nextSlide();
            }}
          />
        </div>
      </div>
    </div>
  );

  function renderSliderProduct() {
    return products.map((item, index) => {
      return (
        <div
          className={`block ${index === 1 ? "active-block" : ""}`}
          id={`slide-${index}`}
          key={index}
        >
          <div className="front">
            <div
              className="img"
              onClick={({ target }) => {
                let block = target;
                // if (target.classList.contains("product-cart")) return;
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
                <p>{item.info}</p>
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

  function nextSlide() {
    const forSwitchWidth = getComputedStyle(containerWidth.current).width;
    let moove = getMooveStep(forSwitchWidth);

    const firstSlide = document.getElementById("slide-0");
    const active = document.getElementById(`slide-${activeSlide}`);
    const nextAvtive = document.getElementById(`slide-${activeSlide + 1}`);
    const mar = getComputedStyle(firstSlide).marginLeft.slice(0, -2);
    const newMar = Math.abs(+mar) + moove;

    if (Math.abs(+mar) % moove !== 0) return;
    if (activeSlide === 7) {
      anime({
        targets: "#slide-0",
        marginLeft: [mar + "px", 0 + "px"],
        delay: 0,
        duration: 1300,
        easing: "linear",

        begin: function () {
          active.classList.toggle("active-block");
        },
        complete: function () {
          document.getElementById("slide-1").classList.toggle("active-block");

          setActiveSlide((pr) => {
            return 1;
          });
        },
      });
      return "";
    }

    anime({
      targets: "#slide-0",
      marginLeft: [mar + "px", "-" + newMar + "px"],
      delay: 0,
      duration: 700,
      easing: "easeInElastic",
      begin: function () {
        active.classList.toggle("active-block");
      },
      complete: function () {
        nextAvtive.classList.toggle("active-block");

        setActiveSlide((pr) => {
          return pr + 1;
        });
      },
    });
  }

  function prevSilde() {
    const forSwitchWidth = getComputedStyle(containerWidth.current).width;
    let moove = getMooveStep(forSwitchWidth);

    const firstSlide = document.getElementById("slide-0");
    const active = document.getElementById(`slide-${activeSlide}`);
    const nextAvtive = document.getElementById(`slide-${activeSlide - 1}`);
    const mar = getComputedStyle(firstSlide).marginLeft.slice(0, -2);
    const newMar = +mar + moove;
    // console.log(Math.abs(+mar) % moove);
    if (Math.abs(+mar) % moove !== 0) return;

    if (activeSlide === 1) {
      anime({
        targets: "#slide-0",
        marginLeft: [mar + "px", "-" + moove * 6 + "px"],
        delay: 0,
        duration: 1300,
        easing: "linear",

        begin: function () {
          active.classList.toggle("active-block");
        },
        complete: function () {
          document.getElementById("slide-7").classList.toggle("active-block");

          setActiveSlide((pr) => {
            return 7;
          });
        },
      });
      return "";
    }

    anime({
      targets: "#slide-0",
      marginLeft: [mar + "px", newMar + "px"],
      delay: 0,
      duration: 700,
      easing: "easeInElastic",
      begin: function () {
        active.classList.toggle("active-block");
      },
      complete: function () {
        nextAvtive.classList.toggle("active-block");

        setActiveSlide((pr) => {
          return pr - 1;
        });
      },
    });
  }

  function getMooveStep(width) {
    switch (width) {
      case "1440px":
        return 422;

      case "1024px":
        return 317;

      case "768px":
        return 347;

      case "375px":
        return 347;

      default:
        return 422;
    }
  }
}

export default Slider;
