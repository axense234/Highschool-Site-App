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
        title='Liceul Teoretic "Ion Barbu" Pitești - Anunțuri'
        desc='Proiect inspirat de site-ul original al liceului meu: Liceul Teoretic "Ion Barbu" Pitești. Pagina de anunțuri.'
      />
      <main className={announcementsStyles.announcementsContainer}>
        <Overlay title='Ești sigur că vrei să ștergi anunțul?' />
        <HomeTitle
          title='Anunțuri'
          quote='Anunțuri generale despre diverse activități.'
        />
        <section
          className={announcementsStyles.announcementsContainer__content}
        >
          <h2>Anunțuri in momentul actual</h2>
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
