// React/Prisma Types
import { Utilizator } from "@prisma/client";
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
};

type ThemeType = "light" | "dark";

// Interfaces
interface MetaProps {
  keywords?: string;
  desc?: string;
  title?: string;
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
  showOverlay: boolean;
  setShowOverlay: Dispatch<SetStateAction<boolean>>;
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
};
