// React
import { FC } from "react";
// Next
import Image from "next/image";
// Types
import { Admin, Student, Teacher } from "@prisma/client";
import { ProfileOption } from "types";
// Components
import Meta from "@/components/others/Meta";
// SCSS
import profileStyles from "../scss/components/pages/Profile.module.scss";
// Components
import Overlay from "@/components/others/Overlay";
import HomeTitle from "@/components/home/HomeTitle";
import ProfileContent from "@/components/profile/ProfileContent";
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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectLoadingProfile,
  selectOptionsContent,
  selectProfile,
  setOptionsContent,
  updateOverlay,
} from "@/redux/slices/generalSlice";
import SectionLoading from "@/components/loading/SectionLoading";
import ProfileDetails from "@/components/profile/ProfileDetails";

const Profile: FC = () => {
  useGetPathname();
  useAuthorization();

  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile) as Admin | Student | Teacher;
  const loadingProfile = useAppSelector(selectLoadingProfile);
  const optionsContent = useAppSelector(selectOptionsContent);

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
        <section className={profileStyles.profileContainer__profile}>
          {loadingProfile === "SUCCEDED" ? (
            <>
              <ProfileDetails profile={profile} />
              <div className={profileStyles.profileContainer__profileHub}>
                <nav className={profileStyles.profileContainer__profileOptions}>
                  <ul>
                    {profileOptionsShown.map((option) => {
                      if (option.content === "logout") {
                        return (
                          <li
                            key={option.id}
                            title={option.label}
                            aria-label={option.label}
                            onClick={() =>
                              dispatch(
                                updateOverlay({
                                  overlayFunctionUsed: "logout",
                                  showOverlay: true,
                                  title:
                                    "Sunteți sigur că vreți să ieșiți din cont?",
                                })
                              )
                            }
                          >
                            {option.label}
                          </li>
                        );
                      }
                      return (
                        <li
                          key={option.id}
                          title={option.label}
                          aria-label={option.label}
                          style={{
                            backgroundColor:
                              optionsContent === option.content
                                ? "#90ee90"
                                : "#adadad",
                          }}
                          onClick={() =>
                            dispatch(setOptionsContent(option.content))
                          }
                        >
                          {option.label}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <ProfileContent optionType={optionsContent} />
              </div>
            </>
          ) : (
            <SectionLoading />
          )}
        </section>
      </main>
    </>
  );
};
export default Profile;
