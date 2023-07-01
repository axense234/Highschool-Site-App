// React
import { FC, useEffect } from "react";
// SCSS
import teachersStyles from "../scss/components/pages/Profesori.module.scss";
// Components
import Meta from "@/components/others/Meta";
import HomeTitle from "@/components/home/HomeTitle";
import SectionLoading from "@/components/loading/SectionLoading";
import Overlay from "@/components/others/Overlay";
import PageNav from "@/components/navigation/PageNav";
import InactiveTeacher from "@/components/teachers/InactiveTeacher";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllTeachers,
  selectAllTeachers,
  selectLoadingTeachers,
} from "@/redux/slices/teachersSlice";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
import { selectProfile } from "@/redux/slices/generalSlice";

const Profesori: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectAllTeachers);
  const loadingTeachers = useAppSelector(selectLoadingTeachers);

  const profile = useAppSelector(selectProfile);

  let shownTeachers = teachers;
  if (profile.role === "PROFESOR") {
    shownTeachers = teachers.filter(
      (teacher) => teacher.email !== profile.email
    );
  }

  useEffect(() => {
    if (loadingTeachers === "IDLE") {
      dispatch(getAllTeachers());
    }
  }, []);

  return (
    <>
      <Meta
        title='Profesorii Noștri | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Descoperă echipa noastră de profesori pasionați! Profesioniști calificați și dedicați, ei îți oferă o educație de înaltă calitate. Află mai multe despre experiența lor vastă și abordările inovatoare care asigură o experiență de învățare remarcabilă."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502837/Highschool%20Site%20App/IMG-20230608-WA0023_fixi8s.jpg",
        ]}
      />
      <main className={teachersStyles.profesoriContainer}>
        <HomeTitle
          title="Profesorii Noștri"
          quote="Omul fără învățătură e ca pământul fără ploaie."
        />
        <Overlay />
        <section className={teachersStyles.profesoriContainer__content}>
          <h2>Profesorii noștri</h2>
          <PageNav componentType="teacher" />
          {loadingTeachers === "IDLE" || loadingTeachers === "PENDING" ? (
            <SectionLoading />
          ) : (
            <div className={teachersStyles.profesoriContainer__profesori}>
              {shownTeachers.map((teacher) => {
                return <InactiveTeacher {...teacher} key={teacher.id} />;
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Profesori;
