import { authController } from "../controllers/auth-control.js";
import { findDataOnValueDB } from "../service/Firebase-DB/findDataOnValueDB.js";

export const rootGraphQL = {
  register: async ({ input }) => {
    const { login, email, password, rememberme } = input;
    const validateUsers =
      (await findDataOnValueDB("server/users", "login", login)) ||
      (await findDataOnValueDB("server/users", "email", email))
        ? false
        : true;
    if (validateUsers) {
      return await authController.register({
        login,
        email,
        password,
        rememberme,
      });
    } else {
      return {
        status: 400,
        message: "Error Server: Perhaps the data already exists?",
      };
    }
  },
  login: async ({ input }) => {
    const { login, password } = input;
    const request = authController.login(login, password);
    return request;
  },
  accessTokenAuth: async ({ input }) => {
    const { accessToken } = input;
    const tokenAuth = authController.accessTokenAuth(accessToken);
    return tokenAuth;
  },
  refreshTokenAuth: async ({ input }) => {
    const { refreshToken } = input;
    const tokenAuth = authController.refreshTokenAuth(refreshToken);
    return tokenAuth;
  },
};
