// React
import { FC } from "react";
// Types and Data
import { DocumentOrLaw } from "types";
import { documentsAndLawsInfo } from "@/data";
// SCSS
import documentsStyles from "../scss/components/pages/Documents.module.scss";
// Components
import PageTitle from "@/components/home/PageTitle";
import Meta from "@/components/others/Meta";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";

const Documents: FC = () => {
  useGetPathname();
  return (
    <>
      <Meta
        title='Legi și Documente | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Accesează pagina noastră de Legi și Documente pentru informații esențiale și documente relevante la Liceul Teoretic „Ion Barbu” Pitești. Găsește regulamente și politici importante pentru a te familiariza cu normele noastre școlare."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686502837/Highschool%20Site%20App/IMG-20230608-WA0020_xyq6ms.jpg",
        ]}
      />
      <main className={documentsStyles.documentsContainer}>
        <PageTitle
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
