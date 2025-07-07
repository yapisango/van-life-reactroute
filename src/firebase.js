// src/firebase.js

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Only initialize Firebase if the env variable is set
const useFirebase = import.meta.env.VITE_USE_FIREBASE === "true"

let db, auth

if (useFirebase) {
  const firebaseConfig = {
    apiKey: "AIzaSyA_xu5Wi1-106iRb0taAZ1lWMn-vk_KqSQ",
    authDomain: "van-life-reactroute-827b4.firebaseapp.com",
    projectId: "van-life-reactroute-827b4",
    storageBucket: "van-life-reactroute-827b4.appspot.com",
    messagingSenderId: "419647889289",
    appId: "1:419647889289:web:cf49d4ac26231ffa748b58"
  }

  const app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getAuth(app)
}

export { useFirebase, db, auth }
