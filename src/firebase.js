// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4S85-5J-vvcxVivWhQIxjcxv8WcvtYBI",
    authDomain: "todoapp-a91e8.firebaseapp.com",
    projectId: "todoapp-a91e8",
    storageBucket: "todoapp-a91e8.firebasestorage.app",
    messagingSenderId: "326975375522",
    appId: "1:326975375522:web:ae98da172c415e0d04affb",
    measurementId: "G-LDKJPM0F1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

