import MainAbout from "./about";
import Intro from "./intro";
import Slider from "./slider";

function MainPage(props) {
    return (
        <div id="main-page">
            <div className="info-msg">
                Якщо ви придбаєте 10 електронних сигарет,11 в подарунок. <br />
                Замовлення від 3 сигарет - доставка безкоштовно!
            </div>
            <Intro />
            <Slider />
            <MainAbout />
        </div>
    );
}

export default MainPage;
