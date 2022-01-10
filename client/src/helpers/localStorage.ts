interface IDataSave {
  token: string;
  refreshToken:string;
  validation: boolean;
}
export const saveTokenInLocalStorage = (data: IDataSave) => {
  const dataJSON = JSON.stringify({
    bearer: data.token,
    refreshToken:data.refreshToken,
    validation: data.validation,
  });
  localStorage.setItem("authToken", dataJSON);
};

export const getTokenFromLocalStorage = () => {
  const dataJSON = localStorage.getItem("authToken");
  return dataJSON ? JSON.parse(dataJSON) : false;
};
