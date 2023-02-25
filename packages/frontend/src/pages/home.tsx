// React
import { FC } from "react";
// Next
import Image from "next/image";
// Types
import { OfferingItemProps } from "types";
// Data
import { facilityRooms, offeringsList } from "@/data";
// SCSS
import homeStyles from "../scss/components/Home.module.scss";
// Components
import FacilitiesSlider from "@/components/Home/FacilitiesSlider";
import HomeTitle from "@/components/Home/HomeTitle";
import HomeInfo from "@/components/Home/HomeInfo";
import HomeFacilities from "@/components/Home/HomeFacilities";
import HomeBac from "@/components/Home/HomeBac";
import HomeOfferings from "@/components/Home/HomeOfferings";

const Home: FC = () => {
  return (
    <main className={homeStyles.homeContainer}>
      <HomeTitle />
      <HomeInfo />
      <HomeFacilities />
      <HomeBac />
      <HomeOfferings />
    </main>
  );
};

export default Home;
