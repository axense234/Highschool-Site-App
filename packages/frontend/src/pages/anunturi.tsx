// React
import { FC, useEffect, useState } from "react";
// Prisma Types
import { Anunt } from "@prisma/client";
// Next
import Image from "next/image";
// React Icons
import { MdArrowDropDownCircle } from "react-icons/md";
// SCSS
import announcementsStyles from "../scss/components/Anunturi.module.scss";
// Components
import HomeTitle from "@/components/Home/HomeTitle";
// Components
import Meta from "@/components/Meta";
import SectionLoading from "@/components/SectionLoading";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllAnnouncements,
  selectAllAnnouncements,
  selectLoadingAnnouncements,
} from "@/redux/slices/announcementsSlice";

const Announcements: FC = () => {
  const announcements = useAppSelector(selectAllAnnouncements);
  const loadingAnnouncements = useAppSelector(selectLoadingAnnouncements);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadingAnnouncements === "IDLE") {
      dispatch(getAllAnnouncements());
    }
  }, []);

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
          {loadingAnnouncements === "PENDING" ||
          loadingAnnouncements === "IDLE" ? (
            <SectionLoading />
          ) : (
            <div
              className={
                announcementsStyles.announcementsContainer__announcements
              }
            >
              {announcements.map((announcement) => {
                return (
                  <Announcement
                    {...announcement}
                    key={announcement.anunt_uid}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

const Announcement: FC<Anunt> = ({
  descriere,
  titlu,
  imagineUrl,
  videoUrl,
  pozitionareVideoInAnunt,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [workingVideoUrl, setVideoWorkingUrl] = useState<string>(
    videoUrl as string
  );

  useEffect(() => {
    if (videoUrl?.startsWith("https://www.youtube.com/watch?v=")) {
      const newVideoUrl = videoUrl.replace("/watch?v=", "/embed/");
      setVideoWorkingUrl(newVideoUrl);
    }
  }, [videoUrl, setVideoWorkingUrl]);

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
      {imagineUrl && (
        <Image
          src={imagineUrl as string}
          alt={titlu}
          width={100}
          height={100}
          title={titlu}
        />
      )}
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
        {pozitionareVideoInAnunt === "inceput" && workingVideoUrl && (
          <iframe
            src={workingVideoUrl as string}
            title={titlu}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          />
        )}
        <p>{descriere}</p>
        {pozitionareVideoInAnunt === "final" && workingVideoUrl && (
          <iframe
            src={workingVideoUrl as string}
            title={titlu}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          />
        )}
      </div>
    </article>
  );
};

export default Announcements;
