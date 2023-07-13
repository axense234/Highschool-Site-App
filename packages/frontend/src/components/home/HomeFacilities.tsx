// React
import { FC } from "react";
// SCSS
import homeStyles from "../../scss/components/pages/Home.module.scss";
// Data
import { facilityRooms } from "@/data";
// Components
import FacilitiesSlider from "./FacilitiesSlider";
import MarkableHeading from "../others/MarkableHeading";

const HomeFacilities: FC = () => {
  return (
    <section className={homeStyles.homeContainer__facilities}>
      <FacilitiesSlider />
      <div className={homeStyles.homeContainer__facilitiesInfo}>
        <MarkableHeading
          textContent="Dotarea Liceului"
          type="h2"
          idUsed="facilities"
        />
        <ul className={homeStyles.homeContainer__facilityRooms}>
          {facilityRooms.map((room) => {
            return <li key={room.id}>{room.desc}</li>;
          })}
        </ul>
      </div>
    </section>
  );
};

export default HomeFacilities;
