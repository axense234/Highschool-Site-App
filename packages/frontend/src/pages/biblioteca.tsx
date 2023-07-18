// React
import { FC, useEffect, useState } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// React Icons
import { AiFillBook } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";
import { TbPdf } from "react-icons/tb";
// Types
import { BsFillPersonFill } from "react-icons/bs";
import TemplateBook from "@/core/interfaces/template/TemplateBook";
// SCSS
import libraryStyles from "../scss/components/pages/Library.module.scss";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Components
import Meta from "@/components/others/Meta";
import PageTitle from "@/components/home/PageTitle";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllBooks, selectAllBooks } from "@/redux/slices/booksSlice";
import {
  selectBookSortingOptions,
  updateBookSortingOptions,
} from "@/redux/slices/generalSlice";

const Library: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const bookSortingOptions = useAppSelector(selectBookSortingOptions);

  useEffect(() => {
    dispatch(getAllBooks(bookSortingOptions));
  }, [bookSortingOptions.sortByFilterValue]);

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
            <BooksPageNav />
            <Books />
          </div>
        </section>
      </main>
    </>
  );
};

const BooksPageNav: FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectAllBooks);
  const bookSortingOptions = useAppSelector(selectBookSortingOptions);

  const bookAuthors = books.map((book) => {
    return { book_uid: book.book_uid, authorName: book.author };
  });

  const onAuthorChange = (author: string) => {
    dispatch(
      updateBookSortingOptions({ key: "filterQueryValue", value: author })
    );
  };

  const onBookOrderChange = (order: string) => {
    dispatch(
      updateBookSortingOptions({ key: "sortByFilterValue", value: order })
    );
  };

  const onHasPdfFileUrlChange = (hasPdf: boolean) => {
    dispatch(updateBookSortingOptions({ key: "hasPdfFileUrl", value: hasPdf }));
  };

  return (
    <div className={libraryStyles.libraryContainer__booksPageNavContainer}>
      <h3>Opțiuni de Filtrare </h3>
      <form className={libraryStyles.libraryContainer__booksPageNavForm}>
        <div className={libraryStyles.libraryContainer__selectFilter}>
          <div className={libraryStyles.libraryContainer__controlLabel}>
            <BsFillPersonFill />
            <label htmlFor="author">Autor Carte: </label>
          </div>
          <select
            name="author"
            id="author"
            value={bookSortingOptions.filterQueryValue}
            onChange={(e) => onAuthorChange(e.target.value)}
          >
            <option value="">Orice Autor</option>
            {bookAuthors?.map((author) => {
              return (
                <option key={author.book_uid} value={author.authorName}>
                  {author.authorName}
                </option>
              );
            })}
          </select>
        </div>
        <div className={libraryStyles.libraryContainer__selectFilter}>
          <div className={libraryStyles.libraryContainer__controlLabel}>
            <BiSortAlt2 />
            <label htmlFor="createdAt">Sortați după vechime </label>
          </div>
          <select
            name="createdAt"
            id="createdAt"
            value={bookSortingOptions.sortByFilterValue}
            onChange={(e) => onBookOrderChange(e.target.value)}
          >
            <option value="asc">Crescător</option>
            <option value="desc">Descrescător</option>
          </select>
        </div>
        <div className={libraryStyles.libraryContainer__checkboxFilter}>
          <div className={libraryStyles.libraryContainer__controlLabel}>
            <TbPdf />
            <label htmlFor="pdfOnly">Numai Cărți cu PDF Valabil</label>
          </div>
          <input
            type="checkbox"
            id="pdfOnly"
            required={false}
            checked={bookSortingOptions.hasPdfFileUrl}
            onChange={() =>
              onHasPdfFileUrlChange(!bookSortingOptions.hasPdfFileUrl)
            }
          />
        </div>
      </form>
    </div>
  );
};

const Books: FC = () => {
  const bookSortingOptions = useAppSelector(selectBookSortingOptions);
  const books = useAppSelector(selectAllBooks);

  const filteredBooks = books.filter((book) =>
    bookSortingOptions.filterQueryValue
      ? book.author === bookSortingOptions.filterQueryValue
      : book.author
  );

  const filteredBooksThatHavePdfFileUrls = filteredBooks.filter(
    (book) => book.pdf_file_url
  );

  const usedBooks = bookSortingOptions.hasPdfFileUrl
    ? filteredBooksThatHavePdfFileUrls
    : filteredBooks;

  if (usedBooks.length < 1) {
    return <p>Nu avem cărți momentan.</p>;
  }

  return (
    <ul className={libraryStyles.libraryContainer__libraryBooks}>
      {usedBooks.map((book) => {
        return (
          <li key={book.book_uid}>
            <Book {...book} />
          </li>
        );
      })}
    </ul>
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
        <p>Data creării: {new Date(createdAt as Date).toLocaleDateString()}</p>
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
                alt={title as string}
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
