// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdw-OmJB9h8kqy9r2ig6Q4wXg67nDTqBs",
  authDomain: "product-with-mentor.firebaseapp.com",
  projectId: "product-with-mentor",
  storageBucket: "product-with-mentor.appspot.com",
  messagingSenderId: "13130210834",
  appId: "1:13130210834:web:d46750e6713fe6110142cb",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
