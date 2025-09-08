// Import the functions you need from the SDKs you need
import { initializeApp ,getApp,getApps} from "firebase/app";
// import { getAnalytics } from "firebase/analytics";             
// TODO: Add SDKs for Firebase products that you want to use        
// https://firebase.google.com/docs/web/setup#available-libraries   
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARuxPEL_NU67x1TmKTgxjGb1DeUXI2Dg4",
  authDomain: "prepwise-d8a19.firebaseapp.com",
  projectId: "prepwise-d8a19",
  storageBucket: "prepwise-d8a19.firebasestorage.app",
  messagingSenderId: "133779884148",
  appId: "1:133779884148:web:2e304242e9168118b4e921",
  measurementId: "G-ZL8SZQWR0Q"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig): getApp();
export const auth = getAuth(app);   
export const db = getFirestore(app);
// const analytics = getAnalytics(app);