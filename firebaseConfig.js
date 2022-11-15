// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCaypuiafOlvZ6uhb5dvD7lS_aGO9wyRQ",
  authDomain: "venture-bf3d2.firebaseapp.com",
  projectId: "venture-bf3d2",
  storageBucket: "venture-bf3d2.appspot.com",
  messagingSenderId: "88258810833",
  appId: "1:88258810833:web:b778f83f97499a66d246f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);