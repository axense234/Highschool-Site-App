// Redux
import { notifyUser } from "@/redux/slices/generalSlice";

const sendNotificationToUser = (
  userId: string,
  userType: "ADMIN" | "PROFESOR" | "ELEV",
  notificationTitle: string,
  notificationMessage: string,
  dispatch: any
) => {
  dispatch(
    notifyUser({ userId, userType, notificationMessage, notificationTitle })
  )
    .unwrap()
    .then((res: any) => console.log(res));
};

export default sendNotificationToUser;
