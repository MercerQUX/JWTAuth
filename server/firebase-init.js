import { initializeApp } from "firebase-admin/app";
import firebaseAdmin from "firebase-admin";
const { credential } = firebaseAdmin;
import { config } from "./path/to/serviceAccountKey.js";
import { getDatabase } from "firebase-admin/database";

initializeApp({
  credential: credential.cert(config),
  projectId: "testing-project-nodejs",
  databaseURL:
    "https://testing-project-nodejs-default-rtdb.europe-west1.firebasedatabase.app",
});

export const database = getDatabase();
