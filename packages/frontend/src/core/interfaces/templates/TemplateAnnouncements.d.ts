import { Announcement } from "@prisma/client";

interface TemplateAnnouncement extends Announcement {
  announcement_uid?: string;
}

export default TemplateAnnouncement;
