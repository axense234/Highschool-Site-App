// React
import { FC, SyntheticEvent, useRef } from "react";
// Next
import Image from "next/image";
// React Icons
import { FcCheckmark } from "react-icons/fc";
import { FiPlus } from "react-icons/fi";
// Types
import { Subjects } from "@prisma/client";
import TemplateTeacher from "@/core/interfaces/template/TemplateTeacher";
import TemplateUpdateTeacher from "@/core/interfaces/template/TemplateUpdateTeacher";
// SCSS
import teachersStyles from "../../scss/components/pages/Teachers.module.scss";
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
  selectTemplateTeacher,
} from "@/redux/slices/teachersSlice";

const EditableTeacher: FC<TemplateTeacher> = ({
  teacher_uid,
  profile_img_url,
  fullname,
  description,
  subject,
}) => {
  const dispatch = useAppDispatch();

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);
  const overlay = useAppSelector(selectOverlay);
  const templateTeacher = useAppSelector(selectTemplateTeacher);

  const handleImagineProfilChange = (imagine: File | string) => {
    dispatch(createCloudinaryImageForTeacher(imagine as File));
  };

  const onFullnameChange = (fullname: string) => {
    dispatch(updateTemplateTeacher({ key: "fullname", value: fullname }));
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
    dispatch(updateTeacherById(templateTeacher as TemplateUpdateTeacher));
    if (fullname) {
      dispatch(setEditMode(false));
    }
  };

  return (
    <article
      className={teachersStyles.teachersContainer__teacher}
      onMouseEnter={() => dispatch(setCardModalId(teacher_uid as string))}
      onMouseLeave={() => {
        if (!overlay.showOverlay) {
          dispatch(setCardModalId(""));
          dispatch(setEditMode(false));
        }
      }}
    >
      <EditFormModal type="teachers" />
      <div className={teachersStyles.teachersContainer__teacherImage}>
        <Image
          src={profile_img_url as string}
          alt={fullname as string}
          width={500}
          height={500}
          title={fullname as string}
        />
        <div className={teachersStyles.teachersContainer__teacherImageOverlay}>
          <input
            type="file"
            name="teacherImage"
            id="teacherImage"
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
        className={teachersStyles.teachersContainer__teacherInfo}
        onSubmit={(e) => handleUpdateTeacher(e)}
      >
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={fullname}
          onChange={(e) => onFullnameChange(e.target.value)}
        />
        <div className={teachersStyles.teachersContainer__control}>
          <label htmlFor="materii">Profesor de:</label>
          <select
            name="materii"
            id="materii"
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value as Subjects)}
          >
            {subjects?.map((subject) => {
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
          {(description?.length as number) >= 200
            ? `${description?.slice(0, 200)}...`
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
