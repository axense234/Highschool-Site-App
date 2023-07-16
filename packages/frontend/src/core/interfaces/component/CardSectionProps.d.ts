import { Subjects, Grade, Absence } from "@prisma/client";
import { User } from "@/core/types/variables";

interface CardSectionProps {
  subject: Subjects;
  class_uid: string;
  section_uid: string;
  profile_used_uid: string;
  ownProfile: User;
  teacherFullname: string | null;
  teacherProfileImage: string | null;
  teacherId: string | null;
  grades: Grade[] | undefined;
  absences: Absence[] | undefined;
}

export default CardSectionProps;
