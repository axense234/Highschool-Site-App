// React
import { FC } from "react";
// SCSS
import offerStyles from "../scss/components/Offer.module.scss";
// Components
import Meta from "@/components/Meta";
import HomeTitle from "@/components/Home/HomeTitle";

const Offer: FC = () => {
  return (
    <>
      <Meta title='Liceul Teoretic "Ion Barbu" Pitești - Ofertă educațională' />
      <main className={offerStyles.offerContainer}>
        <HomeTitle
          title="Oferta educațională pentru anul școlar 2023-2024"
          quote="Educația modelează un viitor promițător."
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
