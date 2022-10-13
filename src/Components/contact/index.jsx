import CONTACT from "../../Contact";
import {ReactComponent as TikTok} from '../svg/tiktok.svg';
import {ReactComponent as Telega} from '../svg/telega.svg';
import {ReactComponent as Viber} from '../svg/viber.svg';
import {ReactComponent as Insta} from '../svg/insta.svg';
import {ReactComponent as Mail} from '../svg/mail.svg';
import {ReactComponent as Phone} from '../svg/tel.svg';



function Contacts(props) {
    return (
        <div className="about contact forContainer">
            <div className="container">
                <div className="left">
                    <h2>Наші контакти:</h2>
                    <ul>
                        <li><Phone/><a href={`tel:${CONTACT.telephone1}`}>{CONTACT.prettyTel1}</a></li>
                        <li><Phone/><a href={`tel:${CONTACT.telephone2}`}>{CONTACT.prettyTel2}</a></li>
                        <li><Mail/><a href={`mailto:${CONTACT.maiL}`}>{CONTACT.maiL}</a></li>
                        <li><Telega/><a href={CONTACT.telega}>{CONTACT.telega_tag}</a></li>
                        <li><Viber/><a href={CONTACT.viber}>{CONTACT.viber_tag}</a></li>
                        <li><Insta/><a href={CONTACT.insta} target={'_blank'} rel="noreferrer">{CONTACT.insta_tag}</a></li>
                        <li><TikTok/><a href={CONTACT.tiktok} target={'_blank'} rel="noreferrer">{CONTACT.tiktok_tag}</a></li>
                    </ul>
                </div>
                <div className="right">
                    <img src="/src/contact.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Contacts;