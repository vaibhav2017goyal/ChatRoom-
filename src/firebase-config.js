// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChVC6bc0H95MRJ4gWaCtgsGG_n1U-1njs",
  authDomain: "chatroom-3c593.firebaseapp.com",
  projectId: "chatroom-3c593",
  storageBucket: "chatroom-3c593.appspot.com",
  messagingSenderId: "979784210659",
  appId: "1:979784210659:web:79883ca3f53de7a9138dd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app)