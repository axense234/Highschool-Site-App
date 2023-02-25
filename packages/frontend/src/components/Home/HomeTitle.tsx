// React
import { FC } from "react";
// Pop-in Animations
import { useInView } from "react-intersection-observer";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";
// SCSS
import homeStyles from "../../scss/components/Home.module.scss";

const HomeTitle: FC = () => {
  const { ref: titleRef, inView: titleInView, entry: titleEntry } = useInView();
  const { ref: quoteRef, inView: quoteInView, entry: quoteEntry } = useInView();

  usePopInAnimation("showVertical", titleInView, titleEntry);
  usePopInAnimation("showVertical", quoteInView, quoteEntry);

  return (
    <section className={`${homeStyles.homeContainer__title}`}>
      <h1 ref={titleRef} className='hidden'>
        Liceul Teoretic "Vasile Barbu" Pitesti
      </h1>
      <q ref={quoteRef} className='hidden' style={{ transitionDelay: "200ms" }}>
        Prea bun.Prea ca la tara.
      </q>
    </section>
  );
};

export default HomeTitle;
