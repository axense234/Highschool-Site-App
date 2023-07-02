// React
import { FC, useEffect } from "react";
// Types
import {
  ComponentPreviewProps,
  TemplateClass,
  TemplateStudent,
  TemplateTeacher,
} from "types";
import { Student, Teacher } from "@prisma/client";
// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// SCSS
import classStyles from "../../scss/components/pages/IndividualClass.module.scss";
// Components
import HomeTitle from "@/components/home/HomeTitle";
import Meta from "@/components/others/Meta";
import SectionLoading from "@/components/loading/SectionLoading";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Data
import { defaultTemplateClass } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getClassById,
  selectClassById,
  selectLoadingClass,
} from "@/redux/slices/classesSlice";
import { State } from "@/redux/api/store";

const IndividualClass: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const loadingClass = useAppSelector(selectLoadingClass);

  const isLoadingClass = loadingClass === "IDLE" || loadingClass === "PENDING";

  const foundClass =
    useAppSelector((state: State) =>
      selectClassById(state, router.query.classId as string)
    ) || defaultTemplateClass;

  const { label, image_url, teachers, students, master_teacher } =
    (foundClass as TemplateClass) || defaultTemplateClass;

  const usedTeachers = teachers as Teacher[] | [];
  const uesdStudents = students as Student[] | [];

  useEffect(() => {
    if (loadingClass === "IDLE" && router.query.classId) {
      dispatch(getClassById(router.query.classId as string));
    }
  }, [router.query]);

  if (isLoadingClass) {
    return (
      <>
        <Meta
          title='Așteptați vă rog... | Liceul Teoretic "Ion Barbu" Pitești'
          desc="Bun venit în clasa... Descoperă o comunitate energică și plină de realizări. Află mai multe despre activitățile noastre și bucură-te de anii de liceu alături de noi."
        />
        <SectionLoading />
      </>
    );
  }

  return (
    <>
      <Meta
        title={`Clasa ${label} | Liceul Teoretic "Ion Barbu" Pitești`}
        desc={`Bun venit în clasa ${label}! Descoperă o comunitate energică și plină de realizări. Află mai multe despre activitățile noastre și bucură-te de anii de liceu alături de noi.`}
      />
      <main className={classStyles.classContainer}>
        <HomeTitle
          title={`Clasa ${label}`}
          quote="Unitatea clasei, izvor de putere și înțelepciune."
          backgroundUrl={image_url}
        />
        <section className={classStyles.classContainer__classDetailsContainer}>
          <h2>Detaliile clasei {label}</h2>
          <div className={classStyles.classContainer__classDetails}>
            <div className={classStyles.classContainer__classMaster}>
              <h3>DIRIGINTE: </h3>
              {master_teacher?.fullname ? (
                <ComponentPreview
                  component={master_teacher as TemplateTeacher}
                  type="teacher"
                />
              ) : (
                <p>Clasa nu are diriginte.</p>
              )}
            </div>
            <div className={classStyles.classContainer__classTeachers}>
              <h3>PROFESORI DE CLASĂ:</h3>
              <ul className={classStyles.classContainer__classTeachersDetails}>
                {usedTeachers?.map((teacher) => {
                  return (
                    <li key={teacher.teacher_uid as string}>
                      <ComponentPreview
                        component={teacher as TemplateTeacher}
                        type="teacher"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={classStyles.classContainer__classStudents}>
              <h3>ELEVII CLASEI {label}: </h3>
              <ul className={classStyles.classContainer__classStudentsDetails}>
                {uesdStudents?.map((student) => {
                  return (
                    <li key={student.student_uid}>
                      <ComponentPreview
                        component={student as TemplateStudent}
                        type="student"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const ComponentPreview: FC<ComponentPreviewProps> = ({ component, type }) => {
  const { fullname, profile_img_url, id } = component;
  const { subject } = component as TemplateTeacher;

  const linkDest = `/profil/${id}?type=${type}`;

  return (
    <Link
      href={linkDest}
      className={classStyles.classContainer__componentPreview}
      title={`Mai multe detalii despre ${fullname}.`}
      aria-label={`Mai multe detalii despre ${fullname}.`}
    >
      <Image
        width={200}
        height={200}
        alt={fullname}
        src={profile_img_url as string}
      />
      <h4>{fullname}</h4>
      {type === "teacher" && <p>PROFESOR DE {subject}</p>}
    </Link>
  );
};

export default IndividualClass;
