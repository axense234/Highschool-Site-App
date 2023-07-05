// React
import { FC, useEffect, useRef, useState } from "react";
// React Spinners
import { PulseLoader } from "react-spinners";
// SCSS
import screenLoadingStyles from "../../scss/components/loading/ScreenLoading.module.scss";
// Hooks
import useOverlayTransition from "@/hooks/useOverlayTransition";
// Redux
import { useAppSelector } from "@/hooks/redux";
import {
  selectLoadingLoginProfile,
  selectLoadingUpdateProfile,
  selectScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
import {
  selectLoadingCreateAnnouncement,
  selectLoadingDeleteAnnouncement,
  selectLoadingUpdateAnnouncement,
} from "@/redux/slices/announcementsSlice";
import {
  selectLoadingCreateTeacher,
  selectLoadingDeleteTeacher,
  selectLoadingUpdateTeacher,
} from "@/redux/slices/teachersSlice";
import { selectLoadingUpdateAdmin } from "@/redux/slices/adminsSlice";
import { selectLoadingCreateGrade } from "@/redux/slices/gradesSlice";
import { selectLoadingCreateAbsence } from "@/redux/slices/absencesSlice";
import { selectLoadingClass } from "@/redux/slices/classesSlice";

const ScreenLoading: FC = () => {
  const screenLoadingRef = useRef<HTMLDivElement>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const screenLoadingMessageGeneral = useAppSelector(
    selectScreenLoadingMessage
  );

  const loadingLoginProfile = useAppSelector(selectLoadingLoginProfile);
  const loadingUpdateProfile = useAppSelector(selectLoadingUpdateProfile);

  const loadingUpdateAnnouncement = useAppSelector(
    selectLoadingUpdateAnnouncement
  );
  const loadingDeleteAnnouncement = useAppSelector(
    selectLoadingDeleteAnnouncement
  );
  const loadingCreateAnnouncement = useAppSelector(
    selectLoadingCreateAnnouncement
  );

  const loadingCreateTeacher = useAppSelector(selectLoadingCreateTeacher);
  const loadingUpdateTeacher = useAppSelector(selectLoadingUpdateTeacher);
  const loadingDeleteTeacher = useAppSelector(selectLoadingDeleteTeacher);

  const loadingUpdateAdmin = useAppSelector(selectLoadingUpdateAdmin);

  const loadingCreateGrade = useAppSelector(selectLoadingCreateGrade);
  const loadingCreateAbsence = useAppSelector(selectLoadingCreateAbsence);

  const loadingClass = useAppSelector(selectLoadingClass);

  useEffect(() => {
    const show =
      loadingLoginProfile === "PENDING" ||
      loadingUpdateProfile === "PENDING" ||
      loadingCreateAnnouncement === "PENDING" ||
      loadingCreateTeacher === "PENDING" ||
      loadingUpdateAnnouncement === "PENDING" ||
      loadingDeleteAnnouncement === "PENDING" ||
      loadingUpdateTeacher === "PENDING" ||
      loadingDeleteTeacher === "PENDING" ||
      loadingUpdateAdmin === "PENDING" ||
      loadingCreateGrade === "PENDING" ||
      loadingCreateAbsence === "PENDING" ||
      loadingClass === "PENDING";

    setShowLoading(show);
  }, [
    loadingLoginProfile,
    loadingUpdateProfile,
    loadingCreateAnnouncement,
    loadingCreateTeacher,
    loadingUpdateAnnouncement,
    loadingDeleteAnnouncement,
    loadingUpdateTeacher,
    loadingDeleteTeacher,
    loadingUpdateAdmin,
    loadingCreateGrade,
    loadingCreateAbsence,
    loadingClass,
  ]);

  useOverlayTransition(showLoading, screenLoadingRef);

  return (
    <div
      className={screenLoadingStyles.screenLoadingContainer}
      ref={screenLoadingRef}
    >
      <div className={screenLoadingStyles.screenLoadingContainer__content}>
        <h3>{screenLoadingMessageGeneral}</h3>
        <PulseLoader size={35} />
      </div>
    </div>
  );
};

export default ScreenLoading;
