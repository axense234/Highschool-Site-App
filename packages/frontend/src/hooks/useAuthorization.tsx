// Next and React
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Redux
import { useAppSelector } from "./redux";
import { selectProfile } from "@/redux/slices/generalSlice";
// Components
import SectionLoading from "@/components/SectionLoading";

const useAuthorization = () => {
  const router = useRouter();
  const profile = useAppSelector(selectProfile);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const isAuthenticated = profile.rolUtilizator === "ADMIN";

    if (!isAuthenticated) {
      router.push("/home");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <SectionLoading />;
  }

  return null;
};

export default useAuthorization;
