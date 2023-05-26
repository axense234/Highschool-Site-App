// React
import { FC } from "react";
// Types and Data
import { DocumentOrLaw } from "types";
import { documentsAndLawsInfo } from "@/data";
// SCSS
import documentsStyles from "../scss/components/Documents.module.scss";
// Components
import HomeTitle from "@/components/Home/HomeTitle";
import Meta from "@/components/Meta";

const Documents: FC = () => {
  return (
    <>
      <Meta title='Liceul Teoretic "Ion Barbu" Pitești - Legi și Documente' />
      <main className={documentsStyles.documentsContainer}>
        <HomeTitle
          title="Legi și Documente"
          quote="Documentele - amprenta legii și justiției."
        />
        <section
          className={documentsStyles.documentsContainer__content}
          id="map"
        >
          <h2>Documente</h2>
          <div className={documentsStyles.documentsContainer__info}>
            <ul className={documentsStyles.documentsContainer__map}>
              {documentsAndLawsInfo.map((document) => {
                return (
                  <li key={document.id}>
                    <a href={`#${document.label}`}>{document.label}</a>
                  </li>
                );
              })}
            </ul>
            <div
              className={documentsStyles.documentsContainer__documents}
              id="documents"
            >
              {documentsAndLawsInfo.map((document) => {
                return <Document key={document.id} {...document} />;
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const Document: FC<DocumentOrLaw> = ({ label, pdfURLs }) => {
  return (
    <div
      className={`${documentsStyles.documentsContainer__document}`}
      id={label}
    >
      <div className={documentsStyles.documentsContainer__documentTitle}>
        <h3>{label}</h3>
        <hr />
      </div>
      <ul className={documentsStyles.documentsContainer__documentPDFs}>
        {pdfURLs.map((url: string, index: number) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <iframe src={url} title={label} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Documents;
