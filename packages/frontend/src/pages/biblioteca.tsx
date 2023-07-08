// React
import { FC, useEffect, useState } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Types
import { TemplateBook } from "types";
// React Icons
import { AiFillBook } from "react-icons/ai";
// SCSS
import libraryStyles from "../scss/components/pages/Library.module.scss";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Components
import Meta from "@/components/others/Meta";
import PageTitle from "@/components/home/PageTitle";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllBooks,
  selectAllBooks,
  selectLoadingBooks,
} from "@/redux/slices/booksSlice";

const Library: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const loadingBooks = useAppSelector(selectLoadingBooks);
  const books = useAppSelector(selectAllBooks);

  useEffect(() => {
    if (loadingBooks === "IDLE") {
      dispatch(getAllBooks());
    }
  }, []);

  return (
    <>
      <Meta
        title='Bibliotecă | Liceul Teoretic "Ion Barbu" Pitești'
        desc='Descoperă oază de cunoaștere și aventură intelectuală la Biblioteca Liceului Teoretic "Ion Barbu" Pitești. Resurse diverse, evenimente culturale și asistență specializată pentru a-ți satisface curiozitatea și pasiunile. Vino și explorează acum!'
      />
      <main className={libraryStyles.libraryContainer}>
        <PageTitle
          title="Biblioteca Liceului"
          quote="Cărțile - scara spre înțelepciune."
        />
        <section className={libraryStyles.libraryContainer__libraryContent}>
          <h2>Cărțile noastre valabile</h2>
          <div className={libraryStyles.libraryContainer__libraryBooksWrapper}>
            {books.length >= 1 ? (
              <ul className={libraryStyles.libraryContainer__libraryBooks}>
                {books.map((book) => {
                  return (
                    <li key={book.book_uid}>
                      <Book {...book} />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Nu avem cărți momentan.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

const Book: FC<TemplateBook> = ({
  author,
  createdAt,
  description,
  title,
  pdf_file_url,
  pdf_file_preview_url,
}) => {
  console.log(pdf_file_url);
  const [toggle, setToggle] = useState<boolean>(false);
  const componentHeightBasedOnPdfFileUrl = pdf_file_url ? "30rem" : "20rem";
  const componentHeight = toggle ? componentHeightBasedOnPdfFileUrl : "0px";

  return (
    <div className={libraryStyles.libraryContainer__bookContainer}>
      <div
        className={libraryStyles.libraryContainer__bookContainerTitle}
        onClick={() => setToggle(!toggle)}
        role="button"
        tabIndex={0}
        style={{
          boxShadow: toggle ? "0px 4px 6px black" : "none",
          filter: toggle ? "brightness(0.8)" : "brightness(1)",
        }}
      >
        <AiFillBook />
        <div
          className={libraryStyles.libraryContainer__bookContainerTitleDetails}
        >
          <p>{author || "NECUNOSCUT"}</p>
          <span> - </span>
          <h3>{title}</h3>
        </div>
        <p>Data creării: {new Date(createdAt).toLocaleDateString()}</p>
      </div>
      <div
        className={libraryStyles.libraryContainer__bookContainerContent}
        style={{
          visibility: toggle ? "visible" : "hidden",
          height: componentHeight,
          padding: toggle ? "1rem" : "0rem",
        }}
      >
        <p>{description}</p>
        {pdf_file_url && (
          <div className={libraryStyles.libraryContainer__pdfPreview}>
            {pdf_file_preview_url && (
              <Image
                height={70}
                width={70}
                alt={title}
                src={pdf_file_preview_url}
              />
            )}
            <Link href={pdf_file_url} target="_blank">
              {title}.pdf
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
