// React
import { FC, SyntheticEvent, useState } from "react";
// Components
import Meta from "@/components/Meta";
// SCSS
import profileStyles from "../scss/components/Profile.module.scss";
// Data
import { profileOptions } from "@/data";
// Components
import SectionLoading from "@/components/SectionLoading";
import HomeTitle from "@/components/Home/HomeTitle";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectLoadingProfile,
  selectProfile,
  selectTemplateProfile,
  updateProfile,
  updateTemplateProfile,
} from "@/redux/slices/generalSlice";
import FormModal from "@/components/FormModal";
import Overlay from "@/components/Overlay";

const Profile: FC = () => {
  const profile = useAppSelector(selectProfile);
  const loadingProfile = useAppSelector(selectLoadingProfile);

  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  return (
    <>
      <Meta title='Liceul Teoretic "Vasile Barbu" Pitesti - Profilul Tau' />
      <main className={profileStyles.profileContainer}>
        <HomeTitle title='Profilul Tau(ADMIN)' quote='Smecherie pe felie.' />
        <Overlay
          title='Esti sigur ca vrei sa iesi din cont?'
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
        />
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
                    if (option.label === "Iesi din Cont") {
                      return (
                        <button
                          type='button'
                          key={option.id}
                          onClick={() => setShowOverlay(true)}
                        >
                          {option.label}
                        </button>
                      );
                    }
                    return (
                      <button type='button' key={option.id}>
                        {option.label}
                      </button>
                    );
                  })}
                </nav>
                <div className={profileStyles.profileContainer__optionsContent}>
                  <ProfileSettings />
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

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
      <FormModal />
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
export default Profile;
