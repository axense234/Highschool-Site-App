// React
import { FC, useEffect } from "react";
// SCSS
import PageTitle from "../components/home/PageTitle";
// Components
import loginStyles from "../scss/components/pages/Login.module.scss";
import AccountsForm from "@/components/forms/AccountsForm";
import Meta from "../components/others/Meta";
import SectionLoading from "@/components/loading/SectionLoading";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllClasses,
  selectLoadingClasses,
} from "@/redux/slices/classesSlice";

const Login: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const loadingClasses = useAppSelector(selectLoadingClasses);

  useEffect(() => {
    if (loadingClasses === "IDLE" || loadingClasses === "PENDING") {
      dispatch(getAllClasses());
    }
  }, []);

  if (loadingClasses === "IDLE" || loadingClasses === "PENDING") {
    return (
      <>
        <Meta
          title='Așteptați vă rog... | Liceul Teoretic "Ion Barbu" Pitești'
          desc="Bun venit la pagina de 'Login'! Accesează contul tău existent pentru a avea acces la resursele noastre exclusive. Introdu-ți datele de autentificare și bucură-te de o experiență personalizată. Fii conectat cu comunitatea noastră și beneficiază de toate avantajele oferite."
          imageUrls={[
            "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504535/Highschool%20Site%20App/nighthighschool_v8xnie.jpg",
          ]}
        />
        <SectionLoading />
      </>
    );
  }

  return (
    <>
      <Meta
        title='Intrați în cont | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Bun venit la pagina de 'Login'! Accesează contul tău existent pentru a avea acces la resursele noastre exclusive. Introdu-ți datele de autentificare și bucură-te de o experiență personalizată. Fii conectat cu comunitatea noastră și beneficiază de toate avantajele oferite."
        imageUrls={[
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1686504535/Highschool%20Site%20App/nighthighschool_v8xnie.jpg",
        ]}
      />
      <main className={loginStyles.loginContainer}>
        <PageTitle
          title="Intrați în cont"
          quote="Intrați în cont pentru numeroase posibilități."
        />
        <AccountsForm type="login" />
      </main>
    </>
  );
};

export default Login;
