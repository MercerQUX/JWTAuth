import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { LoginForm } from "../../Formik/Login/LoginForm";
import { RegisterForm } from "../../Formik/Register/RegisterForm";
import { getTokenFromLocalStorage } from "../../helpers/localStorage";
import style from "../../main.module.sass";

interface defaultProps {}

export const Auth: React.FC<defaultProps> = ({}) => {
  const localStateToken = useCallback(getTokenFromLocalStorage, []);
  const [switchAuthActive, switchAuth] = useState(true);
  const [isAuth, changeAuth] = useState(false);

  useEffect(() => {
    const bearers = localStateToken();
    if (bearers.bearer) {
      changeAuth(true);
    }
  }, [localStateToken]);

  return (
    <div>
      {isAuth && <Navigate to={"/afterauth"} />}
      <h2 className={style.auth_header}>
        {switchAuthActive ? "Sign Up" : "Sign In"}
      </h2>
      <div className={style.wrapper_swith_auth}>
        <button
          className={switchAuthActive ? "" : style.switch__active}
          onClick={() => switchAuth(false)}
        >
          Sign In
        </button>
        <button
          className={switchAuthActive ? style.switch__active : ""}
          onClick={() => switchAuth(true)}
        >
          Sign Up
        </button>
      </div>
      <div
        className={
          switchAuthActive
            ? style.animRegisterActive
            : style.animRegisterDisabled
        }
      >
        <RegisterForm switchAuth={switchAuth} />
      </div>
      <div
        className={
          switchAuthActive ? style.animLoginDisabled : style.animLoginActive
        }
      >
        <LoginForm changeAuth={changeAuth} />
      </div>
    </div>
  );
};
