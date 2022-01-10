import { useMutation } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN_AUTH } from "../../apollo/mutation";
import { getTokenFromLocalStorage } from "../../helpers/localStorage";
import style from "../../main.module.sass";

export const Index = () => {
  const [isAuthIndex, changeAuthIndex] = useState(true);
  const [username, setUsername] = useState("username");
  const [tokenAccessAuth, { loading }] = useMutation(ACCESS_TOKEN_AUTH);

  const logOut = useCallback(() => {
    changeAuthIndex(false);
    localStorage.removeItem("authToken");
  }, [isAuthIndex]);

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
          setUsername(res.data.accessTokenAuth.login);
        } else {
          changeAuthIndex(false);
        }
      })
      .catch((e) => {
        console.log(e);
        changeAuthIndex(false);
      });
  }, []);

  return (
    <div className={style.wrapper__index}>
      {!isAuthIndex && <Navigate to={"/afterauth"} />}
      <span>{`Hello, ${username}`}</span>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};
