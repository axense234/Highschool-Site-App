import { Dispatch, SetStateAction } from "react";
import { TypeNavOptionLabel } from "@/core/types/constants";

interface FormStepProps {
  step: number;
  shown: boolean;
  pageType: "signup" | "login" | "reset-pass";
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setCurrentType: Dispatch<SetStateAction<TypeNavOptionLabel>>;
}

export default FormStepProps;
