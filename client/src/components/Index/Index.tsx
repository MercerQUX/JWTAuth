import { Navigate } from "react-router-dom";
import style from "../../main.module.sass";

interface defaultProps{
  isAuth:boolean,
  username:string,
  logOut: ()=>void
}

export const Index:React.FC<defaultProps> = ({isAuth,username,logOut}) => {
  return (
    <div className={style.wrapper__index}>
      {!isAuth && <Navigate to={"/afterauth"} />}
      <span>{`Hello, ${username}`}</span>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};
