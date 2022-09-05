// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA27BvhliChf3DWfrJiHh5oEGr1MwNRu4g",
  authDomain: "expenses-tracking-dfd60.firebaseapp.com",
  projectId: "expenses-tracking-dfd60",
  storageBucket: "expenses-tracking-dfd60.appspot.com",
  messagingSenderId: "749222794942",
  appId: "1:749222794942:web:08b216128a5372228930ef",
  measurementId: "G-MEYYSZVG7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt:"select_account"});

export const signInWithGoogle = ()=>{
    signInWithPopup(auth, provider).then(result=>{
        console.log("sign in with google.", result);
    }).catch(error=>{
        console.error("Error occured while login");
    });
};

export const fireStore = getFirestore(app);