// React
import { FC, SyntheticEvent, useState } from "react";
// Next
import Link from "next/link";
// React Icons
import { GrNext, GrPrevious } from "react-icons/gr";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiKey } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
// Types
import FormStepProps from "@/core/interfaces/component/FormStepProps";
import TemplateUser from "@/core/interfaces/template/TemplateUser";
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
// Data
import { typeNavOptions } from "@/data";

const AdminForm: FC<FormStepProps> = ({
  pageType,
  setCurrentType,
  step,
  setCurrentStep,
}) => {
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [accountCode, setAccountCode] = useState<string>("");

  const foundCurrentTypeStepsLength = typeNavOptions.find(
    (option) => option.label === "ELEV"
  )?.steps?.length;

  const formStepIsNotFinal =
    pageType === "signup" && (foundCurrentTypeStepsLength as number) > step;

  const formButtonMessageWithStepsConsideration = formStepIsNotFinal
    ? "Următorul pas"
    : "Creați un cont";

  const formButtonMessage =
    pageType === "login"
      ? "Intrați în cont"
      : formButtonMessageWithStepsConsideration;
  const loadingCreateCloudinaryImageForAdmin = useAppSelector(
    selectLoadingCreateCloudinaryImageForAdmin
  );
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
    if (pageType === "signup") {
      dispatch(
        setScreenLoadingMessage(
          "Încercăm să creăm un admin, vă rugăm să așteptați..."
        )
      );
      dispatch(createAdmin({ ...templateAdmin, accountCode }));
    } else {
      dispatch(
        setScreenLoadingMessage(
          "Încercăm să intrăm în contul tău, vă rugăm să așteptați..."
        )
      );
      dispatch(loginUser(templateAdmin as TemplateUser));
    }
  };

  if (step === 1) {
    return (
      <form
        className={`${accountsFormStyles.accountsFormContainer__form}`}
        onSubmit={(e) => handleSubmitAdmin(e)}
      >
        <FormModal type={pageType === "login" ? "general" : "admins"} />
        <div className={accountsFormStyles.accountsFormContainer__content}>
          {pageType === "signup" && (
            <>
              <div
                className={
                  accountsFormStyles.accountsFormContainer__textControl
                }
              >
                <div
                  className={
                    accountsFormStyles.accountsFormContainer__controlLabel
                  }
                >
                  <BiKey />
                  <label htmlFor="code">Cod: </label>
                </div>
                <input
                  type="text"
                  id="code"
                  required
                  minLength={1}
                  maxLength={20}
                  placeholder="ex: B6daw82ad_8awd8"
                  value={accountCode}
                  onChange={(e) => setAccountCode(e.target.value)}
                />
              </div>
              <div
                className={
                  accountsFormStyles.accountsFormContainer__textControl
                }
              >
                <div
                  className={
                    accountsFormStyles.accountsFormContainer__controlLabel
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
                  value={templateAdmin.fullname}
                  onChange={(e) => onFullnameChange(e.target.value)}
                />
              </div>
            </>
          )}
          <div
            className={accountsFormStyles.accountsFormContainer__textControl}
          >
            <div
              className={accountsFormStyles.accountsFormContainer__controlLabel}
            >
              <MdAttachEmail />
              <label htmlFor="email">Email:</label>
            </div>
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
            className={accountsFormStyles.accountsFormContainer__passControl}
          >
            <div
              className={accountsFormStyles.accountsFormContainer__controlLabel}
            >
              <RiLockPasswordFill />
              <label htmlFor="pass">Parola:</label>
            </div>
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
        </div>
        <div
          className={accountsFormStyles.accountsFormContainer__buttonsContainer}
        >
          <button
            type={pageType === "login" ? "submit" : "button"}
            className={accountsFormStyles.accountsFormContainer__formButton}
            disabled={loadingCreateCloudinaryImageForAdmin === "PENDING"}
            onClick={() => {
              if (formStepIsNotFinal) {
                setCurrentStep((step) => step + 1);
              }
            }}
          >
            {loadingCreateCloudinaryImageForAdmin === "PENDING"
              ? "Se încarcă imaginea..."
              : formButtonMessage}
          </button>
          {pageType === "signup" && (
            <GrNext
              title="Următorul"
              aria-label="Următorul"
              onClick={() => setCurrentStep((step) => step + 1)}
              className={accountsFormStyles.accountsFormContainer__nextButton}
            />
          )}
        </div>
        <div
          className={accountsFormStyles.accountsFormContainer__linksContainer}
        >
          <Link href={pageType === "login" ? "/signup" : "/login"}>
            {pageType === "login"
              ? "Nu aveți un cont? Creați unul aici!"
              : "Aveți un cont? Intrați în el aici!"}
          </Link>
          {pageType === "login" && (
            <button
              type="button"
              onClick={() => setCurrentType("PAROLA UITATA")}
            >
              Am uitat parola contului.
            </button>
          )}
        </div>
      </form>
    );
  }

  if (step === 2 && pageType === "signup") {
    return (
      <form
        className={`${accountsFormStyles.accountsFormContainer__form}`}
        onSubmit={(e) => handleSubmitAdmin(e)}
      >
        <FormModal type="admins" />
        <div className={accountsFormStyles.accountsFormContainer__content}>
          <div
            className={accountsFormStyles.accountsFormContainer__imageControl}
          >
            <div
              className={accountsFormStyles.accountsFormContainer__controlLabel}
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
        <div
          className={accountsFormStyles.accountsFormContainer__buttonsContainer}
        >
          <GrPrevious
            title="Înapoi"
            aria-label="Înapoi"
            onClick={() => setCurrentStep((step) => step - 1)}
            className={accountsFormStyles.accountsFormContainer__prevButton}
          />
          <button
            type="submit"
            className={accountsFormStyles.accountsFormContainer__formButton}
            onClick={(e) => handleSubmitAdmin(e)}
          >
            Creați un cont
          </button>
        </div>
        <div
          className={accountsFormStyles.accountsFormContainer__linksContainer}
        >
          <Link href="/login">Aveți un cont? Intrați în el aici!</Link>
        </div>
      </form>
    );
  }

  return null;
};

export default AdminForm;
