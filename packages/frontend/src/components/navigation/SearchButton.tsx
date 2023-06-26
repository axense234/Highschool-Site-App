// React
import { FC, useEffect, useRef } from "react";
// Types
import { SearchButtonProps } from "types";
// React Icons
import { BiSearch } from "react-icons/bi";
// SCSS
import searchButtonStyles from "../../scss/components/navigation/SearchButton.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserProfile,
  selectLoadingProfile,
} from "@/redux/slices/generalSlice";
import {
  selectLoadingAnnouncements,
  getAllAnnouncements,
} from "@/redux/slices/announcementsSlice";
import {
  selectLoadingTeachers,
  getAllTeachers,
} from "@/redux/slices/teachersSlice";

const SearchButton: FC<SearchButtonProps> = ({ setShowSearchbar }) => {
  const dispatch = useAppDispatch();
  const searchButtonRef = useRef<HTMLDivElement>(null);
  const loadingProfile = useAppSelector(selectLoadingProfile);
  const loadingAnnouncements = useAppSelector(selectLoadingAnnouncements);
  const loadingTeachers = useAppSelector(selectLoadingTeachers);

  useEffect(() => {
    const clicked = localStorage.getItem("SearchButtonClicked");
    if (clicked) {
      (searchButtonRef.current as HTMLDivElement).style.animation = "none";
    }
  }, []);

  useEffect(() => {
    if (loadingProfile === "IDLE") {
      dispatch(getUserProfile());
    }
  }, []);

  useEffect(() => {
    if (loadingAnnouncements === "IDLE") {
      dispatch(getAllAnnouncements());
    }
    if (loadingTeachers === "IDLE") {
      dispatch(getAllTeachers());
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
