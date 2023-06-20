// React
import { FC } from "react";
// React icons
import { MdArrowUpward } from "react-icons/md";
// SCSS
import footerStyles from "../../scss/components/others/Footer.module.scss";
import contactStyles from "../../scss/components/pages/Contact.module.scss";
// Components
import Logo from "./Logo";

const Footer: FC = () => {
  const handleGoUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={footerStyles.footerContainer}>
      <div className={footerStyles.footerContainer__logo}>
        <Logo />
        <div className={contactStyles.contactContainer__info}>
          <address>Strada Transilvania 6, Pitești</address>
          <div className={contactStyles.contactContainer__tel}>
            <span>Telefon: </span>
            <a href="tel:+1234567890">0248 217 730</a>
          </div>
        </div>
      </div>
      <p>Copyright &copy; 2023 Proiect: Highschool Site App</p>
      <div className={footerStyles.footerContainer__goUp}>
        <MdArrowUpward onClick={() => handleGoUp()} />
      </div>
    </footer>
  );
};

export default Footer;
