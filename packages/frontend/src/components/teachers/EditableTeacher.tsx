// React
import { FC, SyntheticEvent, useRef } from "react";
// Next
import Image from "next/image";
// Types
import { Subjects } from "@prisma/client";
import { EditableTeacherProps } from "types";
// React Icons
import { FcCheckmark } from "react-icons/fc";
import { FiPlus } from "react-icons/fi";
// SCSS
import teachersStyles from "../../scss/components/pages/Profesori.module.scss";
// Data
import { subjects } from "@/data";
// Components
import CardModal from "../modals/CardModal";
import EditFormModal from "../modals/EditFormModal";
// Redux
import {
  selectOverlay,
  setCardModalId,
  setEditMode,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImageForTeacher,
  updateTemplateTeacher,
  updateTeacherById,
} from "@/redux/slices/teachersSlice";

const EditableTeacher: FC<EditableTeacherProps> = ({ templateTeacher }) => {
  const dispatch = useAppDispatch();

  const { teacher_uid, profile_img_url, username, description, subject } =
    templateTeacher;
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);
  const overlay = useAppSelector(selectOverlay);

  const handleImagineProfilChange = (imagine: File | string) => {
    dispatch(createCloudinaryImageForTeacher(imagine as File));
  };

  const onUsernameChange = (username: string) => {
    dispatch(updateTemplateTeacher({ key: "username", value: username }));
  };

  const onSubjectChange = (subject: Subjects) => {
    dispatch(updateTemplateTeacher({ key: "subject", value: subject }));
  };

  const onDescriptionChange = (description: string) => {
    dispatch(updateTemplateTeacher({ key: "description", value: description }));
  };

  const handleUpdateTeacher = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      setScreenLoadingMessage(
        "Încercăm să actualizăm un profesor, vă rugăm să așteptați..."
      )
    );
    dispatch(updateTeacherById(templateTeacher));
    if (templateTeacher.username) {
      dispatch(setEditMode(false));
    }
  };

  return (
    <article
      className={teachersStyles.profesoriContainer__profesor}
      onMouseEnter={() => dispatch(setCardModalId(teacher_uid as string))}
      onMouseLeave={() => {
        if (!overlay.showOverlay) {
          dispatch(setCardModalId(""));
          dispatch(setEditMode(false));
        }
      }}
    >
      <EditFormModal type="teachers" />
      <div className={teachersStyles.profesoriContainer__profesorImage}>
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
        <div
          className={teachersStyles.profesoriContainer__profesorImageOverlay}
        >
          <input
            type="file"
            name="profesorImage"
            id="profesorImage"
            ref={hiddenFileInputRef}
            onChange={(e) => {
              if (e.target.files) {
                handleImagineProfilChange(e.target.files[0]);
              }
            }}
          />
          <button
            type="button"
            onClick={() => hiddenFileInputRef.current?.click()}
          >
            <FiPlus />
          </button>
        </div>
      </div>
      <form
        className={teachersStyles.profesoriContainer__profesorInfo}
        onSubmit={(e) => handleUpdateTeacher(e)}
      >
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />
        <div className={teachersStyles.profesoriContainer__control}>
          <label htmlFor="materii">Profesor de:</label>
          <select
            name="materii"
            id="materii"
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value as Subjects)}
          >
            {subjects.map((subject) => {
              return (
                <option value={subject.name} key={subject.id}>
                  {subject.name}
                </option>
              );
            })}
          </select>
        </div>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        >
          {description.length >= 200
            ? `${description.slice(0, 200)}...`
            : description}
        </textarea>
        <button type="submit" title="Salveaza.">
          <FcCheckmark />
        </button>
      </form>
      <CardModal cardId={teacher_uid as string} componentType="teacher" />
    </article>
  );
};

export default EditableTeacher;
