import { Announcement } from "@prisma/client";
import { Dispatch, SetStateAction, RefObject } from "react";

interface InactiveAnnouncementProps {
  announcement: Announcement | undefined;
  setToggle: Dispatch<SetStateAction<boolean>>;
  annRef: RefObject<HTMLElement>;
}

export default InactiveAnnouncementProps;
