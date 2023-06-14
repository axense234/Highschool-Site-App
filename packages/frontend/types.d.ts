// React/Prisma Types
import {
  Anunt,
  Materii,
  Profesor,
  Utilizator,
  CategorieAnunt,
} from "@prisma/client";
import { JSX, Dispatch, SetStateAction } from "react";

// Types
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
  label: string | CategorieAnunt;
  dest: string;
  type?: string;
};

type sidebarLink = {
  id: number;
  label?: string;
  logoUrl: JSX.Element;
  dest: string;
};

type EmailFormTemplate = {
  sender: string;
  emailAddress: string;
  subject: string;
  message: string;
};

type DocumentOrLaw = {
  id: number;
  label: string;
  pdfURLs: string[];
};

type SortByOption = {
  id: number;
  label: string;
  value?: string;
};

type FunctionUsedOnPageNavSubmit = AsyncThunk<
  AxiosError<unknown, any> | Anunt[] | Profesor[],
  GetAllQueryParams,
  AsyncThunkConfig
>;

type IstoricPinPoint = {
  id: number;
  timePeriod: string | number;
  content: string;
};

type infoSectionType = {
  id: number;
  logoUrl: string;
  desc: string;
  title: string;
};

type facilityImageType = {
  id: number;
  logoUrl: string;
  title: string;
};

type facilityRoomType = {
  id: number;
  desc: string;
};

type offeringItemType = infoSectionType;

type objectKeyValueType = {
  key: string;
  value: string;
};

type formModalType = {
  showModal: boolean;
  msg: string;
  color?: string;
};

type errorPayloadType = {
  msg: string;
  user?: Utilizator;
};

type profileOption = {
  id: number;
  label: string;
  content: string;
};

type ThemeType = "light" | "dark";

type MaterieType = {
  id: number;
  nume: Materii;
};

type CategorieType = {
  id: number;
  nume: CategorieAnunt;
  dest?: string;
  label?: string | CategorieAnunt;
};

type GetAllQueryParams = { sortByOption: string; query: string };

type OverlayType = {
  overlayFunctionUsed: string;
  showOverlay: boolean;
  title: string;
};

type AboutTechnologyType = {
  id: number;
  logoUrl: string;
  label: string;
  techUrl: string;
};

// Interfaces
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

interface InfoSectionProps extends infoSectionType {
  id?: number;
}

interface OfferingItemProps extends offeringItemType {
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
interface templateUser extends Utilizator {
  utilizator_uid?: string;
  username?: string;
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

interface templateAnnouncement extends Anunt {
  anunt_uid?: string;
}

interface templateTeacher extends Profesor {
  profesor_uid?: string;
}

interface FormModalProps {
  type: "teachers" | "announcements" | "general";
}

interface VideoContainerProps {
  workingVideoUrl: string;
  titlu: string;
  onVideoUrlChange: (videoUrl: string) => void;
}

export {
  sidebarLink,
  MetaProps,
  infoSectionType,
  InfoSectionProps,
  facilityImageType,
  facilityRoomType,
  offeringItemType,
  OfferingItemProps,
  SliderButtonsProps,
  HomeTitleProps,
  templateUser,
  objectKeyValueType,
  formModalType,
  errorPayloadType,
  profileOption,
  ThemeType,
  SectionLoadingProps,
  CardModalProps,
  MaterieType,
  templateAnnouncement,
  templateTeacher,
  OverlayType,
  FormModalProps,
  VideoContainerProps,
  AboutTechnologyType,
  IstoricPinPoint,
  DocumentOrLaw,
  EmailFormTemplate,
  CategorieType,
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
};
