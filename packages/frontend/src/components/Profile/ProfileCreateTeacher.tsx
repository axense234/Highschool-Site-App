// React
import { FC, SyntheticEvent } from "react";
// Data
import { materii } from "@/data";
// SCSS
import profileStyles from "../../scss/components/Profile.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImageForTeacher,
  createTeacher,
  selectTemplateTeacher,
  updateTemplateTeacher,
} from "@/redux/slices/teachersSlice";
import FormModal from "../FormModal";

const ProfileCreateTeacher: FC = () => {
  const dispatch = useAppDispatch();
  const templateTeacher = useAppSelector(selectTemplateTeacher);

  const onUsernameChange = (username: string) => {
    dispatch(updateTemplateTeacher({ key: "username", value: username }));
  };

  const onMaterieChange = (materie: string) => {
    dispatch(updateTemplateTeacher({ key: "profesorDe", value: materie }));
  };

  const onDescriereChange = (descriere: string) => {
    dispatch(updateTemplateTeacher({ key: "descriere", value: descriere }));
  };

  const onImagineProfilChange = (file: File | string) => {
    dispatch(createCloudinaryImageForTeacher(file as File));
  };

  const handleCreateTeacher = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(createTeacher(templateTeacher));
  };

  return (
    <form
      className={profileStyles.profileContainer__settings}
      onSubmit={(e) => handleCreateTeacher(e)}
    >
      <FormModal type='teachers' />
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor='username'>Nume si Prenume:</label>
        <input
          type='text'
          name='username'
          id='username'
          value={templateTeacher.username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor='materie'>Materie:</label>
        <select
          name='materie'
          id='materie'
          value={templateTeacher.profesorDe}
          onChange={(e) => onMaterieChange(e.target.value)}
        >
          {materii.map((materie) => {
            return (
              <option value={materie.nume} key={materie.id}>
                {materie.nume}
              </option>
            );
          })}
        </select>
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor='descriere'>Descriere:</label>
        <textarea
          name='descriere'
          id='descriere'
          value={templateTeacher.descriere}
          onChange={(e) => onDescriereChange(e.target.value)}
        />
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor='imagineProfil'>Imagine Profil(optional):</label>
        <input
          type='file'
          name='imagineProfil'
          id='imagineProfil'
          onChange={(e) => {
            if (e.target.files) {
              onImagineProfilChange(e.target.files[0]);
            }
          }}
        />
      </div>
      <button type='submit'>Creeaza Profesor</button>
    </form>
  );
};

export default ProfileCreateTeacher;
