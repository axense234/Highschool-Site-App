// React
import { FC } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// SCSS
import logoStyles from "../scss/components/Logo.module.scss";

const Logo: FC = () => {
  return (
    <Link href="/home" title="Acasă" className={logoStyles.logoContainer}>
      <Image
        src="https://res.cloudinary.com/birthdayreminder/image/upload/v1685015242/Highschool%20Site%20App/ltibp_logo_ptonmd.png"
        alt="Logo"
        width={60}
        height={60}
      />
    </Link>
  );
};

export default Logo;
