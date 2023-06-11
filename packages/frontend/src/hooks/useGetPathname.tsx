// React
import { useEffect } from "react";
// Next
import { useRouter } from "next/router";
// Redux
import { useAppDispatch } from "./redux";
import { setCurrentPathname } from "@/redux/slices/generalSlice";

const useGetPathname = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useRouter();

  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  console.count("usegetpathname");

  useEffect(() => {
    dispatch(setCurrentPathname(pathname));
  }, []);
};

export default useGetPathname;
