// React
import { FC, useEffect, useRef, useState } from "react";
// React Icons
import { BsQuestionLg } from "react-icons/bs";
// Next
import Link from "next/link";
// React Icons
import { AiFillDelete } from "react-icons/ai";
// Types
import BookmarksMenuProps from "@/core/interfaces/component/BookmarksMenuProps";
import TemplateBookmark from "@/core/interfaces/template/TemplateBookmark";
// SCSS
import bookmarksStyles from "../../scss/components/navigation/BookmarksNav.module.scss";
// Data
import { bookmarkIconShownMap } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserProfile,
  selectProfile,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
import { deleteBookmarkById } from "@/redux/slices/bookmarksSlice";

const BookmarksNav: FC<BookmarksMenuProps> = ({ showBookmarks }) => {
  const bookmarksRef = useRef<HTMLElement>(null);
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    if (profile.bookmarks) {
      const bookmarks = bookmarksRef.current as HTMLElement;
      if (showBookmarks) {
        bookmarks.style.transform = "translateY(0%)";
      } else {
        bookmarks.style.transform = "translateY(-150%)";
      }
    }
  }, [showBookmarks, profile.bookmarks]);

  if (profile.bookmarks) {
    return (
      <nav
        className={bookmarksStyles.bookmarksContainer}
        ref={bookmarksRef}
        style={{
          height: `${profile.bookmarks.length} * 3rem`,
          visibility: profile.bookmarks.length >= 1 ? "visible" : "hidden",
        }}
      >
        <ul className={bookmarksStyles.bookmarksContainer__bookmarks}>
          {(profile.bookmarks as TemplateBookmark[])?.map((bookmark) => {
            return (
              <li key={bookmark.bookmark_uid}>
                <BookmarkComponent {...bookmark} />
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
  return null;
};

const BookmarkComponent: FC<TemplateBookmark> = ({
  dest,
  label,
  bookmark_uid,
}) => {
  const dispatch = useAppDispatch();
  const [showDeleteBookmark, setShowDeleteBookmark] = useState<boolean>(false);

  const deleteBookmark = () => {
    dispatch(
      setScreenLoadingMessage(
        "Încercăm să ștergem un marcaj, vă rugăm să așteptați..."
      )
    );
    dispatch(deleteBookmarkById(bookmark_uid as string))
      .unwrap()
      .then(() => dispatch(getUserProfile()));
  };

  return (
    <div
      className={bookmarksStyles.bookmarksContainer__bookmark}
      onMouseEnter={() => setShowDeleteBookmark(true)}
      onMouseLeave={() => setShowDeleteBookmark(false)}
    >
      <Link href={dest as string} aria-label={label} title={label}>
        {bookmarkIconShownMap.find((icon) => {
          if (!icon.hasRegExpDest) {
            return (icon.dest as string).includes(dest as string);
          }
          return (icon.dest as RegExp).test(dest as string);
        })?.icon || <BsQuestionLg aria-label={label} title={label} />}
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
