// React
import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
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
  selectLoadingCreateCloudinaryImageForStudent,
  selectTemplateStudent,
  updateTemplateStudent,
  createCloudinaryImageForStudent,
  createStudent,
} from "@/redux/slices/studentsSlice";
// Components
import FormModal from "../modals/FormModal";
import useFormTransition from "@/hooks/useFormTransition";

const StudentForm: FC<FormStepProps> = ({ step, pageType, setCurrentStep }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const studentFormRef1 = useRef<HTMLFormElement>(null);
  const studentFormRef2 = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

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

  const loadingCreateCloudinaryImageForStudent = useAppSelector(
    selectLoadingCreateCloudinaryImageForStudent
  );
  const templateStudent = useAppSelector(selectTemplateStudent);

  const onUsernameChange = (username: string) => {
    dispatch(updateTemplateStudent({ key: "username", value: username }));
  };

  const onEmailChange = (email: string) => {
    dispatch(updateTemplateStudent({ key: "email", value: email }));
  };

  const onPasswordChange = (pass: string) => {
    dispatch(updateTemplateStudent({ key: "password", value: pass }));
  };

  const onStudentClassChange = (studentClass: string) => {
    dispatch(
      updateTemplateStudent({ key: "class_label", value: studentClass })
    );
  };

  const handleProfileImageChange = (image: File | string) => {
    dispatch(createCloudinaryImageForStudent(image as File));
  };

  const handleSubmitStudent = (e: SyntheticEvent) => {
    e.preventDefault();
    if (pageType === "signup" && !formStepIsNotFinal) {
      dispatch(
        setScreenLoadingMessage(
          "Încercăm să creăm un elev, vă rugăm să așteptați..."
        )
      );
      dispatch(createStudent(templateStudent));
    } else {
      dispatch(
        setScreenLoadingMessage(
          "Încercăm să intrăm în contul tău, vă rugăm să așteptați..."
        )
      );
      dispatch(loginUser(templateStudent));
    }
  };

  useFormTransition(studentFormRef1);
  useFormTransition(studentFormRef2);

  if (step === 1) {
    return (
      <form
        className={accountsFormStyles.accountsFormContainer__form}
        onSubmit={(e) => handleSubmitStudent(e)}
        ref={studentFormRef1}
      >
        <FormModal type={pageType === "login" ? "general" : "students"} />
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
              value={templateStudent.username}
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
              value={templateStudent.email}
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
                value={templateStudent.password}
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
            disabled={loadingCreateCloudinaryImageForStudent === "PENDING"}
            onClick={() => {
              if (formStepIsNotFinal) {
                setCurrentStep((step) => step + 1);
              }
            }}
          >
            {loadingCreateCloudinaryImageForStudent === "PENDING"
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
        onSubmit={(e) => e.preventDefault()}
        ref={studentFormRef2}
      >
        <FormModal type="students" />
        <div className={accountsFormStyles.accountsFormContainer__content}>
          <div
            className={accountsFormStyles.accountsFormContainer__selectControl}
          >
            <label htmlFor="class">Clasă:</label>
            <select
              name="class"
              id="class"
              value={templateStudent.class_label as string}
              onChange={(e) => onStudentClassChange(e.target.value)}
            >
              {possibleClassLabels.map((option) => {
                return (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                );
              })}
            </select>
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
            onClick={(e) => handleSubmitStudent(e)}
          >
            Creați un cont
          </button>
        </div>
      </form>
    );
  }

  return <></>;
};

export default StudentForm;
