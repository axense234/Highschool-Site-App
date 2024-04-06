// React
import { FC, SyntheticEvent, useState } from "react";
// Next
import Link from "next/link";
// React Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { FaGraduationCap } from "react-icons/fa";
import { BiKey } from "react-icons/bi";
// Types
import FormStepProps from "@/core/interfaces/component/FormStepProps";
import TemplateUser from "@/core/interfaces/template/TemplateUser";
// SCSS
import accountsFormStyles from "../../scss/components/others/AccountsForm.module.scss";
// Data
import { typeNavOptions } from "@/data";
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
      dispatch(createStudent({ ...templateStudent, accountCode }));
    } else {
      dispatch(
        setScreenLoadingMessage(
          "Încercăm să intrăm în contul tău, vă rugăm să așteptați..."
        )
      );
      dispatch(loginUser(templateStudent as TemplateUser));
    }
  };

  if (step === 1) {
    return (
      <form
        className={accountsFormStyles.accountsFormContainer__form}
        onSubmit={(e) => handleSubmitStudent(e)}
      >
        <FormModal type={pageType === "login" ? "general" : "students"} />
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
                  maxLength={40}
                  value={templateStudent.fullname}
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
              value={templateStudent.email}
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
              <div
                className={
                  accountsFormStyles.accountsFormContainer__controlLabel
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
        className={accountsFormStyles.accountsFormContainer__form}
        onSubmit={(e) => e.preventDefault()}
      >
        <FormModal type="students" />
        <div className={accountsFormStyles.accountsFormContainer__content}>
          <div
            className={accountsFormStyles.accountsFormContainer__selectControl}
          >
            <div
              className={accountsFormStyles.accountsFormContainer__controlLabel}
            >
              <FaGraduationCap />
              <label htmlFor="class">Clasă(*):</label>
            </div>
            {classes.length >= 1 ? (
              <select
                name="class"
                id="class"
                required={false}
                value={templateStudent.class_label as string}
                onChange={(e) => onStudentClassChange(e.target.value)}
              >
                <option value="">Nu sunt într-o clasă.</option>
                {classes.map((classItem) => {
                  return (
                    <option key={classItem.id} value={classItem.label}>
                      {classItem.label}
                    </option>
                  );
                })}
              </select>
            ) : (
              <p>Nu avem clase momentan.</p>
            )}
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

  return null;
};

export default StudentForm;
