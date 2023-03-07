// React
import { FC, useState, SyntheticEvent } from "react";
// Redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  selectTemplateProfile,
  updateTemplateProfile,
  updateProfile,
} from "@/redux/slices/generalSlice";
// Components
import FormModal from "../FormModal";
// SCSS
import profileStyles from "../../scss/components/Profile.module.scss";

const ProfileSettings: FC = () => {
  const templateProfile = useAppSelector(selectTemplateProfile);
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleUsernameChange = (username: string) => {
    dispatch(updateTemplateProfile({ key: "username", value: username }));
  };

  const handleEmailChange = (email: string) => {
    dispatch(updateTemplateProfile({ key: "email", value: email }));
  };

  const handlePasswordChange = (password: string) => {
    dispatch(updateTemplateProfile({ key: "password", value: password }));
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(updateProfile(templateProfile));
  };
  return (
    <form
      className={profileStyles.profileContainer__settings}
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <FormModal type='general' />
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor='username'>Change Username:</label>
        <input
          type='text'
          name='username'
          id='username'
          value={templateProfile.username}
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor='email'>Change Email:</label>
        <input
          type='email'
          name='email'
          id='email'
          value={templateProfile.email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor='password'>Change Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          name='password'
          id='password'
          placeholder='ex: testing'
          value={templateProfile.password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
      </div>
      <button type='submit'>Updateaza profilul</button>
    </form>
  );
};

export default ProfileSettings;
