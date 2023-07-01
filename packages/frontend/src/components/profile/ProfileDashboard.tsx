// React
import { FC } from "react";
// Types
import { Admin, Student, Teacher } from "@prisma/client";
import { ProfileOption } from "types";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Components
import SectionLoading from "../loading/SectionLoading";
import ProfileContent from "./ProfileContent";
import ProfileDetails from "./ProfileDetails";
// Data
import {
  profileOptionsAdmin,
  profileOptionsStudent,
  profileOptionsTeacher,
} from "@/data";
// Redux
import {
  updateOverlay,
  setOptionsContent,
  selectLoadingProfile,
  selectOptionsContent,
  selectProfile,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const ProfileDashboard: FC = () => {
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
  );
};

export default ProfileDashboard;
