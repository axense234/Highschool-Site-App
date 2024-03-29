// React
import { FC, SyntheticEvent, useEffect, useState } from "react";
// React Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
// Types
import TemplateTeacher from "@/core/interfaces/template/TemplateTeacher";
// SCSS
import profileSettingsStyles from "../../scss/components/profile/ProfileSettingsForm.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImageForTeacher,
  selectLoadingCreateCloudinaryImageForTeacher,
  selectTemplateTeacher,
  setTemplateTeacher,
  updateTeacherById,
  updateTemplateTeacher,
} from "@/redux/slices/teachersSlice";
import {
  selectProfile,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
// Components
import FormModal from "../modals/FormModal";
// Interfaces
import TemplateUpdateTeacher from "@/core/interfaces/template/TemplateUpdateTeacher";

const UpdateTeacherForm: FC = () => {
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const profile = useAppSelector(selectProfile);

  const loadingCreateCloudinaryImageForTeacher = useAppSelector(
    selectLoadingCreateCloudinaryImageForTeacher
  );
  const templateTeacher = useAppSelector(selectTemplateTeacher);

  const onFullnameChange = (fullname: string) => {
    dispatch(updateTemplateTeacher({ key: "fullname", value: fullname }));
  };

  const onEmailChange = (email: string) => {
    dispatch(updateTemplateTeacher({ key: "email", value: email }));
  };

  const onPasswordChange = (pass: string) => {
    dispatch(updateTemplateTeacher({ key: "password", value: pass }));
  };

  const handleProfileImageChange = (image: File | string) => {
    dispatch(createCloudinaryImageForTeacher(image as File));
  };

  const handleSubmitTeacher = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      setScreenLoadingMessage(
        "Încercăm să actualizăm contul tău, vă rugăm să așteptați..."
      )
    );
    dispatch(updateTeacherById(templateTeacher as TemplateUpdateTeacher));
  };

  useEffect(() => {
    if (profile.email) {
      dispatch(
        setTemplateTeacher({
          ...(profile as TemplateTeacher),
          password: "PAROLA",
        })
      );
    }
  }, []);

  return (
    <form
      className={profileSettingsStyles.profileSettingsContainer__form}
      onSubmit={(e) => handleSubmitTeacher(e)}
    >
      <FormModal type="teachers" />
      <div className={profileSettingsStyles.profileSettingsContainer__content}>
        <div
          className={
            profileSettingsStyles.profileSettingsContainer__textControl
          }
        >
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__controlLabel
            }
          >
            <BsFillPersonFill />
            <label htmlFor="fullname">Nume Complet: </label>
          </div>
          <input
            type="text"
            id="fullname"
            required
            placeholder="ex: Irina Ionescu"
            value={templateTeacher.fullname}
            onChange={(e) => onFullnameChange(e.target.value)}
          />
        </div>
        <div
          className={
            profileSettingsStyles.profileSettingsContainer__textControl
          }
        >
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__controlLabel
            }
          >
            <MdAttachEmail />
            <label htmlFor="email">Email:</label>
          </div>
          <input
            type="email"
            id="email"
            required
            placeholder="ex: irina@gmail.com"
            value={templateTeacher.email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
        <div
          className={
            profileSettingsStyles.profileSettingsContainer__passControl
          }
        >
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__controlLabel
            }
          >
            <RiLockPasswordFill />
            <label htmlFor="pass">Parola:</label>
          </div>
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
              value={templateTeacher.password}
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
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__controlLabel
            }
          >
            <RxAvatar />
            <label htmlFor="img">Imagine de Profil(*):</label>
          </div>
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
        disabled={loadingCreateCloudinaryImageForTeacher === "PENDING"}
      >
        {loadingCreateCloudinaryImageForTeacher === "PENDING"
          ? "Se încarcă imaginea..."
          : "Actualizeaza-ti profilul"}
      </button>
    </form>
  );
};

export default UpdateTeacherForm;
