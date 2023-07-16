// Next
import Head from "next/head";
// React
import { FC } from "react";
// Types
import MetaProps from "@/core/interfaces/component/MetaProps";

const Meta: FC<MetaProps> = ({ keywords, desc, title, imageUrls }) => {
  return (
    <Head>
      <meta name="keywords" content={keywords} />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="description" content={desc} />
      <title>{title}</title>
      {imageUrls?.map((url) => {
        return <link rel="preload" as="image" href={url} key={url} />;
      })}
    </Head>
  );
};

Meta.defaultProps = {
  desc: "An app made for the `Scoala intre viziune si misiune` highschool competition with the theme `Cel mai original site al scolii mele`.",
  keywords: "monorepo, html, css, typescript, next, react, express, node",
  title: "Liceul Teoretic 'Ion Barbu' Pitești",
};

export default Meta;
