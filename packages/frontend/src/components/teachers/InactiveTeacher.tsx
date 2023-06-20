// React
import { FC, RefObject, useEffect, useRef } from "react";
// Next
import Image from "next/image";
// Types
import { Teacher } from "@prisma/client";
// SCSS
import teachersStyles from "../../scss/components/pages/Profesori.module.scss";
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
  username,
  teacher_uid,
}) => {
  const dispatch = useAppDispatch();
  const overlay = useAppSelector(selectOverlay);
  const cardModalId = useAppSelector(selectCardModalId);
  const editMode = useAppSelector(selectEditMode);

  const teacher = useAppSelector((state: State) =>
    selectTeacherById(state, cardModalId)
  );
  const foundTeacherId = useAppSelector(selectFoundTeacherId);
  const teacherRef = useRef<HTMLElement>(null);

  const editModeAvailable = teacher_uid === cardModalId && editMode;

  useSetTemplateTeacher(teacher);
  useScrollToTeacher(foundTeacherId, teacher_uid, teacherRef);

  const templateTeacher = useAppSelector(selectTemplateTeacher);

  if (editModeAvailable) {
    return <EditableTeacher templateTeacher={templateTeacher} />;
  }

  return (
    <article
      className={teachersStyles.profesoriContainer__profesor}
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
        src={
          (profile_img_url as string) ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        alt={username}
        width={500}
        height={500}
        title={username}
      />
      <div className={teachersStyles.profesoriContainer__profesorInfo}>
        <h3>{username}</h3>
        <p>Profesor de: {subject}</p>
        <p>
          {description.length >= 200
            ? `${description.slice(0, 200)}...`
            : description}
        </p>
      </div>
      <CardModal cardId={teacher_uid} componentType="teacher" />
    </article>
  );
};

const useSetTemplateTeacher = (teacher: Teacher | undefined) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (teacher?.username) {
      dispatch(setTemplateTeacher(teacher));
    }
  }, [teacher?.username]);
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
