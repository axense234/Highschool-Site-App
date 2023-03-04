// React
import { FC } from "react";
// React Spinners
import { FadeLoader } from "react-spinners";
// Types
import { SectionLoadingProps } from "types";
// SCSS
import loadingStyles from "../scss/components/SectionLoading.module.scss";

const SectionLoading: FC<SectionLoadingProps> = ({ padding }) => {
  return (
    <div className={loadingStyles.sectionLoadingContainer} style={{ padding }}>
      <p>Loading,please wait...</p>
      <FadeLoader color='#606060' width={30} height={90} speedMultiplier={2} />
    </div>
  );
};

export default SectionLoading;
