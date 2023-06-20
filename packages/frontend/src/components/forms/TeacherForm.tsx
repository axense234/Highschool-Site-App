// React
import { FC, useState } from "react";
// Types
import { FormStepProps } from "types";
// React Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// SCSS
import accountsFormStyles from "../../scss/components/others/AccountsForm.module.scss";
// Data
import { possibleClassLabels } from "@/data";

const TeacherForm: FC<FormStepProps> = ({ step, pageType }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  if (step === 1) {
    return (
      <form className={accountsFormStyles.accountsFormContainer__form}>
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
            className={accountsFormStyles.accountsFormContainer__imageControl}
          >
            <label htmlFor="img">Imagine de Profil:</label>
            <input type="file" id="img" required={false} />
          </div>
        </div>
        <button
          type="submit"
          className={accountsFormStyles.accountsFormContainer__formButton}
        >
          Următorul pas
        </button>
      </form>
    );
  }

  return (
    <form className={accountsFormStyles.accountsFormContainer__form}>
      <div className={accountsFormStyles.accountsFormContainer__content}>
        <div
          className={accountsFormStyles.accountsFormContainer__textAreaControl}
        >
          <label htmlFor="description">Descriere: </label>
          <textarea id="description" required />
        </div>
        <div
          className={accountsFormStyles.accountsFormContainer__checkboxControl}
        >
          <label htmlFor="master">Sunteți diriginte?</label>
          <input type="checkbox" id="master" required />
        </div>
        <div
          className={accountsFormStyles.accountsFormContainer__selectControl}
        >
          <label htmlFor="master-class">La ce clasa sunteți diriginte?</label>
          <select name="master-class" id="master-class">
            {possibleClassLabels?.map((option) => {
              return (
                <option key={option.id} value={option.label}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className={accountsFormStyles.accountsFormContainer__formButton}
      >
        {pageType === "login" ? "Intrați în cont" : "Creați un cont"}
      </button>
    </form>
  );
};

export default TeacherForm;
