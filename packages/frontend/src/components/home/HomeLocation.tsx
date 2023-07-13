// React
import { FC } from "react";
// SCSS
import homeLocationStyles from "../../scss/components/pages/Home.module.scss";
// Components
import MarkableHeading from "../others/MarkableHeading";

const HomeLocation: FC = () => {
  return (
    <section className={homeLocationStyles.homeContainer__location}>
      <MarkableHeading textContent="Localizare" type="h2" idUsed="location" />
      <div className={homeLocationStyles.homeContainer__locationContent}>
        <div className={homeLocationStyles.homeContainer__streetView}>
          <div className={homeLocationStyles.homeContainer__locationTitle}>
            <h3>Street View</h3>
            <hr />
          </div>
          <iframe
            title="Street View la Liceul Teoretic Ion Barbu Pitesti"
            src="https://www.google.com/maps/embed?pb=!4v1685023928131!6m8!1m7!1sQdrL7hhOwSY7okQV8mkhJw!2m2!1d44.84998020688512!2d24.86929027364949!3f302.0818173916637!4f-9.393216664629747!5f0.7820865974627469"
            width="600"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className={homeLocationStyles.homeContainer__map}>
          <div className={homeLocationStyles.homeContainer__locationTitle}>
            <h3>Google Maps</h3>
            <hr />
          </div>
          <iframe
            title="Ion Barbu Pitești"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.592909856062!2d24.86632037644769!3d44.850223171070446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2bc9ae9e9a5b7%3A0x75ddc78ec58eb23f!2sLiceul%20Teoretic%20%22Ion%20Barbu%22!5e0!3m2!1sro!2sro!4v1684932962289!5m2!1sro!2sro"
            width="600"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeLocation;
