// React
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
// React Icons
import { AiOutlineMenu } from "react-icons/ai";
// SCSS
import menuStyles from "../../scss/components/navigation/SidebarMenu.module.scss";

interface SidebarMenuProps {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ setShowSidebar }) => {
  const sidebarMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clicked = localStorage.getItem("SidebarMenuClicked");
    if (clicked) {
      (sidebarMenuRef.current as HTMLDivElement).style.animation = "none";
    }
  }, []);

  return (
    <div
      className={menuStyles.sidebarMenuContainer}
      title="Deschide meniul de navigare"
      ref={sidebarMenuRef}
    >
      <AiOutlineMenu
        onClick={() => {
          localStorage.setItem("SidebarMenuClicked", "true");
          setShowSidebar(true);
        }}
      />
    </div>
  );
};

export default SidebarMenu;
