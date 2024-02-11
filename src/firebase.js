// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrI1RGaYYDq5H5XAsAyWFKWksrvEAmlrU",
  authDomain: "deployment-server-a0601.firebaseapp.com",
  projectId: "deployment-server-a0601",
  storageBucket: "deployment-server-a0601.appspot.com",
  messagingSenderId: "324075476669",
  appId: "1:324075476669:web:9073cd24efdd068c0ac9d4",
  measurementId: "G-V5EF9BT3NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
