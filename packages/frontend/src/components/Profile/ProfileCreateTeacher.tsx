// React
import { FC, SyntheticEvent } from "react";
// Data
import { materii } from "@/data";
// SCSS
import profileStyles from "../../scss/components/Profile.module.scss";
// Components
import FormModal from "../FormModal";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImageForTeacher,
  createTeacher,
  selectLoadingCreateCloudinaryImageForTeacher,
  selectTemplateTeacher,
  updateTemplateTeacher,
} from "@/redux/slices/teachersSlice";
import { setScreenLoadingMessage } from "@/redux/slices/generalSlice";

const ProfileCreateTeacher: FC = () => {
  const dispatch = useAppDispatch();
  const templateTeacher = useAppSelector(selectTemplateTeacher);
  const loadingCreateCloudinaryImageForTeacher = useAppSelector(
    selectLoadingCreateCloudinaryImageForTeacher
  );

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

    dispatch(
      setScreenLoadingMessage(
        "Încercăm să creăm un profesor, vă rugăm să așteptați..."
      )
    );

    dispatch(createTeacher(templateTeacher));
  };

  return (
    <form
      className={profileStyles.profileContainer__settings}
      onSubmit={(e) => handleCreateTeacher(e)}
    >
      <FormModal type="teachers" />
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor="username">Nume si Prenume:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={templateTeacher.username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor="materie">Materie:</label>
        <select
          name="materie"
          id="materie"
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
        <label htmlFor="descriere">Descriere:</label>
        <textarea
          name="descriere"
          id="descriere"
          value={templateTeacher.descriere}
          onChange={(e) => onDescriereChange(e.target.value)}
        />
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor="imagineProfil">Imagine Profil(optional):</label>
        <input
          type="file"
          name="imagineProfil"
          id="imagineProfil"
          onChange={(e) => {
            if (e.target.files) {
              onImagineProfilChange(e.target.files[0]);
            }
          }}
        />
      </div>
      <button
        type="submit"
        disabled={loadingCreateCloudinaryImageForTeacher === "PENDING"}
      >
        {loadingCreateCloudinaryImageForTeacher === "PENDING"
          ? "Se încarcă imaginea..."
          : "Creați un Profesor"}
      </button>
    </form>
  );
};

export default ProfileCreateTeacher;
