// React
import { FC, SyntheticEvent } from "react";
// React Icons
import { BiSearch } from "react-icons/bi";
// Types
import { Announcement, AnnouncementCategory, Teacher } from "@prisma/client";
import {
  FunctionUsedOnPageNavSubmit,
  GetAllAnnouncementsThunkInterface,
  GetAllTeachersThunkInterface,
} from "@/core/types/variables";
import PageNavProps from "@/core/interfaces/component/PageNavProps";
// SCSS
import pageNavStyles from "../../scss/components/navigation/PageNav.module.scss";
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
// Utils
import normalizeString from "@/utils/normalizeString";

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
    componentType === "announcement"
      ? (getAllAnnouncements as GetAllAnnouncementsThunkInterface)
      : (getAllTeachers as GetAllTeachersThunkInterface);

  const triggerSortBy = (value: string) => {
    dispatch(
      updateGetAllQueryParams({
        key: "sortByOption",
        value,
      })
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(functionUsedOnSubmit({ query, sortByOption: value as string }));
  };

  const sortByOptions =
    componentType === "announcement"
      ? sortByAnnouncementOptions?.map((categorie) => {
          return (
            <option key={categorie.id} value={categorie.value}>
              {categorie.label}
            </option>
          );
        })
      : sortByTeacherOptions?.map((materie) => {
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
      (element: Teacher | Announcement) => {
        const foundSearchableElement =
          componentType === "announcement"
            ? (element as Announcement).title
            : (element as Teacher).fullname;

        return normalizeString(foundSearchableElement).includes(
          normalizeString(query)
        );
      }
    );

    if (componentType === "announcement") {
      dispatch(clearCategoryToggles());
      dispatch(addCategoryToggle((foundElement as Announcement).category));
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
            onChange={(e) => triggerSortBy(e.target.value)}
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
