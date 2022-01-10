import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "../path/to/tokenSecretKeys.js";
import {
  ACCESS_TOKEN_EXPRESS,
  REFRESH_TOKEN_EXPRESS,
} from "../path/to/tokenExpress.js";

export const tokenController = {
  createAccessToken: ({ id, login }) => {
    const accessToken = jwt.sign({ id, login }, ACCESS_TOKEN_KEY, {
      expiresIn: ACCESS_TOKEN_EXPRESS,
    });
    return accessToken;
  },
  createRefreshToken: ({ id, login }) => {
    const refreshToken = jwt.sign({ id, login }, REFRESH_TOKEN_KEY, {
      expiresIn: REFRESH_TOKEN_EXPRESS,
    });
    return refreshToken;
  },
  validationAccessTokens: (token) => {
    try {
      const validToken = jwt.verify(token, ACCESS_TOKEN_KEY);
      if (validToken.id) {
        return {
          status: 200,
          message: "AccessToken valid",
          id: validToken.id,
          validation: true,
        };
      }
    } catch (error) {
      return {
        status: 501,
        message: "AccessToken not valid",
        id: "",
      };
    }
  },
  validationRefreshTokens: (token) => {
    try {
      const validToken = jwt.verify(token, REFRESH_TOKEN_KEY);
      if (validToken.id) {
        return {
          status: 200,
          message: "RefreshToken valid",
          id: validToken.id,
        };
      }
    } catch (error) {
      return {
        status: 501,
        message: "RefreshToken not valid",
        id: "",
      };
    }
  },
};
