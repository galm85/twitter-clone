// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "twitter-v1-ca45e.firebaseapp.com",
  projectId: "twitter-v1-ca45e",
  storageBucket: "twitter-v1-ca45e.appspot.com",
  messagingSenderId: "27130803589",
  appId: "1:27130803589:web:73816c9453af18aea3c0ec"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export{app,db,storage};