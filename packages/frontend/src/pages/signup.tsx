// React
import { FC, useEffect } from "react";
// SCSS
import loginStyles from "../scss/components/pages/Login.module.scss";
// Components
import HomeTitle from "../components/home/HomeTitle";
import Meta from "../components/others/Meta";
import AccountsForm from "@/components/forms/AccountsForm";
import SectionLoading from "@/components/loading/SectionLoading";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllClasses,
  selectLoadingClasses,
} from "@/redux/slices/classesSlice";

const Signup: FC = () => {
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
          desc="Bun venit la pagina de 'Sign-up'! Alătură-te comunității noastre și creează-ți un cont gratuit. Descoperă resursele noastre și bucură-te de beneficiile oferite membrilor noștri. Înscrie-te acum și fă parte dintr-o experiență captivantă."
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
        title='Crează-ți un cont | Liceul Teoretic "Ion Barbu" Pitești'
        desc="Bun venit la pagina de 'Sign-up'! Alătură-te comunității noastre și creează-ți un cont gratuit. Descoperă resursele noastre și bucură-te de beneficiile oferite membrilor noștri. Înscrie-te acum și fă parte dintr-o experiență captivantă."
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
