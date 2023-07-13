// React
import { FC, useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Types
import { Admin, Student, Teacher } from "@prisma/client";
import { TemplateClass, TemplateStudent, TemplateUser } from "types";
// Components
import Meta from "@/components/others/Meta";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Components
import Overlay from "@/components/others/Overlay";
import PageTitle from "@/components/home/PageTitle";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
import useAuthorization from "@/hooks/useAuthorization";
// Components
import ProfileDashboard from "@/components/profile/ProfileDashboard";
import ProfileStudentCatalogue from "@/components/profile/ProfileStudentCatalogue";
import SectionLoading from "@/components/loading/SectionLoading";
// Data
import { defaultTemplateClass, defaultTemplateStudent } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getStudentById,
  selectLoadingStudent,
  selectStudentById,
} from "@/redux/slices/studentsSlice";
import { State } from "@/redux/api/store";
import {
  getTeacherById,
  selectLoadingTeacher,
  selectTeacherById,
} from "@/redux/slices/teachersSlice";
import {
  getAdminById,
  selectAdminById,
  selectLoadingAdmin,
} from "@/redux/slices/adminsSlice";
import { selectProfile, setOptionsContent } from "@/redux/slices/generalSlice";
import { selectClassById } from "@/redux/slices/classesSlice";

const IndividualProfile: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [userShown, setUserShown] = useState<Admin | Teacher | Student>(
    defaultTemplateStudent as Student
  );
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const loadingStudent = useAppSelector(selectLoadingStudent);
  const loadingTeacher = useAppSelector(selectLoadingTeacher);
  const loadingAdmin = useAppSelector(selectLoadingAdmin);

  const profile = useAppSelector(selectProfile);

  const student = useAppSelector((state: State) =>
    selectStudentById(
      state,
      router.query?.userId ? (router.query?.userId as string) : ""
    )
  );

  const teacher = useAppSelector((state: State) =>
    selectTeacherById(
      state,
      router.query?.userId ? (router.query?.userId as string) : ""
    )
  );

  const admin = useAppSelector((state: State) =>
    selectAdminById(
      state,
      router.query?.userId ? (router.query?.userId as string) : ""
    )
  );

  const studentClass = useAppSelector((state: State) =>
    selectClassById(
      state,
      userShown ? ((userShown as Student).class_uid as string) : ""
    )
  );

  const studentClassTeachers =
    (((studentClass as TemplateClass) || defaultTemplateClass)
      .teachers as Teacher[]) || [];

  const isTeacherOfStudentClass =
    profile.role === "PROFESOR" &&
    studentClassTeachers.find(
      (classTeacher) =>
        classTeacher.teacher_uid === (profile as Teacher).teacher_uid
    );

  const showStudentCatalogue =
    userShown?.role === "ELEV" &&
    profile?.role &&
    (profile?.role === "ADMIN" || isTeacherOfStudentClass);

  useEffect(() => {
    switch (router.query.type) {
      case "teacher":
        setUserShown(teacher as Teacher);
        setLoadingUser(
          loadingTeacher === "IDLE" || loadingTeacher === "PENDING"
        );
        break;
      case "student":
        setUserShown(student as Student);
        setLoadingUser(
          loadingStudent === "IDLE" || loadingStudent === "PENDING"
        );
        break;
      case "admin":
        setUserShown(admin as Admin);
        setLoadingUser(loadingAdmin === "IDLE" || loadingAdmin === "PENDING");
        break;
      default:
        break;
    }
  }, [router, loadingTeacher, loadingStudent, loadingAdmin]);

  useEffect(() => {
    if (router.query.type === "admin" && router.query.userId) {
      dispatch(getAdminById(router.query.userId as string));
    } else if (router.query.type === "student" && router.query.userId) {
      dispatch(getStudentById(router.query.userId as string));
    } else if (router.query.type === "teacher" && router.query.userId) {
      dispatch(getTeacherById(router.query.userId as string));
    }
  }, [router.query, dispatch]);

  useEffect(() => {
    if (userShown?.role === "PROFESOR") {
      dispatch(setOptionsContent("viewTeacherClassrooms"));
    } else if (userShown?.role === "ELEV") {
      dispatch(setOptionsContent(""));
    } else if (userShown?.role === "ADMIN") {
      dispatch(setOptionsContent("settings"));
    } else {
      dispatch(setOptionsContent(""));
    }
  }, [userShown, dispatch]);

  if (loadingUser) {
    return (
      <>
        <Meta
          title='Așteptați vă rog... | Liceul Teoretic "Ion Barbu" Pitești'
          desc="Gestionează-ți informațiile personale și personalizează-ți experiența! Adaugă și actualizează preferințele tale în profilul tău pentru a te bucura de conținut și oferte relevante."
        />
        <SectionLoading />
      </>
    );
  }

  return (
    <>
      <Meta
        title={`${userShown?.fullname} | Liceul Teoretic "Ion Barbu" Pitești`}
        desc="Gestionează-ți informațiile personale și personalizează-ți experiența! Adaugă și actualizează preferințele tale în profilul tău pentru a te bucura de conținut și oferte relevante."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504536/Highschool%20Site%20App/nightschool2_zoolin.jpg",
        ]}
      />
      <main className={profileStyles.profileContainer}>
        <Overlay />
        <PageTitle
          title={`${userShown?.fullname} - ${userShown?.role}`}
          quote={`Vezi profilul lui ${userShown?.fullname} de ${userShown?.role}`}
          backgroundUrl="https://res.cloudinary.com/birthdayreminder/image/upload/v1686504536/Highschool%20Site%20App/nightschool2_zoolin.jpg"
          pageId={userShown.id}
        />
        <ProfileDashboard
          profile={userShown as Teacher | Admin | Student}
          type="read"
        />
        {showStudentCatalogue && (
          <ProfileStudentCatalogue
            userProfile={userShown as TemplateStudent}
            type="user"
          />
        )}
      </main>
    </>
  );
};
export default IndividualProfile;
