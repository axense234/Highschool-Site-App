// React
import { FC, useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// SCSS
import HomeTitle from "../components/home/HomeTitle";
// Components
import loginStyles from "../scss/components/pages/Login.module.scss";
import AccountsForm from "@/components/forms/AccountsForm";
import Meta from "../components/others/Meta";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectResetPassTokenAuthorized,
  verifyResetPassToken,
} from "@/redux/slices/generalSlice";

const ResetPassword: FC = () => {
  useGetPathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const resetPassTokenAuthorized = useAppSelector(
    selectResetPassTokenAuthorized
  );

  useEffect(() => {
    dispatch(verifyResetPassToken(router.query.token as string));
  });

  return (
    <>
      <Meta
        title='Liceul Teoretic "Ion Barbu" Pitești - Resetează-ți parola'
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504535/Highschool%20Site%20App/nighthighschool_v8xnie.jpg",
        ]}
      />
      <main className={loginStyles.loginContainer}>
        {resetPassTokenAuthorized ? (
          <>
            <HomeTitle
              title="Resetează-ți parola"
              quote="Resetează-ți parola contului tau de admin/profesor/elev."
            />
            <AccountsForm type="reset-pass" />
          </>
        ) : (
          <HomeTitle
            title="Linkul pentru resetarea parolei a expirat"
            quote="Vă rugăm să inițiați din nou procesul de resetare pentru a primi un nou link și pentru a vă recupera accesul la contul dumneavoastră."
            backgroundUrl="https://res.cloudinary.com/birthdayreminder/image/upload/v1686921591/Highschool%20Site%20App/IMG-20230614-WA0016_us3wqq.jpg"
          />
        )}
      </main>
    </>
  );
};

export default ResetPassword;
