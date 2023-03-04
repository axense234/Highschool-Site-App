// React
import { FC, useEffect, useRef } from "react";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";
// SCSS
import formModalStyles from "../scss/components/FormModal.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectFormModal, updateFormModal } from "@/redux/slices/generalSlice";

const FormModal: FC = () => {
  const formModal = useAppSelector(selectFormModal);
  const formModalRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useModalTransition(formModal.showModal, formModalRef);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (formModal.showModal) {
      timeout = setTimeout(() => {
        dispatch(updateFormModal(false));
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [formModal.showModal]);

  return (
    <div
      className={formModalStyles.formModalContainer}
      ref={formModalRef}
      style={{
        backgroundColor: formModal.color,
        color: formModal.color === "green" ? "black" : "white",
      }}
    >
      <p>{formModal.msg}</p>
    </div>
  );
};

export default FormModal;
