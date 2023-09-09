// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase  from  "firebase/app";
import "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN9cwud3VpR2k8V5dqT0SOb729Hwf5epo",
  authDomain: "react-cicd-d4190.firebaseapp.com",
  projectId: "react-cicd-d4190",
  storageBucket: "react-cicd-d4190.appspot.com",
  messagingSenderId: "110315727433",
  appId: "1:110315727433:web:fb7fdd98c49804061c2d98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);