// React
import { FC, useEffect } from "react";
// Next
import Link from "next/link";
// Types
import { ProfileDashboardProps, ProfileOption } from "types";
import { Student } from "@prisma/client";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Components
import ProfileContent from "./ProfileContent";
import ProfileDetails from "./ProfileDetails";
// Data
import {
  profileOptionsAdmin,
  profileOptionsAdminRead,
  profileOptionsStudent,
  profileOptionsStudentRead,
  profileOptionsTeacher,
  profileOptionsTeacherRead,
} from "@/data";
// Redux
import {
  updateOverlay,
  setOptionsContent,
  selectOptionsContent,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const ProfileDashboard: FC<ProfileDashboardProps> = ({ profile, type }) => {
  const dispatch = useAppDispatch();
  const optionsContent = useAppSelector(selectOptionsContent);

  let profileOptionsShown: ProfileOption[];
  switch (profile?.role) {
    case "ADMIN":
      if (type === "read") {
        profileOptionsShown = profileOptionsAdminRead;
      } else {
        profileOptionsShown = profileOptionsAdmin;
      }
      break;
    case "ELEV":
      if (type === "read") {
        profileOptionsShown = profileOptionsStudentRead;
      } else {
        profileOptionsShown = profileOptionsStudent;
      }
      break;
    case "PROFESOR":
      if (type === "read") {
        profileOptionsShown = profileOptionsTeacherRead;
      } else {
        profileOptionsShown = profileOptionsTeacher;
      }
      break;
    default:
      profileOptionsShown = [];
      break;
  }

  return (
    <section className={profileStyles.profileContainer__profile}>
      <ProfileDetails profile={profile} />
      <div className={profileStyles.profileContainer__profileHub}>
        <nav className={profileStyles.profileContainer__profileOptions}>
          <ul>
            {profileOptionsShown.map((option) => {
              console.log((profile as Student).class_label);
              if (
                option.content === "viewStudentClassroom" &&
                (profile as Student).class_label
              ) {
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
                  >
                    <Link href={`/clase/${(profile as Student).class_uid}`}>
                      {option.label}
                    </Link>
                  </li>
                );
              }

              if (
                option.content === "viewStudentClassroom" &&
                !(profile as Student).class_label
              ) {
                return null;
              }

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
                          title: "Sunteți sigur că vreți să ieșiți din cont?",
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
                      optionsContent === option.content ? "#90ee90" : "#adadad",
                  }}
                  onClick={() => dispatch(setOptionsContent(option.content))}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </nav>
        <ProfileContent
          optionType={optionsContent}
          profileId={profile.id}
          type={type === "read" ? "user" : "own"}
        />
      </div>
    </section>
  );
};
export default ProfileDashboard;
