// React
import { FC, useEffect } from "react";
// SCSS
import announcementsStyles from "../scss/components/Anunturi.module.scss";
// Components
import HomeTitle from "@/components/Home/HomeTitle";
import Meta from "@/components/Meta";
import SectionLoading from "@/components/SectionLoading";
import Overlay from "@/components/Overlay";
import Announcement from "@/components/Announcements/Announcement";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllAnnouncements,
  selectAllAnnouncements,
  selectLoadingAnnouncements,
} from "@/redux/slices/announcementsSlice";

const Announcements: FC = () => {
  const dispatch = useAppDispatch();
  const announcements = useAppSelector(selectAllAnnouncements);
  const loadingAnnouncements = useAppSelector(selectLoadingAnnouncements);

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
        <Overlay title='Esti sigur ca vrei sa stergi anuntul?' />
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

export default Announcements;
