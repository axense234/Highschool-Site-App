// React
import { FC, useEffect } from "react";
// Next
import { useRouter } from "next/router";
// Types
import { Admin, Student, Teacher } from "@prisma/client";
import { ProfileOption, TemplateStudent, TemplateUser } from "types";
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

const IndividualProfile: FC = () => {
  useGetPathname();
  useAuthorization();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const loadingStudent = useAppSelector(selectLoadingStudent);
  const loadingTeacher = useAppSelector(selectLoadingTeacher);
  const loadingAdmin = useAppSelector(selectLoadingAdmin);

  console.log(router.query);

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

  let user;
  let loadingUser = true;
  switch (router.query.type) {
    case "teacher":
      user = teacher;
      loadingUser = loadingTeacher === "IDLE" || loadingTeacher === "PENDING";
      break;
    case "student":
      user = student;
      loadingUser = loadingStudent === "IDLE" || loadingStudent === "PENDING";
      break;
    case "admin":
      user = admin;
      loadingUser = loadingAdmin === "IDLE" || loadingAdmin === "PENDING";
      break;
    default:
      user = {};
      loadingUser = true;
      break;
  }

  useEffect(() => {
    if (
      router.query.type === "admin" &&
      loadingAdmin === "IDLE" &&
      router.query.userId
    ) {
      dispatch(getAdminById(router.query.userId as string));
    } else if (
      router.query.type === "student" &&
      loadingStudent === "IDLE" &&
      router.query.userId
    ) {
      dispatch(getStudentById(router.query.userId as string));
    } else if (
      router.query.type === "teacher" &&
      loadingTeacher === "IDLE" &&
      router.query.userId
    ) {
      dispatch(getTeacherById(router.query.userId as string));
    }
  }, [router.query]);

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
        title={`${user?.fullname} | Liceul Teoretic "Ion Barbu" Pitești`}
        desc="Gestionează-ți informațiile personale și personalizează-ți experiența! Adaugă și actualizează preferințele tale în profilul tău pentru a te bucura de conținut și oferte relevante."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504536/Highschool%20Site%20App/nightschool2_zoolin.jpg",
        ]}
      />
      <main className={profileStyles.profileContainer}>
        <Overlay />
        <HomeTitle
          title={`Profilul lui ${user?.fullname} de ${user?.role}`}
          quote={`Vezi profilul lui ${user?.fullname}.`}
          backgroundUrl="https://res.cloudinary.com/birthdayreminder/image/upload/v1686504536/Highschool%20Site%20App/nightschool2_zoolin.jpg"
        />
        <ProfileDashboard
          profile={user as Teacher | Admin | Student}
          type="read"
        />
        {user?.role === "ELEV" && (
          <ProfileStudentCatalogue profile={user as TemplateUser} />
        )}
      </main>
    </>
  );
};
export default IndividualProfile;
