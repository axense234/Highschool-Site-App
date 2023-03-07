// React
import { FC, SyntheticEvent } from "react";
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

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const templateProfile = useAppSelector(selectTemplateProfile);

  const onEmailChange = (email: string) =>
    dispatch(updateTemplateProfile({ key: "email", value: email }));

  const onPasswordChange = (pass: string) =>
    dispatch(updateTemplateProfile({ key: "password", value: pass }));

  const onRolUtilizatorChange = (rol: string) =>
    dispatch(updateTemplateProfile({ key: "rolUtilizator", value: rol }));

  const handleOnFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser(templateProfile));
    console.log("login submit");
  };

  return (
    <>
      <Meta title='Liceul Teoretic "Vasile Barbu" Pitesti - Intra in contul tau' />
      <main className={loginStyles.loginContainer}>
        <HomeTitle
          title='Intra in cont(ADMIN)'
          quote='Intrati in cont pentru a avea mai multe optiuni de editare.'
        />
        <section className={loginStyles.loginContainer__formContainer}>
          <h2>Conecteaza-te la contul tau</h2>
          <form
            className={loginStyles.loginContainer__form}
            onSubmit={(e) => handleOnFormSubmit(e)}
          >
            <FormModal type='general' />
            <div className={loginStyles.loginContainer__control}>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                value={templateProfile.email}
                onChange={(e) => onEmailChange(e.target.value)}
              />
            </div>
            <div className={loginStyles.loginContainer__control}>
              <label htmlFor='parola'>Parola:</label>
              <input
                type='password'
                value={templateProfile.password}
                onChange={(e) => onPasswordChange(e.target.value)}
              />
            </div>
            <div className={loginStyles.loginContainer__control}>
              <label htmlFor='parola'>Rol(ADMIN pt optiuni extra):</label>
              <select
                name='rol'
                id='rol'
                value={templateProfile.rolUtilizator}
                onChange={(e) => onRolUtilizatorChange(e.target.value)}
              >
                <option value='ADMIN'>ADMIN</option>
                <option value='UTILIZATOR'>UTILIZATOR</option>
                <option value='ELEV'>ELEV</option>
              </select>
            </div>
            <button type='submit'>Intra in cont</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
