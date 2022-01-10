import { database } from "../../firebase-init.js";
import { getDataFromDB } from "./getDataDB.js";

export const addNewUserInDB = async (data) => {
  const totalUser = await getDataFromDB("server/length");
  const refUsers = database.ref(`server/users/${totalUser}`);
  const changeLengthDB = database.ref("server/length");
  refUsers.set(data).catch((e) => console.log(e));
  changeLengthDB.set(totalUser + 1);
};

