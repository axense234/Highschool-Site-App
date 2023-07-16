import { Dispatch, SetStateAction } from "react";
import TemplateAnnouncement from "../template/TemplateAnnouncement";

interface EditableAnnouncementProps {
  templateAnnouncement: TemplateAnnouncement | undefined;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

export default EditableAnnouncementProps;
