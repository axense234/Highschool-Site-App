// React
import { FC, useEffect } from "react";
// Types
import {
  ProfileStudentCatalogueProps,
  TemplateClass,
  TemplateStudent,
  TemplateStudentCard,
  TemplateStudentCardSection,
} from "types";
import { Subjects, Teacher } from "@prisma/client";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Components
import SectionLoading from "../loading/SectionLoading";
import CardSection from "./CardSection";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";
import { State } from "@/redux/api/store";
import {
  getClassById,
  selectClassById,
  selectLoadingClass,
} from "@/redux/slices/classesSlice";
// Hooks
import useCalculateCardStats from "@/hooks/useCalculateCardStats";

const ProfileStudentCatalogue: FC<ProfileStudentCatalogueProps> = ({
  userProfile,
  type,
}) => {
  const dispatch = useAppDispatch();
  const ownProfile = useAppSelector(selectProfile);
  const loadingClass = useAppSelector(selectLoadingClass);

  let profileUsed = userProfile;
  if (type === "own") {
    profileUsed = ownProfile as TemplateStudent;
  }

  const studentCard = profileUsed.student_card as TemplateStudentCard;
  const studentCardContent = studentCard?.content;

  const studentClass = useAppSelector((state: State) =>
    selectClassById(state, userProfile.class_uid as string)
  ) as TemplateClass;

  useEffect(() => {
    if (loadingClass === "IDLE") {
      dispatch(getClassById(userProfile.class_uid as string));
    }
  }, []);

  const studentCardSubjects =
    studentCardContent?.map((section) => {
      return { id: section.card_section_uid, subject: section.subject };
    }) || [];

  const studentCardGrades =
    studentCardContent?.map((section) => {
      return {
        id: section.card_section_uid,
        grades: section.grades,
        gradesSubject: section.subject,
      };
    }) || [];

  const studentCardAbsences =
    studentCardContent?.map((section) => {
      return { id: section.card_section_uid, absences: section.absences };
    }) || [];

  const {
    studentClassPosition,
    studentGPA,
    studentMaxAbsencesInADay,
    studentMaxAbsencesInADayDate,
    studentMaxSubjectAverage,
    studentMaxSubjectAverageLabel,
    studentMaxSubjectAverageValue,
    studentReasonedAbsences,
    studentTotalAbsences,
    studentUnreasonedAbsences,
  } = useCalculateCardStats(
    studentCardSubjects,
    studentCardGrades,
    studentCardAbsences
  );

  let studentCardContentShown: TemplateStudentCardSection[] | undefined;
  switch (ownProfile.role) {
    case "ADMIN":
      studentCardContentShown = studentCardContent;
      break;

    case "ELEV":
      if (type === "own") {
        studentCardContentShown = studentCardContent;
      }
      break;

    case "PROFESOR":
      studentCardContentShown = studentCardContent?.filter(
        (card) => card.subject === (ownProfile as Teacher).subject
      );
      break;

    default:
      studentCardContentShown = [];
      break;
  }

  if (loadingClass === "IDLE" || loadingClass === "PENDING") {
    return (
      <section className={profileStyles.profileContainer__studentCatalogue}>
        <SectionLoading />
      </section>
    );
  }

  const usableTeachers = studentClass?.teachers;

  const studentCardTeachers = ((usableTeachers as Teacher[]) || []).map(
    (teacher) => {
      return {
        id: teacher.teacher_uid,
        subject: teacher.subject,
        fullname: teacher.fullname,
        profileImage: teacher.profile_img_url,
      };
    }
  );

  if (userProfile.class_label) {
    return (
      <section className={profileStyles.profileContainer__studentCatalogue}>
        <h2>
          {type === "own"
            ? "Carnetul tău de Elev"
            : `Carnetul lui ${profileUsed.fullname} de Elev`}
        </h2>
        <div
          className={profileStyles.profileContainer__studentCatalogueSection}
        >
          <table
            className={profileStyles.profileContainer__studentCatalogueContent}
          >
            <thead>
              <tr>
                <th>PROFESORI</th>
                <th>DISCIPLINE</th>
                <th>NOTE</th>
                <th>ABSENȚE</th>
              </tr>
            </thead>
            <tbody style={{ height: `${usableTeachers?.length} * 15rem` }}>
              {studentCardContentShown?.map((section) => {
                return (
                  <CardSection
                    class_uid={profileUsed.class_uid as string}
                    key={section.card_section_uid}
                    section_uid={section.card_section_uid}
                    ownProfile={ownProfile}
                    profile_used_uid={profileUsed.student_uid as string}
                    absences={
                      studentCardAbsences.find(
                        (absence) => absence.id === section.card_section_uid
                      )?.absences
                    }
                    grades={
                      studentCardGrades.find(
                        (grade) => grade.id === section.card_section_uid
                      )?.grades
                    }
                    subject={
                      studentCardSubjects.find(
                        (subject) => subject.id === section.card_section_uid
                      )?.subject as Subjects
                    }
                    teacherFullname={
                      studentCardTeachers.find(
                        (teacher) => teacher.subject === section.subject
                      )?.fullname as string
                    }
                    teacherProfileImage={
                      studentCardTeachers.find(
                        (teacher) => teacher.subject === section.subject
                      )?.profileImage as string
                    }
                    teacherId={
                      studentCardTeachers.find(
                        (teacher) => teacher.subject === section.subject
                      )?.id as string
                    }
                  />
                );
              })}
            </tbody>
          </table>
          <div
            className={profileStyles.profileContainer__studentCatalogueDetails}
          >
            <h3>Statistici Importante</h3>
            <hr />
            <ul
              className={
                profileStyles.profileContainer__studentCatalogueStatistics
              }
            >
              <li>
                Media Generală Curentă:{" "}
                <span>
                  {studentGPA ? studentGPA.toFixed(2) : "Nu știm încă"}
                </span>
              </li>
              <li>
                Poziția în Clasamentul Clasei:{" "}
                <span>{studentClassPosition}</span>
              </li>
              <li>
                Total Absențe: <span>{studentTotalAbsences}</span>
              </li>
              <li>
                Număr Absențe Motivate: <span>{studentReasonedAbsences}</span>
              </li>
              <li>
                Număr Absențe Nemotivate:{" "}
                <span>{studentUnreasonedAbsences}</span>
              </li>
              <li>
                Ziua cu cele mai multe Absențe:{" "}
                <span>
                  {studentMaxAbsencesInADayDate
                    ? new Date(
                        studentMaxAbsencesInADayDate
                      ).toLocaleDateString()
                    : "Nu știm încă"}{" "}
                  <br />{" "}
                  {studentMaxAbsencesInADay
                    ? `${studentMaxAbsencesInADay} absențe`
                    : "Nu știm încă"}
                </span>
              </li>
              <li>
                Cea mai mare Medie la o Materie:{" "}
                <span>
                  {studentMaxSubjectAverageLabel} <br />
                  {studentMaxSubjectAverage.key &&
                    `media ${studentMaxSubjectAverageValue.toFixed(0)}`}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default ProfileStudentCatalogue;
