// React
import { FC, useState } from "react";
// Types
import { CategorieType } from "types";
// React Icons
import { MdArrowDropDownCircle } from "react-icons/md";
// SCSS
import announcementsStyles from "@/scss/components/Anunturi.module.scss";
// Redux Toolkit
import { useAppSelector } from "@/hooks/redux";
import { selectAllAnnouncements } from "@/redux/slices/announcementsSlice";
// Components
import Announcement from "./Announcement";

const Category: FC<CategorieType> = ({ nume: numeCategorie }) => {
  const [show, setShow] = useState<boolean>(false);
  const announcements = useAppSelector(selectAllAnnouncements);

  const accurateAnnouncements = announcements.filter((announcement) => {
    return announcement.categorie === numeCategorie;
  });

  return (
    <ul className={announcementsStyles.announcementsContainer__category}>
      <div
        className={announcementsStyles.announcementsContainer__categoryTitle}
      >
        <MdArrowDropDownCircle
          onClick={() => setShow(!show)}
          title={`Afiseaza Anunturi - ${numeCategorie}`}
          style={{ transform: `${show ? "rotate(270deg)" : "rotate(0deg)"}` }}
        />
        <h3>{numeCategorie}</h3>
      </div>
      {show &&
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
