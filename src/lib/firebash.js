import  { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
// const process = import.meta.env;

import { CONFIG } from "../config";

const firebaseConfig = {
    apiKey: CONFIG.firebase.apiKey,
    authDomain: CONFIG.firebase.authDomain,
    projectId: CONFIG.firebase.projectId,
    storageBucket: CONFIG.firebase.storageBucket,
    messagingSenderId: CONFIG.firebase.messagingSenderId,
    appId: CONFIG.firebase.appId,
    measurementId: CONFIG.firebase.measurementId
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const rtdb = getDatabase(app)
const auth = getAuth(app)

export { db, rtdb, auth };

