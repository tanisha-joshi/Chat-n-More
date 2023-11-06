// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8uHGtBDeKdxOnggWIkaeoBuFPV2UeyHE",
  authDomain: "chatnmore-1695d.firebaseapp.com",
  projectId: "chatnmore-1695d",
  storageBucket: "chatnmore-1695d.appspot.com",
  messagingSenderId: "913959916748",
  appId: "1:913959916748:web:62a8c065505b042eef1e69",
  measurementId: "G-612CVQRNGG"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export {auth};