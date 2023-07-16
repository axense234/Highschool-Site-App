// React
import { FC } from "react";
// React Icons
import { MdArrowDropDownCircle } from "react-icons/md";
// Types
import { Announcement } from "@prisma/client";
import InactiveAnnouncementProps from "@/core/interfaces/component/InactiveAnnouncementProps";
// SCSS
import announcementsStyles from "../../scss/components/pages/Announcements.module.scss";
// Components
import CardModal from "../modals/CardModal";
// Redux
import { selectOverlay, setCardModalId } from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const InactiveAnnouncement: FC<InactiveAnnouncementProps> = ({
  announcement,
  setToggle,
  annRef,
}) => {
  const dispatch = useAppDispatch();
  const { title, description, announcement_uid, createdAt, updatedAt } =
    announcement as Announcement;
  const overlay = useAppSelector(selectOverlay);

  return (
    <article
      className={announcementsStyles.announcementsContainer__announcement}
      title={title}
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
        className={announcementsStyles.announcementsContainer__announcementTime}
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
      <div
        className={
          announcementsStyles.announcementsContainer__announcementTitle
        }
      >
        <MdArrowDropDownCircle
          onClick={() => setToggle(true)}
          title="Deschide"
        />
        <h4>{title}</h4>
      </div>
      <p>{description.slice(0, 200)}...</p>
      <CardModal cardId={announcement_uid} componentType="announcement" />
    </article>
  );
};

export default InactiveAnnouncement;
