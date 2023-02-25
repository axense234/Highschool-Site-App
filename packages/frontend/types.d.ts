// React Types
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
};
