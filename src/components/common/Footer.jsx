import { keypad, phone, setting, smallPerson, voiceCircle } from "../../assets";
import "../../css/Footer.css";

const Footer = () => {
  return (
    <footer>
      <img className="phone" src={phone} />
      <img src={smallPerson} />
      <img className="keypad" src={keypad} />
      <img src={setting} />
      <img src={voiceCircle} />
    </footer>
  );
};
export default Footer;
