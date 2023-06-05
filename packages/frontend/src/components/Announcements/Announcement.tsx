// React
import { FC, useEffect, useRef, useState, SyntheticEvent } from "react";
// Types
import { Anunt } from "@prisma/client";
import { VideoContainerProps } from "types";
// React Icons
import { MdArrowDropDownCircle } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import { FiPlus } from "react-icons/fi";
// Next
import Image from "next/image";
// SCSS
import announcementsStyles from "../../scss/components/Anunturi.module.scss";
// Components
import CardModal from "../CardModal";
import EditFormModal from "../EditFormModal";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectOverlay,
  selectEditMode,
  selectCardModalId,
  setCardModalId,
  setEditMode,
} from "@/redux/slices/generalSlice";
import {
  createCloudinaryImageForAnnouncement,
  selectAnnouncementById,
  selectTemplateAnnouncement,
  setTemplateAnnouncement,
  updateAnnouncementById,
  updateTemplateAnnouncement,
} from "@/redux/slices/announcementsSlice";
// Store
import { State } from "@/redux/api/store";

const Announcement: FC<Anunt> = ({
  descriere,
  titlu,
  imagineUrl,
  videoUrl,
  pozitionareVideoInAnunt,
  anunt_uid,
  actualizatLa,
  creatLa,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const overlay = useAppSelector(selectOverlay);
  const editMode = useAppSelector(selectEditMode);
  const cardModalId = useAppSelector(selectCardModalId);
  const announcement = useAppSelector((state: State) =>
    selectAnnouncementById(state, cardModalId)
  );

  const editModeAvailable = anunt_uid === cardModalId && editMode;

  // For edit mode
  const templateAnnouncement = useAppSelector(selectTemplateAnnouncement);

  const handleImageChange = (image: File | string) => {
    dispatch(createCloudinaryImageForAnnouncement(image as File));
  };

  const onTitluChange = (titlu: string) => {
    dispatch(updateTemplateAnnouncement({ key: "titlu", value: titlu }));
  };

  const onDescriereChange = (descriere: string) => {
    dispatch(
      updateTemplateAnnouncement({ key: "descriere", value: descriere })
    );
  };

  const onVideoUrlChange = (videoUrl: string) => {
    dispatch(updateTemplateAnnouncement({ key: "videoUrl", value: videoUrl }));
  };

  const handleUpdateAnnouncement = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(updateAnnouncementById(templateAnnouncement));
    if (templateAnnouncement.titlu && templateAnnouncement.descriere) {
      dispatch(setEditMode(false));
    }
  };

  useEffect(() => {
    if (
      templateAnnouncement.videoUrl?.startsWith(
        "https://www.youtube.com/watch?v="
      )
    ) {
      const newVideoUrl = templateAnnouncement.videoUrl.replace(
        "/watch?v=",
        "/embed/"
      );
      dispatch(
        updateTemplateAnnouncement({ key: "videoUrl", value: newVideoUrl })
      );
    }
  }, [templateAnnouncement.videoUrl, dispatch]);

  useEffect(() => {
    if (announcement?.titlu) {
      dispatch(setTemplateAnnouncement(announcement));
    }
  }, [announcement?.titlu]);

  if (editModeAvailable) {
    return (
      <form
        className={announcementsStyles.announcementsContainer__announcement}
        onMouseEnter={() => dispatch(setCardModalId(anunt_uid))}
        onMouseLeave={() => {
          if (!overlay.showOverlay) {
            dispatch(setCardModalId(""));
            dispatch(setEditMode(false));
            setToggle(false);
          }
        }}
        onSubmit={(e) => handleUpdateAnnouncement(e)}
      >
        <div
          className={
            announcementsStyles.announcementsContainer__announcementInfo
          }
        >
          <div
            className={
              announcementsStyles.announcementsContainer__announcementTitle
            }
          >
            <EditFormModal type="announcements" />
            <MdArrowDropDownCircle
              onClick={() => setToggle(false)}
              title="Inchide"
            />
            <input
              type="text"
              value={templateAnnouncement.titlu}
              onChange={(e) => {
                onTitluChange(e.target.value);
              }}
            />
          </div>
          {pozitionareVideoInAnunt === "inceput" && (
            <VideoContainer
              titlu={templateAnnouncement.titlu}
              workingVideoUrl={
                (templateAnnouncement.videoUrl as string) ||
                (videoUrl as string)
              }
              onVideoUrlChange={onVideoUrlChange}
            />
          )}
          <div
            className={
              announcementsStyles.announcementsContainer__announcementContent
            }
          >
            <textarea
              value={templateAnnouncement.descriere}
              onChange={(e) => {
                onDescriereChange(e.target.value);
              }}
            />
            {imagineUrl && (
              <div
                className={
                  announcementsStyles.announcementsContainer__announcementImage
                }
              >
                <Image
                  src={templateAnnouncement.imagineUrl as string}
                  alt={titlu}
                  width={100}
                  height={100}
                  title={titlu}
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
          {pozitionareVideoInAnunt === "final" && (
            <VideoContainer
              titlu={templateAnnouncement.titlu}
              workingVideoUrl={templateAnnouncement.videoUrl as string}
              onVideoUrlChange={onVideoUrlChange}
            />
          )}
        </div>
        <button
          type="submit"
          title="Salveaza."
          className={announcementsStyles.saveButton}
        >
          <FcCheckmark />
        </button>
        <CardModal cardId={anunt_uid} componentType="announcement" />
      </form>
    );
  }

  if (!toggle) {
    return (
      <article
        className={announcementsStyles.announcementsContainer__announcement}
        title={titlu}
        onMouseEnter={() => dispatch(setCardModalId(anunt_uid))}
        onMouseLeave={() => {
          if (!overlay.showOverlay) {
            dispatch(setCardModalId(""));
            setToggle(false);
          }
        }}
      >
        <div
          className={
            announcementsStyles.announcementsContainer__announcementTitle
          }
        >
          <MdArrowDropDownCircle
            onClick={() => setToggle(true)}
            title="Deschide"
          />
          <h4>{titlu}</h4>
          <div
            className={
              announcementsStyles.announcementsContainer__announcementTime
            }
          >
            <p title="Creat la" aria-label="Creat la">
              Creat la:{" "}
              <time dateTime={new Date(creatLa).toLocaleDateString()}>
                {new Date(creatLa).toLocaleDateString()}
              </time>
            </p>
            <p title="Actualizat la" aria-label="Actualizat la">
              Actualizat la:{" "}
              <time dateTime={new Date(creatLa).toLocaleDateString()}>
                {new Date(actualizatLa).toLocaleDateString()}
              </time>
            </p>
          </div>
        </div>
        <p>{descriere.slice(0, 200)}...</p>
        <CardModal cardId={anunt_uid} componentType="announcement" />
      </article>
    );
  }

  return (
    <article
      className={announcementsStyles.announcementsContainer__announcement}
      onMouseEnter={() => dispatch(setCardModalId(anunt_uid))}
      onMouseLeave={() => {
        if (!overlay.showOverlay) {
          dispatch(setCardModalId(""));
          setToggle(false);
        }
      }}
    >
      <div
        className={announcementsStyles.announcementsContainer__announcementInfo}
      >
        <div
          className={
            announcementsStyles.announcementsContainer__announcementTitle
          }
        >
          <MdArrowDropDownCircle
            onClick={() => setToggle(false)}
            title="Inchide"
            style={{ transform: "rotate(270deg)" }}
          />
          <h4>{titlu}</h4>
        </div>
        <div
          className={
            announcementsStyles.announcementsContainer__announcementTime
          }
        >
          <p title="Creat la" aria-label="Creat la">
            Creat la:{" "}
            <time dateTime={new Date(creatLa).toLocaleDateString()}>
              {new Date(creatLa).toLocaleDateString()}
            </time>
          </p>
          <p title="Actualizat la" aria-label="Actualizat la">
            Actualizat la:{" "}
            <time dateTime={new Date(creatLa).toLocaleDateString()}>
              {new Date(actualizatLa).toLocaleDateString()}
            </time>
          </p>
        </div>
        {pozitionareVideoInAnunt === "inceput" &&
          templateAnnouncement.videoUrl && (
            <iframe
              src={
                (templateAnnouncement.videoUrl as string) ||
                (videoUrl as string)
              }
              title={titlu}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        <div
          className={
            announcementsStyles.announcementsContainer__announcementContent
          }
        >
          <p>{descriere}</p>
          {imagineUrl && (
            <Image
              src={imagineUrl as string}
              alt={titlu}
              width={100}
              height={100}
              title={titlu}
            />
          )}
        </div>
        {pozitionareVideoInAnunt === "final" &&
          templateAnnouncement.videoUrl && (
            <iframe
              src={
                (templateAnnouncement.videoUrl as string) ||
                (videoUrl as string)
              }
              title={titlu}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
      </div>
      <CardModal cardId={anunt_uid} componentType="announcement" />
    </article>
  );
};

const VideoContainer: FC<VideoContainerProps> = ({
  workingVideoUrl,
  titlu,
  onVideoUrlChange,
}) => {
  return (
    <div className={announcementsStyles.announcementsContainer__videoContainer}>
      <label htmlFor="videoUrl">Video URL: </label>
      <input
        type="url"
        value={workingVideoUrl}
        name="videoUrl"
        id="videoUrl"
        onChange={(e) => onVideoUrlChange(e.target.value)}
      />
      <iframe
        src={workingVideoUrl as string}
        title={titlu}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default Announcement;
