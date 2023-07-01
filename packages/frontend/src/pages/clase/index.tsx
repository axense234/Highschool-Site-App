// React
import { FC, useEffect } from "react";
// Types
import { Class } from "@prisma/client";
// SCSS
import classStyles from "../../scss/components/pages/Classes.module.scss";
// Components
import HomeTitle from "@/components/home/HomeTitle";
import Meta from "@/components/others/Meta";
import SectionLoading from "@/components/loading/SectionLoading";
import ClassItem from "@/components/classes/ClassItem";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllClasses,
  selectAllClasses,
  selectLoadingClasses,
} from "@/redux/slices/classesSlice";
import {
  selectLoadingProfile,
  selectProfile,
} from "@/redux/slices/generalSlice";

const Classrooms: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const loadingClasses = useAppSelector(selectLoadingClasses);
  const loadingProfile = useAppSelector(selectLoadingProfile);

  const profile = useAppSelector(selectProfile);
  const classes = useAppSelector(selectAllClasses);

  useEffect(() => {
    if (loadingClasses === "IDLE") {
      dispatch(getAllClasses());
    }
  }, []);

  let shownClasses = classes;
  switch (profile.role) {
    case "ADMIN":
      shownClasses = classes;
      break;
    case "ELEV":
      shownClasses = classes.filter((classItem) => classItem.public === true);
      break;
    case "PROFESOR":
      shownClasses = classes.filter((classItem) => classItem.public === true);
      break;
    case "":
      shownClasses = classes.filter((classItem) => classItem.public === true);
      break;
    default:
      break;
  }

  return (
    <>
      <Meta
        title='Liceul Teoretic "Ion Barbu" Pitești - Clasele Noastre.'
        desc='Proiect inspirat de site-ul original al liceului meu: Liceul Teoretic "Ion Barbu" Pitești. Pagina acasă.'
      />
      <main className={classStyles.classesContainer}>
        <HomeTitle
          title="Clasele Noastre"
          quote="Unitatea clasei, izvor de putere și înțelepciune."
        />
        <section className={classStyles.classesContainer__content}>
          <h2>Clasele Noastre</h2>
          {loadingClasses === "PENDING" ? (
            <SectionLoading />
          ) : (
            <ul className={classStyles.classesContainer__classes}>
              {shownClasses.map((classItem) => {
                return (
                  <li key={classItem.class_uid}>
                    <ClassItem {...classItem} />
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </>
  );
};

export default Classrooms;
