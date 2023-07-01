// React
import { FC } from "react";
// Types
import { Admin, Student, Teacher } from "@prisma/client";
import { ProfileOption } from "types";
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
// Data
import {
  profileOptionsAdmin,
  profileOptionsStudent,
  profileOptionsTeacher,
} from "@/data";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";
// Components
import ProfileDashboard from "@/components/profile/ProfileDashboard";
import ProfileStudentCatalogue from "@/components/profile/ProfileStudentCatalogue";

const Profile: FC = () => {
  useGetPathname();
  useAuthorization();

  const profile = useAppSelector(selectProfile) as Admin | Student | Teacher;

  console.log(profile);

  let profileOptionsShown: ProfileOption[];
  switch (profile.role) {
    case "ADMIN":
      profileOptionsShown = profileOptionsAdmin;
      break;
    case "ELEV":
      profileOptionsShown = profileOptionsStudent;
      break;
    case "PROFESOR":
      profileOptionsShown = profileOptionsTeacher;
      break;
    default:
      profileOptionsShown = [];
      break;
  }

  return (
    <>
      <Meta
        title='Liceul Teoretic "Ion Barbu" Pitești - Profilul Tău'
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504536/Highschool%20Site%20App/nightschool2_zoolin.jpg",
        ]}
      />
      <main className={profileStyles.profileContainer}>
        <Overlay />
        <HomeTitle
          title={`Profilul Tău de ${profile.role}`}
          // make this based on account type as well
          quote="Creează anunțuri/profesori,ieși din cont..."
        />
        <ProfileDashboard />
        {profile.role === "ELEV" && <ProfileStudentCatalogue />}
      </main>
    </>
  );
};
export default Profile;
