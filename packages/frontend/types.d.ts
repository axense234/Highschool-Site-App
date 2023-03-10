// React/Prisma Types
import { Anunt, Materii, Profesor, Utilizator } from "@prisma/client";
import { JSX, Dispatch, SetStateAction } from "react";

// Types
type sidebarLink = {
  id: number;
  label?: string;
  logoUrl: JSX.Element;
  dest: string;
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

type OverlayType = {
  overlayFunctionUsed: string;
  showOverlay: boolean;
};

type AboutTechnologyType = {
  id: number;
  logoUrl: string;
  label: string;
  techUrl: string;
};

// Interfaces
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

interface OverlayProps {
  title: string;
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
  OverlayProps,
  CardModalProps,
  MaterieType,
  templateAnnouncement,
  templateTeacher,
  OverlayType,
  FormModalProps,
  VideoContainerProps,
  AboutTechnologyType,
};
