import { useMutation } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { ACCESS_TOKEN_AUTH } from "../../apollo/mutation";
import { Loader } from "../../asset/common/Loader";
import { getTokenFromLocalStorage } from "../../helpers/localStorage";
import { Index } from "./Index";

export const IndexContainer = () => {
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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Index isAuth={isAuthIndex} logOut={logOut} username={username} />
      )}
    </div>
  );
};
