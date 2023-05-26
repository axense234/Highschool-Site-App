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
    <section className={homeStyles.homeContainer__info} id="differences">
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
      {/* <iframe
        src="https://onedrive.live.com/embed?resid=423722D2FD89604%211305&amp;authkey=!AJ1X-mxMe-R_2Kw&amp;em=2&amp;wdAr=1.7777777777777777"
        width="476px"
        height="288px"
        title="PP"
      >
        Acesta este un document{" "}
        <a target="_blank" href="https://office.com" rel="noreferrer">
          Microsoft Office
        </a>{" "}
        încorporat, pe platformă{" "}
        <a target="_blank" href="https://office.com/webapps" rel="noreferrer">
          Office
        </a>
        .
      </iframe> */}
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
