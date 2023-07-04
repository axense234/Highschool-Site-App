// Next and React
import { useRouter } from "next/router";
import { useEffect } from "react";
// Redux
import { useAppSelector } from "./redux";
import {
  selectLoadingProfile,
  selectProfile,
} from "@/redux/slices/generalSlice";
// Components
import SectionLoading from "@/components/loading/SectionLoading";

const useAuthorization = () => {
  const router = useRouter();
  const profile = useAppSelector(selectProfile);
  const loadingProfile = useAppSelector(selectLoadingProfile);

  useEffect(() => {
    const isAuthenticated = profile.email;

    if (!isAuthenticated && loadingProfile === "SUCCEDED") {
      router.push("/home");
    }
  }, [profile, loadingProfile]);

  return <SectionLoading />;
};

export default useAuthorization;
