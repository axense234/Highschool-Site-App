// React
import { FC, SyntheticEvent, useRef } from "react";
// React Icons
import { FcCheckmark } from "react-icons/fc";
import { FiPlus } from "react-icons/fi";
import { MdArrowDropDownCircle } from "react-icons/md";
// Next
import Image from "next/image";
// Types
import { EditableAnnouncementProps, TemplateAnnouncement } from "types";
// SCSS
import announcementsStyles from "../../scss/components/pages/Announcements.module.scss";
// Components
import CardModal from "../modals/CardModal";
import EditFormModal from "../modals/EditFormModal";
import VideoContainer from "./VideoContainer";
// Redux
import {
  selectOverlay,
  setCardModalId,
  setEditMode,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImageForAnnouncement,
  updateTemplateAnnouncement,
  updateAnnouncementById,
  selectLoadingCreateCloudinaryImageForAnnouncement,
} from "@/redux/slices/announcementsSlice";

const EditableAnnouncement: FC<EditableAnnouncementProps> = ({
  templateAnnouncement,
  setToggle,
}) => {
  const dispatch = useAppDispatch();
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);
  const loadingCreateCloudinaryImageForAnnouncement = useAppSelector(
    selectLoadingCreateCloudinaryImageForAnnouncement
  );
  const overlay = useAppSelector(selectOverlay);

  const {
    img_url,
    announcement_uid,
    title,
    description,
    video_pozition,
    video_url,
  } = templateAnnouncement as TemplateAnnouncement;

  const handleImageChange = (image: File | string) => {
    dispatch(createCloudinaryImageForAnnouncement(image as File));
  };

  const onTitleChange = (title: string) => {
    dispatch(updateTemplateAnnouncement({ key: "title", value: title }));
  };

  const onDescriptionChange = (description: string) => {
    dispatch(
      updateTemplateAnnouncement({ key: "description", value: description })
    );
  };

  const onVideoUrlChange = (video_url: string) => {
    dispatch(
      updateTemplateAnnouncement({ key: "video_url", value: video_url })
    );
  };

  const handleUpdateAnnouncement = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      setScreenLoadingMessage(
        "Încercăm să actualizăm un anunț, vă rugăm să așteptați..."
      )
    );
    dispatch(
      updateAnnouncementById(templateAnnouncement as TemplateAnnouncement)
    );

    if (title && description) {
      dispatch(setEditMode(false));
    }
  };

  return (
    <form
      className={announcementsStyles.announcementsContainer__announcement}
      onMouseEnter={() => dispatch(setCardModalId(announcement_uid as string))}
      onMouseLeave={() => {
        if (
          !overlay.showOverlay ||
          loadingCreateCloudinaryImageForAnnouncement !== "PENDING"
        ) {
          dispatch(setCardModalId(""));
          dispatch(setEditMode(false));
          setToggle(false);
        }
      }}
      onSubmit={(e) => handleUpdateAnnouncement(e)}
    >
      <div
        className={announcementsStyles.announcementsContainer__announcementInfo}
      >
        <div
          className={
            announcementsStyles.announcementsContainer__announcementTitle
          }
        >
          <EditFormModal type="announcements" />
          <MdArrowDropDownCircle
            onClick={() => setToggle(false)}
            title="Închide"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => {
              onTitleChange(e.target.value);
            }}
          />
        </div>
        {video_pozition === "INCEPUT" && (
          <VideoContainer
            title={title as string}
            workingVideoUrl={video_url as string}
            onVideoUrlChange={onVideoUrlChange}
          />
        )}
        <div
          className={
            announcementsStyles.announcementsContainer__announcementContent
          }
        >
          <textarea
            value={description}
            onChange={(e) => {
              onDescriptionChange(e.target.value);
            }}
          />
          {img_url && (
            <div
              className={
                announcementsStyles.announcementsContainer__announcementImage
              }
            >
              <Image
                src={img_url as string}
                alt={title as string}
                width={1000}
                height={1000}
                title={title}
              />
              <div
                className={
                  announcementsStyles.announcementsContainer__announcementImageOverlay
                }
              >
                <input
                  type="file"
                  name="announcementImage"
                  id="announcementImage"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleImageChange(e.target.files[0]);
                    }
                  }}
                  ref={hiddenFileInputRef}
                />
                <button
                  type="button"
                  onClick={() => hiddenFileInputRef.current?.click()}
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          )}
        </div>
        {video_pozition === "FINAL" && (
          <VideoContainer
            title={title as string}
            workingVideoUrl={video_url as string}
            onVideoUrlChange={onVideoUrlChange}
          />
        )}
      </div>
      <button
        type="submit"
        title="Salvează."
        className={announcementsStyles.saveButton}
        disabled={loadingCreateCloudinaryImageForAnnouncement === "PENDING"}
      >
        <FcCheckmark />
      </button>
      <CardModal
        cardId={announcement_uid as string}
        componentType="announcement"
      />
    </form>
  );
};

export default EditableAnnouncement;
