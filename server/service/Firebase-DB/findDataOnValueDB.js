import { database } from "../../firebase-init.js";

export const findDataOnValueDB = async (path, child, equal) => {
  const ref = database.ref(`${path}`);
  return await ref
    .orderByChild(child)
    .equalTo(equal)
    .once("value")
    .then((snap) => {
      return snap.exportVal() ? Object.values(snap.exportVal())[0] : null;
    });
};
