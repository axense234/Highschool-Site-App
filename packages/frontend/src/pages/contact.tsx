// React
import { FC, SyntheticEvent } from "react";
// Next
import Image from "next/image";
// Animations
import { useInView } from "react-intersection-observer";
// SCSS
import contactStyles from "../scss/components/pages/Contact.module.scss";
// Components
import PageTitle from "@/components/home/PageTitle";
import Meta from "@/components/others/Meta";
import FormModal from "@/components/modals/FormModal";
// Redux Toolkit
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  clearEmailFormTemplate,
  selectEmailFormTemplate,
  sendEmail,
  setEmailFormTemplate,
} from "@/redux/slices/generalSlice";
// Hooks
import usePopInAnimation from "@/hooks/usePopInAnimation";
import useGetPathname from "@/hooks/useGetPathname";

const Contact: FC = () => {
  useGetPathname();
  const emailForm = useAppSelector(selectEmailFormTemplate);
  const dispatch = useAppDispatch();

  const { refForm, refImage, refTitle } = useAnimations();

  const onEmailControlChange = (key: string, value: string) => {
    dispatch(setEmailFormTemplate({ key, value }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(sendEmail(emailForm));
    dispatch(clearEmailFormTemplate());
  };

  return (
    <>
      <Meta
        title='Contact | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Contactează-ne pentru orice întrebări, solicitări sau informații la Liceul Teoretic „Ion Barbu” Pitești. Aici găsești detaliile de contact necesare pentru a intra în legătură cu noi. Echipa noastră este gata să te sprijine și să răspundă la orice nelămurire. Așteptăm cu nerăbdare să colaborăm și să te ajutăm în orice ai nevoie."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502837/Highschool%20Site%20App/IMG-20230608-WA0021_ime128.jpg",
        ]}
      />
      <main className={contactStyles.contactContainer}>
        <PageTitle
          title="Contactați-ne"
          quote="Comunicarea este cheia relațiilor umane."
        />
        <section className={contactStyles.contactContainer__contact} id="info">
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
        <section className={contactStyles.contactContainer__email} id="email">
          <h2 ref={refTitle} className="hidden">
            Trimite-ne un email!
          </h2>
          <div className={contactStyles.contactContainer__emailContent}>
            <form
              className={`${contactStyles.contactContainer__emailForm} hidden`}
              onSubmit={(e) => handleSubmit(e)}
              ref={refForm}
              style={{ transitionDelay: "150ms" }}
            >
              <FormModal type="general" />
              <div className={contactStyles.contactContainer__control}>
                <label htmlFor="sender">Numele expeditorului:</label>
                <input
                  type="text"
                  id="sender"
                  name="sender"
                  value={emailForm.sender}
                  required
                  onChange={(e) =>
                    onEmailControlChange("sender", e.target.value)
                  }
                />
              </div>
              <div className={contactStyles.contactContainer__control}>
                <label htmlFor="emailAddress">
                  Adresa de email a expeditorului:
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={emailForm.emailAddress}
                  required
                  onChange={(e) =>
                    onEmailControlChange("emailAddress", e.target.value)
                  }
                />
              </div>
              <div className={contactStyles.contactContainer__control}>
                <label htmlFor="subject">Subiect:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={emailForm.subject}
                  required
                  onChange={(e) =>
                    onEmailControlChange("subject", e.target.value)
                  }
                />
              </div>
              <div className={contactStyles.contactContainer__control}>
                <label htmlFor="message">Mesaj:</label>
                <textarea
                  name="message"
                  id="message"
                  value={emailForm.message}
                  required
                  onChange={(e) =>
                    onEmailControlChange("message", e.target.value)
                  }
                />
              </div>
              <button type="submit">Trimite</button>
            </form>
            <Image
              alt="Imagine Email"
              ref={refImage}
              width="800"
              aria-label="Imagine Email"
              title="Imagine Liceu Contact Email"
              height="600"
              style={{ transitionDelay: "300ms" }}
              className="hidden"
              src="https://res.cloudinary.com/birthdayreminder/image/upload/v1685089011/Highschool%20Site%20App/caruselimage2_ebsysm.jpg"
            />
          </div>
        </section>
      </main>
    </>
  );
};

const useAnimations = () => {
  const { ref: refTitle, inView: inViewTitle, entry: entryTitle } = useInView();
  usePopInAnimation("showHorizontal", inViewTitle, entryTitle);
  const { ref: refForm, inView: inViewForm, entry: entryForm } = useInView();
  usePopInAnimation("showHorizontal", inViewForm, entryForm);
  const { ref: refImage, inView: inViewImage, entry: entryImage } = useInView();
  usePopInAnimation("showHorizontal", inViewImage, entryImage);

  return { refTitle, refForm, refImage };
};

export default Contact;
