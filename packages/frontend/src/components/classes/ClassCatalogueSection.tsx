// React
import { FC } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Types
import {
  ClassCatalogueSectionProps,
  TemplateStudent,
  TemplateStudentCard,
} from "types";
// SCSS
import classStyles from "../../scss/components/pages/IndividualClass.module.scss";
// Components
import ClassCatalogueSectionContent from "./ClassCatalogueSectionContent";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectSubjectsSlicer,
  setEditableGradeId,
} from "@/redux/slices/generalSlice";

const ClassCatalogueSection: FC<ClassCatalogueSectionProps> = ({
  student,
  class_uid,
}) => {
  const dispatch = useAppDispatch();
  const subjectsSlicer = useAppSelector(selectSubjectsSlicer);

  const studentCard = (student as TemplateStudent)
    .student_card as TemplateStudentCard;
  const studentCardContent = studentCard?.content?.slice(
    subjectsSlicer,
    subjectsSlicer + 6
  );

  return (
    <tr
      key={student.student_uid}
      className={classStyles.classContainer__classCatalogueSection}
    >
      <td className={classStyles.classContainer__classCatalogueStudent}>
        <Link href={`/profil/${student.student_uid}?type=student`}>
          <Image
            alt={student.fullname}
            src={student.profile_img_url as string}
            height={100}
            width={100}
          />
          <h3>{student.fullname}</h3>
        </Link>
      </td>
      <td
        className={`${classStyles.classContainer__classCatalogueStudentContentWrapper}`}
        onMouseLeave={() => {
          dispatch(setEditableGradeId(""));
        }}
      >
        {studentCardContent?.map((studentSection) => {
          return (
            <ClassCatalogueSectionContent
              key={studentSection.card_section_uid}
              class_uid={class_uid}
              section_uid={studentSection.card_section_uid}
              studentCardContent={studentCardContent}
            />
          );
        })}
      </td>
    </tr>
  );
};

export default ClassCatalogueSection;
