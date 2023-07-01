// React
import { FC } from "react";
// Types
import { Admin, Student, Teacher } from "@prisma/client";
import { TemplateUser } from "types";
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

  let profileTitleQuote = "Așteptați vă rog...";
  switch (profile.role) {
    case "ADMIN":
      profileTitleQuote = "Creați clase, anunțuri...";
      break;

    case "ELEV":
      profileTitleQuote = "Vedeți clasa și realizările dumneavoastră...";
      break;

    case "PROFESOR":
      profileTitleQuote = "Vedeți clasele la care predați, creați anunțuri...";
      break;

    default:
      break;
  }

  return (
    <>
      <Meta
        title='Profilul Tău | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Gestionează-ți informațiile personale și personalizează-ți experiența! Adaugă și actualizează preferințele tale în profilul tău pentru a te bucura de conținut și oferte relevante."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504536/Highschool%20Site%20App/nightschool2_zoolin.jpg",
        ]}
      />
      <main className={profileStyles.profileContainer}>
        <Overlay />
        <HomeTitle
          title={`Profilul Tău de ${profile.role}`}
          quote={profileTitleQuote}
        />
        <ProfileDashboard
          profile={profile as Admin | Student | Teacher}
          type="profile"
        />
        {profile.role === "ELEV" && (
          <ProfileStudentCatalogue profile={profile as TemplateUser} />
        )}
      </main>
    </>
  );
};
export default Profile;
