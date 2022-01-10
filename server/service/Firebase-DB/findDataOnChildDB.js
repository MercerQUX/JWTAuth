import { database } from "../../firebase-init.js";

export const findDataOnChildDB = async (path, child) => {
  const ref = database.ref(`${path}`);
  return await ref
    .orderByChild(child)
    .once("value")
    .then((snap) => {
      return snap.val();
    });
};
