// React
import { Dispatch, FC, SetStateAction } from "react";
// React Icons
import { AiOutlineMenu } from "react-icons/ai";
// SCSS
import menuStyles from "../scss/components/SidebarMenu.module.scss";

interface SidebarMenuProps {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ setShowSidebar }) => {
  return (
    <div
      className={menuStyles.sidebarMenuContainer}
      title='Deschide meniul de navigare'
    >
      <AiOutlineMenu
        onClick={() => {
          setShowSidebar(true);
          console.log("menu clicked");
        }}
      />
    </div>
  );
};

export default SidebarMenu;
