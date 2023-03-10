// React
import { FC } from "react";
// SCSS
import homeStyles from "../scss/components/Home.module.scss";
// Components
import HomeTitle from "@/components/Home/HomeTitle";
import HomeInfo from "@/components/Home/HomeInfo";
import HomeFacilities from "@/components/Home/HomeFacilities";
import HomeBac from "@/components/Home/HomeBac";
import HomeOfferings from "@/components/Home/HomeOfferings";
import Meta from "@/components/Meta";
// Data
import { facilityImages } from "@/data";

const Home: FC = () => {
  const imageUrls = facilityImages.map((facImage) => {
    return facImage.logoUrl;
  });

  return (
    <>
      <Meta
        title='Liceul Teoretic "Vasile Barbu" Pitesti - Acasa'
        desc='Proiect inspirat de site-ul original al liceului meu: Liceul Teoretic "Ion Barbu" Pitesti.Pagina acasa.'
        imageUrls={imageUrls}
      />
      <main className={homeStyles.homeContainer}>
        <HomeTitle
          title='Liceul Teoretic Vasile Barbu Pitesti'
          quote='Prea bun.Prea ca la tara.'
        />
        <HomeInfo />
        <HomeFacilities />
        <HomeBac />
        <HomeOfferings />
      </main>
    </>
  );
};

export default Home;
