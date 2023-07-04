// React
import { FC } from "react";
// Types
import { TemplateClass } from "types";
// SCSS
import classStyles from "../../scss/components/pages/IndividualClass.module.scss";
import useCalculateCardStats from "@/hooks/useCalculateCardStats";

const ClassCatalogue: FC<TemplateClass> = ({ label, catalogue }) => {
  return (
    <section className={classStyles.classContainer__classCatalogue}>
      <h2>Catalogul Clasei {label}</h2>
      <table className={classStyles.classContainer__classCatalogueContent}>
        <thead>
          <tr>
            <th rowSpan={2}>ELEVII</th>
            <th>
              <span>DISCIPLINE DE ÎNVĂTĂMÂNT</span>
              {/* <span></span> */}
            </th>
          </tr>
        </thead>
        {/* <tbody></tbody> */}
      </table>
    </section>
  );
};

export default ClassCatalogue;
