// React
import { FC, useState } from "react";
// Types
import { AccountsFormProps, TypeNavOptionLabel } from "types";
// SCSS
import accountsFormStyles from "../../scss/components/others/AccountsForm.module.scss";
// Data
import { typeNavOptions } from "@/data";
// Components
import AdminForm from "./AdminForm";
import StudentForm from "./StudentForm";
import TeacherForm from "./TeacherForm";
import ForgotPassForm from "./ForgotPassword";
import ResetPassForm from "./ResetPassForm";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectEmailCurrentType,
  setEmailCurrentType,
} from "@/redux/slices/generalSlice";

const AccountsForm: FC<AccountsFormProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const emailCurrentType = useAppSelector(selectEmailCurrentType);
  const [currentType, setCurrentType] = useState<TypeNavOptionLabel>(
    type === "reset-pass" ? "RESETARE PAROLA" : emailCurrentType
  );
  const [currentStep, setCurrentStep] = useState<number>(1);

  const usedTypeNavOptions =
    type === "reset-pass"
      ? typeNavOptions.filter((option) => option.label === "RESETARE PAROLA")
      : typeNavOptions.filter((option) => option.label !== "RESETARE PAROLA");

  const foundCurrentTypeSteps = usedTypeNavOptions.find(
    (option) => option.label === currentType
  )?.steps;

  let shownForm;

  switch (currentType) {
    case "ADMIN":
      shownForm = (
        <AdminForm
          step={currentStep}
          setCurrentStep={setCurrentStep}
          setCurrentType={setCurrentType}
          pageType={type}
          shown
        />
      );
      break;
    case "ELEV":
      shownForm = (
        <StudentForm
          step={currentStep}
          setCurrentStep={setCurrentStep}
          setCurrentType={setCurrentType}
          pageType={type}
          shown
        />
      );
      break;
    case "PROFESOR":
      shownForm = (
        <TeacherForm
          step={currentStep}
          setCurrentStep={setCurrentStep}
          setCurrentType={setCurrentType}
          pageType={type}
          shown
        />
      );
      break;
    case "PAROLA UITATA":
      shownForm = <ForgotPassForm />;
      break;
    case "RESETARE PAROLA":
      shownForm = <ResetPassForm />;
      break;
    default:
      break;
  }

  return (
    <section className={accountsFormStyles.accountsFormContainer}>
      <nav className={accountsFormStyles.accountsFormContainer__typeNav}>
        <ul className={accountsFormStyles.accountsFormContainer__typeNavList}>
          {usedTypeNavOptions.map((option) => {
            return (
              <li
                key={option.id}
                title={option.label}
                aria-label={option.label}
                onClick={() => {
                  setCurrentStep(1);
                  setCurrentType(option.label);
                  if (type !== "reset-pass") {
                    dispatch(
                      setEmailCurrentType(
                        option.label as "ADMIN" | "ELEV" | "PROFESOR"
                      )
                    );
                  }
                }}
                style={{
                  backgroundColor:
                    currentType === option.label ||
                    option.label === "RESETARE PAROLA" ||
                    emailCurrentType === option.label
                      ? "#90EE90"
                      : "#e6e6e6",
                }}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </nav>
      {(foundCurrentTypeSteps?.length as number) >= 1 && type === "signup" && (
        <nav className={accountsFormStyles.accountsFormContainer__stepNav}>
          <ul className={accountsFormStyles.accountsFormContainer__stepNavList}>
            {foundCurrentTypeSteps?.map((step) => {
              return (
                <li
                  key={step.id}
                  title={step.label}
                  aria-label={step.label}
                  onClick={() => setCurrentStep(step.id)}
                  style={{
                    backgroundColor:
                      currentStep === step.id ? "#90EE90" : "#e6e6e6",
                  }}
                >
                  {step.label}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <div className={accountsFormStyles.accountsFormContainer__formContainer}>
        <div
          className={
            accountsFormStyles.accountsFormContainer__formContainerWrapper
          }
        >
          <h2>Introduceți informațiile respective</h2>
          {shownForm}
        </div>
      </div>
    </section>
  );
};

export default AccountsForm;
