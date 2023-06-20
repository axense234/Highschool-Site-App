// React
import { FC } from "react";
// Next
import Image from "next/image";
// Intersection Observer
import { useInView } from "react-intersection-observer";
// SCSS
import istoricStyles from "../scss/components/pages/Istoric.module.scss";
// Components
import HomeTitle from "@/components/home/HomeTitle";
import Meta from "@/components/others/Meta";
// Data
import { istoricPinpoints } from "@/data";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";
import useGetPathname from "@/hooks/useGetPathname";

const Istoric: FC = () => {
  useGetPathname();

  const { ref, inView, entry } = useInView();
  usePopInAnimation("showHorizontal", inView, entry);

  return (
    <>
      <Meta
        title='Liceul Teoretic "Ion Barbu" Pitești - Istoric'
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502835/Highschool%20Site%20App/IMG-20230608-WA0009_jihe2r.jpg",
        ]}
      />
      <main className={istoricStyles.istoricContainer}>
        <HomeTitle
          title="Istoria Noastră"
          quote="Tradiție. Educație. Inspirație. Evoluție continuă."
        />
        <section className={istoricStyles.istoricContainer__content}>
          <h2>Istoric</h2>
          <div className={istoricStyles.istoricContainer__info}>
            <Image
              title="Ion Barbu"
              className="hidden"
              ref={ref}
              width={218}
              height={335}
              alt="Ion Barbu"
              src="https://res.cloudinary.com/birthdayreminder/image/upload/v1684921668/Highschool%20Site%20App/ion_barbu_dk87mu.jpg"
            />
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
          </div>
        </section>
      </main>
    </>
  );
};

export default Istoric;
