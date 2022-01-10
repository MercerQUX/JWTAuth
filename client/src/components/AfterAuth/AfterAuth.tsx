import { NavLink } from "react-router-dom";
import style from "../../main.module.sass"

interface defaultProps{
  isAuth:boolean,
  email:string
}

export const AfterAuth = ({isAuth,email}:defaultProps) => {
  return (
    <div className={style.wrapper__afterauth}>
      {isAuth ? (
        <span>{`Welcome, your email:${email}`}</span>
      ) : (
        <NavLink to="/auth">
          {`The user is not defined. Maybe you should go back to the authorization
          field?`}
        </NavLink>
      )}

      <br />
      {isAuth && (
        <NavLink to={"/index"}>Maybe you want to go to the home page?</NavLink>
      )}
    </div>
  );
};
