import MainAbout from "./about";
import Intro from "./intro";
import Slider from "./slider";




function MainPage(props) {
    return (
        <div id="main-page">
            <Intro />
            <Slider/>
            <MainAbout/>
        </div>
    )
}




export default MainPage;