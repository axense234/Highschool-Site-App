// React
import { useEffect } from "react";
// Redux
import { selectLoadingProfile, getProfile } from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "./redux";

const useGetProfile = () => {
  const dispatch = useAppDispatch();
  const loadingProfile = useAppSelector(selectLoadingProfile);

  useEffect(() => {
    if (loadingProfile === "IDLE" || loadingProfile === "PENDING") {
      dispatch(getProfile());
    }
  }, []);
};

export default useGetProfile;
