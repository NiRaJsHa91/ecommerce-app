import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZPRmx3tiCQQZDm0o2_VYYhyt076XfGjQ",
  authDomain: "ecommerceapp-9efca.firebaseapp.com",
  projectId: "ecommerceapp-9efca",
  storageBucket: "ecommerceapp-9efca.appspot.com",
  messagingSenderId: "101023344731",
  appId: "1:101023344731:web:18037af13018db5a5a377e",
  measurementId: "G-3M8FDZJQR5",
};

const firebaseApp = initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);

export { auth };
