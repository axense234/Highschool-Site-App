// React
import { FC } from "react";
// Types
import { SearchButtonProps } from "types";
// React Icons
import { BiSearch } from "react-icons/bi";
// SCSS
import searchButtonStyles from "../scss/components/SearchButton.module.scss";

const SearchButton: FC<SearchButtonProps> = ({ setShowSearchbar }) => {
  return (
    <div className={searchButtonStyles.searchButtonContainer}>
      <BiSearch
        aria-label="Căutați in site"
        title="Căutați in site"
        onClick={() => setShowSearchbar(true)}
      />
    </div>
  );
};

export default SearchButton;
