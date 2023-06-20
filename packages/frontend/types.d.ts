// React/Prisma Types
import {
  Announcement,
  Subjects,
  Teacher,
  Admin,
  Student,
  AnnouncementCategory,
} from "@prisma/client";
import { JSX, Dispatch, SetStateAction } from "react";

// TYPES/INTERFACES FOR TEMPLATE DATA
type User = Admin | Student | Teacher;

type EmailFormTemplate = {
  sender: string;
  emailAddress: string;
  subject: string;
  message: string;
};

interface TemplateAnnouncement extends Announcement {
  announcement_uid?: string;
}

interface TemplateTeacher extends Teacher {
  teacher_uid?: string;
}

interface TemplateUser {
  username: string;
  password: string;
  email: string;
}

type OverlayType = {
  overlayFunctionUsed: string;
  showOverlay: boolean;
  title: string;
};

// TYPES/INTERFACES FOR OPTIONS DATA
type GetAllQueryParams = { sortByOption: string; query: string };

type TypeNavOptionLabel = "ADMIN" | "ELEV" | "PROFESOR";

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

type CategoryType = {
  id: number;
  name: AnnouncementCategory;
  dest?: string;
  label?: string | AnnouncementCategory;
};

// TYPES/INTERFACES FOR STATIC DATA
type DocumentOrLaw = {
  id: number;
  label: string;
  pdfURLs: string[];
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

// TYPES/INTERFACES FOR PAGE DATA
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

// COMPONENT INTERFACES and TYPES/INTERFACES FOR REDUX
type FunctionUsedOnPageNavSubmit = AsyncThunk<
  AxiosError<unknown, any> | Announcement[] | Teacher[],
  GetAllQueryParams,
  AsyncThunkConfig
>;

type ObjectKeyValueType = {
  key: string;
  value: string;
};

type FormModalType = {
  showModal: boolean;
  msg: string;
  color?: string;
};

type ErrorPayloadType = {
  msg: string;
  user?: User;
};

interface ScreenLoadingProps {
  show: boolean;
}

interface SearchbarProps {
  showSearchbar: boolean;
  setShowSearchbar: Dispatch<SetStateAction<boolean>>;
}

interface SearchButtonProps {
  setShowSearchbar: Dispatch<SetStateAction<boolean>>;
}

interface MoveAnnouncementsModalProps {
  show: boolean;
  cardModalId: string;
}

interface MetaProps {
  keywords?: string;
  desc?: string;
  title?: string;
  imageUrls?: string[];
}

interface InfoSectionProps extends InfoSectionType {
  id?: number;
}

interface OfferingItemProps extends OfferingItemType {
  id?: number;
  listNumber: number;
}

interface SliderButtonsProps {
  handlePrevImage: () => void;
  handleNextImage: () => void;
  setStopAutoImages: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}

interface HomeTitleProps {
  title: string;
  quote?: string;
}

interface SectionLoadingProps {
  padding?: string;
}

interface PageNavProps {
  componentType: "teacher" | "announcement";
}

interface CardModalProps {
  cardId: string;
  componentType: "teacher" | "announcement";
}

interface FormModalProps {
  type: "teachers" | "announcements" | "general";
}

interface VideoContainerProps {
  workingVideoUrl: string;
  title: string;
  onVideoUrlChange: (videoUrl: string) => void;
}

interface EditableAnnouncementProps {
  templateAnnouncement: TemplateAnnouncement | undefined;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

interface InactiveAnnouncementProps {
  announcement: Announcement | undefined;
  setToggle: Dispatch<SetStateAction<boolean>>;
  annRef: RefObject<HTMLElement>;
}

interface EditableTeacherProps {
  templateTeacher: TemplateTeacher;
}

interface AccountsFormProps {
  type: "signup" | "login";
}

interface FormStepProps {
  step: number;
  pageType: "signup" | "login";
}

type SelectOptionType = {
  id: number;
  label: string;
};

export {
  SidebarLink,
  MetaProps,
  InfoSectionType,
  InfoSectionProps,
  FacilityImageType,
  FacilityRoomType,
  OfferingItemType,
  OfferingItemProps,
  SliderButtonsProps,
  HomeTitleProps,
  ObjectKeyValueType,
  FormModalType,
  ErrorPayloadType,
  ProfileOption,
  SectionLoadingProps,
  CardModalProps,
  SubjectType,
  TemplateAnnouncement,
  TemplateTeacher,
  OverlayType,
  FormModalProps,
  VideoContainerProps,
  AboutTechnologyType,
  IstoricPinPoint,
  DocumentOrLaw,
  EmailFormTemplate,
  CategoryType,
  MoveAnnouncementsModalProps,
  PageNavProps,
  SortByOption,
  FunctionUsedOnPageNavSubmit,
  GetAllQueryParams,
  SearchButtonProps,
  SearchbarProps,
  PageData,
  IndividualPageData,
  BackgroundImageUrl,
  ScreenLoadingProps,
  TemplateUser,
  EditableAnnouncementProps,
  InactiveAnnouncementProps,
  EditableTeacherProps,
  User,
  AccountsFormProps,
  TypeNavOption,
  TypeNavOptionStep,
  TypeNavOptionLabel,
  FormStepProps,
  SelectOptionType,
};
