// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNg3yQmAsA1LlqCBIPmyM1TszvU1bC_qE",
  authDomain: "itpm-d51d2.firebaseapp.com",
  projectId: "itpm-d51d2",
  storageBucket: "itpm-d51d2.appspot.com",
  messagingSenderId: "824727481645",
  appId: "1:824727481645:web:da60e95870b665892bf7a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


