// React
import { useState } from "react";
// Global SCSS
import "@/scss/abstracts/globals.scss";
// Next
import type { AppProps } from "next/app";
// Components
import Sidebar from "@/components/Sidebar";
import SidebarMenu from "@/components/SidebarMenu";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className='app-container'>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <SidebarMenu setShowSidebar={setShowSidebar} />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
