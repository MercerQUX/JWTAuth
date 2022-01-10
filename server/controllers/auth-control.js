import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { addNewUserInDB } from "../service/Firebase-DB/addUserDB.js";
import { findDataOnValueDB } from "../service/Firebase-DB/findDataOnValueDB.js";
import { tokenController } from "./token-controller.js";

export const authController = {
  register: async ({ email, login, password, rememberme }) => {
    const userID = uuidv4();
    const hashPassword = await bcrypt.hash(password, 10);
    const dataForDB = {
      email: email,
      login: login,
      id: userID,
      password: hashPassword,
      rememberme: rememberme,
    };
    //Password hash will be in DB
    return await addNewUserInDB(dataForDB)
      .then((res) => ({
        message: "Registration successful",
        status: 200,
      }))
      .catch((e) => ({
        message: "Registration failed",
        status: 400,
      }));
  },
  login: async (login, password) => {
    const loggedUser = await findDataOnValueDB("server/users", "login", login);
    const errorData = {
      accessToken: "",
      refreshToken: "",
      validation: false,
      status: 400,
      message: "Server: Login or password incorrect",
    };
    if (loggedUser) {
      const passwordFromDB = loggedUser.password;
      const compareHASHPassword = await bcrypt
        .compare(password, passwordFromDB)
        .then((res) => res);

      if (compareHASHPassword) {
        const accessToken = tokenController.createAccessToken({
          login: login,
          id: loggedUser.id,
        });
        const refreshToken = loggedUser.rememberme
          ? tokenController.createRefreshToken({
              login: login,
              id: loggedUser.id,
            })
          : "";
        return {
          accessToken,
          refreshToken,
          validation: loggedUser.rememberme,
          status: 200,
          message: "Logged successful",
        };
      } else {
        return errorData;
      }
    } else {
      return errorData;
    }
  },
  accessTokenAuth: async (accessToken) => {
    const validationToken = tokenController.validationAccessTokens(accessToken);
    if (validationToken.status === 200) {
      const user = await findDataOnValueDB(
        "server/users",
        "id",
        validationToken.id
      );
      return {
        email: user.email,
        login: user.login,
        ...validationToken,
      };
    } else {
      return {
        email: "",
        login: "",
        ...validationToken,
      };
    }
  },
  refreshTokenAuth: async (refreshToken) => {
    const validationToken =
      tokenController.validationRefreshTokens(refreshToken);
    if (validationToken.status === 200) {
      const user = await findDataOnValueDB(
        "server/users",
        "id",
        validationToken.id
      );
      return {
        email: user.email,
        login: user.login,
        validation: true,
        refreshToken: refreshToken,
        accessToken: tokenController.createAccessToken({
          id: validationToken.id,
          login: user.login,
        }),
        ...validationToken,
      };
    } else {
      return {
        email: "",
        login: "",
        validation: false,
        ...validationToken,
      };
    }
  },
};
