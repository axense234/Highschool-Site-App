// React
import { FC, SyntheticEvent } from "react";
// SCSS
import { CategorieAnunt } from "@prisma/client";
// Types
import profileStyles from "../../scss/components/Profile.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createAnnouncement,
  createCloudinaryImageForAnnouncement,
  selectLoadingCreateCloudinaryImageForAnnouncement,
  selectTemplateAnnouncement,
  updateTemplateAnnouncement,
} from "@/redux/slices/announcementsSlice";
// Components
import FormModal from "../FormModal";
// Data
import { categoriiAnunturi } from "@/data";
import {
  selectScreenLoadingMessage,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";

const ProfileCreateAnnouncement: FC = () => {
  const dispatch = useAppDispatch();
  const templateAnnouncement = useAppSelector(selectTemplateAnnouncement);
  const loadingCreateCloudinaryImageForAnnouncement = useAppSelector(
    selectLoadingCreateCloudinaryImageForAnnouncement
  );

  const onTitluChange = (titlu: string) => {
    dispatch(updateTemplateAnnouncement({ key: "titlu", value: titlu }));
  };

  const onDescriereChange = (descriere: string) => {
    dispatch(
      updateTemplateAnnouncement({ key: "descriere", value: descriere })
    );
  };

  const onImagineChange = (imagine: File | string) => {
    dispatch(createCloudinaryImageForAnnouncement(imagine as File));
  };

  const onVideoUrlChange = (videoUrl: string) => {
    dispatch(updateTemplateAnnouncement({ key: "videoUrl", value: videoUrl }));
  };

  const onPozVideoChange = (poz: string) => {
    dispatch(
      updateTemplateAnnouncement({ key: "pozitionareVideoInAnunt", value: poz })
    );
  };

  const onCatChange = (cat: CategorieAnunt) => {
    dispatch(updateTemplateAnnouncement({ key: "categorie", value: cat }));
  };

  const handleCreateAnnouncement = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      setScreenLoadingMessage(
        "Încercăm să creăm un anunț, vă rugăm să așteptați..."
      )
    );
    dispatch(createAnnouncement(templateAnnouncement));
  };

  return (
    <form
      className={profileStyles.profileContainer__settings}
      onSubmit={(e) => handleCreateAnnouncement(e)}
    >
      <FormModal type="announcements" />
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor="titlu">Titlu:</label>
        <input
          type="text"
          name="titlu"
          id="titlu"
          value={templateAnnouncement.titlu}
          onChange={(e) => onTitluChange(e.target.value)}
        />
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor="descriere">Descriere:</label>
        <textarea
          name="descriere"
          id="descriere"
          value={templateAnnouncement.descriere}
          onChange={(e) => onDescriereChange(e.target.value)}
        />
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor="materie">Categorie:</label>
        <select
          name="categorie"
          id="categorie"
          value={templateAnnouncement.categorie}
          onChange={(e) => onCatChange(e.target.value as CategorieAnunt)}
        >
          {categoriiAnunturi.map((cat) => {
            return (
              <option value={cat.nume} key={cat.id}>
                {cat.nume}
              </option>
            );
          })}
        </select>
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor="imagine">Imagine(optional):</label>
        <input
          type="file"
          name="imagine"
          id="imagine"
          onChange={(e) => {
            if (e.target.files) {
              onImagineChange(e.target.files[0]);
            }
          }}
        />
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor="imagine">Video URL(optional):</label>
        <input
          type="url"
          name="videoUrl"
          id="videoUrl"
          value={templateAnnouncement.videoUrl as string}
          onChange={(e) => onVideoUrlChange(e.target.value)}
        />
      </div>
      <div className={profileStyles.profileContainer__settingsControl}>
        <label htmlFor="pozVideo">Pozitionare Video in Anunt(optional):</label>
        <select
          name="pozVideo"
          id="pozVideo"
          value={templateAnnouncement.pozitionareVideoInAnunt as string}
          onChange={(e) => onPozVideoChange(e.target.value)}
        >
          <option value="final">Dupa descriere.</option>
          <option value="inceput">Inainte de descriere.</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={loadingCreateCloudinaryImageForAnnouncement === "PENDING"}
      >
        {loadingCreateCloudinaryImageForAnnouncement === "PENDING"
          ? "Se încarcă imaginea..."
          : "Creați un Anunț"}
      </button>
    </form>
  );
};

export default ProfileCreateAnnouncement;
