// React
import { FC } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Types
import TemplateClass from "@/core/interfaces/template/TemplateClass";
// SCSS
import classesStyles from "../../scss/components/pages/Classes.module.scss";

const ClassItem: FC<TemplateClass> = ({
  label,
  image_url,
  master_teacher_name,
  class_uid,
}) => {
  return (
    <div className={classesStyles.classesContainer__classContainer}>
      <Image
        alt={label as string}
        src={image_url as string}
        title={label}
        aria-label={label}
        width={400}
        height={300}
      />
      <div className={classesStyles.classesContainer__classDetails}>
        <h3>{label}</h3>
        {master_teacher_name ? (
          <p>DIRIGINTE - {master_teacher_name}</p>
        ) : (
          <p>FĂRĂ DIRIGINTE</p>
        )}
        <Link
          href={`/clase/${class_uid as string}`}
          title={`Mai multe detalii despre clasa ${label}.`}
          aria-label={`Mai multe detalii despre clasa ${label}.`}
        >
          Explorați
        </Link>
      </div>
    </div>
  );
};

export default ClassItem;
