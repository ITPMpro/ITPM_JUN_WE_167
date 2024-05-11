// config.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqqopvW5chuPmTSH93Kkn2P01MEX1Tq4w",
  authDomain: "social333-f1fb8.firebaseapp.com",
  projectId: "social333-f1fb8",
  storageBucket: "social333-f1fb8.appspot.com",
  messagingSenderId: "310797001667",
  appId: "1:310797001667:web:0a41ae00236a6bdd4e9376"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
