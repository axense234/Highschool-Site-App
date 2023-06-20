/* eslint-disable no-undef */
// React
import { useState } from "react";
// Global SCSS
import "@/scss/abstracts/globals.scss";
// Next
import type { AppProps } from "next/app";
// Redux
import { Provider } from "react-redux";
import store from "@/redux/api/store";
// Components
import Sidebar from "@/components/navigation/Sidebar";
import SidebarMenu from "@/components/navigation/SidebarMenu";
import Footer from "@/components/others/Footer";
import SearchButton from "@/components/navigation/SearchButton";
import Searchbar from "@/components/navigation/Searchbar";
import ScreenLoading from "@/components/loading/ScreenLoading";

export default function App({ Component, pageProps }: AppProps) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);

  return (
    <div className="app-container">
      <Provider store={store}>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <SidebarMenu setShowSidebar={setShowSidebar} />
        <Searchbar
          setShowSearchbar={setShowSearchbar}
          showSearchbar={showSearchbar}
        />
        <SearchButton setShowSearchbar={setShowSearchbar} />
        <Component {...pageProps} />
        <Footer />
        <ScreenLoading />
      </Provider>
    </div>
  );
}
