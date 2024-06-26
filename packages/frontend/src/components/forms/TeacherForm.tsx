// React
import { FC, SyntheticEvent, useState } from "react";
// Next
import Link from "next/link";
// React Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BsFillPersonFill } from "react-icons/bs";
import { BiKey } from "react-icons/bi";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { SlSpeech } from "react-icons/sl";
import { FiBook } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
// Types
import { Subjects } from "@prisma/client";
import FormStepProps from "@/core/interfaces/component/FormStepProps";
import TemplateUser from "@/core/interfaces/template/TemplateUser";
// SCSS
import accountsFormStyles from "../../scss/components/others/AccountsForm.module.scss";
// Data
import { subjects, typeNavOptions } from "@/data";
// Components
import FormModal from "../modals/FormModal";
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
import { selectAllClasses } from "@/redux/slices/classesSlice";

const TeacherForm: FC<FormStepProps> = ({
  step,
  pageType,
  setCurrentStep,
  setCurrentType,
}) => {
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [accountCode, setAccountCode] = useState<string>("");

  const classes = useAppSelector(selectAllClasses);

  const usableClasses = classes.filter(
    (classItem) => !classItem.master_teacher_name
  );

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

  const onFullnameChange = (fullname: string) => {
    dispatch(updateTemplateTeacher({ key: "fullname", value: fullname }));
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

  const onSubjectChange = (subject: Subjects) => {
    dispatch(updateTemplateTeacher({ key: "subject", value: subject }));
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
      dispatch(createTeacher({ ...templateTeacher, accountCode }));
    } else {
      dispatch(
        setScreenLoadingMessage(
          "Încercăm să intrăm în contul tău, vă rugăm să așteptați..."
        )
      );
      dispatch(loginUser(templateTeacher as TemplateUser));
    }
  };

  if (step === 1) {
    return (
      <form
        className={accountsFormStyles.accountsFormContainer__form}
        onSubmit={(e) => handleSubmitTeacher(e)}
      >
        <FormModal type={pageType === "login" ? "general" : "teachers"} />
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
                  value={templateTeacher.fullname}
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
              value={templateTeacher.email}
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
      <form className={accountsFormStyles.accountsFormContainer__form}>
        <FormModal type="teachers" />
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
          <div
            className={
              accountsFormStyles.accountsFormContainer__textAreaControl
            }
          >
            <div
              className={accountsFormStyles.accountsFormContainer__controlLabel}
            >
              <SlSpeech />
              <label htmlFor="description">Descriere(*): </label>
            </div>
            <textarea
              id="description"
              required={false}
              value={templateTeacher.description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>
          <div
            className={accountsFormStyles.accountsFormContainer__selectControl}
          >
            <div
              className={accountsFormStyles.accountsFormContainer__controlLabel}
            >
              <FiBook />
              <label htmlFor="subject">Materie</label>
            </div>
            <select
              name="subject"
              id="subject"
              value={templateTeacher.subject}
              onChange={(e) => onSubjectChange(e.target.value as Subjects)}
            >
              {subjects?.map((subject) => {
                return (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            className={
              accountsFormStyles.accountsFormContainer__checkboxControl
            }
          >
            <div
              className={accountsFormStyles.accountsFormContainer__controlLabel}
            >
              <FaChalkboardTeacher />
              <label htmlFor="master">Sunteți diriginte?(*)</label>
            </div>
            <input
              type="checkbox"
              id="master"
              required={false}
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
              <div
                className={
                  accountsFormStyles.accountsFormContainer__controlLabel
                }
              >
                <SiGoogleclassroom />
                <label htmlFor="master-class">
                  La ce clasa sunteți diriginte?
                </label>
              </div>
              {usableClasses.length >= 1 ? (
                <select
                  name="master-class"
                  id="master-class"
                  required
                  value={templateTeacher.master_class_label as string}
                  onChange={(e) => onMasterClassLabelChange(e.target.value)}
                >
                  {usableClasses?.map((classItem) => {
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
            disabled={loadingCreateCloudinaryImageForTeacher === "PENDING"}
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

export default TeacherForm;
