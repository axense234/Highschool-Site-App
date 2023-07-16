import { Admin, Student, Teacher } from "@prisma/client";

interface ProfileDetailsProps {
  profile: Admin | Student | Teacher;
}

export default ProfileDetailsProps;
