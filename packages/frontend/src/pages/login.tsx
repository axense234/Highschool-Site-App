// React
import { FC, useEffect } from "react";
// SCSS
import HomeTitle from "../components/home/HomeTitle";
// Components
import loginStyles from "../scss/components/pages/Login.module.scss";
import AccountsForm from "@/components/forms/AccountsForm";
import Meta from "../components/others/Meta";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { setEmailCurrentType } from "@/redux/slices/generalSlice";

const Login: FC = () => {
  useGetPathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setEmailCurrentType("ELEV"));
  }, []);

  return (
    <>
      <Meta
        title='Liceul Teoretic "Ion Barbu" Pitești - Intră în Contul Admin'
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504535/Highschool%20Site%20App/nighthighschool_v8xnie.jpg",
        ]}
      />
      <main className={loginStyles.loginContainer}>
        <HomeTitle
          title="Intrați în cont"
          quote="Intrați în cont pentru numeroase posibilități."
        />
        <AccountsForm type="login" />
      </main>
    </>
  );
};

export default Login;
