// React
import { FC, useEffect, useRef } from "react";
// React Icons
import { CiMenuKebab } from "react-icons/ci";
// Types
import BookmarksMenuProps from "@/core/interfaces/component/BookmarksMenuProps";
// Styles
import bookmarksMenuStyles from "../../scss/components/navigation/BookmarksMenu.module.scss";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";

const BookmarksMenu: FC<BookmarksMenuProps> = ({
  setShowBookmarks,
  showBookmarks,
}) => {
  const bookmarksMenuRef = useRef<HTMLDivElement>(null);
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    const clicked = localStorage.getItem("BookmarksMenuClicked");
    if (clicked && profile.role) {
      (bookmarksMenuRef.current as HTMLDivElement).style.animation = "none";
    }
  }, [profile, bookmarksMenuRef]);

  if (profile.role) {
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
  }
  return null;
};

export default BookmarksMenu;
