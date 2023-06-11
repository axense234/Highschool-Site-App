// React
import { FC, SyntheticEvent } from "react";
// Types
import { FunctionUsedOnPageNavSubmit, PageNavProps } from "types";
import { Anunt, CategorieAnunt, Profesor } from "@prisma/client";
// React Icons
import { BiSearch } from "react-icons/bi";
// SCSS
import pageNavStyles from "../scss/components/PageNav.module.scss";
// Data
import { sortByAnnouncementOptions, sortByTeacherOptions } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addCategoryToggle,
  clearCategoryToggles,
  getAllAnnouncements,
  selectAllAnnouncements,
  setFoundAnnouncementId,
} from "@/redux/slices/announcementsSlice";
import {
  getAllTeachers,
  selectAllTeachers,
  setFoundTeacherId,
} from "@/redux/slices/teachersSlice";
import {
  selectGetAllQueryParams,
  updateGetAllQueryParams,
} from "@/redux/slices/generalSlice";

const PageNav: FC<PageNavProps> = ({ componentType }) => {
  const dispatch = useAppDispatch();
  const { query, sortByOption } = useAppSelector(selectGetAllQueryParams);
  const announcements = useAppSelector(selectAllAnnouncements);
  const teachers = useAppSelector(selectAllTeachers);

  const searchableElements =
    componentType === "announcement" ? announcements : teachers;

  const searchBarPlaceholder =
    componentType === "announcement"
      ? "ex: Concurs, Eveniment"
      : "ex: Elena Maria, Ion Oprea";

  const functionUsedOnSubmit: FunctionUsedOnPageNavSubmit =
    componentType === "announcement" ? getAllAnnouncements : getAllTeachers;

  const sortByOptions =
    componentType === "announcement"
      ? sortByAnnouncementOptions.map((categorie) => {
          return (
            <option key={categorie.id} value={categorie.value}>
              {categorie.label}
            </option>
          );
        })
      : sortByTeacherOptions.map((materie) => {
          return (
            <option key={materie.id} value={materie.value}>
              {materie.label}
            </option>
          );
        });

  const handleSearchBarSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Can't really find a more solid option soo
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const foundElement = searchableElements.find(
      (element: Profesor | Anunt) => {
        const foundSearchableElement =
          componentType === "announcement"
            ? (element as Anunt).titlu
            : (element as Profesor).username;

        return foundSearchableElement
          .toLowerCase()
          .includes(query.toLowerCase());
      }
    );

    console.log(foundElement);

    if (componentType === "announcement") {
      dispatch(clearCategoryToggles());
      dispatch(addCategoryToggle(foundElement?.categorie as CategorieAnunt));
      dispatch(setFoundAnnouncementId(foundElement?.id as string));
    } else if (componentType === "teacher") {
      dispatch(setFoundTeacherId(foundElement?.id as string));
    }
  };

  return (
    <nav
      className={pageNavStyles.pageNavContainer}
      style={{ width: componentType === "announcement" ? "80%" : "100%" }}
    >
      <div className={pageNavStyles.pageNavContainer__sortingOptions}>
        <div className={pageNavStyles.pageNavContainer__sortingOption}>
          <label htmlFor="sortBy">Sortați după:</label>
          <select
            name="sortBy"
            id="sortBy"
            value={sortByOption}
            onChange={(e) => {
              dispatch(
                updateGetAllQueryParams({
                  key: "sortByOption",
                  value: e.target.value,
                })
              );
              dispatch(
                functionUsedOnSubmit({
                  query,
                  sortByOption: e.target.value,
                })
              );
            }}
          >
            {sortByOptions}
          </select>
        </div>
      </div>
      <form
        className={pageNavStyles.pageNavContainer__searchBar}
        onSubmit={(e) => handleSearchBarSubmit(e)}
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder={searchBarPlaceholder}
          value={query}
          onChange={(e) =>
            dispatch(
              updateGetAllQueryParams({ key: "query", value: e.target.value })
            )
          }
        />
        <button type="submit">
          <BiSearch aria-label="Căutați" title="Căutați" />
        </button>
      </form>
    </nav>
  );
};

export default PageNav;
