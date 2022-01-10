import { getTokenFromLocalStorage } from "./localStorage";

export const reloaderToken = () => {
  const validateRefreshToken = getTokenFromLocalStorage().validation;
  if (validateRefreshToken) {
    const refreshToken = getTokenFromLocalStorage().refreshToken;
    return refreshToken;
  } else {
    localStorage.removeItem("authToken");
    return null;
  }
};
