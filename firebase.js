import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAvPmiI8aUnfE2VAiiOarevedGiB5ORko",
    authDomain: "dumbai-a7a42.firebaseapp.com",
    projectId: "dumbai-a7a42",
    storageBucket: "dumbai-a7a42.appspot.com",
    messagingSenderId: "1023320864950",
    appId: "1:1023320864950:web:2eb25fc290788ce7cf0e17"
  };
  
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };