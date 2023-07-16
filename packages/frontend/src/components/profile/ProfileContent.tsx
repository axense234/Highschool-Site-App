// React
import { FC } from "react";
// Types
import ProfileContentProps from "@/core/interfaces/component/ProfileContentProps";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Components
import ProfileSettingsForm from "./ProfileSettingsForm";
import CreateAnnouncementForm from "../forms/CreateAnnouncementForm";
import CreateClassForm from "../forms/CreateClassForm";
import ProfileTeacherClassrooms from "./ProfileTeacherClassrooms";
import CreateBookForm from "../forms/CreateBookForm";

const ProfileContent: FC<ProfileContentProps> = ({
  optionType,
  profileId,
  type,
}) => {
  if (optionType === "settings") {
    return (
      <div className={profileStyles.profileContainer__profileContent}>
        <ProfileSettingsForm />
      </div>
    );
  }

  if (optionType === "createAnnouncement") {
    return (
      <div className={profileStyles.profileContainer__profileContent}>
        <CreateAnnouncementForm />
      </div>
    );
  }

  if (optionType === "createClass") {
    return (
      <div className={profileStyles.profileContainer__profileContent}>
        <CreateClassForm />
      </div>
    );
  }

  if (optionType === "viewTeacherClassrooms") {
    return (
      <div className={profileStyles.profileContainer__profileContent}>
        <ProfileTeacherClassrooms teacherId={profileId} type={type} />
      </div>
    );
  }

  if (optionType === "createBook") {
    return (
      <div className={profileStyles.profileContainer__profileContent}>
        <CreateBookForm />
      </div>
    );
  }

  return (
    <div className={profileStyles.profileContainer__profileContent}>
      {optionType}
    </div>
  );
};

export default ProfileContent;
