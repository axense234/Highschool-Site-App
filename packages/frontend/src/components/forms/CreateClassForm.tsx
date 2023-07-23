// React
import { ChangeEvent, FC, SyntheticEvent, useEffect, useRef } from "react";
// Types
import { Admin } from "@prisma/client";
// React Icons
import { SiGoogleclassroom } from "react-icons/si";
import { AiFillPicture } from "react-icons/ai";
import { MdOutlinePublic, MdOutlinePeopleOutline } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
// SCSS
import profileSettingsStyles from "../../scss/components/profile/ProfileSettingsForm.module.scss";
// Data
import { defaultTemplateClass } from "@/data";
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
import {
  selectAllTeachers,
  selectLoadingTeachers,
} from "@/redux/slices/teachersSlice";
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
  const loadingTeachers = useAppSelector(selectLoadingTeachers);
  const classLabelInputRef = useRef<HTMLInputElement>(null);
  const templateClass = useAppSelector(selectTemplateClass);

  const usableTeachers = teachers.filter((teacher) => {
    return !teacher.master;
  });

  const usableStudents = students.filter((student) => {
    return !student.class_uid;
  });

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

  const onClassTeachersChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    dispatch(updateTemplateClass({ key: "teachers", value: selectedValues }));
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
    if (usableTeachers.length >= 1) {
      dispatch(
        updateTemplateClass({
          key: "master_teacher_uid",
          value: usableTeachers[0].teacher_uid,
        })
      );
    }
  }, [teachers]);

  return (
    <div className={profileSettingsStyles.profileSettingsContainer}>
      <form
        className={profileSettingsStyles.profileSettingsContainer__form}
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
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__controlLabel
              }
            >
              <SiGoogleclassroom />
              <label htmlFor="label">Etichetă Clasă: </label>
            </div>
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
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__controlLabel
              }
            >
              <AiFillPicture />
              <label htmlFor="img">Fundal Clasă(*):</label>
            </div>
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
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__controlLabel
              }
            >
              <MdOutlinePublic />
              <label htmlFor="classPublicity">Publicitate Clasă(*): </label>
            </div>
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
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__controlLabel
              }
            >
              <FaChalkboardTeacher />
              <label htmlFor="masterTeacher">Diriginte Clasă(*):</label>
            </div>
            {usableTeachers.length >= 1 ? (
              <select
                name="masterTeacher"
                id="masterTeacher"
                value={templateClass.master_teacher_uid as string}
                onChange={(e) => onMasterTeacherChange(e.target.value)}
              >
                <option value="">Fără diriginte.</option>
                {usableTeachers.map((teacher) => {
                  return (
                    <option
                      value={teacher.teacher_uid}
                      key={teacher.teacher_uid}
                    >
                      {teacher.fullname}
                    </option>
                  );
                })}
              </select>
            ) : (
              <p>Nu avem profesori valabili.</p>
            )}
          </div>
          {loadingTeachers === "PENDING" || loadingTeachers === "IDLE" ? (
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
              <div
                className={
                  profileSettingsStyles.profileSettingsContainer__controlLabel
                }
              >
                <SlPeople />
                <label htmlFor="addTeachers">Adăugați Profesori(*):</label>
              </div>
              {teachers.length >= 1 ? (
                <select
                  name="addTeachers"
                  id="addTeachers"
                  multiple
                  required={false}
                  value={templateClass.teachers as string[]}
                  onChange={(e) => onClassTeachersChange(e)}
                  style={{ width: "100%" }}
                >
                  {teachers.map((teacher) => {
                    return (
                      <option
                        value={teacher.teacher_uid}
                        key={teacher.teacher_uid}
                      >
                        {teacher.fullname}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <p>Nu avem profesori valabili.</p>
              )}
            </div>
          )}
          {loadingStudents === "PENDING" || loadingStudents === "IDLE" ? (
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
              <div
                className={
                  profileSettingsStyles.profileSettingsContainer__controlLabel
                }
              >
                <MdOutlinePeopleOutline />
                <label htmlFor="addStudents">Adăugați Studenți(*):</label>
              </div>
              {usableStudents.length >= 1 ? (
                <select
                  name="addStudents"
                  id="addStudents"
                  multiple
                  required={false}
                  value={templateClass.students as string[]}
                  onChange={(e) => onClassStudentsChange(e)}
                  style={{ width: "100%" }}
                >
                  {usableStudents.map((student) => {
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
              ) : (
                <p>Nu avem studenți valabili.</p>
              )}
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
