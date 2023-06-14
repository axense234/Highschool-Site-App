// React
import { FC, SyntheticEvent, useState } from "react";
// React Icons
import { BiHide, BiShow } from "react-icons/bi";
// SCSS
import HomeTitle from "@/components/Home/HomeTitle";
// Components
import loginStyles from "../scss/components/Login.module.scss";
import Meta from "@/components/Meta";
import FormModal from "@/components/FormModal";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  loginUser,
  selectTemplateProfile,
  updateTemplateProfile,
} from "@/redux/slices/generalSlice";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";

const Login: FC = () => {
  useGetPathname();

  const dispatch = useAppDispatch();
  const templateProfile = useAppSelector(selectTemplateProfile);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onEmailChange = (email: string) =>
    dispatch(updateTemplateProfile({ key: "email", value: email }));

  const onPasswordChange = (pass: string) =>
    dispatch(updateTemplateProfile({ key: "password", value: pass }));

  const onRolUtilizatorChange = (rol: string) =>
    dispatch(updateTemplateProfile({ key: "rolUtilizator", value: rol }));

  const handleOnFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser(templateProfile));
  };

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
          title="Intră în cont(ADMIN)"
          quote="Intrați în cont pentru a avea mai multe opțiuni de editare."
        />
        <section className={loginStyles.loginContainer__formContainer}>
          <h2>Conectează-te la contul tău</h2>
          <form
            className={loginStyles.loginContainer__form}
            onSubmit={(e) => handleOnFormSubmit(e)}
          >
            <FormModal type="general" />
            <div className={loginStyles.loginContainer__control}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                value={templateProfile.email || ""}
                onChange={(e) => onEmailChange(e.target.value)}
              />
            </div>
            <div className={loginStyles.loginContainer__control}>
              <label htmlFor="parola">Parolă:</label>
              <div className={loginStyles.loginContainer__passwordControl}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={templateProfile.password || ""}
                  onChange={(e) => onPasswordChange(e.target.value)}
                />
                {showPassword ? (
                  <BiHide onClick={() => setShowPassword(false)} />
                ) : (
                  <BiShow onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
            <div className={loginStyles.loginContainer__control}>
              <label htmlFor="parola">Rol(ADMIN):</label>
              <select
                name="rol"
                id="rol"
                value={templateProfile.rolUtilizator || "ADMIN"}
                onChange={(e) => onRolUtilizatorChange(e.target.value)}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="UTILIZATOR">UTILIZATOR</option>
                <option value="ELEV">ELEV</option>
              </select>
            </div>
            <button type="submit">Intră în cont</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
