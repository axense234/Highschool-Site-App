// React
import { FC, useEffect, useState } from "react";
// Types
import { SearchButtonProps } from "types";
// React Icons
import { BiSearch } from "react-icons/bi";
// SCSS
import searchButtonStyles from "../scss/components/SearchButton.module.scss";

const SearchButton: FC<SearchButtonProps> = ({ setShowSearchbar }) => {
  const [userClicked, setUserClicked] = useState<"false" | "true">("false");

  useEffect(() => {
    const clicked = localStorage.getItem("SearchButtonClicked");
    setUserClicked((clicked as "true") || "false");
  }, []);

  return (
    <div
      className={searchButtonStyles.searchButtonContainer}
      style={{ animation: JSON.parse(userClicked) && "none" }}
    >
      <BiSearch
        aria-label="Căutați in site"
        title="Căutați in site"
        onClick={() => {
          localStorage.setItem("SearchButtonClicked", "true");
          setUserClicked("true");
          setShowSearchbar(true);
        }}
      />
    </div>
  );
};

export default SearchButton;
