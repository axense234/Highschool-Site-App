// React
import { FC } from "react";
// Pop-in Animations
import { useInView } from "react-intersection-observer";
// Next
import Image from "next/image";
// SCSS
import homeStyles from "../../scss/components/Home.module.scss";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";

const HomeBac: FC = () => {
  const { ref: imageRef, inView, entry } = useInView();
  usePopInAnimation("showVertical", inView, entry);

  return (
    <section className={homeStyles.homeContainer__bac} id='bac'>
      <h2>Promovabilitatea la Bacalaureat</h2>
      <Image
        className='hidden'
        alt='Promovabilitatea la Bacalaureat'
        src='https://res.cloudinary.com/birthdayreminder/image/upload/v1677318347/Highschool%20Site%20App/promo-bac_tpj2tn.png'
        width={758}
        height={566}
        title='Promovabilitatea la Bacalaureat'
        ref={imageRef}
      />
    </section>
  );
};

export default HomeBac;
