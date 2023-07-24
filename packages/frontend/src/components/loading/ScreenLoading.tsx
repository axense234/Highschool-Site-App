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
  selectLoadingProfile,
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
import { selectLoadingCreateGrade } from "@/redux/slices/gradesSlice";
import { selectLoadingCreateAbsence } from "@/redux/slices/absencesSlice";
import {
  selectLoadingClass,
  selectLoadingCreateClass,
} from "@/redux/slices/classesSlice";
import { selectLoadingCreateStudent } from "@/redux/slices/studentsSlice";
import { selectLoadingCreateAdmin } from "@/redux/slices/adminsSlice";
import { selectLoadingCreateBook } from "@/redux/slices/booksSlice";

const ScreenLoading: FC = () => {
  const screenLoadingRef = useRef<HTMLDivElement>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const screenLoadingMessageGeneral = useAppSelector(
    selectScreenLoadingMessage
  );

  const loadingLoginProfile = useAppSelector(selectLoadingLoginProfile);
  const loadingProfile = useAppSelector(selectLoadingProfile);

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

  const loadingCreateStudent = useAppSelector(selectLoadingCreateStudent);
  const loadingCreateAdmin = useAppSelector(selectLoadingCreateAdmin);

  const loadingCreateGrade = useAppSelector(selectLoadingCreateGrade);
  const loadingCreateAbsence = useAppSelector(selectLoadingCreateAbsence);

  const loadingCreateBookmark = useAppSelector(selectLoadingCreateBook);

  const loadingCreateClass = useAppSelector(selectLoadingCreateClass);

  const loadingClass = useAppSelector(selectLoadingClass);
  const loadingCreateBook = useAppSelector(selectLoadingCreateBook);

  useEffect(() => {
    const show =
      loadingLoginProfile === "PENDING" ||
      loadingCreateAnnouncement === "PENDING" ||
      loadingCreateTeacher === "PENDING" ||
      loadingUpdateAnnouncement === "PENDING" ||
      loadingDeleteAnnouncement === "PENDING" ||
      loadingUpdateTeacher === "PENDING" ||
      loadingDeleteTeacher === "PENDING" ||
      loadingCreateGrade === "PENDING" ||
      loadingCreateAbsence === "PENDING" ||
      loadingClass === "PENDING" ||
      loadingCreateStudent === "PENDING" ||
      loadingCreateAdmin === "PENDING" ||
      loadingCreateClass === "PENDING" ||
      loadingProfile === "PENDING" ||
      loadingCreateBook === "PENDING";

    setShowLoading(show);
  }, [
    loadingLoginProfile,
    loadingCreateAnnouncement,
    loadingCreateTeacher,
    loadingUpdateAnnouncement,
    loadingDeleteAnnouncement,
    loadingUpdateTeacher,
    loadingDeleteTeacher,
    loadingCreateGrade,
    loadingCreateAbsence,
    loadingClass,
    loadingCreateStudent,
    loadingCreateAdmin,
    loadingCreateBookmark,
    loadingCreateClass,
    loadingProfile,
    loadingCreateBook,
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
