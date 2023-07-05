// React
import { FC } from "react";
// SCSS
import profileSettingsStyles from "../../scss/components/profile/ProfileSettingsForm.module.scss";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";
// Components
import UpdateAdminForm from "../forms/UpdateAdminForm";
import UpdateStudentForm from "../forms/UpdateStudentForm";
import UpdateTeacherForm from "../forms/UpdateTeacherForm";

const ProfileSettingsForm: FC = () => {
  const { role: userType } = useAppSelector(selectProfile);

  if (userType === "ADMIN") {
    return (
      <div className={profileSettingsStyles.profileSettingsContainer}>
        <UpdateAdminForm />
      </div>
    );
  }

  if (userType === "ELEV") {
    return (
      <div className={profileSettingsStyles.profileSettingsContainer}>
        <UpdateStudentForm />
      </div>
    );
  }

  if (userType === "PROFESOR") {
    return (
      <div className={profileSettingsStyles.profileSettingsContainer}>
        <UpdateTeacherForm />
      </div>
    );
  }

  return <p>nu se stie</p>;
};

export default ProfileSettingsForm;
