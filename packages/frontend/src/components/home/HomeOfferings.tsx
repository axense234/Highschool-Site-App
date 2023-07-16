// React
import { FC } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Pop-in Animations
import { useInView } from "react-intersection-observer";
// Types
import OfferingItemProps from "@/core/interfaces/component/OfferingItemProps";
// Data
import { offeringsList } from "@/data";
// SCSS
import homeStyles from "../../scss/components/pages/Home.module.scss";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";
// Components
import MarkableHeading from "../others/MarkableHeading";

const HomeOfferings = () => {
  return (
    <section className={homeStyles.homeContainer__offerings}>
      <MarkableHeading textContent="Ce oferim?" type="h2" idUsed="offerings" />
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
  dest,
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
      <Link href={dest as string}>
        <Image
          alt={title as string}
          src={logoUrl as string}
          title={title as string}
          width={200}
          height={100}
        />
      </Link>
    </li>
  );
};

export default HomeOfferings;
