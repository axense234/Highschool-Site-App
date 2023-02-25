// React
import { FC } from "react";
// Next
import Image from "next/image";
// Types
import { OfferingItemProps } from "types";
// Pop-in Animations
import { useInView } from "react-intersection-observer";
// Data
import { offeringsList } from "@/data";
// SCSS
import homeStyles from "../../scss/components/Home.module.scss";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";

const HomeOfferings = () => {
  return (
    <section className={homeStyles.homeContainer__offerings}>
      <h2>Ce oferim?</h2>
      <ol className={homeStyles.homeContainer__offeringsList}>
        {offeringsList.map((offering, offIndex) => {
          return (
            <OfferingItem
              {...offering}
              key={offering.id}
              listNumber={offIndex}
            />
          );
        })}
      </ol>
    </section>
  );
};

const OfferingItem: FC<OfferingItemProps> = ({
  desc,
  title,
  logoUrl,
  listNumber,
}) => {
  const { ref, inView, entry } = useInView();
  usePopInAnimation("showHorizontal", inView, entry);
  return (
    <li
      className={`${homeStyles.homeContainer__offeringItem} hidden`}
      ref={ref}
    >
      <p>
        {listNumber + 1}.{desc}
      </p>
      <Image alt={title} src={logoUrl} title={title} width={200} height={100} />
    </li>
  );
};

export default HomeOfferings;
