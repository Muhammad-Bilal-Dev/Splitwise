import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_SECRET_API_KEY,
  authDomain: process.env.REACT_APP_SECRET_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_SECRET_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SECRET_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SECRET_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_SECRET_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
