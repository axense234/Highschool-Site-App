// React
import { FC } from "react";
// Types
import VideoContainerProps from "@/core/interfaces/component/VideoContainerProps";
// SCSS
import announcementsStyles from "../../scss/components/pages/Announcements.module.scss";

const VideoContainer: FC<VideoContainerProps> = ({
  workingVideoUrl,
  title,
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
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default VideoContainer;
