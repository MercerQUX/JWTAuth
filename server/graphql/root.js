import { database } from "../firebase-init.js";

const getDataFromDB = async (path) => {
  const ref = database.ref(path);
  return await ref
    .once("value")
    .then((snap) => {
      return snap.val();
    })
    .catch((res) => console.log(res));
};

const addNewUserInDB = async (data) => {
  const totalUser = await getDataFromDB("server/length");
  const refUsers = database.ref(`server/users/${totalUser}`);
  const changeLengthDB = database.ref("server/length");
  refUsers.set(data);
  changeLengthDB.set(totalUser + 1);
};

export const rootGraphQL = {
  getUser: async () => {
    return await getDataFromDB("server/users");
  },
  createNewUser: async ({ input }) => {
    const { login, email, password } = input;
    const newUser = {
      login,
      email,
      password,
      id: Date.now(),
    };

    addNewUserInDB(newUser);
    return newUser;
  },
};
