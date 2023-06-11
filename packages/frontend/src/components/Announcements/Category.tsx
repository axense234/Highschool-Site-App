// React
import { FC, useRef } from "react";
// Types
import { CategorieType } from "types";
// React Icons
import { MdArrowDropDownCircle } from "react-icons/md";
// SCSS
import announcementsStyles from "@/scss/components/Anunturi.module.scss";
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

const Category: FC<CategorieType> = ({ nume: numeCategorie }) => {
  const dispatch = useAppDispatch();
  const categoryRef = useRef<HTMLUListElement>(null);
  const announcements = useAppSelector(selectAllAnnouncements);
  const categoryToggles = useAppSelector(selectCategoryToggles);
  const showCategory = categoryToggles.includes(numeCategorie);

  const functionUsedOnCategoryChange = showCategory
    ? removeCategoryToggle
    : addCategoryToggle;

  const accurateAnnouncements = announcements.filter((announcement) => {
    return announcement.categorie === numeCategorie;
  });

  return (
    <ul
      className={announcementsStyles.announcementsContainer__category}
      ref={categoryRef}
      id={numeCategorie}
    >
      <div
        className={announcementsStyles.announcementsContainer__categoryTitle}
      >
        <MdArrowDropDownCircle
          onClick={() => dispatch(functionUsedOnCategoryChange(numeCategorie))}
          title={`Afiseaza Anunturi - ${numeCategorie}`}
          style={{
            transform: `${showCategory ? "rotate(270deg)" : "rotate(0deg)"}`,
          }}
        />
        <h3>{numeCategorie}</h3>
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
