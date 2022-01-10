import { NavLink } from "react-router-dom";
import style from "../../main.module.sass"

export const Page404 = () => {
  return (
    <div className={style.wrapper__page404}>
      <span>Page not found</span>
      <NavLink to="/auth">
        {`Redirect you to the home page?`}
      </NavLink>
    </div>
  );
};
