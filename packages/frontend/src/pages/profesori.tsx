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

const Profesori: FC = () => {
  useGetPathname();

  const teachers = useAppSelector(selectAllTeachers);
  const loadingTeachers = useAppSelector(selectLoadingTeachers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadingTeachers === "IDLE") {
      dispatch(getAllTeachers());
    }
  }, []);

  return (
    <>
      <Meta
        title='Liceul Teoretic "Ion Barbu" Pitești - Profesorii Noștri'
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
              {teachers.map((teacher) => {
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
