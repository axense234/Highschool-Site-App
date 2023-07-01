// React
import { ChangeEvent, FC, SyntheticEvent, useEffect, useRef } from "react";
// Types
import { Admin, Student } from "@prisma/client";
// SCSS
import profileSettingsStyles from "../../scss/components/profile/ProfileSettingsForm.module.scss";
// Data
import { classLabelPattern, defaultTemplateClass } from "@/data";
// Components
import FormModal from "../modals/FormModal";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createClass,
  createCloudinaryImageForClass,
  selectLoadingCreateCloudinaryImageForClass,
  selectTemplateClass,
  setTemplateClass,
  updateTemplateClass,
} from "@/redux/slices/classesSlice";
import {
  selectProfile,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
import { selectAllTeachers } from "@/redux/slices/teachersSlice";
import {
  getAllStudents,
  selectAllStudents,
  selectLoadingStudents,
} from "@/redux/slices/studentsSlice";

const CreateClassForm: FC = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectProfile);
  const teachers = useAppSelector(selectAllTeachers);
  const students = useAppSelector(selectAllStudents);
  const loadingCreateCloudinaryImageForClass = useAppSelector(
    selectLoadingCreateCloudinaryImageForClass
  );
  const loadingStudents = useAppSelector(selectLoadingStudents);
  const classLabelInputRef = useRef<HTMLInputElement>(null);
  const templateClass = useAppSelector(selectTemplateClass);

  const onLabelChange = (label: string) => {
    dispatch(updateTemplateClass({ key: "label", value: label }));
  };

  const handleClassImageChange = (image: File | string) => {
    dispatch(createCloudinaryImageForClass(image as File));
  };

  const onClassPublicityChange = (publicity: "DA" | "NU") => {
    dispatch(updateTemplateClass({ key: "public", value: publicity === "DA" }));
  };

  const onClassStudentsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    dispatch(updateTemplateClass({ key: "students", value: selectedValues }));
  };

  const onMasterTeacherChange = (masterUid: string) => {
    dispatch(
      updateTemplateClass({ key: "master_teacher_uid", value: masterUid })
    );
  };

  const handleSubmitClass = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      setScreenLoadingMessage(
        "Încercăm să creăm clasa ta, vă rugăm să așteptați..."
      )
    );
    dispatch(createClass(templateClass));
  };

  useEffect(() => {
    dispatch(setTemplateClass(defaultTemplateClass));
  }, []);

  useEffect(() => {
    if (loadingStudents === "IDLE") {
      dispatch(getAllStudents());
    }
  }, []);

  useEffect(() => {
    if (profile.email) {
      dispatch(
        updateTemplateClass({
          key: "created_by_admin_uid",
          value: (profile as Admin).admin_uid,
        })
      );
    }
  }, [profile]);

  useEffect(() => {
    if (teachers.length >= 1) {
      dispatch(
        updateTemplateClass({
          key: "master_teacher_uid",
          value: teachers[0].teacher_uid,
        })
      );
    }
  }, [teachers]);

  return (
    <div className={profileSettingsStyles.profileSettingsContainer}>
      <form
        className={`${profileSettingsStyles.profileSettingsContainer__form}`}
        onSubmit={(e) => handleSubmitClass(e)}
      >
        <FormModal type="classes" />
        <div
          className={profileSettingsStyles.profileSettingsContainer__content}
        >
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__textControl
            }
          >
            <label htmlFor="label">Etichetă Clasă: </label>
            <input
              type="text"
              id="label"
              required
              maxLength={30}
              placeholder="ex: 10B"
              value={templateClass.label}
              onChange={(e) => onLabelChange(e.target.value)}
              ref={classLabelInputRef}
            />
          </div>
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__imageControl
            }
          >
            <label htmlFor="img">Fundal Clasă:</label>
            <input
              type="file"
              id="img"
              required={false}
              onChange={(e) => {
                if (e.target.files) {
                  handleClassImageChange(e.target.files[0]);
                }
              }}
            />
          </div>
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__selectControl
            }
          >
            <label htmlFor="classPublicity">Publicitate Clasă: </label>
            <select
              name="classPublicity"
              id="classPublicity"
              required
              onChange={(e) =>
                onClassPublicityChange(e.target.value as "DA" | "NU")
              }
            >
              <option value="DA">PUBLICĂ</option>
              <option value="NU">NEPUBLICĂ</option>
            </select>
          </div>
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__selectControl
            }
          >
            <label htmlFor="masterTeacher">Diriginte Clasă:</label>
            <select
              name="masterTeacher"
              id="masterTeacher"
              required
              value={templateClass.master_teacher_uid as string}
              onChange={(e) => onMasterTeacherChange(e.target.value)}
            >
              {teachers.map((teacher) => {
                return (
                  <option value={teacher.teacher_uid} key={teacher.teacher_uid}>
                    {teacher.fullname}
                  </option>
                );
              })}
            </select>
          </div>
          {loadingStudents === "PENDING" ? (
            <p>Loading...</p>
          ) : (
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__selectControl
              }
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <label htmlFor="addStudents">Adăugați Studenți:</label>
              <select
                name="addStudents"
                id="addStudents"
                multiple
                required={false}
                value={templateClass.students as string[]}
                onChange={(e) => onClassStudentsChange(e)}
                style={{ width: "100%" }}
              >
                {students.map((student) => {
                  return (
                    <option
                      value={student.student_uid}
                      key={student.student_uid}
                    >
                      {student.fullname}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
        <button
          type="submit"
          className={profileSettingsStyles.profileSettingsContainer__formButton}
          disabled={loadingCreateCloudinaryImageForClass === "PENDING"}
        >
          {loadingCreateCloudinaryImageForClass === "PENDING"
            ? "Se încarcă imaginea..."
            : "Creează Clasă"}
        </button>
      </form>
    </div>
  );
};

export default CreateClassForm;
