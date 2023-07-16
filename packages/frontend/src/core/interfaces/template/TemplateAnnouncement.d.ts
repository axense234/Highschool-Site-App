import { Announcement, AnnouncementCategory } from "@prisma/client";

interface TemplateAnnouncement extends Partial<Announcement> {
  category: AnnouncementCategory;
}

export default TemplateAnnouncement;
