// React
import { FC, SyntheticEvent, useRef, useState } from "react";
// Types
import { FormStepProps } from "types";
// React Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
// SCSS
import accountsFormStyles from "../../scss/components/others/AccountsForm.module.scss";
// Data
import { possibleClassLabels, typeNavOptions } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setScreenLoadingMessage,
  loginUser,
} from "@/redux/slices/generalSlice";
import {
  selectLoadingCreateCloudinaryImageForTeacher,
  selectTemplateTeacher,
  updateTemplateTeacher,
  createCloudinaryImageForTeacher,
  createTeacher,
} from "@/redux/slices/teachersSlice";
// Components
import FormModal from "../modals/FormModal";
// Hooks
import useFormTransition from "@/hooks/useFormTransition";

const TeacherForm: FC<FormStepProps> = ({ step, pageType, setCurrentStep }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const teacherFormRef1 = useRef<HTMLFormElement>(null);
  const teacherFormRef2 = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const foundCurrentTypeStepsLength = typeNavOptions.find(
    (option) => option.label === "PROFESOR"
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

  const loadingCreateCloudinaryImageForTeacher = useAppSelector(
    selectLoadingCreateCloudinaryImageForTeacher
  );
  const templateTeacher = useAppSelector(selectTemplateTeacher);

  const onUsernameChange = (username: string) => {
    dispatch(updateTemplateTeacher({ key: "username", value: username }));
  };

  const onEmailChange = (email: string) => {
    dispatch(updateTemplateTeacher({ key: "email", value: email }));
  };

  const onPasswordChange = (pass: string) => {
    dispatch(updateTemplateTeacher({ key: "password", value: pass }));
  };

  const onDescriptionChange = (description: string) => {
    dispatch(updateTemplateTeacher({ key: "description", value: description }));
  };

  const onMasterTeacherChange = () => {
    dispatch(
      updateTemplateTeacher({ key: "master", value: !templateTeacher.master })
    );
  };

  const onMasterClassLabelChange = (label: string) => {
    dispatch(
      updateTemplateTeacher({ key: "master_class_label", value: label })
    );
  };

  const handleProfileImageChange = (image: File | string) => {
    dispatch(createCloudinaryImageForTeacher(image as File));
  };

  const handleSubmitTeacher = (e: SyntheticEvent) => {
    e.preventDefault();
    if (pageType === "signup" && !formStepIsNotFinal) {
      dispatch(
        setScreenLoadingMessage(
          "Încercăm să creăm un profesor, vă rugăm să așteptați..."
        )
      );
      dispatch(createTeacher(templateTeacher));
    } else {
      dispatch(
        setScreenLoadingMessage(
          "Încercăm să intrăm în contul tău, vă rugăm să așteptați..."
        )
      );
      dispatch(loginUser(templateTeacher));
    }
  };

  useFormTransition(teacherFormRef1);
  useFormTransition(teacherFormRef2);

  if (step === 1) {
    return (
      <form
        className={accountsFormStyles.accountsFormContainer__form}
        onSubmit={(e) => handleSubmitTeacher(e)}
        ref={teacherFormRef1}
      >
        <FormModal type={pageType === "login" ? "general" : "teachers"} />
        <div className={accountsFormStyles.accountsFormContainer__content}>
          <div
            className={accountsFormStyles.accountsFormContainer__textControl}
          >
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              required
              placeholder="ex: Irina Ionescu"
              value={templateTeacher.username}
              onChange={(e) => onUsernameChange(e.target.value)}
            />
          </div>
          <div
            className={accountsFormStyles.accountsFormContainer__textControl}
          >
            <label htmlFor="email">Email:</label>
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
            className={accountsFormStyles.accountsFormContainer__passControl}
          >
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
        <div
          className={accountsFormStyles.accountsFormContainer__buttonsContainer}
        >
          <button
            type={pageType === "login" ? "submit" : "button"}
            className={accountsFormStyles.accountsFormContainer__formButton}
            disabled={loadingCreateCloudinaryImageForTeacher === "PENDING"}
            onClick={() => {
              if (formStepIsNotFinal) {
                setCurrentStep((step) => step + 1);
              }
            }}
          >
            {loadingCreateCloudinaryImageForTeacher === "PENDING"
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
      </form>
    );
  }

  if (step === 2 && pageType === "signup") {
    return (
      <form
        className={accountsFormStyles.accountsFormContainer__form}
        ref={teacherFormRef2}
      >
        <FormModal type="teachers" />
        <div className={accountsFormStyles.accountsFormContainer__content}>
          <div
            className={
              accountsFormStyles.accountsFormContainer__textAreaControl
            }
          >
            <label htmlFor="description">Descriere: </label>
            <textarea
              id="description"
              required
              value={templateTeacher.description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>
          <div
            className={
              accountsFormStyles.accountsFormContainer__checkboxControl
            }
          >
            <label htmlFor="master">Sunteți diriginte?</label>
            <input
              type="checkbox"
              id="master"
              required
              checked={templateTeacher.master}
              onChange={() => onMasterTeacherChange()}
            />
          </div>
          {templateTeacher.master && (
            <div
              className={
                accountsFormStyles.accountsFormContainer__selectControl
              }
            >
              <label htmlFor="master-class">
                La ce clasa sunteți diriginte?
              </label>
              <select
                name="master-class"
                id="master-class"
                value={templateTeacher.master_class_label as string}
                onChange={(e) => onMasterClassLabelChange(e.target.value)}
              >
                {possibleClassLabels?.map((option) => {
                  return (
                    <option key={option.id} value={option.label}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
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
            onClick={(e) => handleSubmitTeacher(e)}
          >
            Creați un cont
          </button>
        </div>
      </form>
    );
  }
  return <></>;
};

export default TeacherForm;
