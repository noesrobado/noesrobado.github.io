import dotenv from 'dotenv'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"


dotenv.config()

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };

var firebaseConfig = {
  apiKey: "AIzaSyCaBB95IOyfGTCuRnLFrtg3KQiL4myiGA4",
  authDomain: "noesrobado-app.firebaseapp.com",
  databaseURL: "https://noesrobado-app-default-rtdb.firebaseio.com",
  projectId: "noesrobado-app",
  storageBucket: "noesrobado-app.appspot.com",
  messagingSenderId: "96848561278",
  appId: "1:96848561278:web:1173f14988816e4573442f",
  measurementId: "G-Y31PM071CX"
};
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();



