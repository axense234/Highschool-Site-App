// React
import { FC, useEffect } from "react";
// Prisma Types
import { Profesor } from "@prisma/client";
// Next
import Image from "next/image";
// SCSS
import profesoriStyles from "../scss/components/Profesori.module.scss";
// Components
import Meta from "@/components/Meta";
import HomeTitle from "@/components/Home/HomeTitle";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllTeachers,
  selectAllTeachers,
  selectLoadingTeachers,
} from "@/redux/slices/teachersSlice";
// Components
import SectionLoading from "@/components/SectionLoading";

const Profesori: FC = () => {
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
      <Meta title='Liceul Teoretic "Vasile Barbu" Pitesti - Profesorii Nostri' />
      <main className={profesoriStyles.profesoriContainer}>
        <HomeTitle
          title='Profesorii Nostri'
          quote='Nu e garantat sa fie platiti.'
        />
        <section className={profesoriStyles.profesoriContainer__content}>
          <h2>Profesorii nostri</h2>
          {loadingTeachers === "IDLE" || loadingTeachers === "PENDING" ? (
            <SectionLoading />
          ) : (
            <div className={profesoriStyles.profesoriContainer__profesori}>
              {teachers.map((teacher) => {
                return <Profesor {...teacher} key={teacher.id} />;
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

const Profesor: FC<Profesor> = ({
  descriere,
  imagineProfilUrl,
  profesorDe,
  username,
}) => {
  return (
    <article className={profesoriStyles.profesoriContainer__profesor}>
      <Image
        src={imagineProfilUrl as string}
        alt={username}
        width={100}
        height={100}
        title={username}
      />
      <div className={profesoriStyles.profesoriContainer__profesorInfo}>
        <h3>{username}</h3>
        <p>Profesor de: {profesorDe}</p>
        <p>{descriere}</p>
      </div>
    </article>
  );
};

export default Profesori;
