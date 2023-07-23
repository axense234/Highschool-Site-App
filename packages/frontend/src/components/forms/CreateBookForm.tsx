// React
import { FC, SyntheticEvent, useEffect } from "react";
// Types
import { Admin, Teacher } from "@prisma/client";
// React Icons
import { TiDocumentText } from "react-icons/ti";
import { AiFillPicture, AiFillBook } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
// SCSS
import profileSettingsStyles from "../../scss/components/profile/ProfileSettingsForm.module.scss";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createBook,
  createCloudinaryImageForBook,
  selectLoadingCreateCloudinaryImageForBook,
  selectTemplateBook,
  updateTemplateBook,
} from "@/redux/slices/booksSlice";
import {
  selectProfile,
  setScreenLoadingMessage,
} from "@/redux/slices/generalSlice";
// Components
import FormModal from "../modals/FormModal";

const CreateBookForm: FC = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectProfile);
  const loadingCreateCloudinaryImageForBook = useAppSelector(
    selectLoadingCreateCloudinaryImageForBook
  );
  const templateBook = useAppSelector(selectTemplateBook);

  const onTitleChange = (title: string) => {
    dispatch(updateTemplateBook({ key: "title", value: title }));
  };

  const onAuthorChange = (author: string) => {
    dispatch(updateTemplateBook({ key: "author", value: author }));
  };

  const onDescriptionChange = (description: string) => {
    dispatch(updateTemplateBook({ key: "description", value: description }));
  };

  const onPdfFileUrlChange = (file: string) => {
    dispatch(updateTemplateBook({ key: "pdf_file_url", value: file }));
  };

  const handleBookImageChange = (image: File | string) => {
    dispatch(createCloudinaryImageForBook(image as File));
  };

  const handleSubmitBook = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      setScreenLoadingMessage(
        "Încercăm să creăm cartea ta, vă rugăm să așteptați..."
      )
    );
    dispatch(createBook(templateBook));
  };

  useEffect(() => {
    if (profile.email) {
      const profileRole = profile.role;
      dispatch(
        updateTemplateBook({
          key:
            profileRole === "ADMIN"
              ? "created_by_admin_uid"
              : "created_by_teacher_uid",
          value:
            profileRole === "ADMIN"
              ? (profile as Admin).admin_uid
              : (profile as Teacher).teacher_uid,
        })
      );
    }
  }, [profile]);

  return (
    <div className={profileSettingsStyles.profileSettingsContainer}>
      <form
        className={profileSettingsStyles.profileSettingsContainer__form}
        onSubmit={(e) => handleSubmitBook(e)}
      >
        <FormModal type="books" />
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
              <AiFillBook />
              <label htmlFor="title">Titlu Carte: </label>
            </div>
            <input
              type="text"
              id="title"
              required
              maxLength={30}
              placeholder="ex: Dracula"
              value={templateBook.title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>
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
              <BsFillPersonFill />
              <label htmlFor="author">Autor Carte: </label>
            </div>
            <input
              type="text"
              id="author"
              required
              maxLength={30}
              placeholder="ex: Mihai Eminescu"
              value={templateBook.author}
              onChange={(e) => onAuthorChange(e.target.value)}
            />
          </div>
          <div
            className={
              profileSettingsStyles.profileSettingsContainer__textAreaControl
            }
          >
            <div
              className={
                profileSettingsStyles.profileSettingsContainer__controlLabel
              }
            >
              <TiDocumentText />
              <label htmlFor="description">Descriere Carte:</label>
            </div>
            <textarea
              name="description"
              id="description"
              required
              value={templateBook.description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>
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
              <FaFilePdf />
              <label htmlFor="pdf_url">PDF URL Carte(*): </label>
            </div>
            <input
              type="url"
              id="pdf_url"
              required={false}
              value={templateBook.pdf_file_url as string}
              onChange={(e) => onPdfFileUrlChange(e.target.value)}
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
              <label htmlFor="preview">Preview PDF Carte(*):</label>
            </div>
            <input
              type="file"
              id="preview"
              required={false}
              onChange={(e) => {
                if (e.target.files) {
                  handleBookImageChange(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className={profileSettingsStyles.profileSettingsContainer__formButton}
          disabled={loadingCreateCloudinaryImageForBook === "PENDING"}
        >
          {loadingCreateCloudinaryImageForBook === "PENDING"
            ? "Se încarcă imaginea..."
            : "Creează Carte"}
        </button>
      </form>
    </div>
  );
};

export default CreateBookForm;
