// React
import { FC, useEffect, useRef } from "react";
// Types
import { SearchButtonProps } from "types";
// React Icons
import { BiSearch } from "react-icons/bi";
// SCSS
import searchButtonStyles from "../scss/components/SearchButton.module.scss";

const SearchButton: FC<SearchButtonProps> = ({ setShowSearchbar }) => {
  const searchButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clicked = localStorage.getItem("SearchButtonClicked");
    if (clicked) {
      (searchButtonRef.current as HTMLDivElement).style.animation = "none";
    }
  }, []);

  return (
    <div
      className={searchButtonStyles.searchButtonContainer}
      ref={searchButtonRef}
    >
      <BiSearch
        aria-label="Căutați in site"
        title="Căutați in site"
        onClick={() => {
          localStorage.setItem("SearchButtonClicked", "true");
          setShowSearchbar(true);
        }}
      />
    </div>
  );
};

export default SearchButton;
