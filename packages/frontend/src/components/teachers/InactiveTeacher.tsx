// React
import { FC, RefObject, useEffect, useRef } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Types
import { Teacher } from "@prisma/client";
import { TemplateTeacher, TemplateUpdateTeacher } from "types";
// SCSS
import teachersStyles from "../../scss/components/pages/Teachers.module.scss";
// Components
import EditableTeacher from "./EditableTeacher";
import CardModal from "../modals/CardModal";
// Redux
import { State } from "@/redux/api/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectOverlay,
  selectCardModalId,
  selectEditMode,
  setCardModalId,
} from "@/redux/slices/generalSlice";
import {
  selectTeacherById,
  selectFoundTeacherId,
  selectTemplateTeacher,
  setTemplateTeacher,
  setFoundTeacherId,
} from "@/redux/slices/teachersSlice";

const InactiveTeacher: FC<Teacher> = ({
  description,
  profile_img_url,
  subject,
  fullname,
  teacher_uid,
}) => {
  const dispatch = useAppDispatch();
  const teacherRef = useRef<HTMLAnchorElement>(null);

  const overlay = useAppSelector(selectOverlay);
  const editMode = useAppSelector(selectEditMode);
  const cardModalId = useAppSelector(selectCardModalId);
  const foundTeacherId = useAppSelector(selectFoundTeacherId);
  const templateTeacher = useAppSelector(selectTemplateTeacher);

  const teacher = useAppSelector((state: State) =>
    selectTeacherById(state, cardModalId)
  );

  const editModeAvailable = teacher_uid === cardModalId && editMode;

  useSetTemplateTeacher(teacher);
  useScrollToTeacher(foundTeacherId, teacher_uid, teacherRef);

  if (editModeAvailable) {
    return (
      <EditableTeacher
        templateTeacher={templateTeacher as TemplateUpdateTeacher}
      />
    );
  }

  return (
    <Link
      href={`/profil/${teacher_uid}?type=teacher`}
      className={teachersStyles.teachersContainer__teacher}
      onMouseEnter={() => {
        dispatch(setCardModalId(teacher_uid));
      }}
      onMouseLeave={() => {
        if (!overlay.showOverlay) {
          dispatch(setCardModalId(""));
        }
      }}
      ref={teacherRef}
    >
      <Image
        src={profile_img_url}
        alt={fullname}
        width={500}
        height={500}
        title={fullname}
      />
      <div className={teachersStyles.teachersContainer__teacherInfo}>
        <h3>{fullname}</h3>
        <p>Profesor de: {subject}</p>
        <p>
          {description.length >= 200
            ? `${description.slice(0, 200)}...`
            : description}
        </p>
      </div>
      <CardModal cardId={teacher_uid} componentType="teacher" />
    </Link>
  );
};

const useSetTemplateTeacher = (teacher: Teacher | undefined) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (teacher?.fullname) {
      dispatch(setTemplateTeacher(teacher as TemplateTeacher));
    }
  }, [teacher?.fullname]);
};

const useScrollToTeacher = (
  foundTeacherId: string,
  teacher_uid: string,
  teacherRef: RefObject<HTMLElement>
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (foundTeacherId === teacher_uid) {
      window.scrollBy({
        behavior: "smooth",
        top: teacherRef.current?.getBoundingClientRect().top,
      });
      (teacherRef.current as HTMLElement).classList.add("shaking");
      timeout = setTimeout(() => {
        dispatch(setFoundTeacherId(""));
        (teacherRef.current as HTMLElement).classList.remove("shaking");
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [foundTeacherId]);
};

export default InactiveTeacher;
