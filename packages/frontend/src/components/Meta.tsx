// Next
import Head from "next/head";
// React
import { FC } from "react";
// Types
import { MetaProps } from "types";

const Meta: FC<MetaProps> = ({ keywords, desc, title }) => {
  return (
    <Head>
      <meta name='keywords' content={keywords} />
      <meta httpEquiv='Content-Type' content='text/html;charset=UTF-8' />
      <meta name='description' content={desc} />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  desc: "An app made for the `Scoala intre viziune si misiune` highschool competition with the theme `Cel mai original site al scolii mele`.",
  keywords: "monorepo, html, css, typescript, next, react, express, node",
  title: "Liceul Teoretic 'Vasile Barbu' Pitesti",
};

export default Meta;
