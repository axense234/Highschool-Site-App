// React
import { FC, useEffect, useRef } from "react";
// React Icons
import { CiMenuKebab } from "react-icons/ci";
// Styles
import bookmarksMenuStyles from "../../scss/components/navigation/BookmarksMenu.module.scss";

const BookmarksMenu: FC = () => {
  const bookmarksMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clicked = localStorage.getItem("BookmarksMenuClicked");
    if (clicked) {
      (bookmarksMenuRef.current as HTMLDivElement).style.animation = "none";
    }
  }, []);
  return (
    <div
      className={bookmarksMenuStyles.bookmarksMenuContainer}
      ref={bookmarksMenuRef}
    >
      <CiMenuKebab
        onClick={() => {
          localStorage.setItem("BookmarksMenuClicked", "true");
        }}
      />
    </div>
  );
};

export default BookmarksMenu;
