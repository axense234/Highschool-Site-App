// React
import { FC } from "react";
// Pop-in Animations
import { useInView } from "react-intersection-observer";
// Types
import { HomeTitleProps } from "types";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";
// SCSS
import homeTitleStyles from "../../scss/components/Home/HomeTitle.module.scss";

const HomeTitle: FC<HomeTitleProps> = ({ title, quote }) => {
  const { ref: titleRef, inView: titleInView, entry: titleEntry } = useInView();
  const { ref: quoteRef, inView: quoteInView, entry: quoteEntry } = useInView();

  usePopInAnimation("showVertical", titleInView, titleEntry);
  usePopInAnimation("showVertical", quoteInView, quoteEntry);

  return (
    <section className={homeTitleStyles.homeContainer__title} id='title'>
      <h1 ref={titleRef} className='hidden'>
        {title}
      </h1>
      <q ref={quoteRef} className='hidden' style={{ transitionDelay: "200ms" }}>
        {quote}
      </q>
    </section>
  );
};

export default HomeTitle;
