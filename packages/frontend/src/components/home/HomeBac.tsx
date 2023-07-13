// React
import { FC } from "react";
// Pop-in Animations
import { useInView } from "react-intersection-observer";
// Next
import Image from "next/image";
// SCSS
import homeStyles from "../../scss/components/pages/Home.module.scss";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";
// Components
import MarkableHeading from "../others/MarkableHeading";

const HomeBac: FC = () => {
  const { ref: imageRef, inView, entry } = useInView();
  usePopInAnimation("showVertical", inView, entry);

  return (
    <section className={homeStyles.homeContainer__bac}>
      <MarkableHeading
        textContent="Promovabilitatea la Bacalaureat"
        type="h2"
        idUsed="bac"
      />
      <Image
        className="hidden"
        alt="Promovabilitatea la Bacalaureat"
        src="https://res.cloudinary.com/birthdayreminder/image/upload/v1677318347/Highschool%20Site%20App/promo-bac_tpj2tn.png"
        width={758}
        height={566}
        title="Promovabilitatea la Bacalaureat"
        ref={imageRef}
      />
    </section>
  );
};

export default HomeBac;
