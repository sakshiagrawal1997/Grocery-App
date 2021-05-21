import firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyDcTfeGuoM7hm0DK-BRJ1iIitQPm_wNNE4",
    authDomain: "grocery-app-24b92.firebaseapp.com",
    projectId: "grocery-app-24b92",
    storageBucket: "grocery-app-24b92.appspot.com",
    messagingSenderId: "652287477989",
    appId: "1:652287477989:web:f2e2d5cb0e7bd04e8cac0c",
    measurementId: "G-H4W0HBN4SM"
  };

  
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();