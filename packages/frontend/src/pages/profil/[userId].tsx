// React
import { FC, useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Types
import { Admin, Student, Teacher } from "@prisma/client";
import { TemplateStudent, TemplateUser } from "types";
// Components
import Meta from "@/components/others/Meta";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Components
import Overlay from "@/components/others/Overlay";
import HomeTitle from "@/components/home/HomeTitle";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
import useAuthorization from "@/hooks/useAuthorization";
// Components
import ProfileDashboard from "@/components/profile/ProfileDashboard";
import ProfileStudentCatalogue from "@/components/profile/ProfileStudentCatalogue";
import SectionLoading from "@/components/loading/SectionLoading";
// Data
import { defaultTemplateStudent } from "@/data";
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

const IndividualProfile: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const loadingStudent = useAppSelector(selectLoadingStudent);
  const loadingTeacher = useAppSelector(selectLoadingTeacher);
  const loadingAdmin = useAppSelector(selectLoadingAdmin);

  const profile = useAppSelector(selectProfile);

  const [userShown, setUserShown] = useState<Admin | Teacher | Student>(
    defaultTemplateStudent as Student
  );
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

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
      router.query?.userID ? (router.query?.userId as string) : ""
    )
  );

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
  }, [router.query, loadingTeacher, loadingStudent, loadingAdmin]);

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
        <HomeTitle
          title={`Profilul lui ${userShown?.fullname} de ${userShown?.role}`}
          quote={`Vezi profilul lui ${userShown?.fullname}.`}
          backgroundUrl="https://res.cloudinary.com/birthdayreminder/image/upload/v1686504536/Highschool%20Site%20App/nightschool2_zoolin.jpg"
        />
        <ProfileDashboard
          profile={userShown as Teacher | Admin | Student}
          type="read"
        />
        {userShown?.role === "ELEV" && profile?.role !== "ELEV" && (
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
