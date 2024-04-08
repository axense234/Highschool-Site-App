// React
import { FC, useEffect } from "react";
// SCSS
import teachersStyles from "../scss/components/pages/Teachers.module.scss";
// Components
import Meta from "@/components/others/Meta";
import PageTitle from "@/components/home/PageTitle";
import SectionLoading from "@/components/loading/SectionLoading";
import Overlay from "@/components/others/Overlay";
import PageNav from "@/components/navigation/PageNav";
import InactiveTeacher from "@/components/teachers/InactiveTeacher";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllTeachers,
  selectAllTeachers,
  selectLoadingTeachers,
} from "@/redux/slices/teachersSlice";
import {
  selectGetAllQueryParams,
  selectProfile,
} from "@/redux/slices/generalSlice";

const Teachers: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectAllTeachers);
  const loadingTeachers = useAppSelector(selectLoadingTeachers);

  const profile = useAppSelector(selectProfile);
  const getAllAnnouncementQuery = useAppSelector(selectGetAllQueryParams);

  let shownTeachers = teachers;
  if (profile.role === "PROFESOR") {
    shownTeachers = teachers.filter(
      (teacher) => teacher.email !== profile.email
    );
  }

  useEffect(() => {
    if (loadingTeachers === "IDLE") {
      dispatch(getAllTeachers(getAllAnnouncementQuery));
    }
  }, [getAllAnnouncementQuery, loadingTeachers]);

  return (
    <>
      <Meta
        title='Profesorii Noștri | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Descoperă echipa noastră de profesori pasionați! Profesioniști calificați și dedicați, ei îți oferă o educație de înaltă calitate. Află mai multe despre experiența lor vastă și abordările inovatoare care asigură o experiență de învățare remarcabilă."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502837/Highschool%20Site%20App/IMG-20230608-WA0023_fixi8s.jpg",
        ]}
      />
      <main className={teachersStyles.teachersContainer}>
        <PageTitle
          title="Profesorii Noștri"
          quote="Omul fără învățătură e ca pământul fără ploaie."
        />
        <Overlay />
        <section className={teachersStyles.teachersContainer__content}>
          <h2>Profesorii noștri</h2>
          <PageNav componentType="teacher" />
          {loadingTeachers === "IDLE" || loadingTeachers === "PENDING" ? (
            <SectionLoading />
          ) : (
            <div className={teachersStyles.teachersContainer__teachers}>
              {shownTeachers.length >= 1 ? (
                shownTeachers.map((teacher) => {
                  return <InactiveTeacher {...teacher} key={teacher.id} />;
                })
              ) : (
                <p>Nu am gasit niciun profesor.</p>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Teachers;
