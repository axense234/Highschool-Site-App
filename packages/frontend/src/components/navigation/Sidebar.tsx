// React
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
// Next
import Link from "next/link";
// React Icons
import { AiFillCloseCircle } from "react-icons/ai";
// SCSS
import sidebarStyles from "../../scss/components/navigation/Sidebar.module.scss";
// Data
import {
  PUBLIC_VAPID_KEY,
  sidebarPageLinks,
  sidebarSocialMediaLinks,
} from "@/data";
// Components
import Logo from "../others/Logo";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectProfile,
  setScreenLoadingMessage,
  subscribeUser,
  unsubscribeUser,
} from "@/redux/slices/generalSlice";
import { updateAdminById } from "@/redux/slices/adminsSlice";
import { updateStudentById } from "@/redux/slices/studentsSlice";
import { updateTeacherById } from "@/redux/slices/teachersSlice";
// Interfaces
import TemplateUpdateAdmin from "@/core/interfaces/template/TemplateUpdateAdmin";
import TemplateUpdateStudent from "@/core/interfaces/template/TemplateUpdateStudent";
import TemplateUpdateTeacher from "@/core/interfaces/template/TemplateUpdateTeacher";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLElement>(null);
  const profile = useAppSelector(selectProfile);

  const subscribeUserToNotifications = async () => {
    const sw = await navigator.serviceWorker.ready;
    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: PUBLIC_VAPID_KEY,
    });

    dispatch(
      setScreenLoadingMessage(
        "Încercăm să actualizăm contul tău, vă rugăm să așteptați..."
      )
    );

    const usableSub = subscription.toJSON();

    dispatch(
      subscribeUser({
        subscription: {
          endpoint: usableSub.endpoint,
          auth: usableSub.keys?.auth,
          p256dh: usableSub.keys?.p256dh,
        },
        userId: profile.id as string,
        userType: profile.role as "ADMIN" | "PROFESOR" | "ELEV",
      })
    );
  };

  useEffect(() => {
    const sidebar = sidebarRef.current as HTMLElement;
    if (showSidebar) {
      sidebar.style.transform = "translateX(0%)";
    } else {
      sidebar.style.transform = "translateX(-150%)";
    }
  }, [showSidebar]);

  useEffect(() => {
    if (
      "Notification" in window &&
      profile.role &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission().then((res) => {
        if (res === "granted") {
          subscribeUserToNotifications();
        } else if (res === "denied") {
          dispatch(
            unsubscribeUser({
              userId: profile.id as string,
              userType: profile.role as "ADMIN" | "PROFESOR" | "ELEV",
              subscription: {},
            })
          );
        }
      });
    }
  }, [profile.role]);

  return (
    <aside className={sidebarStyles.sidebarContainer} ref={sidebarRef}>
      <div className={sidebarStyles.sidebarContainer__contentWrapper}>
        <div className={sidebarStyles.sidebarContainer__content}>
          <div className={sidebarStyles.sidebarContainer__title}>
            <Logo />
            <AiFillCloseCircle
              onClick={() => setShowSidebar(false)}
              title="Închide meniul de navigare"
            />
          </div>
          <h1>
            Liceul Teoretic <br /> "Ion Barbu" Pitești
          </h1>
          <div className={sidebarStyles.sidebarContainer__pageLinks}>
            {sidebarPageLinks.map((pageLink) => {
              if (pageLink.dest === "/profil" && !profile.email && profile) {
                return null;
              }
              return (
                <Link
                  href={pageLink.dest}
                  key={pageLink.id}
                  title={pageLink.label}
                  onClick={() => setShowSidebar(false)}
                >
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
                  target="_blank"
                >
                  <i>{socialMediaLink.logoUrl}</i>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
