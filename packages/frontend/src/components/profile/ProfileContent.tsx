// React
import { FC } from "react";
// Types
import { ProfileContentProps } from "types";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Components
import ProfileSettingsForm from "./ProfileSettingsForm";
import CreateAnnouncementForm from "../forms/CreateAnnouncementForm";
import CreateClassForm from "../forms/CreateClassForm";

const ProfileContent: FC<ProfileContentProps> = ({ optionType }) => {
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

  return (
    <div className={profileStyles.profileContainer__profileContent}>
      {optionType}
    </div>
  );
};

export default ProfileContent;
