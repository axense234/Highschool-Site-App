// React
import { FC } from "react";
// Types
import { ProfileContentProps } from "types";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Components
import ProfileSettingsForm from "./ProfileSettingsForm";

const ProfileContent: FC<ProfileContentProps> = ({ optionType }) => {
  if (optionType === "settings") {
    return (
      <div className={profileStyles.profileContainer__profileContent}>
        <ProfileSettingsForm />
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
