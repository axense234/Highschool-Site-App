// React
import { FC, useEffect, useState } from "react";
// Components
import Meta from "@/components/Meta";
// SCSS
import profileStyles from "../scss/components/Profile.module.scss";
// Data
import {
  defaultTemplateAnnouncement,
  defaultTemplateTeacher,
  profileOptions,
} from "@/data";
// Components
import SectionLoading from "@/components/SectionLoading";
import HomeTitle from "@/components/Home/HomeTitle";
import Overlay from "@/components/Overlay";
import ProfileSettings from "@/components/Profile/ProfileSettings";
import ProfileCreateAnnouncement from "@/components/Profile/ProfileCreateAnnouncement";
import ProfileCreateTeacher from "@/components/Profile/ProfileCreateTeacher";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectLoadingProfile,
  selectOptionsContent,
  selectProfile,
  setOptionsContent,
  updateOverlay,
} from "@/redux/slices/generalSlice";
import { setTemplateAnnouncement } from "@/redux/slices/announcementsSlice";
import { setTemplateTeacher } from "@/redux/slices/teachersSlice";

const Profile: FC = () => {
  const profile = useAppSelector(selectProfile);
  const loadingProfile = useAppSelector(selectLoadingProfile);
  const dispatch = useAppDispatch();

  const optionsContent = useAppSelector(selectOptionsContent);

  let renderedOptionsContent;

  switch (optionsContent) {
    case "settings":
      renderedOptionsContent = <ProfileSettings />;
      break;
    case "logout":
      renderedOptionsContent = <ProfileSettings />;
      break;
    case "createAnnouncement":
      renderedOptionsContent = <ProfileCreateAnnouncement />;
      break;
    case "createTeacher":
      renderedOptionsContent = <ProfileCreateTeacher />;
      break;
    default:
      throw new Error("nu am caz pentru optionsContent");
  }

  useEffect(() => {
    dispatch(setTemplateAnnouncement(defaultTemplateAnnouncement));
    dispatch(setTemplateTeacher(defaultTemplateTeacher));
  }, []);

  return (
    <>
      <Meta title='Liceul Teoretic "Vasile Barbu" Pitești - Profilul Tău' />
      <main className={profileStyles.profileContainer}>
        <HomeTitle
          title='Profilul Tău(ADMIN)'
          quote='Creează anunțuri/profesori,ieși din cont...'
        />
        <Overlay title='Ești sigur că vrei să ieși din cont?' />
        <div className={profileStyles.profileContainer__content}>
          {loadingProfile === "IDLE" || loadingProfile === "PENDING" ? (
            <SectionLoading padding='12.5rem 5rem' />
          ) : (
            <div className={profileStyles.profileContainer__wrapper}>
              <section
                className={profileStyles.profileContainer__profileDetails}
              >
                <h2>Detalii ale Profilului</h2>
                <p>Username: {profile.username}</p>
                <p>Email: {profile.email}</p>
              </section>
              <hr />
              <section
                className={profileStyles.profileContainer__profileContent}
              >
                <nav className={profileStyles.profileContainer__options}>
                  {profileOptions.map((option) => {
                    if (option.label === "Ieși din Cont") {
                      return (
                        <button
                          type='button'
                          key={option.id}
                          onClick={() =>
                            dispatch(
                              updateOverlay({
                                overlayFunctionUsed: "logout",
                                showOverlay: true,
                              })
                            )
                          }
                        >
                          {option.label}
                        </button>
                      );
                    }
                    return (
                      <button
                        type='button'
                        key={option.id}
                        onClick={() =>
                          dispatch(setOptionsContent(option.content))
                        }
                        className={`${
                          optionsContent === option.content &&
                          "activeProfileOption"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </nav>
                <div className={profileStyles.profileContainer__optionsContent}>
                  {renderedOptionsContent}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default Profile;
