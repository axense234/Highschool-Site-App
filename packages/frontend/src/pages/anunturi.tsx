// React
import { FC, useEffect } from "react";
// SCSS
import announcementsStyles from "../scss/components/pages/Announcements.module.scss";
// Components
import PageTitle from "@/components/home/PageTitle";
import Meta from "@/components/others/Meta";
import SectionLoading from "@/components/loading/SectionLoading";
import Overlay from "@/components/others/Overlay";
import Category from "@/components/announcements/Category";
import PageNav from "@/components/navigation/PageNav";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllAnnouncements,
  selectLoadingAnnouncements,
} from "@/redux/slices/announcementsSlice";
// Data
import { announcementCategories } from "@/data";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";

const Announcements: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const loadingAnnouncements = useAppSelector(selectLoadingAnnouncements);

  const isLoadingAnnouncements =
    loadingAnnouncements === "PENDING" || loadingAnnouncements === "IDLE";

  useEffect(() => {
    if (loadingAnnouncements === "IDLE") {
      dispatch(getAllAnnouncements());
    }
  }, []);

  return (
    <>
      <Meta
        title='Anunțuri | Liceul Teoretic "Ion Barbu" Pitești'
        desc='Fii la curent cu cele mai noi informații și evenimente de la Liceul Teoretic "Ion Barbu" Pitești prin pagina noastră de Anunțuri. Descoperă activități, oportunități și evenimente speciale într-un mod rapid și convenabil. Rămâi conectat la comunitatea noastră școlară și află tot ce contează pentru tine.'
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502836/Highschool%20Site%20App/IMG-20230608-WA0012_e117jz.jpg",
        ]}
      />
      <main className={announcementsStyles.announcementsContainer}>
        <Overlay />
        <PageTitle
          title="Anunțuri"
          quote="Anunțuri generale despre diverse activități."
        />
        <section
          className={announcementsStyles.announcementsContainer__content}
        >
          <h2 id="announcements">Anunțuri in momentul actual</h2>
          <PageNav componentType="announcement" />
          {isLoadingAnnouncements ? (
            <SectionLoading />
          ) : (
            <div
              className={
                announcementsStyles.announcementsContainer__announcements
              }
            >
              {announcementCategories.map((category) => {
                return <Category {...category} key={category.id} />;
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Announcements;
