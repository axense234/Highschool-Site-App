// Types
import { Absence, Grade, Subjects } from "@prisma/client";
import { CountMapObject } from "types";

const useCalculateCardStats = (
  studentCardSubjects: {
    id: string;
    subject: Subjects;
  }[],
  studentCardGrades: {
    id: string;
    grades: Grade[] | undefined;
    gradesSubject: Subjects;
  }[],
  studentCardAbsences: {
    id: string;
    absences: Absence[] | undefined;
  }[]
) => {
  const calcSubjectGradeAvg = (grades: Grade[] | undefined) => {
    const sumOfGrades = Number(
      grades?.reduce((sum, grade) => {
        return sum + grade.value;
      }, 0)
    );
    const subjectGradeAvg = sumOfGrades / Number(grades?.length);
    return subjectGradeAvg || 0;
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
    }, 0) /
    studentCardGrades.filter((grade) => {
      return (grade.grades?.length as number) >= 1 || 0;
    }).length;

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
          return {
            id: absence.absence_uid,
            absenceDate: new Date(absence.date).toLocaleDateString(),
          };
        });
      })
      .flat() || [];

  const studentMaxAbsencesInADay =
    studentDaysThatContainAbsences.length > 0
      ? Math.max(
          ...studentDaysThatContainAbsences.map((day) => {
            let maxAbsencesInDay = 0;
            maxAbsencesInDay = Math.max(
              studentCardAbsences.reduce((totalAbs, subject) => {
                return (
                  totalAbs +
                  Number(
                    subject.absences?.filter(
                      (absence) =>
                        new Date(absence.date).toLocaleDateString() ===
                        day?.absenceDate
                    ).length
                  )
                );
              }, 0),
              maxAbsencesInDay
            );
            return maxAbsencesInDay;
          })
        )
      : 0;

  const studentDaysThatContainAbsencesArray =
    studentDaysThatContainAbsences.map((day) => {
      if (day?.absenceDate) {
        return new Date(day.absenceDate).toLocaleDateString();
      }
      return null;
    }) || [];

  const studentMaxAbsencesInADayDate = findMaxValue(
    studentDaysThatContainAbsencesArray.reduce((countMap, item) => {
      if (item) {
        countMap[item] = (countMap[item] || 0) + 1;
      }
      return countMap;
    }, {} as CountMapObject)
  ).key;

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

  return {
    studentCardAbsences,
    studentCardGrades,
    studentCardSubjects,
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
  };
};

export default useCalculateCardStats;
