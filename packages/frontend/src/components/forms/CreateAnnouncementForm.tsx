// React
import { FC, SyntheticEvent, useEffect } from "react";
// Types
import { Admin, Teacher } from "@prisma/client";
import { AxiosError } from "axios";
// React Icons
import { BsFillMegaphoneFill } from "react-icons/bs";
import { TiDocumentText } from "react-icons/ti";
import { AiFillPicture, AiFillPlayCircle, AiFillTag } from "react-icons/ai";
import { GiFilmStrip } from "react-icons/gi";
// SCSS
import profileSettingsStyles from "../../scss/components/profile/ProfileSettingsForm.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createAnnouncement,
  createCloudinaryImageForAnnouncement,
  selectLoadingCreateCloudinaryImageForAnnouncement,
  selectTemplateAnnouncement,
  setTemplateAnnouncement,
  updateTemplateAnnouncement,
} from "@/redux/slices/announcementsSlice";
import {
  selectProfile,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
// Components
import FormModal from "../modals/FormModal";
// Data
import { announcementCategories, defaultTemplateAnnouncement } from "@/data";
// Hooks
import useVideoUrlFormat from "@/hooks/useVideoUrlFormat";

const CreateAnnouncementForm: FC = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectProfile);
  const loadingCreateCloudinaryImageForAnnouncement = useAppSelector(
    selectLoadingCreateCloudinaryImageForAnnouncement
  );
  const templateAnnouncement = useAppSelector(selectTemplateAnnouncement);

  const onTitleChange = (title: string) => {
    dispatch(updateTemplateAnnouncement({ key: "title", value: title }));
  };

  const onDescriptionChange = (description: string) => {
    dispatch(
      updateTemplateAnnouncement({ key: "description", value: description })
    );
  };

  const onCategoryChange = (cat: string) => {
    dispatch(updateTemplateAnnouncement({ key: "category", value: cat }));
  };

  const onVideoUrlChange = (url: string) => {
    dispatch(updateTemplateAnnouncement({ key: "video_url", value: url }));
  };

  const onVideoPozitionChange = (poz: string) => {
    dispatch(updateTemplateAnnouncement({ key: "video_pozition", value: poz }));
  };

  const handleAnnouncementImageChange = (image: File | string) => {
    dispatch(createCloudinaryImageForAnnouncement(image as File));
  };

  const handleSubmitAnnouncement = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      setScreenLoadingMessage(
        "Încercăm să creăm anunțul tău, vă rugăm să așteptați..."
      )
    );
    dispatch(createAnnouncement(templateAnnouncement))
      .unwrap()
      .then((res) => {
        if (!(res as AxiosError).response) {
          // dispatch(sendNotification())
        }
      });
  };

  useEffect(() => {
    dispatch(setTemplateAnnouncement(defaultTemplateAnnouncement));
  }, []);

  useEffect(() => {
    if (profile.email) {
      const profileRole = profile.role;
      dispatch(
        updateTemplateAnnouncement({
          key:
            profileRole === "ADMIN"
              ? "created_by_admin_uid"
              : "created_by_teacher_uid",
          value:
            profileRole === "ADMIN"
              ? (profile as Admin).admin_uid
              : (profile as Teacher).teacher_uid,
        })
      );
      dispatch(
        updateTemplateAnnouncement({
          key:
            profileRole === "ADMIN"
              ? "created_by_admin_name"
              : "created_by_teacher_name",
          value:
            profileRole === "ADMIN"
              ? (profile as Admin).fullname
              : (profile as Teacher).fullname,
        })
      );
    }
  }, [profile]);

  useVideoUrlFormat(templateAnnouncement);

  return (
    <div className={profileSettingsStyles.profileSettingsContainer}>
      <form
        className={profileSettingsStyles.profileSettingsContainer__form}
        onSubmit={(e) => handleSubmitAnnouncement(e)}
      >
        <FormModal type="announcements" />
        <div
          className={profileSettingsStyles.profileSettingsContainer__content}
        >
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__textControl
            }
          >
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__controlLabel
              }
            >
              <BsFillMegaphoneFill />
              <label htmlFor="title">Titlu Anunț: </label>
            </div>
            <input
              type="text"
              id="title"
              required
              maxLength={30}
              placeholder="ex: Școală Altfel - Program"
              value={templateAnnouncement.title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__textAreaControl
            }
          >
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__controlLabel
              }
            >
              <TiDocumentText />
              <label htmlFor="description">Descriere Anunț(*):</label>
            </div>
            <textarea
              name="description"
              id="description"
              required={false}
              value={templateAnnouncement.description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__selectControl
            }
          >
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__controlLabel
              }
            >
              <AiFillTag />
              <label htmlFor="category">Categorie Anunț:</label>
            </div>
            <select
              name="category"
              id="category"
              required
              value={templateAnnouncement.category}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              {announcementCategories.map((category) => {
                return (
                  <option value={category.name as string} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__imageControl
            }
          >
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__controlLabel
              }
            >
              <AiFillPicture />
              <label htmlFor="img">Imagine Anunț(*):</label>
            </div>
            <input
              type="file"
              id="img"
              required={false}
              onChange={(e) => {
                if (e.target.files) {
                  handleAnnouncementImageChange(e.target.files[0]);
                }
              }}
            />
          </div>
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__textControl
            }
          >
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__controlLabel
              }
            >
              <AiFillPlayCircle />
              <label htmlFor="video">Video Anunț(*):</label>
            </div>
            <input
              type="url"
              id="video"
              required={false}
              value={templateAnnouncement.video_url as string}
              onChange={(e) => onVideoUrlChange(e.target.value)}
            />
          </div>
          {templateAnnouncement.video_url && (
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__selectControl
              }
            >
              <div
                className={
                  profileSettingsStyles.profileSettingsContainer__controlLabel
                }
              >
                <GiFilmStrip />
                <label htmlFor="video_pozition">
                  Poziție Video În Anunț(*):
                </label>
              </div>
              <select
                name="video_pozition"
                id="video_pozition"
                required
                value={templateAnnouncement.video_pozition as string}
                onChange={(e) => onVideoPozitionChange(e.target.value)}
              >
                <option value="FINAL">LA FINAL</option>
                <option value="INCEPUT">LA ÎNCEPUT</option>
              </select>
            </div>
          )}
        </div>
        <button
          type="submit"
          className={profileSettingsStyles.profileSettingsContainer__formButton}
          disabled={loadingCreateCloudinaryImageForAnnouncement === "PENDING"}
        >
          {loadingCreateCloudinaryImageForAnnouncement === "PENDING"
            ? "Se încarcă imaginea..."
            : "Creează Anunț"}
        </button>
      </form>
    </div>
  );
};

export default CreateAnnouncementForm;
