// React
import { FC } from "react";
// SCSS
import footerStyles from "../scss/components/Footer.module.scss";
// Components
import Logo from "./Logo";

const Footer: FC = () => {
  return (
    <footer className={footerStyles.footerContainer}>
      <Logo />
      <p>Copyright &copy; 2023 Proiect: Highschool Site App</p>
    </footer>
  );
};

export default Footer;
