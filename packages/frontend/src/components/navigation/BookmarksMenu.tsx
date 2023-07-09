// React
import { FC, useEffect, useRef } from "react";
// Types
import { BookmarksMenuProps } from "types";
// React Icons
import { CiMenuKebab } from "react-icons/ci";
// Styles
import bookmarksMenuStyles from "../../scss/components/navigation/BookmarksMenu.module.scss";

const BookmarksMenu: FC<BookmarksMenuProps> = ({
  setShowBookmarks,
  showBookmarks,
}) => {
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
      style={{ transform: showBookmarks ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      <CiMenuKebab
        onClick={() => {
          localStorage.setItem("BookmarksMenuClicked", "true");
          setShowBookmarks(!showBookmarks);
        }}
        title={`${showBookmarks ? "Închideți" : "Deschideți"} Marcaje`}
        aria-label={`${showBookmarks ? "Închideți" : "Deschideți"} Marcaje`}
      />
    </div>
  );
};

export default BookmarksMenu;
