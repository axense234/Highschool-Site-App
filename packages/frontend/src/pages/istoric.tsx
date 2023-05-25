// React
import { FC } from "react";
// Next
import Image from "next/image";
// Intersection Observer
import { useInView } from "react-intersection-observer";
// SCSS
import istoricStyles from "../scss/components/Istoric.module.scss";
// Components
import HomeTitle from "@/components/Home/HomeTitle";
import Meta from "@/components/Meta";
// Data
import { istoricPinpoints } from "@/data";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";

const Istoric: FC = () => {
  const { ref, inView, entry } = useInView();
  usePopInAnimation("showHorizontal", inView, entry);

  return (
    <>
      <Meta title='Liceul Teoretic "Ion Barbu" Pitești - Istoric' />
      <main className={istoricStyles.istoricContainer}>
        <HomeTitle
          title="Istoria Noastră"
          quote="Tradiție. Educație. Inspirație. Evoluție continuă."
        />
        <section className={istoricStyles.istoricContainer__content}>
          <h2>Istoric</h2>
          <div className={istoricStyles.istoricContainer__info}>
            <ul className={istoricStyles.istoricContainer__pinpoints}>
              {istoricPinpoints.map((pinpoint) => {
                return (
                  <li key={pinpoint.id}>
                    <span>{pinpoint.timePeriod}</span>
                    <p>- {pinpoint.content}</p>
                  </li>
                );
              })}
            </ul>
            <Image
              title="Ion Barbu"
              className="hidden"
              ref={ref}
              width={218}
              height={335}
              alt="Ion Barbu"
              src="https://res.cloudinary.com/birthdayreminder/image/upload/v1684921668/Highschool%20Site%20App/ion_barbu_dk87mu.jpg"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Istoric;
