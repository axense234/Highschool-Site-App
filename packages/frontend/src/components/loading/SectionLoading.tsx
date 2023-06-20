// React
import { FC, useEffect, useState } from "react";
// React Spinners
import { FadeLoader } from "react-spinners";
// Types
import { SectionLoadingProps } from "types";
// SCSS
import loadingStyles from "../../scss/components/loading/SectionLoading.module.scss";

const SectionLoading: FC<SectionLoadingProps> = ({ padding }) => {
  const [mobileSpinner, setMobileSpinner] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        setMobileSpinner(true);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        console.log("removed resize window event listener");
      });
    };
  }, []);

  return (
    <div className={loadingStyles.sectionLoadingContainer} style={{ padding }}>
      <p>Se încarcă...</p>
      <FadeLoader
        color="#606060"
        width={mobileSpinner ? 15 : 30}
        height={mobileSpinner ? 45 : 90}
        speedMultiplier={2}
      />
    </div>
  );
};

export default SectionLoading;
