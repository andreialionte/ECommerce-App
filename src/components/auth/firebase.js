// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvqHVoNAPi9KZqbpNMxuotHynkYCmALoY",
  authDomain: "ecommerce-ro-collection.firebaseapp.com",
  projectId: "ecommerce-ro-collection",
  storageBucket: "ecommerce-ro-collection.appspot.com",
  messagingSenderId: "95463406004",
  appId: "1:95463406004:web:8593aeef1fc283f2e71ae1",
  measurementId: "G-LNN5J9JX27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);