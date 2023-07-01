// React
import { FC } from "react";
// Types
import {
  CountMapObject,
  ProfileStudentCatalogueProps,
  TemplateStudentCard,
} from "types";
import { Grade } from "@prisma/client";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";
// Redux

const ProfileStudentCatalogue: FC<ProfileStudentCatalogueProps> = ({
  profile,
}) => {
  const studentCard = profile.student_card as TemplateStudentCard;

  console.log(profile);

  const studentCardContent = studentCard?.content;

  const studentCardSubjects =
    studentCardContent?.map((section) => {
      return { id: section.id, subject: section.subject };
    }) || [];

  const studentCardTeachers =
    studentCardContent?.map((section) => {
      return { id: section.id + 100, teacher: section.teacher_uid };
    }) || [];

  const studentCardGrades =
    studentCardContent?.map((section) => {
      return {
        id: section.id + 200,
        grades: section.grades,
        gradesSubject: section.subject,
      };
    }) || [];

  const studentCardAbsences =
    studentCardContent?.map((section) => {
      return { id: section.id + 300, absences: section.absences };
    }) || [];

  const calcSubjectGradeAvg = (grades: Grade[] | undefined) => {
    return Number(
      grades?.reduce((sum, grade) => {
        return sum + grade.value;
      }, 0) || 0 / Number(grades?.length)
    );
  };

  const findMaxValue = (obj: any) => {
    let maxValue = 0;
    let maxKey = null;

    Object.keys(obj).forEach((key) => {
      if (obj[key] > maxValue) {
        maxValue = obj[key];
        maxKey = key;
      }
    });

    return { key: maxKey, value: maxValue };
  };

  const studentGPA =
    studentCardGrades.reduce((totalSum, subject) => {
      return totalSum + calcSubjectGradeAvg(subject.grades);
    }, 0) / 18 || "Nu știm încă";

  // NEED TO SOMEHOW FIGURE HOW TO DO THIS RIGHT
  const studentClassPosition = "Nu știm încă";

  const studentReasonedAbsences =
    studentCardAbsences.reduce((sum, subject) => {
      return (
        sum +
        Number(
          subject.absences?.filter((absence) => absence.reasoned === true)
            .length
        )
      );
    }, 0) || 0;

  const studentUnreasonedAbsences =
    studentCardAbsences.reduce((sum, subject) => {
      return (
        sum +
        Number(
          subject.absences?.filter((absence) => absence.reasoned === false)
            .length
        )
      );
    }, 0) || 0;

  const studentTotalAbsences =
    studentReasonedAbsences + studentUnreasonedAbsences;

  const studentDaysThatContainAbsences =
    studentCardAbsences
      .map((subject) => {
        return subject.absences?.map((absence) => {
          return { id: absence.id, absenceDate: absence.date };
        });
      })
      .flat() || [];

  const studentMaxAbsencesInADay =
    Math.max(
      ...studentDaysThatContainAbsences.map((day) => {
        let maxAbsencesInDay = 0;
        maxAbsencesInDay = Math.max(
          studentCardAbsences.reduce((totalAbs, subject) => {
            return (
              totalAbs +
              Number(
                subject.absences?.filter(
                  (absence) => absence.date === day?.absenceDate
                ).length
              )
            );
          }, 0),
          maxAbsencesInDay
        );
        return maxAbsencesInDay;
      })
    ) || 0;

  const studentDaysThatContainAbsencesArray =
    studentDaysThatContainAbsences.map((day) => {
      return day?.absenceDate.toLocaleDateString();
    });

  const studentMaxAbsencesInADayDate =
    findMaxValue(
      studentDaysThatContainAbsencesArray.reduce((countMap, item) => {
        if (item) {
          countMap[item] = (countMap[item] || 0) + 1;
        }
        return countMap;
      }, {} as CountMapObject)
    ).key || "Nu știm încă";

  const studentMaxSubjectAverage = findMaxValue(
    studentCardSubjects?.reduce((countMap, subject) => {
      if (subject.subject) {
        countMap[subject.subject] = calcSubjectGradeAvg(
          studentCardGrades.find(
            (grade) => grade.gradesSubject === subject.subject
          )?.grades
        );
      }
      return countMap;
    }, {} as CountMapObject)
  );

  const studentMaxSubjectAverageValue = studentMaxSubjectAverage.value || 10;
  const studentMaxSubjectAverageLabel =
    studentMaxSubjectAverage.key || "Nu știm încă";

  return (
    <section className={profileStyles.profileContainer__studentCatalogue}>
      <h2>Carnetul tău de Elev</h2>
      <div className={profileStyles.profileContainer__studentCatalogueSection}>
        <table
          className={profileStyles.profileContainer__studentCatalogueContent}
        >
          <thead>
            <tr>
              <th>Materie</th>
              <th>Profesor</th>
              <th>Note</th>
              <th>Absențe</th>
            </tr>
          </thead>
          <tbody>
            {studentCardContent?.map((section, index) => {
              return (
                <tr key={section.id || index}>
                  <td>{studentCardSubjects?.[index].subject}</td>
                  <td>
                    {studentCardTeachers?.[index].teacher || "Nu știm încă"}
                  </td>
                  <td>
                    <ul>
                      {studentCardGrades?.[index].grades?.map((grade) => {
                        return <li key={grade.id}>{grade.value}</li>;
                      })}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {studentCardAbsences?.[index].absences?.map((absence) => {
                        return (
                          <li key={absence.id}>
                            {absence.date.toLocaleDateString()}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
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
              Media Generală Curentă: <span>{studentGPA}</span>
            </li>
            <li>
              Poziția în Clasamentul Clasei: <span>{studentClassPosition}</span>
            </li>
            <li>
              Total Absențe: <span>{studentTotalAbsences}</span>
            </li>
            <li>
              Număr Absențe Motivate: <span>{studentReasonedAbsences}</span>
            </li>
            <li>
              Număr Absențe Nemotivate: <span>{studentUnreasonedAbsences}</span>
            </li>
            <li>
              Ziua cu cele mai multe Absențe:{" "}
              <span>
                {studentMaxAbsencesInADayDate} <br /> {studentMaxAbsencesInADay}{" "}
                absențe
              </span>
            </li>
            <li>
              Cea mai mare Medie la o Materie:{" "}
              <span>
                {studentMaxSubjectAverageLabel} <br />
                {studentMaxSubjectAverage.key &&
                  `, media ${studentMaxSubjectAverageValue}`}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProfileStudentCatalogue;
