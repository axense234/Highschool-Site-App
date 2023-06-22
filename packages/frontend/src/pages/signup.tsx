// React
import { FC, useEffect } from "react";
// SCSS
import HomeTitle from "../components/home/HomeTitle";
// Components
import loginStyles from "../scss/components/pages/Login.module.scss";
import Meta from "../components/others/Meta";
import AccountsForm from "@/components/forms/AccountsForm";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { setEmailCurrentType } from "@/redux/slices/generalSlice";

const Signup: FC = () => {
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
          title="Crează-ți un cont"
          quote="Creați-vă un cont de admin, profesor sau de student."
        />
        <AccountsForm type="signup" />
      </main>
    </>
  );
};

export default Signup;
