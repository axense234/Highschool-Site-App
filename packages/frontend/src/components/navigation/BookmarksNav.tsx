// React
import { FC, useEffect, useRef } from "react";
// React Icons
import { BsQuestionLg } from "react-icons/bs";
// Next
import Link from "next/link";
// Types
import { BookmarksMenuProps, TemplateBookmark } from "types";
// SCSS
import bookmarksStyles from "../../scss/components/navigation/BookmarksNav.module.scss";
// Data
import {
  bookmarkIconShownMap,
  defaultAdminBookmarks,
  defaultStudentBookmarks,
  defaultTeacherBookmarks,
  defaultUserBookmarks,
} from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";

const BookmarksNav: FC<BookmarksMenuProps> = ({ showBookmarks }) => {
  const bookmarksRef = useRef<HTMLElement>(null);

  const profile = useAppSelector(selectProfile);

  let defaultBookmarksShown = defaultUserBookmarks;
  switch (profile.role) {
    case "":
      defaultBookmarksShown = defaultUserBookmarks;
      break;
    case "ADMIN":
      defaultBookmarksShown = defaultAdminBookmarks;
      break;
    case "PROFESOR":
      defaultBookmarksShown = defaultTeacherBookmarks;
      break;
    case "ELEV":
      defaultBookmarksShown = defaultStudentBookmarks;
      break;
    default:
      throw new Error("Invalid profile role.");
  }

  useEffect(() => {
    const bookmakrs = bookmarksRef.current as HTMLElement;
    if (showBookmarks) {
      bookmakrs.style.transform = "translateY(0%)";
    } else {
      bookmakrs.style.transform = "translateY(-150%)";
    }
  }, [showBookmarks]);

  return (
    <nav className={bookmarksStyles.bookmarksContainer} ref={bookmarksRef}>
      <ul className={bookmarksStyles.bookmarksContainer__bookmarks}>
        {defaultBookmarksShown.map((bookmark) => {
          return (
            <li key={bookmark.id}>
              <Bookmark {...bookmark} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const Bookmark: FC<TemplateBookmark> = ({ dest, label }) => {
  return (
    <Link href={dest} aria-label={label} title={label}>
      {bookmarkIconShownMap.find((icon) => icon.dest === dest)?.icon || (
        <BsQuestionLg aria-label={label} title={label} />
      )}
    </Link>
  );
};

export default BookmarksNav;
