import { AsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { Announcement, AnnouncementCategory, Teacher } from "@prisma/client";
import TemplateAdmin from "../interfaces/template/TemplateAdmin";
import TemplateStudent from "../interfaces/template/TemplateStudent";
import TemplateTeacher from "../interfaces/template/TemplateTeacher";

type OverlayType = {
  overlayFunctionUsed: string;
  showOverlay: boolean;
  title: string;
};

type GetAllQueryParams = { sortByOption: string; query: string };

type BookSortingOptions = {
  sortByFilter?: string;
  sortByFilterValue?: string;
  filterQuery?: string;
  filterQueryValue?: string;
  hasPdfFileUrl?: boolean;
};

type CategoryType = {
  id: number;
  name: AnnouncementCategory;
  dest?: string;
  label?: string | AnnouncementCategory;
};

type User = TemplateAdmin | TemplateStudent | TemplateTeacher;

type DocumentOrLaw = {
  id: number;
  label: string;
  pdfURLs: string[];
};

type GetAllAnnouncementsThunkInterface = AsyncThunk<
  AxiosError<unknown, any> | Announcement[],
  GetAllQueryParams,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  AsyncThunkConfig
>;
type GetAllTeachersThunkInterface = AsyncThunk<
  AxiosError<unknown, any> | Teacher[],
  GetAllQueryParams,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  AsyncThunkConfig
>;

type FunctionUsedOnPageNavSubmit =
  | GetAllAnnouncementsThunkInterface
  | GetAllTeachersThunkInterface;

type FormModalType = {
  showModal: boolean;
  msg: string;
  color?: string;
};

type ErrorPayloadType = {
  msg: string;
  user?: User;
};

type GradeOrAbsenceSectionType = {
  sectionId: string;
  type: "absence" | "grade";
};

type TemplateUserNotification = {
  userId: string;
  userType: "ADMIN" | "PROFESOR" | "ELEV";
  notificationTitle: string;
  notificationMessage: string;
};

export {
  OverlayType,
  GetAllQueryParams,
  BookSortingOptions,
  CategoryType,
  User,
  DocumentOrLaw,
  GetAllAnnouncementsThunkInterface,
  GetAllTeachersThunkInterface,
  FunctionUsedOnPageNavSubmit,
  FormModalType,
  ErrorPayloadType,
  GradeOrAbsenceSectionType,
  TemplateUserNotification,
};
