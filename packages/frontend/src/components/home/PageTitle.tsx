// React
import { FC, useEffect, useState } from "react";
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
// Components
import MarkableHeading from "../others/MarkableHeading";

const PageTitle: FC<PageTitleProps> = ({
  title,
  quote,
  backgroundUrl,
  pageId,
}) => {
  const [headerBg, setHeaderBg] = useState<boolean>(false);

  const { ref: titleRef, inView: titleInView, entry: titleEntry } = useInView();
  const { ref: quoteRef, inView: quoteInView, entry: quoteEntry } = useInView();

  usePopInAnimation("showVertical", titleInView, titleEntry);
  usePopInAnimation("showVertical", quoteInView, quoteEntry);

  const pathname = useAppSelector(selectCurrentPathname);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeaderBg(true);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
      <header
        style={{
          backgroundColor: headerBg ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
        }}
      >
        <MarkableHeading
          textContent={title}
          type="h1"
          hasHiddenClassname
          headingRef={titleRef}
          pageId={pageId}
        />
        <q
          ref={quoteRef}
          className="hidden"
          style={{ transitionDelay: "200ms" }}
        >
          {quote}
        </q>
      </header>
    </section>
  );
};

export default PageTitle;
