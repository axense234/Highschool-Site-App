// React/Prisma Types
import {
  Announcement,
  Subjects,
  Teacher,
  Admin,
  Student,
  AnnouncementCategory,
  StudentCard,
  StudentCardSection,
  Grade,
  Class,
  Absence,
} from "@prisma/client";
import { JSX, Dispatch, SetStateAction } from "react";

// TYPES/INTERFACES FOR TEMPLATE DATA
type User = Admin | Student | Teacher;

type TemplatePassReset = {
  recipient: string;
  modelType: "ADMIN" | "ELEV" | "PROFESOR";
};

type EmailFormTemplate = {
  sender: string;
  emailAddress: string;
  subject: string;
  message: string;
};

interface TemplateAnnouncement extends Announcement {
  announcement_uid?: string;
}

interface TemplateClass extends Class {
  class_uid?: string;
  id?: string;
  students?: Student[] | string[];
  teachers?: Teacher[] | string[];
  master_teacher?: Teacher;
}

interface TemplateTeacher extends Teacher {
  teacher_uid?: string;
  role: "ADMIN" | "ELEV" | "PROFESOR";
}

interface TemplateUpdateTeacher extends Teacher {
  teacher_uid: string;
  id?: string;
  description?: string;
  subject?: string;
  fullname?: string;
  email?: string;
  master_catalogue_uid?: string;
  master_class_uid?: string;
  password?: string;
  passwordVer?: string;
  master?: boolean;
  master_class_label?: string;
  role?: string;
  profile_img_url?: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  createdAt?: Date;
  updatedAt?: Date;
}

interface TemplateAdmin extends Admin {
  admin_uid?: string;
  id?: string;
  profile_img_url?: string;
  role: "ADMIN" | "ELEV" | "PROFESOR";
}

interface TemplateStudentCardSection extends StudentCardSection {
  grades?: Grade[];
  absences?: Absence[];
}

interface TemplateStudentCard extends StudentCard {
  content?: TemplateStudentCardSection[];
}

interface TemplateUpdateAdmin extends Admin {
  admin_uid: string;
  id?: string;
  email?: string;
  password?: string;
  passwordVer?: string;
  fullname?: string;
  createdAt?: Date;
  updatedAt?: Date;
  profile_img_url?: string;
  role?: string;
}

interface TemplateStudent extends Student {
  student_uid?: string;
  id?: string;
  profile_img_url?: string;
  role: "ADMIN" | "ELEV" | "PROFESOR";
  class_uid?: string;
  student_card_uid?: string;
}

interface TemplateUpdateStudent extends Student {
  student_uid: string;
  id?: string;
  profile_img_url?: string;
  role?: string;
  class_uid?: string;
  student_card_uid?: string;
  email?: string;
  password?: string;
  passwordVer?: string;
  fullname?: string;
  class_label?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TemplateUser {
  fullname: string;
  password: string;
  email: string;
  role: "ADMIN" | "ELEV" | "PROFESOR" | "";
  student_card?: TemplateStudentCard;
}

type OverlayType = {
  overlayFunctionUsed: string;
  showOverlay: boolean;
  title: string;
};

// TYPES/INTERFACES FOR OPTIONS DATA
type GetAllQueryParams = { sortByOption: string; query: string };

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
  value: string | boolean | string[];
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
  backgroundUrl?: string;
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

type FormModalPropsType =
  | "teachers"
  | "announcements"
  | "general"
  | "students"
  | "admins"
  | "classes";

interface FormModalProps {
  type: FormModalPropsType;
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
  templateTeacher: TemplateUpdateTeacher;
}

interface AccountsFormProps {
  type: "signup" | "login" | "reset-pass";
}

interface FormStepProps {
  step: number;
  shown: boolean;
  pageType: "signup" | "login" | "reset-pass";
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setCurrentType: Dispatch<SetStateAction<TypeNavOptionLabel>>;
}

type SelectOptionType = {
  id: number;
  label: string;
};

interface ProfileContentProps {
  optionType: string;
}

interface ProfileDetailsProps {
  profile: Admin | Student | Teacher;
}

type CountMapObject = {
  [key: string]: number;
};

interface ComponentPreviewProps {
  component: TemplateTeacher | TemplateStudent;
  type: "teacher" | "student";
}

interface ProfileDashboardProps {
  profile: Student | Admin | Teacher;
  type: "read" | "profile";
}

interface ProfileStudentCatalogueProps {
  profile: TemplateUser;
}

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
  TemplateAdmin,
  TemplateStudent,
  TemplatePassReset,
  TemplateUpdateTeacher,
  TemplateUpdateAdmin,
  TemplateUpdateStudent,
  FormModalType,
  FormModalPropsType,
  ProfileContentProps,
  ProfileDetailsProps,
  TemplateStudentCard,
  CountMapObject,
  TemplateClass,
  ComponentPreviewProps,
  ProfileDashboardProps,
  ProfileStudentCatalogueProps,
};
