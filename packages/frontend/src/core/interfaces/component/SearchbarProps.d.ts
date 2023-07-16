import { Dispatch, SetStateAction } from "react";

interface SearchbarProps {
  showSearchbar: boolean;
  setShowSearchbar: Dispatch<SetStateAction<boolean>>;
}

export default SearchbarProps;
