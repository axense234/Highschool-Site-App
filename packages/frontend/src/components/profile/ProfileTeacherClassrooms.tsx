// React
import { FC } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Types
import ProfileTeacherClassroomsProps from "@/core/interfaces/component/ProfileTeacherClassroomsProps";
import TemplateClass from "@/core/interfaces/template/TemplateClass";
import TemplateTeacher from "@/core/interfaces/template/TemplateTeacher";
// SCSS
import profileSettingsStyles from "../../scss/components/profile/ProfileSettingsForm.module.scss";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
import { selectTeacherById } from "@/redux/slices/teachersSlice";
import { selectProfile } from "@/redux/slices/generalSlice";

const ProfileTeacherClassrooms: FC<ProfileTeacherClassroomsProps> = ({
  teacherId,
  type,
}) => {
  const teacher = useAppSelector((state: State) =>
    selectTeacherById(state, teacherId)
  ) as TemplateTeacher;
  const profile = useAppSelector(selectProfile);

  const usedTeacher = type === "own" ? (profile as TemplateTeacher) : teacher;
  const usedTeacherClasses =
    profile.role === "ADMIN"
      ? usedTeacher.classes
      : usedTeacher.classes.filter((classroom) => classroom.public) || [];

  return (
    <div className={profileSettingsStyles.profileSettingsContainer}>
      {usedTeacherClasses?.length >= 1 ? (
        <ul
          className={
            profileSettingsStyles.profileSettingsContainer__teacherClassrooms
          }
        >
          {usedTeacherClasses?.map((classroom) => {
            return (
              <TeacherClassroom {...classroom} key={classroom.class_uid} />
            );
          })}
        </ul>
      ) : (
        <p>Profesorul nu are clase la care predă.</p>
      )}
    </div>
  );
};

const TeacherClassroom: FC<TemplateClass> = ({
  image_url,
  label,
  class_uid,
}) => {
  return (
    <Link
      className={
        profileSettingsStyles.profileSettingsContainer__teacherClassroom
      }
      title={`Mai multe detalii despre clasa ${label}`}
      aria-label={`Mai multe detalii despre clasa ${label}`}
      href={`/clase/${class_uid}`}
    >
      <Image
        alt={label as string}
        src={image_url as string}
        width={100}
        height={100}
      />
      <h3>{label}</h3>
    </Link>
  );
};

export default ProfileTeacherClassrooms;
