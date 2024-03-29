// React
import { FC, useEffect } from "react";
// SCSS
import classStyles from "../../scss/components/pages/Classes.module.scss";
// Components
import PageTitle from "@/components/home/PageTitle";
import Meta from "@/components/others/Meta";
import SectionLoading from "@/components/loading/SectionLoading";
import ClassItem from "@/components/classes/ClassItem";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Redix
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllClasses,
  selectAllClasses,
  selectLoadingClasses,
} from "@/redux/slices/classesSlice";
import { selectProfile } from "@/redux/slices/generalSlice";

const Classrooms: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const loadingClasses = useAppSelector(selectLoadingClasses);

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
        title='Clasele Noastre | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Descoperă diversitatea claselor noastre! Fiecare clasă are o personalitate unică și oferă oportunități captivante de învățare. Explorează informații despre activități, evenimente și reușitele lor remarcabile."
      />
      <main className={classStyles.classesContainer}>
        <PageTitle
          title="Clasele Noastre"
          quote="Unitatea clasei, izvor de putere și înțelepciune."
        />
        <section className={classStyles.classesContainer__content}>
          <h2>Clasele Noastre</h2>
          {loadingClasses === "PENDING" ? (
            <SectionLoading />
          ) : (
            <ul className={classStyles.classesContainer__classes}>
              {shownClasses.length >= 1 ? (
                shownClasses.map((classItem) => {
                  return (
                    <li key={classItem.class_uid}>
                      <ClassItem {...classItem} />
                    </li>
                  );
                })
              ) : (
                <li>
                  <p>Nu avem clase momentan.</p>
                </li>
              )}
            </ul>
          )}
        </section>
      </main>
    </>
  );
};

export default Classrooms;
