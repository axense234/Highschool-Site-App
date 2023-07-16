import { Dispatch, SetStateAction } from "react";

interface ClassCatalogueHeadProps {
  currentClassSubjectsShownId: number;
  setCurrentClassSubjectsShownId: Dispatch<SetStateAction<number>>;
}

export default ClassCatalogueHeadProps;
