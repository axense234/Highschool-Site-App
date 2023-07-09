// React
import { FC, useState } from "react";
// Next
import Link from "next/link";
// Types
import { MarkableHeadingProps } from "types";
// React Icons
import { BsBookmarkPlusFill } from "react-icons/bs";
// SCSS
import markableHeadingStyles from "../../scss/components/navigation/MarkableHeading.module.scss";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCurrentPathname,
  selectProfile,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
import { createBookmark } from "@/redux/slices/bookmarksSlice";

const MarkableHeading: FC<MarkableHeadingProps> = ({
  type,
  hasHiddenClassname,
  textContent,
  headingRef,
  idUsed,
  isLink,
  linkHref,
}) => {
  useGetPathname();
  const dispatch = useAppDispatch();
  const [showAddBookmark, setShowAddBookmark] = useState<boolean>(false);

  const currentPathName = useAppSelector(selectCurrentPathname);
  const profile = useAppSelector(selectProfile);

  let uidUsedBasedOnProfileRole: any;
  switch (profile.role) {
    case "ELEV":
      uidUsedBasedOnProfileRole = "student_uid";
      break;
    case "PROFESOR":
      uidUsedBasedOnProfileRole = "teacher_uid";
      break;
    case "ADMIN":
      uidUsedBasedOnProfileRole = "admin_uid";
      break;

    default:
      break;
  }

  const addBookmark = () => {
    dispatch(
      setScreenLoadingMessage(
        "Încercăm să adăugăm un marcaj, vă rugăm să așteptați..."
      )
    );
    dispatch(
      createBookmark({
        label: textContent,
        dest: currentPathName,
        type: "NORMAL",
        [uidUsedBasedOnProfileRole as string]: profile.id as string,
      })
    );
  };

  if (type === "h1") {
    return (
      <div
        className={markableHeadingStyles.markableHeadingContainer}
        onMouseEnter={() => setShowAddBookmark(true)}
        onMouseLeave={() => setShowAddBookmark(false)}
      >
        <h1
          className={hasHiddenClassname ? "hidden" : "lol"}
          ref={headingRef}
          id={idUsed}
        >
          {isLink ? (
            <Link href={linkHref as string}>{textContent}</Link>
          ) : (
            textContent
          )}
        </h1>
        <BsBookmarkPlusFill
          style={{ opacity: showAddBookmark ? "1" : "0" }}
          title="Adăugați la bara de marcaje"
          aria-label="Adăugați la bara de marcaje"
          onClick={() => addBookmark()}
        />
      </div>
    );
  }

  if (type === "h2")
    return (
      <div
        className={markableHeadingStyles.markableHeadingContainer}
        onMouseEnter={() => setShowAddBookmark(true)}
        onMouseLeave={() => setShowAddBookmark(false)}
      >
        <h2
          className={hasHiddenClassname ? "hidden" : "lol"}
          ref={headingRef}
          id={idUsed}
        >
          {isLink ? (
            <Link href={linkHref as string}>{textContent}</Link>
          ) : (
            textContent
          )}
        </h2>
        <BsBookmarkPlusFill
          style={{ opacity: showAddBookmark ? "1" : "0" }}
          title="Adăugați la bara de marcaje"
          aria-label="Adăugați la bara de marcaje"
        />
      </div>
    );

  if (type === "h3")
    return (
      <div
        className={markableHeadingStyles.markableHeadingContainer}
        onMouseEnter={() => setShowAddBookmark(true)}
        onMouseLeave={() => setShowAddBookmark(false)}
      >
        <h3
          className={hasHiddenClassname ? "hidden" : "lol"}
          ref={headingRef}
          id={idUsed}
        >
          {isLink ? (
            <Link href={linkHref as string}>{textContent}</Link>
          ) : (
            textContent
          )}
        </h3>
        <BsBookmarkPlusFill
          style={{ opacity: showAddBookmark ? "1" : "0" }}
          title="Adăugați la bara de marcaje"
          aria-label="Adăugați la bara de marcaje"
        />
      </div>
    );

  return null;
};

export default MarkableHeading;
