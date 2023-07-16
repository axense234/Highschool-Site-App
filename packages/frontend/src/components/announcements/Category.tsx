// React
import { FC, useRef } from "react";
// React Icons
import { MdArrowDropDownCircle } from "react-icons/md";
// Types
import { CategoryType } from "@/core/types/variables";
// SCSS
import announcementsStyles from "@/scss/components/pages/Announcements.module.scss";
// Redux Toolkit
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addCategoryToggle,
  removeCategoryToggle,
  selectAllAnnouncements,
  selectCategoryToggles,
} from "@/redux/slices/announcementsSlice";
// Components
import Announcement from "./Announcement";

const Category: FC<CategoryType> = ({ name: categoryName }) => {
  const dispatch = useAppDispatch();
  const categoryRef = useRef<HTMLUListElement>(null);
  const announcements = useAppSelector(selectAllAnnouncements);
  const categoryToggles = useAppSelector(selectCategoryToggles);
  const showCategory = categoryToggles.includes(categoryName);

  const functionUsedOnCategoryChange = showCategory
    ? removeCategoryToggle
    : addCategoryToggle;

  const accurateAnnouncements = announcements.filter((announcement) => {
    return announcement.category === categoryName;
  });

  return (
    <ul
      className={announcementsStyles.announcementsContainer__category}
      ref={categoryRef}
      id={categoryName}
    >
      <div
        className={announcementsStyles.announcementsContainer__categoryTitle}
      >
        <MdArrowDropDownCircle
          onClick={() => dispatch(functionUsedOnCategoryChange(categoryName))}
          title={`Afișează Anunțuri - ${categoryName}`}
          style={{
            transform: `${showCategory ? "rotate(270deg)" : "rotate(0deg)"}`,
          }}
        />
        <h3>{categoryName}</h3>
      </div>
      {showCategory &&
        accurateAnnouncements.map((announcement) => {
          return (
            <li key={announcement.id}>
              <Announcement {...announcement} />
            </li>
          );
        })}
    </ul>
  );
};

export default Category;
