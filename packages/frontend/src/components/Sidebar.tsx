// React
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
// Next
import Link from "next/link";
// React Icons
import { AiFillCloseCircle } from "react-icons/ai";
// SCSS
import sidebarStyles from "../scss/components/Sidebar.module.scss";
// Data
import { sidebarPageLinks, sidebarSocialMediaLinks } from "@/data";
// Components
import Logo from "./Logo";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ showSidebar, setShowSidebar }) => {
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const sidebar = sidebarRef.current as HTMLElement;
    if (showSidebar) {
      sidebar.style.transform = "translateX(0%)";
    } else {
      sidebar.style.transform = "translateX(-150%)";
    }
  }, [showSidebar]);

  return (
    <aside className={sidebarStyles.sidebarContainer} ref={sidebarRef}>
      <div className={sidebarStyles.sidebarContainer__title}>
        <Logo />
        <AiFillCloseCircle
          onClick={() => setShowSidebar(false)}
          title='Inchide meniul de navigare'
        />
      </div>
      <h1>Liceul Teoretic "Vasile Barbu" Pitesti</h1>
      <div className={sidebarStyles.sidebarContainer__pageLinks}>
        {sidebarPageLinks.map((pageLink) => {
          return (
            <Link href={pageLink.dest} key={pageLink.id} title={pageLink.label}>
              <i>{pageLink.logoUrl}</i>
              <h2>{pageLink.label}</h2>
            </Link>
          );
        })}
      </div>
      <div className={sidebarStyles.sidebarContainer__socialMediaLinks}>
        {sidebarSocialMediaLinks.map((socialMediaLink) => {
          return (
            <Link
              href={socialMediaLink.dest}
              key={socialMediaLink.id}
              title={socialMediaLink.label}
            >
              <i>{socialMediaLink.logoUrl}</i>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
