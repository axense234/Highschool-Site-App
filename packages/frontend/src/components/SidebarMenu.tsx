// React
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
// React Icons
import { AiOutlineMenu } from "react-icons/ai";
// SCSS
import menuStyles from "../scss/components/SidebarMenu.module.scss";

interface SidebarMenuProps {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ setShowSidebar }) => {
  const [userClicked, setUserClicked] = useState<"false" | "true">("false");

  useEffect(() => {
    const clicked = localStorage.getItem("SidebarMenuClicked");
    setUserClicked((clicked as "true") || "false");
  }, []);

  return (
    <div
      className={menuStyles.sidebarMenuContainer}
      title="Deschide meniul de navigare"
      style={{ animation: JSON.parse(userClicked) && "none" }}
    >
      <AiOutlineMenu
        onClick={() => {
          localStorage.setItem("SidebarMenuClicked", "true");
          setUserClicked("true");
          setShowSidebar(true);
        }}
      />
    </div>
  );
};

export default SidebarMenu;
