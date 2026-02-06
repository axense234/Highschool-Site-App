// React
import { FC } from "react";
// Next
import Image from "next/image";
// Pop-in Animations
import { useInView } from "react-intersection-observer";
// Types
import InfoSectionProps from "@/core/interfaces/component/InfoSectionProps";
// SCSS
import homeStyles from "../../scss/components/pages/Home.module.scss";
// Data
import { infoSections } from "@/data";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";
// Components
import MarkableHeading from "../others/MarkableHeading";

const HomeInfo: FC = () => {
  return (
    <section className={homeStyles.homeContainer__info}>
      <MarkableHeading
        textContent="Ce ne diferențiază?"
        type="h2"
        idUsed="differences"
      />
      <div className={homeStyles.homeContainer__infoSections}>
        {infoSections?.map((infoSection) => {
          return <InfoSection {...infoSection} key={infoSection.id} />;
        })}
      </div>
    </section>
  );
};

const InfoSection: FC<InfoSectionProps> = ({ logoUrl, title, desc }) => {
  const { ref, inView, entry } = useInView();
  usePopInAnimation("showHorizontal", inView, entry);

  return (
    <div
      className={`${homeStyles.homeContainer__infoSection} hidden`}
      ref={ref}
    >
      <Image
        src={logoUrl as string}
        alt={title as string}
        title={title as string}
        width={1000}
        height={1000}
      />
      <p>{desc}</p>
    </div>
  );
};

export default HomeInfo;
