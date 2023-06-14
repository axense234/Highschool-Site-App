// React
import { FC, useEffect, useRef, SyntheticEvent, useState } from "react";
// Prisma Types
import { Materii, Profesor } from "@prisma/client";
// React Icons
import { FiPlus } from "react-icons/fi";
import { FcCheckmark } from "react-icons/fc";
// Next
import Image from "next/image";
// SCSS
import profesoriStyles from "../scss/components/Profesori.module.scss";
// Components
import Meta from "@/components/Meta";
import HomeTitle from "@/components/Home/HomeTitle";
import SectionLoading from "@/components/SectionLoading";
import CardModal from "@/components/CardModal";
import Overlay from "@/components/Overlay";
import EditFormModal from "@/components/EditFormModal";
import PageNav from "@/components/PageNav";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImageForTeacher,
  getAllTeachers,
  selectAllTeachers,
  selectFoundTeacherId,
  selectLoadingTeachers,
  selectTeacherById,
  selectTemplateTeacher,
  setFoundTeacherId,
  setTemplateTeacher,
  updateTeacherById,
  updateTemplateTeacher,
} from "@/redux/slices/teachersSlice";
import {
  selectCardModalId,
  selectEditMode,
  selectOverlay,
  setCardModalId,
  setEditMode,
} from "@/redux/slices/generalSlice";
// Data
import { materii } from "@/data";
// Store
import { State } from "@/redux/api/store";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";

const Profesori: FC = () => {
  useGetPathname();

  const teachers = useAppSelector(selectAllTeachers);
  const loadingTeachers = useAppSelector(selectLoadingTeachers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadingTeachers === "IDLE") {
      dispatch(getAllTeachers({ query: "", sortByOption: "" }));
    }
  }, []);

  return (
    <>
      <Meta
        title='Liceul Teoretic "Ion Barbu" Pitești - Profesorii Noștri'
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502837/Highschool%20Site%20App/IMG-20230608-WA0023_fixi8s.jpg",
        ]}
      />
      <main className={profesoriStyles.profesoriContainer}>
        <HomeTitle
          title="Profesorii Noștri"
          quote="Omul fără învățătură e ca pământul fără ploaie."
        />
        <Overlay />
        <section className={profesoriStyles.profesoriContainer__content}>
          <h2>Profesorii noștri</h2>
          <PageNav componentType="teacher" />
          {loadingTeachers === "IDLE" || loadingTeachers === "PENDING" ? (
            <SectionLoading />
          ) : (
            <div className={profesoriStyles.profesoriContainer__profesori}>
              {teachers.map((teacher) => {
                return <Profesor {...teacher} key={teacher.id} />;
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

const Profesor: FC<Profesor> = ({
  descriere,
  imagineProfilUrl,
  profesorDe,
  username,
  profesor_uid,
}) => {
  const dispatch = useAppDispatch();
  const overlay = useAppSelector(selectOverlay);
  const cardModalId = useAppSelector(selectCardModalId);
  const editMode = useAppSelector(selectEditMode);

  const teacher = useAppSelector((state: State) =>
    selectTeacherById(state, cardModalId)
  );
  const foundTeachearId = useAppSelector(selectFoundTeacherId);

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);
  const teacherRef = useRef<HTMLElement>(null);

  const editModeAvailable = profesor_uid === cardModalId && editMode;

  // For edit mode
  const templateTeacher = useAppSelector(selectTemplateTeacher);

  const handleImagineProfilChange = (imagine: File | string) => {
    dispatch(createCloudinaryImageForTeacher(imagine as File));
  };

  const onUsernameChange = (username: string) => {
    dispatch(updateTemplateTeacher({ key: "username", value: username }));
  };

  const onMaterieChange = (materie: Materii) => {
    dispatch(updateTemplateTeacher({ key: "profesorDe", value: materie }));
  };

  const onDescriereChange = (descriere: string) => {
    dispatch(updateTemplateTeacher({ key: "descriere", value: descriere }));
  };

  const handleUpdateTeacher = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(updateTeacherById(templateTeacher));
    if (templateTeacher.username) {
      dispatch(setEditMode(false));
    }
  };

  useEffect(() => {
    if (teacher?.username) {
      dispatch(setTemplateTeacher(teacher));
    }
  }, [teacher?.username]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (foundTeachearId === profesor_uid) {
      window.scrollBy({
        behavior: "smooth",
        top: teacherRef.current?.getBoundingClientRect().top,
      });
      (teacherRef.current as HTMLElement).classList.add("shaking");
      timeout = setTimeout(() => {
        dispatch(setFoundTeacherId(""));
        (teacherRef.current as HTMLElement).classList.remove("shaking");
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [foundTeachearId]);

  if (editModeAvailable) {
    return (
      <article
        className={profesoriStyles.profesoriContainer__profesor}
        onMouseEnter={() => dispatch(setCardModalId(profesor_uid))}
        onMouseLeave={() => {
          if (!overlay.showOverlay) {
            dispatch(setCardModalId(""));
            dispatch(setEditMode(false));
          }
        }}
      >
        <EditFormModal type="teachers" />
        <div className={profesoriStyles.profesoriContainer__profesorImage}>
          <Image
            src={
              (templateTeacher.imagineProfilUrl as string) ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt={templateTeacher.username}
            width={500}
            height={500}
            title={templateTeacher.username}
            placeholder="blur"
            blurDataURL={
              (templateTeacher.imagineProfilUrl as string) ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
          />
          <div
            className={profesoriStyles.profesoriContainer__profesorImageOverlay}
          >
            <input
              type="file"
              name="profesorImage"
              id="profesorImage"
              ref={hiddenFileInputRef}
              onChange={(e) => {
                if (e.target.files) {
                  handleImagineProfilChange(e.target.files[0]);
                }
              }}
            />
            <button
              type="button"
              onClick={() => hiddenFileInputRef.current?.click()}
            >
              <FiPlus />
            </button>
          </div>
        </div>
        <form
          className={profesoriStyles.profesoriContainer__profesorInfo}
          onSubmit={(e) => handleUpdateTeacher(e)}
        >
          <input
            type="text"
            name="username"
            id="username"
            value={templateTeacher.username}
            onChange={(e) => onUsernameChange(e.target.value)}
          />
          <div className={profesoriStyles.profesoriContainer__control}>
            <label htmlFor="materii">Profesor de:</label>
            <select
              name="materii"
              id="materii"
              value={templateTeacher.profesorDe}
              onChange={(e) => onMaterieChange(e.target.value as Materii)}
            >
              {materii.map((materie) => {
                return (
                  <option value={materie.nume} key={materie.id}>
                    {materie.nume}
                  </option>
                );
              })}
            </select>
          </div>
          <textarea
            value={templateTeacher.descriere}
            onChange={(e) => onDescriereChange(e.target.value)}
          >
            {descriere.length >= 200
              ? `${descriere.slice(0, 200)}...`
              : descriere}
          </textarea>
          <button type="submit" title="Salveaza.">
            <FcCheckmark />
          </button>
        </form>
        <CardModal cardId={profesor_uid} componentType="teacher" />
      </article>
    );
  }

  return (
    <article
      className={profesoriStyles.profesoriContainer__profesor}
      onMouseEnter={() => {
        dispatch(setCardModalId(profesor_uid));
      }}
      onMouseLeave={() => {
        if (!overlay.showOverlay) {
          dispatch(setCardModalId(""));
        }
      }}
      ref={teacherRef}
    >
      <Image
        src={
          (imagineProfilUrl as string) ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        alt={username}
        width={500}
        height={500}
        title={username}
        placeholder="blur"
        blurDataURL={
          (templateTeacher.imagineProfilUrl as string) ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
      />
      <div className={profesoriStyles.profesoriContainer__profesorInfo}>
        <h3>{username}</h3>
        <p>Profesor de: {profesorDe}</p>
        <p>
          {descriere.length >= 200
            ? `${descriere.slice(0, 200)}...`
            : descriere}
        </p>
      </div>
      <CardModal cardId={profesor_uid} componentType="teacher" />
    </article>
  );
};

export default Profesori;
