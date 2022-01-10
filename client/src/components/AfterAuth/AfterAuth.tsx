import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ACCESS_TOKEN_AUTH, REFRESH_TOKEN_AUTH } from "../../apollo/mutation";
import {
  getTokenFromLocalStorage,
  saveTokenInLocalStorage,
} from "../../helpers/localStorage";
import { reloaderToken } from "../../helpers/reloaderToken";
import style from "../../main.module.sass";

export const AfterAuth = () => {
  const [tokenAccessAuth, { loading }] = useMutation(ACCESS_TOKEN_AUTH);
  const [tokenRefreshAuth] = useMutation(REFRESH_TOKEN_AUTH);
  const [isAuthAfter, changeAuthAfter] = useState(false);
  const [email, setEmail] = useState("email");

  //useEffect is without dependencies,works as it should with Appolo. one query, one render
  useEffect(() => {
    tokenAccessAuth({
      variables: {
        input: {
          accessToken: getTokenFromLocalStorage().bearer,
        },
      },
    })
      .then((res) => {
        if (res.data.accessTokenAuth.status === 200) {
          setEmail(res.data.accessTokenAuth.email);
          changeAuthAfter(true);
        }
        if (res.data.accessTokenAuth.status === 501) {
          const refreshToken = reloaderToken();
          if (refreshToken) {
            tokenRefreshAuth({
              variables: {
                input: {
                  refreshToken: refreshToken,
                },
              },
            }).then((res) => {
              if (res.data.refreshTokenAuth.status === 200) {
                setEmail(res.data.refreshTokenAuth.email);
                saveTokenInLocalStorage({
                  token: res.data.refreshTokenAuth.accessToken,
                  refreshToken: res.data.refreshTokenAuth.refreshToken,
                  validation: res.data.refreshTokenAuth.validation,
                });
              }
              if (res.data.refreshTokenAuth.status === 501) {
                localStorage.removeItem("authToken");
                changeAuthAfter(false);
              }
            });
          }
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={style.wrapper__afterauth}>
      {isAuthAfter ? (
        <span>{`Welcome, your email:${email}`}</span>
      ) : (
        <NavLink to="/auth">
          {`The user is not defined. Maybe you should go back to the authorization
          field?`}
        </NavLink>
      )}

      <br />
      {isAuthAfter && (
        <NavLink to={"/index"}>Maybe you want to go to the home page?</NavLink>
      )}
    </div>
  );
};
