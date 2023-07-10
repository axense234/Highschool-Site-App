// React
import { FC, useEffect, useRef, useState } from "react";
// React Icons
import { BsQuestionLg } from "react-icons/bs";
// Next
import Link from "next/link";
// React Icons
import { AiFillDelete } from "react-icons/ai";
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
import {
  selectProfile,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
import {
  deleteBookmarkById,
  getAllBookmarks,
  selectAllBookmarks,
  selectLoadingBookmarks,
} from "@/redux/slices/bookmarksSlice";

const BookmarksNav: FC<BookmarksMenuProps> = ({ showBookmarks }) => {
  const dispatch = useAppDispatch();
  const bookmarksRef = useRef<HTMLElement>(null);

  const bookmarks = useAppSelector(selectAllBookmarks);
  const loadingBookmarks = useAppSelector(selectLoadingBookmarks);
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
    if (loadingBookmarks === "IDLE") {
      dispatch(getAllBookmarks());
    }
  }, [loadingBookmarks]);

  useEffect(() => {
    const bookmarks = bookmarksRef.current as HTMLElement;
    if (showBookmarks) {
      bookmarks.style.transform = "translateY(0%)";
    } else {
      bookmarks.style.transform = "translateY(-150%)";
    }
  }, [showBookmarks]);

  return (
    <nav
      className={bookmarksStyles.bookmarksContainer}
      ref={bookmarksRef}
      style={{
        height: bookmarks.length >= 1 ? `${bookmarks.length} * 3rem` : "0rem",
        visibility: bookmarks.length >= 1 ? "visible" : "hidden",
      }}
    >
      <ul className={bookmarksStyles.bookmarksContainer__bookmarks}>
        {(bookmarks as TemplateBookmark[]).map((bookmark) => {
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

const Bookmark: FC<TemplateBookmark> = ({
  dest,
  label,
  bookmark_uid,
  type,
  id,
}) => {
  const dispatch = useAppDispatch();
  const [showDeleteBookmark, setShowDeleteBookmark] = useState<boolean>(false);

  const deleteBookmark = () => {
    dispatch(
      setScreenLoadingMessage(
        "Încercăm să ștergem un marcaj, vă rugăm să așteptați..."
      )
    );
    dispatch(deleteBookmarkById(bookmark_uid as string));
  };

  return (
    <div
      className={bookmarksStyles.bookmarksContainer__bookmark}
      onMouseEnter={() => setShowDeleteBookmark(true)}
      onMouseLeave={() => setShowDeleteBookmark(false)}
    >
      <Link href={dest} aria-label={label} title={label}>
        {bookmarkIconShownMap.find((icon) => icon.dest === dest)?.icon || (
          <BsQuestionLg aria-label={label} title={label} />
        )}
      </Link>
      <AiFillDelete
        style={{ opacity: showDeleteBookmark ? "1" : "0" }}
        aria-label={`Stergeti marcajul: ${label}`}
        title={`Stergeti marcajul: ${label}`}
        onClick={() => deleteBookmark()}
        className={bookmarksStyles.bookmarksContainer__deleteBookmark}
      />
    </div>
  );
};

export default BookmarksNav;
