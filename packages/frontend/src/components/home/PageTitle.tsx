// React
import { FC } from "react";
// Pop-in Animations
import { useInView } from "react-intersection-observer";
// Types
import { PageTitleProps } from "types";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";
// SCSS
import PageTitleStyles from "../../scss/components/home/PageTitle.module.scss";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectCurrentPathname } from "@/redux/slices/generalSlice";
// Data
import { pageTitleBackgroundImageUrls } from "@/data";

const PageTitle: FC<PageTitleProps> = ({ title, quote, backgroundUrl }) => {
  const { ref: titleRef, inView: titleInView, entry: titleEntry } = useInView();
  const { ref: quoteRef, inView: quoteInView, entry: quoteEntry } = useInView();

  usePopInAnimation("showVertical", titleInView, titleEntry);
  usePopInAnimation("showVertical", quoteInView, quoteEntry);

  const pathname = useAppSelector(selectCurrentPathname);

  const foundTitleBackgroundImageUrl = pageTitleBackgroundImageUrls.find(
    (page) => page.pagePath === pathname
  )?.backgroundUrl;

  return (
    <section
      className={PageTitleStyles.homeContainer__title}
      id="title"
      style={{
        backgroundImage: `url(${
          backgroundUrl || foundTitleBackgroundImageUrl
        })`,
      }}
    >
      <h1 ref={titleRef} className="hidden">
        {title}
      </h1>
      <q ref={quoteRef} className="hidden" style={{ transitionDelay: "200ms" }}>
        {quote}
      </q>
    </section>
  );
};

export default PageTitle;
