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

const AccountsForm: FC<AccountsFormProps> = ({ type }) => {
  const [currentType, setCurrentType] = useState<TypeNavOptionLabel>("ELEV");
  const [currentStep, setCurrentStep] = useState<number>(1);

  const foundCurrentTypeSteps = typeNavOptions.find(
    (option) => option.label === currentType
  )?.steps;

  let shownForm;

  switch (currentType) {
    case "ADMIN":
      shownForm = <AdminForm step={currentStep} pageType={type} />;
      break;
    case "ELEV":
      shownForm = <StudentForm step={currentStep} pageType={type} />;
      break;
    case "PROFESOR":
      shownForm = <TeacherForm step={currentStep} pageType={type} />;
      break;
    default:
      break;
  }

  return (
    <section className={accountsFormStyles.accountsFormContainer}>
      <nav className={accountsFormStyles.accountsFormContainer__typeNav}>
        <ul className={accountsFormStyles.accountsFormContainer__typeNavList}>
          {typeNavOptions.map((option) => {
            return (
              <li
                key={option.id}
                title={option.label}
                aria-label={option.label}
                onClick={() => {
                  setCurrentStep(1);
                  setCurrentType(option.label);
                }}
                style={{
                  backgroundColor:
                    currentType === option.label ? "#90EE90" : "#e6e6e6",
                }}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </nav>
      {(foundCurrentTypeSteps?.length as number) >= 1 && (
        <nav className={accountsFormStyles.accountsFormContainer__stepNav}>
          <ul className={accountsFormStyles.accountsFormContainer__stepNavList}>
            {foundCurrentTypeSteps?.map((step) => {
              return (
                <li
                  key={step.id}
                  title={step.label}
                  aria-label={step.label}
                  onClick={() => setCurrentStep(step.id)}
                >
                  {step.label}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <div className={accountsFormStyles.accountsFormContainer__formContainer}>
        <h2>Introduceți informațiile respective</h2>
        {shownForm}
      </div>
    </section>
  );
};

export default AccountsForm;
