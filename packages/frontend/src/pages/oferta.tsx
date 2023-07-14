// React
import { FC } from "react";
// SCSS
import offerStyles from "../scss/components/pages/Offer.module.scss";
// Components
import Meta from "@/components/others/Meta";
import PageTitle from "@/components/home/PageTitle";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";

const Offer: FC = () => {
  useGetPathname();
  return (
    <>
      <Meta
        title='Ofertă Educațională | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Bun venit la pagina 'Ofertă Educațională'! Descoperă programele și cursurile noastre variate, adaptate nevoilor tale. Alege calea către succesul academic și personal prin intermediul ofertei noastre educaționale de calitate."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502836/Highschool%20Site%20App/IMG-20230608-WA0016_unzyje.jpg",
        ]}
      />
      <main className={offerStyles.offerContainer}>
        <PageTitle
          title="Oferta educațională"
          quote="Oferta educațională pentru anul școlar 2023-2024"
        />
        <section className={offerStyles.offerContainer__pdf}>
          <h2>Oferta educațională</h2>
          <iframe
            title="Oferta educațională"
            src="https://drive.google.com/file/d/1mz70nIyxuw7Fe0uYef3NUksgAsA8Vpst/preview"
            width="640"
            height="480"
            allow="autoplay"
          />
        </section>
      </main>
    </>
  );
};

export default Offer;
