// React
import { FC, SyntheticEvent } from "react";
// Next
import Link from "next/link";
// React Icons
import { MdAttachEmail } from "react-icons/md";
// SCSS
import accountsFormStyles from "../../scss/components/others/AccountsForm.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectEmailCurrentType,
  selectRecipientEmail,
  sendResetPassEmail,
  setRecipientEmail,
} from "@/redux/slices/generalSlice";
// Components
import FormModal from "../modals/FormModal";

const ForgotPassForm: FC = () => {
  const dispatch = useAppDispatch();
  const recipientEmail = useAppSelector(selectRecipientEmail);
  const emailCurrentType = useAppSelector(selectEmailCurrentType);

  const handleForgotPassSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      sendResetPassEmail({
        recipient: recipientEmail,
        modelType: emailCurrentType,
      })
    );
  };

  return (
    <form
      className={accountsFormStyles.accountsFormContainer__form}
      onSubmit={(e) => handleForgotPassSubmit(e)}
    >
      <FormModal type="general" />
      <div className={accountsFormStyles.accountsFormContainer__content}>
        <div className={accountsFormStyles.accountsFormContainer__textControl}>
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
            value={recipientEmail}
            onChange={(e) => dispatch(setRecipientEmail(e.target.value))}
          />
        </div>
      </div>
      <button
        type="submit"
        className={accountsFormStyles.accountsFormContainer__formButton}
      >
        Trimiteți instrucțiuni
      </button>
      <div className={accountsFormStyles.accountsFormContainer__linksContainer}>
        <Link href="/signup">Nu aveți un cont? Creați unul aici!</Link>
        <Link href="/login">Aveți un cont? Intrați în el aici!</Link>
      </div>
    </form>
  );
};

export default ForgotPassForm;
