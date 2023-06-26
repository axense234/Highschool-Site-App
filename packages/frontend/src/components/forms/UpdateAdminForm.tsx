// React
import { FC, SyntheticEvent, useEffect, useState } from "react";
// Types
import { TemplateAdmin, TemplateUpdateAdmin } from "types";
import { Admin } from "@prisma/client";
// React Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// SCSS
import profileSettingsStyles from "../../scss/components/profile/ProfileSettingsForm.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImageForAdmin,
  selectLoadingCreateCloudinaryImageForAdmin,
  selectTemplateAdmin,
  setTemplateAdmin,
  updateAdminById,
  updateTemplateAdmin,
} from "@/redux/slices/adminsSlice";
import {
  getUserProfile,
  loginUser,
  selectLoadingProfile,
  selectProfile,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
// Components
import FormModal from "../modals/FormModal";

const UpdateAdminForm: FC = () => {
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const profile = useAppSelector(selectProfile);

  const loadingCreateCloudinaryImageForAdmin = useAppSelector(
    selectLoadingCreateCloudinaryImageForAdmin
  );
  const loadingProfile = useAppSelector(selectLoadingProfile);
  const templateAdmin = useAppSelector(selectTemplateAdmin);

  const onFullnameChange = (fullname: string) => {
    dispatch(updateTemplateAdmin({ key: "fullname", value: fullname }));
  };

  const onEmailChange = (email: string) => {
    dispatch(updateTemplateAdmin({ key: "email", value: email }));
  };

  const onPasswordChange = (pass: string) => {
    dispatch(updateTemplateAdmin({ key: "password", value: pass }));
  };

  const handleProfileImageChange = (image: File | string) => {
    dispatch(createCloudinaryImageForAdmin(image as File));
  };

  const handleSubmitAdmin = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      setScreenLoadingMessage(
        "Încercăm să actualizăm contul tău, vă rugăm să așteptați..."
      )
    );
    dispatch(updateAdminById(templateAdmin as TemplateUpdateAdmin));
  };

  useEffect(() => {
    if (profile.email) {
      dispatch(
        setTemplateAdmin({ ...(profile as TemplateAdmin), password: "PAROLA" })
      );
    }
  }, []);

  return (
    <form
      className={`${profileSettingsStyles.profileSettingsContainer__form}`}
      onSubmit={(e) => handleSubmitAdmin(e)}
    >
      <FormModal type="admins" />
      <div className={profileSettingsStyles.profileSettingsContainer__content}>
        <div
          className={
            profileSettingsStyles.profileSettingsContainer__textControl
          }
        >
          <label htmlFor="fullname">Nume Complet: </label>
          <input
            type="text"
            id="fullname"
            required
            placeholder="ex: Irina Ionescu"
            value={templateAdmin.fullname}
            onChange={(e) => onFullnameChange(e.target.value)}
          />
        </div>
        <div
          className={
            profileSettingsStyles.profileSettingsContainer__textControl
          }
        >
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            placeholder="ex: irina@gmail.com"
            value={templateAdmin.email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
        <div
          className={
            profileSettingsStyles.profileSettingsContainer__passControl
          }
        >
          <label htmlFor="pass">Parola:</label>
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__passControlInput
            }
          >
            <input
              type={showPass ? "text" : "password"}
              id="pass"
              required
              placeholder="ex: irina*4134"
              value={templateAdmin.password}
              onChange={(e) => onPasswordChange(e.target.value)}
            />
            {!showPass ? (
              <AiFillEye
                onClick={() => setShowPass(true)}
                title="Arată parola"
                aria-label="Arată parola"
              />
            ) : (
              <AiFillEyeInvisible
                onClick={() => setShowPass(false)}
                title="Ascunde parola"
                aria-label="Ascunde parola"
              />
            )}
          </div>
        </div>
        <div
          className={
            profileSettingsStyles.profileSettingsContainer__imageControl
          }
        >
          <label htmlFor="img">Imagine de Profil:</label>
          <input
            type="file"
            id="img"
            required={false}
            onChange={(e) => {
              if (e.target.files) {
                handleProfileImageChange(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <button
        type="submit"
        className={profileSettingsStyles.profileSettingsContainer__formButton}
        disabled={loadingCreateCloudinaryImageForAdmin === "PENDING"}
      >
        {loadingCreateCloudinaryImageForAdmin === "PENDING"
          ? "Se încarcă imaginea..."
          : "Actualizeaza-ti profilul"}
      </button>
    </form>
  );
};

export default UpdateAdminForm;
