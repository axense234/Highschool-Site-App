// React
import { useEffect } from "react";
// Types
import { TemplateAnnouncement } from "types";
// Redux
import { updateTemplateAnnouncement } from "@/redux/slices/announcementsSlice";
import { useAppDispatch } from "./redux";

const useVideoUrlFormat = (templateAnnouncement: TemplateAnnouncement) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      templateAnnouncement.video_url?.startsWith(
        "https://www.youtube.com/watch?v="
      )
    ) {
      const newVideoUrl = templateAnnouncement.video_url.replace(
        "/watch?v=",
        "/embed/"
      );
      dispatch(
        updateTemplateAnnouncement({ key: "video_url", value: newVideoUrl })
      );
    }
  }, [templateAnnouncement.video_url, dispatch]);
};

export default useVideoUrlFormat;
