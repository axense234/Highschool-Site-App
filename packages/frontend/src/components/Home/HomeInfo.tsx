// React
import { FC } from "react";
// Types
import { InfoSectionProps } from "types";
// Next
import Image from "next/image";
// Pop-in Animations
import { useInView } from "react-intersection-observer";
// SCSS
import homeStyles from "../../scss/components/Home.module.scss";
// Data
import { infoSections } from "@/data";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";

const HomeInfo: FC = () => {
  return (
    <section className={homeStyles.homeContainer__info} id='differences'>
      <h2>Ce ne diferențiază?</h2>
      <div className={homeStyles.homeContainer__infoSections}>
        {infoSections.map((infoSection) => {
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
        src={logoUrl}
        alt={title}
        title={title}
        width={1000}
        height={1000}
      />
      <p>{desc}</p>
    </div>
  );
};

export default HomeInfo;
