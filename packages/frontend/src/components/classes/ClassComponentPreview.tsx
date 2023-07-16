// React
import { FC } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Types
import ComponentPreviewProps from "@/core/interfaces/component/ComponentPreviewProps";
import TemplateTeacher from "@/core/interfaces/template/TemplateTeacher";
// SCSS
import classStyles from "../../scss/components/pages/IndividualClass.module.scss";

const ClassComponentPreview: FC<ComponentPreviewProps> = ({
  component,
  type,
}) => {
  const { fullname, profile_img_url, id } = component;
  const { subject } = component as TemplateTeacher;

  const linkDest = `/profil/${id}?type=${type}`;

  return (
    <Link
      href={linkDest}
      className={classStyles.classContainer__componentPreview}
      title={`Mai multe detalii despre ${fullname}.`}
      aria-label={`Mai multe detalii despre ${fullname}.`}
    >
      <Image
        width={200}
        height={200}
        alt={fullname as string}
        src={profile_img_url as string}
      />
      <h4>{fullname}</h4>
      {type === "teacher" && <p>PROFESOR DE {subject}</p>}
    </Link>
  );
};

export default ClassComponentPreview;
