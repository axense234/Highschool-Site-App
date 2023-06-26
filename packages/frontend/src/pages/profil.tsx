// React
import { FC } from "react";
// Next
import Image from "next/image";
// Types
import { Admin, Student, Teacher } from "@prisma/client";
// Components
import Meta from "@/components/others/Meta";
// SCSS
import profileStyles from "../scss/components/pages/Profile.module.scss";
// Components
import HomeTitle from "@/components/home/HomeTitle";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
import useAuthorization from "@/hooks/useAuthorization";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";

const Profile: FC = () => {
  useGetPathname();
  useAuthorization();
  const profile = useAppSelector(selectProfile) as Admin | Student | Teacher;

  return (
    <>
      <Meta
        title='Liceul Teoretic "Ion Barbu" Pitești - Profilul Tău'
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504536/Highschool%20Site%20App/nightschool2_zoolin.jpg",
        ]}
      />
      <main className={profileStyles.profileContainer}>
        <HomeTitle
          title={`Profilul Tău de ${profile.role}`}
          // make this based on account type as well
          quote="Creează anunțuri/profesori,ieși din cont..."
        />
        <section className={profileStyles.profileContainer__profile}>
          <div className={profileStyles.profileContainer__profileDetails}>
            <Image
              width={500}
              height={500}
              alt={profile.fullname}
              src={profile.profile_img_url}
            />
            <h3>{profile.fullname}</h3>
            <h4>{profile.role}</h4>
            <p>@{profile.email}</p>
          </div>
          <div className={profileStyles.profileContainer__profileHub}>
            <nav className={profileStyles.profileContainer__profileOptions}>
              <ul>{/*  */}</ul>
            </nav>
            <div className={profileStyles.profileContainer__profileContent}>
              {/*  */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Profile;
