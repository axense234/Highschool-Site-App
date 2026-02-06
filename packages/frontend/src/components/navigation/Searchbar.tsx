// React
import { FC, SyntheticEvent, useEffect, useRef } from "react";
// Next
import Link from "next/link";
import { useRouter } from "next/router";
// React Icons
import { IoMdArrowBack } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
// Types
import { AnnouncementCategory } from "@prisma/client";
import { PageData } from "@/core/types/constants";
import SearchbarProps from "@/core/interfaces/component/SearchbarProps";
// SCSS
import searchbarStyles from "../../scss/components/navigation/Searchbar.module.scss";
// Data
import { announcementCategories, individualPagesData, pagesData } from "@/data";
// Utils
import normalizeString from "@/utils/normalizeString";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCurrentPathname,
  selectProfile,
  selectSearchbarQuery,
  updateSearchbarQuery,
} from "@/redux/slices/generalSlice";
import {
  addCategoryToggle,
  clearCategoryToggles,
  selectAllAnnouncements,
  setFoundAnnouncementId,
} from "@/redux/slices/announcementsSlice";
import {
  selectAllTeachers,
  setFoundTeacherId,
} from "@/redux/slices/teachersSlice";
import { selectAllClasses } from "@/redux/slices/classesSlice";

const Searchbar: FC<SearchbarProps> = ({ setShowSearchbar, showSearchbar }) => {
  const dispatch = useAppDispatch();
  const searchbarRef = useRef<HTMLDivElement>(null);

  const categoryNames = announcementCategories?.map((cat) => cat.name);

  const profile = useAppSelector(selectProfile);
  const pathname = useAppSelector(selectCurrentPathname);
  const searchbarQuery = useAppSelector(selectSearchbarQuery);

  const announcements = useAppSelector(selectAllAnnouncements);
  const teachers = useAppSelector(selectAllTeachers);
  const classes = useAppSelector(selectAllClasses);

  const usableClasses = classes.filter((classItem) => classItem.public);

  const router = useRouter();

  const recommendationsFromClasses = usableClasses?.map((usableClass) => {
    return {
      id: usableClass.class_uid,
      dest: `/clase/${usableClass.class_uid}`,
      label: `Clasa ${usableClass.label}`,
      type: "class",
    };
  });

  const recommendationsFromAnnouncements = announcements?.map((ann) => {
    return {
      id: ann.id,
      dest: `/anunturi`,
      label: `Anunț - ${ann.title}`,
      type: "announcement",
    };
  });

  const recommendationsFromTeachers = teachers?.map((teacher) => {
    return {
      id: teacher.id,
      dest: `/profesori`,
      label: `Profesor de ${teacher.subject} - ${teacher.fullname}`,
      type: "teacher",
    };
  });

  const foundIndividualPageData =
    individualPagesData.find((pageData) => pageData.pageDest === pathname) ||
    individualPagesData[0];

  const foundIndividualPageRecommendations =
    foundIndividualPageData.recommendations;

  const allPageRecommendations = individualPagesData
    .filter((pageData) => pageData.pageDest !== pathname)
    ?.map((pageData) => pageData.recommendations)
    .flat();

  const allPageRecommendationsInOrder = foundIndividualPageRecommendations
    .concat(
      pagesData.filter((page) => {
        return page.dest !== pathname && (profile || page.dest !== "/profil");
      })
    )
    .concat(allPageRecommendations)
    .concat(recommendationsFromAnnouncements)
    .concat(recommendationsFromTeachers)
    .concat(recommendationsFromClasses);

  const shownRecommendations = allPageRecommendationsInOrder.filter((rec) =>
    normalizeString(rec.label).includes(searchbarQuery.toLocaleLowerCase())
  );

  useEffect(() => {
    const searchbar = searchbarRef.current as HTMLElement;
    if (showSearchbar) {
      searchbar.style.display = "flex";
      setTimeout(() => {
        searchbar.style.transform = "translateX(0%)";
      }, 100);
    } else {
      searchbar.style.transform = "translateX(100%)";
      setTimeout(() => {
        searchbar.style.display = "none";
      }, 100);
    }
  }, [showSearchbar]);

  const handleOnRecommendationClick = (rec: PageData) => {
    if (categoryNames.find((cat) => cat === rec.label.split(" ")[1])) {
      dispatch(clearCategoryToggles());
      dispatch(
        addCategoryToggle(rec.label.split(" ")[1] as AnnouncementCategory)
      );
    }

    if (rec.type === "announcement") {
      const foundElement = announcements.find(
        (ann) =>
          normalizeString(ann.title) ===
          normalizeString(rec.label.split("Anunț - ")[1].toLowerCase())
      );

      dispatch(clearCategoryToggles());
      dispatch(
        addCategoryToggle(foundElement?.category as AnnouncementCategory)
      );
      dispatch(setFoundAnnouncementId(foundElement?.id as string));
    } else if (rec.type === "teacher") {
      const foundElement = teachers.find(
        (ann) =>
          normalizeString(ann.fullname) ===
          rec.label.split("- ")[1].toLowerCase()
      );

      dispatch(setFoundTeacherId(foundElement?.id as string));
    }
    setShowSearchbar(false);
  };

  const handleOnSearchbarSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    handleOnRecommendationClick(shownRecommendations[0]);

    router.push(
      searchbarQuery ? (shownRecommendations as PageData[])[0].dest : pathname,
      {},
      { scroll: false }
    );
  };

  return (
    <div className={searchbarStyles.searchbarContainer} ref={searchbarRef}>
      <div className={searchbarStyles.searchbarContainer__content}>
        <button
          type="button"
          aria-label="Înapoi"
          title="Înapoi"
          onClick={() => setShowSearchbar(false)}
        >
          <IoMdArrowBack />
        </button>
        <div className={searchbarStyles.searchbarContainer__searchbar}>
          <form
            className={searchbarStyles.searchbarContainer__searchbarForm}
            onSubmit={(e) => handleOnSearchbarSubmit(e)}
          >
            <input
              type="text"
              name="searchbar"
              id="searchbar"
              value={searchbarQuery}
              placeholder={foundIndividualPageData?.searchbarPlaceholder}
              onChange={(e) => dispatch(updateSearchbarQuery(e.target.value))}
            />
            <button type="submit" aria-label="Căutați" title="Căutați">
              <BiSearch />
            </button>
          </form>
          {(shownRecommendations?.length as number) >= 1 && (
            <ul className={searchbarStyles.searchbarContainer__recommendations}>
              {shownRecommendations?.slice(0, 8)?.map((rec, index) => {
                return (
                  <li
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    aria-label={rec.label}
                    title={rec.label}
                    onClick={() => handleOnRecommendationClick(rec)}
                  >
                    <Link href={rec.dest} scroll={false}>
                      {rec.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
