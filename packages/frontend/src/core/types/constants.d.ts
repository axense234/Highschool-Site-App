import { AnnouncementCategory, Subjects } from "@prisma/client";

type BookmarkIconShownMapType = {
  id: number;
  dest: string | RegExp;
  icon?: JSX.Element;
  hasRegExpDest?: boolean;
};

type TypeNavOptionLabel =
  | "ADMIN"
  | "ELEV"
  | "PROFESOR"
  | "PAROLA UITATA"
  | "RESETARE PAROLA";

type TypeNavOptionStep = {
  id: number;
  label: string;
};

type TypeNavOption = {
  id: number;
  label: TypeNavOptionLabel;
  steps?: TypeNavOptionStep[];
};

type SortByOption = {
  id: number;
  label: string;
  value?: string;
};

type ProfileOption = {
  id: number;
  label: string;
  content: string;
};

type IstoricPinPoint = {
  id: number;
  timePeriod: string | number;
  content: string;
};

type SubjectType = {
  id: number;
  name: Subjects;
};

type AboutTechnologyType = {
  id: number;
  logoUrl: string;
  label: string;
  techUrl: string;
};

type SidebarLink = {
  id: number;
  label?: string;
  logoUrl: JSX.Element;
  dest: string;
};

type InfoSectionType = {
  id: number;
  logoUrl: string;
  desc: string;
  title: string;
  dest?: string;
};

type FacilityImageType = {
  id: number;
  logoUrl: string;
  title: string;
};

type FacilityRoomType = {
  id: number;
  desc: string;
};

type OfferingItemType = InfoSectionType;

type BackgroundImageUrl = {
  pagePath: string;
  backgroundUrl: string;
};

type IndividualPageData = {
  id: number;
  searchbarPlaceholder: string;
  pageDest: string;
  recommendations: PageData[];
};

type PageData = {
  id: number | string;
  label: string | AnnouncementCategory;
  dest: string;
  type?: string;
};

type ObjectKeyValueType = {
  key: string;
  value: string | boolean | string[] | number;
};

type FormModalPropsType =
  | "teachers"
  | "announcements"
  | "general"
  | "students"
  | "admins"
  | "classes"
  | "books";

type SelectOptionType = {
  id: number;
  label: string;
};

type CountMapObject = {
  [key: string]: number;
};

export {
  BookmarkIconShownMapType,
  TypeNavOptionLabel,
  TypeNavOptionStep,
  TypeNavOption,
  SortByOption,
  ProfileOption,
  IstoricPinPoint,
  SubjectType,
  AboutTechnologyType,
  SidebarLink,
  InfoSectionType,
  FacilityImageType,
  FacilityRoomType,
  OfferingItemType,
  BackgroundImageUrl,
  IndividualPageData,
  PageData,
  ObjectKeyValueType,
  FormModalPropsType,
  SelectOptionType,
  CountMapObject,
};
