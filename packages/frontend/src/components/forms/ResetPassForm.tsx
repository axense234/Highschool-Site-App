// React
import { FC, SyntheticEvent, useState } from "react";
// Next
import Link from "next/link";
import { useRouter } from "next/router";
// React Icons
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// Types
import { FormModalPropsType } from "@/core/types/constants";
// SCSS
import accountsFormStyles from "../../scss/components/others/AccountsForm.module.scss";
// Components
import FormModal from "../modals/FormModal";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectNewPass,
  selectNewPassVer,
  setNewPass,
  setNewPassVer,
} from "@/redux/slices/generalSlice";
import { updateAdminById } from "@/redux/slices/adminsSlice";
import { updateStudentById } from "@/redux/slices/studentsSlice";
import { updateTeacherById } from "@/redux/slices/teachersSlice";

const ResetPassForm: FC = () => {
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showVerPass, setShowVerPass] = useState<boolean>(false);

  const router = useRouter();

  const newPass = useAppSelector(selectNewPass);
  const newPassVer = useAppSelector(selectNewPassVer);

  let typeOfModalUsed;
  switch (router.query.type) {
    case "PROFESOR":
      typeOfModalUsed = "teachers";
      break;
    case "ADMIN":
      typeOfModalUsed = "admins";
      break;
    case "ELEV":
      typeOfModalUsed = "students";
      break;
    default:
      typeOfModalUsed = "general";
      break;
  }

  const handleResetPassSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (router.query.type === "ADMIN") {
      dispatch(
        updateAdminById({
          password: newPass,
          passwordVer: newPassVer,
          admin_uid: router.query.accountId as string,
        })
      );
    } else if (router.query.type === "ELEV") {
      dispatch(
        updateStudentById({
          password: newPass,
          passwordVer: newPassVer,
          student_uid: router.query.accountId as string,
        })
      );
    } else if (router.query.type === "PROFESOR") {
      dispatch(
        updateTeacherById({
          password: newPass,
          passwordVer: newPassVer,
          teacher_uid: router.query.accountId as string,
        })
      );
    }
  };

  return (
    <form
      className={accountsFormStyles.accountsFormContainer__form}
      onSubmit={(e) => handleResetPassSubmit(e)}
    >
      <FormModal type={typeOfModalUsed as unknown as FormModalPropsType} />
      <div className={accountsFormStyles.accountsFormContainer__content}>
        <div className={accountsFormStyles.accountsFormContainer__passControl}>
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
              value={newPass}
              onChange={(e) => dispatch(setNewPass(e.target.value))}
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
        <div className={accountsFormStyles.accountsFormContainer__passControl}>
          <div
            className={accountsFormStyles.accountsFormContainer__controlLabel}
          >
            <RiLockPasswordLine />
            <label htmlFor="pass-ver">Verificare Parolă:</label>
          </div>
          <div
            className={
              accountsFormStyles.accountsFormContainer__passControlInput
            }
          >
            <input
              type={showPass ? "text" : "password"}
              id="pass-ver"
              required
              placeholder="ex: irina*4134"
              value={newPassVer}
              onChange={(e) => dispatch(setNewPassVer(e.target.value))}
            />
            {!showVerPass ? (
              <AiFillEye
                onClick={() => setShowVerPass(true)}
                title="Arată parola"
                aria-label="Arată parola"
              />
            ) : (
              <AiFillEyeInvisible
                onClick={() => setShowVerPass(false)}
                title="Ascunde parola"
                aria-label="Ascunde parola"
              />
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={accountsFormStyles.accountsFormContainer__formButton}
      >
        Resetați parola contului
      </button>
      <div className={accountsFormStyles.accountsFormContainer__linksContainer}>
        <Link href="/signup">Nu aveți un cont? Creați unul aici!</Link>
        <Link href="/login">Aveți un cont? Intrați în el aici!</Link>
      </div>
    </form>
  );
};

export default ResetPassForm;
