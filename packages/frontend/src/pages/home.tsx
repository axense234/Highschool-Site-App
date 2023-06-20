// React
import { FC } from "react";
// SCSS
import homeStyles from "../scss/components/pages/Home.module.scss";
// Components
import HomeTitle from "@/components/home/HomeTitle";
import HomeInfo from "@/components/home/HomeInfo";
import HomeFacilities from "@/components/home/HomeFacilities";
import HomeBac from "@/components/home/HomeBac";
import HomeOfferings from "@/components/home/HomeOfferings";
import Meta from "@/components/others/Meta";
import HomeLocation from "@/components/home/HomeLocation";
// Data
import { facilityImages } from "@/data";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";

const Home: FC = () => {
  useGetPathname();

  const imageUrls = facilityImages.map((facImage) => {
    return facImage.logoUrl;
  });

  return (
    <>
      <Meta
        title='Liceul Teoretic "Ion Barbu" Pitești - Acasă.'
        desc='Proiect inspirat de site-ul original al liceului meu: Liceul Teoretic "Ion Barbu" Pitești. Pagina acasă.'
        imageUrls={[
          ...imageUrls,
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1678691260/Highschool%20Site%20App/IMG-20230313-WA0004_e5vfrt.jpg",
        ]}
      />
      <main className={homeStyles.homeContainer}>
        <HomeTitle
          title='Liceul Teoretic "Ion Barbu" Pitești'
          quote="Învățătura este comoara ce nu poate fi furată."
        />
        <HomeInfo />
        <HomeFacilities />
        <HomeLocation />
        <HomeBac />
        <HomeOfferings />
      </main>
    </>
  );
};

export default Home;
