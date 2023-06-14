// React
import { FC, useRef } from "react";
// React Spinners
import { PulseLoader } from "react-spinners";
// SCSS
import screenLoadingStyles from "../scss/components/ScreenLoading.module.scss";
// Hooks
import useOverlayTransition from "@/hooks/useOverlayTransition";
// Redux
import { useAppSelector } from "@/hooks/redux";
import {
  selectLoadingLoginProfile,
  selectLoadingUpdateProfile,
} from "@/redux/slices/generalSlice";
import { selectLoadingCreateAnnouncement } from "@/redux/slices/announcementsSlice";
import { selectLoadingCreateTeacher } from "@/redux/slices/teachersSlice";

const ScreenLoading: FC = () => {
  const screenLoadingRef = useRef<HTMLDivElement>(null);
  const loadingLoginProfile = useAppSelector(selectLoadingLoginProfile);
  const loadingUpdateProfile = useAppSelector(selectLoadingUpdateProfile);
  const loadingCreateAnnouncement = useAppSelector(
    selectLoadingCreateAnnouncement
  );
  const loadingCreateTeacher = useAppSelector(selectLoadingCreateTeacher);

  const show =
    loadingLoginProfile === "PENDING" ||
    loadingUpdateProfile === "PENDING" ||
    loadingCreateAnnouncement === "PENDING" ||
    loadingCreateTeacher === "PENDING";

  useOverlayTransition(show, screenLoadingRef);

  return (
    <div
      className={screenLoadingStyles.screenLoadingContainer}
      ref={screenLoadingRef}
    >
      <div className={screenLoadingStyles.screenLoadingContainer__content}>
        <h3>Se încarcă, vă rugăm să așteptați!</h3>
        <PulseLoader size={35} />
      </div>
    </div>
  );
};

export default ScreenLoading;
