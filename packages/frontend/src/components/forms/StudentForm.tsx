// React
import { FC, SyntheticEvent, useState } from "react";
// Next
import Link from "next/link";
// Types
import { FormStepProps } from "types";
// React Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
// SCSS
import accountsFormStyles from "../../scss/components/others/AccountsForm.module.scss";
// Data
import { possibleClassLabels, typeNavOptions } from "@/data";
// Components
import FormModal from "../modals/FormModal";
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
import { selectAllClasses } from "@/redux/slices/classesSlice";

const StudentForm: FC<FormStepProps> = ({
  step,
  pageType,
  setCurrentStep,
  setCurrentType,
}) => {
  const dispatch = useAppDispatch();
  const classes = useAppSelector(selectAllClasses);
  const [showPass, setShowPass] = useState<boolean>(false);

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

  const onFullnameChange = (fullname: string) => {
    dispatch(updateTemplateStudent({ key: "fullname", value: fullname }));
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

  if (step === 1) {
    return (
      <form
        className={`${accountsFormStyles.accountsFormContainer__form}`}
        onSubmit={(e) => handleSubmitStudent(e)}
      >
        <FormModal type={pageType === "login" ? "general" : "students"} />
        <div className={accountsFormStyles.accountsFormContainer__content}>
          {pageType === "signup" && (
            <div
              className={accountsFormStyles.accountsFormContainer__textControl}
            >
              <label htmlFor="fullname">Nume Complet: </label>
              <input
                type="text"
                id="fullname"
                required
                placeholder="ex: Irina Ionescu"
                value={templateStudent.fullname}
                onChange={(e) => onFullnameChange(e.target.value)}
              />
            </div>
          )}
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
        onSubmit={(e) => e.preventDefault()}
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
              {classes.map((classItem) => {
                return (
                  <option key={classItem.id} value={classItem.label}>
                    {classItem.label}
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
        <div
          className={accountsFormStyles.accountsFormContainer__linksContainer}
        >
          <Link href="/login">Aveți un cont? Intrați în el aici!</Link>
        </div>
      </form>
    );
  }

  return <></>;
};

export default StudentForm;
