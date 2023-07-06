// React
import {
  FC,
  useEffect,
  useRef,
  useState,
  RefObject,
  SetStateAction,
} from "react";
// Types
import { Announcement } from "@prisma/client";
// React Icons
import { MdArrowDropDownCircle } from "react-icons/md";
// Next
import Image from "next/image";
// SCSS
import announcementsStyles from "../../scss/components/pages/Announcements.module.scss";
// Components
import CardModal from "../modals/CardModal";
import EditableAnnouncement from "./EditableAnnouncement";
import InactiveAnnouncement from "./InactiveAnnouncement";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectOverlay,
  selectEditMode,
  selectCardModalId,
  setCardModalId,
} from "@/redux/slices/generalSlice";
import {
  selectAnnouncementById,
  selectFoundAnnouncementId,
  selectTemplateAnnouncement,
  setFoundAnnouncementId,
  setTemplateAnnouncement,
} from "@/redux/slices/announcementsSlice";
// Store
import { State } from "@/redux/api/store";
// Hooks
import useVideoUrlFormat from "@/hooks/useVideoUrlFormat";

const Announcement: FC<Announcement> = ({
  description,
  id,
  title,
  img_url,
  video_url,
  video_pozition,
  announcement_uid,
  updatedAt,
  createdAt,
}) => {
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState<boolean>(false);
  const annRef = useRef<HTMLElement>(null);

  const overlay = useAppSelector(selectOverlay);
  const editMode = useAppSelector(selectEditMode);
  const cardModalId = useAppSelector(selectCardModalId);
  const foundAnnouncementId = useAppSelector(selectFoundAnnouncementId);
  const editModeAvailable = announcement_uid === cardModalId && editMode;
  const templateAnnouncement = useAppSelector(selectTemplateAnnouncement);

  const announcement = useAppSelector((state: State) =>
    selectAnnouncementById(state, id || cardModalId)
  );

  useSetTemplateAnnouncement(announcement);
  useScrollToAnnouncement(
    foundAnnouncementId,
    announcement_uid,
    annRef,
    setToggle
  );
  useVideoUrlFormat(templateAnnouncement);

  if (editModeAvailable) {
    return (
      <EditableAnnouncement
        templateAnnouncement={templateAnnouncement}
        setToggle={setToggle}
      />
    );
  }

  if (!toggle) {
    return (
      <InactiveAnnouncement
        announcement={announcement}
        annRef={annRef}
        setToggle={setToggle}
      />
    );
  }

  return (
    <article
      className={announcementsStyles.announcementsContainer__announcement}
      onMouseEnter={() => dispatch(setCardModalId(announcement_uid))}
      onMouseLeave={() => {
        if (!overlay.showOverlay) {
          dispatch(setCardModalId(""));
          setToggle(false);
        }
      }}
      ref={annRef}
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
          <h4>{title}</h4>
        </div>
        <div
          className={
            announcementsStyles.announcementsContainer__announcementTime
          }
          style={{ alignSelf: "center" }}
        >
          <p title="Creat la" aria-label="Creat la">
            Creat la:{" "}
            <time dateTime={new Date(createdAt).toLocaleDateString()}>
              {new Date(createdAt).toLocaleDateString()}
            </time>
          </p>
          <p title="Actualizat la" aria-label="Actualizat la">
            Actualizat la:{" "}
            <time dateTime={new Date(updatedAt).toLocaleDateString()}>
              {new Date(updatedAt).toLocaleDateString()}
            </time>
          </p>
        </div>
        {video_pozition === "INCEPUT" && video_url && (
          <iframe
            src={video_url as string}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
        <div
          className={
            announcementsStyles.announcementsContainer__announcementContent
          }
        >
          <p>{description}</p>
          {img_url && (
            <Image
              src={img_url as string}
              alt={title}
              width={1000}
              height={1000}
              title={title}
            />
          )}
        </div>
        {video_pozition === "FINAL" && video_url && (
          <iframe
            src={video_url as string}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
      <CardModal cardId={announcement_uid} componentType="announcement" />
    </article>
  );
};

const useSetTemplateAnnouncement = (announcement: Announcement | undefined) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (announcement?.title) {
      dispatch(setTemplateAnnouncement(announcement));
    }
  }, [announcement?.title]);
};

const useScrollToAnnouncement = (
  foundAnnouncementId: string,
  announcement_uid: string,
  annRef: RefObject<HTMLElement>,
  setToggle: (value: SetStateAction<boolean>) => void
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (foundAnnouncementId === announcement_uid) {
      setToggle(true);
      window.scrollBy({
        behavior: "smooth",
        top: annRef.current?.getBoundingClientRect().top,
      });
    }
    dispatch(setFoundAnnouncementId(""));
  }, [foundAnnouncementId]);
};

export default Announcement;
