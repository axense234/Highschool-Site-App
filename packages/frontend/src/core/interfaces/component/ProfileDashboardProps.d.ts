import { Student, Admin, Teacher } from "@prisma/client";

interface ProfileDashboardProps {
  profile: Student | Admin | Teacher;
  type: "read" | "profile";
}

export default ProfileDashboardProps;
