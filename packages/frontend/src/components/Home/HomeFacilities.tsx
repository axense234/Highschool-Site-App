// React
import { FC } from "react";
// SCSS
import homeStyles from "../../scss/components/Home.module.scss";
// Data
import { facilityRooms } from "@/data";
// Components
import FacilitiesSlider from "./FacilitiesSlider";

const HomeFacilities: FC = () => {
  return (
    <section className={homeStyles.homeContainer__facilities} id='facilities'>
      <FacilitiesSlider />
      <div className={homeStyles.homeContainer__facilitiesInfo}>
        <h2>Dotarea Liceului</h2>
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
