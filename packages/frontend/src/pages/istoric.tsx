// React
import { FC } from "react";
// Next
import Image from "next/image";
// Intersection Observer
import { useInView } from "react-intersection-observer";
// SCSS
import historyStyles from "../scss/components/pages/History.module.scss";
// Components
import PageTitle from "@/components/home/PageTitle";
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
        title='Istoric | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Bun venit la pagina 'Istoric'! Explorează evoluția noastră și momentele semnificative într-o călătorie în timp captivantă. Descoperă tradiția noastră și contribuția noastră la comunitate. Află cum am devenit o instituție de referință și explorează amintirile noastre remarcabile."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502835/Highschool%20Site%20App/IMG-20230608-WA0009_jihe2r.jpg",
        ]}
      />
      <main className={historyStyles.historyContainer}>
        <PageTitle
          title="Istoria Noastră"
          quote="Tradiție. Educație. Inspirație. Evoluție continuă."
        />
        <section className={historyStyles.historyContainer__content}>
          <h2>Istoric</h2>
          <div className={historyStyles.historyContainer__info}>
            <Image
              title="Ion Barbu"
              className="hidden"
              ref={ref}
              width={218}
              height={335}
              alt="Ion Barbu"
              src="https://res.cloudinary.com/birthdayreminder/image/upload/v1684921668/Highschool%20Site%20App/ion_barbu_dk87mu.jpg"
            />
            <ul className={historyStyles.historyContainer__pinpoints}>
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
