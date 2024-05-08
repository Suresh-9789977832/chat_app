// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBj8sDt9q0bJ_evO7ad9aP9hKYKCvGpSVo",
  authDomain: "textimage-92438.firebaseapp.com",
  projectId: "textimage-92438",
  storageBucket: "textimage-92438.appspot.com",
  messagingSenderId: "996573533933",
  appId: "1:996573533933:web:5d36b2027e665c51a01ee4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)

export {imgDB}