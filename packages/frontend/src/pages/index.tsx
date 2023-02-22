// React
import { FC } from "react";
// Data
import { sidebarPageLinks } from "@/data";

const About: FC = () => {
  return <div>{sidebarPageLinks[0].logoUrl}</div>;
};

export default About;
