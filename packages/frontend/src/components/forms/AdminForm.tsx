// React
import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
// Types
import { FormStepProps } from "types";
// React Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// SCSS
import accountsFormStyles from "../../scss/components/others/AccountsForm.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createAdmin,
  createCloudinaryImageForAdmin,
  selectLoadingCreateCloudinaryImageForAdmin,
  selectTemplateAdmin,
  updateTemplateAdmin,
} from "@/redux/slices/adminsSlice";
import {
  loginUser,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
// Components
import FormModal from "../modals/FormModal";
import useFormTransition from "@/hooks/useFormTransition";

const AdminForm: FC<FormStepProps> = ({ pageType }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const adminFormRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const formButtonMessage =
    pageType === "login" ? "Intrați în cont" : "Creați un cont";

  const loadingCreateCloudinaryImageForAdmin = useAppSelector(
    selectLoadingCreateCloudinaryImageForAdmin
  );
  const templateAdmin = useAppSelector(selectTemplateAdmin);

  const onUsernameChange = (username: string) => {
    dispatch(updateTemplateAdmin({ key: "username", value: username }));
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
    if (pageType === "signup") {
      dispatch(
        setScreenLoadingMessage(
          "Încercăm să creăm un admin, vă rugăm să așteptați..."
        )
      );
      dispatch(createAdmin(templateAdmin));
    } else {
      dispatch(
        setScreenLoadingMessage(
          "Încercăm să intrăm în contul tău, vă rugăm să așteptați..."
        )
      );
      dispatch(loginUser(templateAdmin));
    }
  };

  useFormTransition(adminFormRef);

  return (
    <form
      className={accountsFormStyles.accountsFormContainer__form}
      onSubmit={(e) => handleSubmitAdmin(e)}
      ref={adminFormRef}
    >
      <FormModal type={pageType === "login" ? "general" : "admins"} />
      <div className={accountsFormStyles.accountsFormContainer__content}>
        <div className={accountsFormStyles.accountsFormContainer__textControl}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            required
            placeholder="ex: Irina Ionescu"
            value={templateAdmin.username}
            onChange={(e) => onUsernameChange(e.target.value)}
          />
        </div>
        <div className={accountsFormStyles.accountsFormContainer__textControl}>
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
        <div className={accountsFormStyles.accountsFormContainer__passControl}>
          <label htmlFor="pass">Parola:</label>
          <div
            className={
              accountsFormStyles.accountsFormContainer__passControlInput
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
        {pageType === "signup" && (
          <div
            className={accountsFormStyles.accountsFormContainer__imageControl}
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
        )}
      </div>
      <button
        type="submit"
        className={accountsFormStyles.accountsFormContainer__formButton}
        disabled={loadingCreateCloudinaryImageForAdmin === "PENDING"}
      >
        {loadingCreateCloudinaryImageForAdmin === "PENDING"
          ? "Se încarcă imaginea..."
          : formButtonMessage}
      </button>
    </form>
  );
};

export default AdminForm;
