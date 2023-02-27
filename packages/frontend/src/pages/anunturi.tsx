// React
import { FC, useState } from "react";
// Next
import Image from "next/image";
// React Icons
import { MdArrowDropDownCircle } from "react-icons/md";
// Types
import { AnnouncementProps } from "types";
// SCSS
import announcementsStyles from "../scss/components/Anunturi.module.scss";
// Components
import HomeTitle from "@/components/Home/HomeTitle";
// Data
import { templateAnnouncements } from "@/data";
// Components
import Meta from "@/components/Meta";

const Announcements: FC = () => {
  return (
    <>
      <Meta
        title='Liceul Teoretic "Vasile Barbu" Pitesti - Anunturi'
        desc='Proiect inspirat de site-ul original al liceului meu: Liceul Teoretic "Ion Barbu" Pitesti.Pagina de anunturi.'
      />
      <main className={announcementsStyles.announcementsContainer}>
        <HomeTitle title='Anunturi' quote='Nu glumesc.' />
        <section
          className={announcementsStyles.announcementsContainer__content}
        >
          <h2>Anunturi in momentul actual</h2>
          <div
            className={
              announcementsStyles.announcementsContainer__announcements
            }
          >
            {templateAnnouncements.map((announcement) => {
              return (
                <Announcement {...announcement} key={announcement.anunt_uid} />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

const Announcement: FC<AnnouncementProps> = ({
  descriere,
  titlu,
  imagineUrl,
  videoUrl,
  pozitionareVideoInAnunt,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  if (!toggle) {
    return (
      <article
        className={announcementsStyles.announcementsContainer__announcement}
        title={titlu}
      >
        <div
          className={
            announcementsStyles.announcementsContainer__announcementTitle
          }
        >
          <h3>{titlu}</h3>
          <MdArrowDropDownCircle
            onClick={() => setToggle(true)}
            title='Deschide'
          />
        </div>
        <p>{descriere.slice(0, 100)}...</p>
      </article>
    );
  }

  return (
    <article
      className={announcementsStyles.announcementsContainer__announcement}
    >
      <Image
        src={imagineUrl as string}
        alt={titlu}
        width={100}
        height={100}
        title={titlu}
      />
      <div
        className={announcementsStyles.announcementsContainer__announcementInfo}
      >
        <div
          className={
            announcementsStyles.announcementsContainer__announcementTitle
          }
        >
          <h3>{titlu}</h3>
          <MdArrowDropDownCircle
            onClick={() => setToggle(false)}
            title='Inchide'
          />
        </div>
        {pozitionareVideoInAnunt === "inceput" && (
          <iframe src={videoUrl} title={titlu} />
        )}
        <p>{descriere}</p>
        {pozitionareVideoInAnunt === "final" && (
          <iframe src={videoUrl} title={titlu} />
        )}
      </div>
    </article>
  );
};

export default Announcements;
