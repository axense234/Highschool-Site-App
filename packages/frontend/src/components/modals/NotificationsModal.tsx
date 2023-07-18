// React
import { FC, useEffect } from "react";
// SCSS
import notificationStyles from "../../scss/components/modals/NotificationsModal.module.scss";

const NotificationsModal: FC = () => {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((res) => console.log(res));
    }
  }, []);
  return (
    <div className={notificationStyles.notificationsModalContainer}>
      NotificationsModal
    </div>
  );
};

export default NotificationsModal;
