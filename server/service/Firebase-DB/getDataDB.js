import { database } from "../../firebase-init.js";

export const getDataFromDB = async (path) => {
    const ref = database.ref(path);
    return await ref
      .once("value")
      .then((snap) => {
        return snap.val();
      })
      .catch((res) => console.log(res));
  };
  