// React
import { FC } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// SCSS
import logoStyles from "../scss/components/Logo.module.scss";

const Logo: FC = () => {
  return (
    <Link href='/home' title='Acasa' className={logoStyles.logoContainer}>
      <Image
        src='https://res.cloudinary.com/birthdayreminder/image/upload/v1677054397/Highschool%20Site%20App/Logo.png_y7cm9g.png'
        alt='Logo'
        width={60}
        height={60}
      />
    </Link>
  );
};

export default Logo;
