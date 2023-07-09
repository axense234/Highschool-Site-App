// React
import { FC } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Types
import { OfferingItemProps } from "types";
// Pop-in Animations
import { useInView } from "react-intersection-observer";
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
    <section className={homeStyles.homeContainer__offerings} id="offerings">
      <MarkableHeading textContent="Ce oferim?" type="h2" />
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
          alt={title}
          src={logoUrl}
          title={title}
          width={200}
          height={100}
        />
      </Link>
    </li>
  );
};

export default HomeOfferings;
