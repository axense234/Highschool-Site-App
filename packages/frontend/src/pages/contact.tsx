// React
import { FC } from "react";
// SCSS
import contactStyles from "../scss/components/Contact.module.scss";
// Components
import HomeTitle from "@/components/Home/HomeTitle";
import Meta from "@/components/Meta";

const Contact: FC = () => {
  return (
    <>
      <Meta title='Liceul Teoretic "Ion Barbu" Pitești - Contact' />
      <main className={contactStyles.contactContainer}>
        <HomeTitle
          title="Contactați-ne"
          quote="Comunicarea este cheia relațiilor umane."
        />
        <section className={contactStyles.contactContainer__contact}>
          <h2>Informații de contact</h2>
          <div className={contactStyles.contactContainer__content}>
            <div className={contactStyles.contactContainer__info}>
              <address>Strada Transilvania 6, Pitești</address>
              <div className={contactStyles.contactContainer__tel}>
                <span>Telefon: </span>
                <a href="tel:+1234567890">0248 217 730</a>
              </div>
            </div>
            <iframe
              title="Ion Barbu Pitești"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.592909856062!2d24.86632037644769!3d44.850223171070446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2bc9ae9e9a5b7%3A0x75ddc78ec58eb23f!2sLiceul%20Teoretic%20%22Ion%20Barbu%22!5e0!3m2!1sro!2sro!4v1684932962289!5m2!1sro!2sro"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
