// React Types
import { JSX } from "react";

// Types
type sidebarLink = {
  id: number;
  label?: string;
  logoUrl: JSX.Element;
  dest: string;
};

// Interfaces
interface MetaProps {
  keywords?: string;
  desc?: string;
  title?: string;
}

export { sidebarLink, MetaProps };
