// Redux
import { notifyUser } from "@/redux/slices/generalSlice";

const sendNotificationToUser = (
  userId: string,
  userType: "ADMIN" | "PROFESOR" | "ELEV",
  dispatch: any
) => {
  dispatch(notifyUser({ userId, userType }))
    .unwrap()
    .then((res: any) => console.log(res));
};

export default sendNotificationToUser;
