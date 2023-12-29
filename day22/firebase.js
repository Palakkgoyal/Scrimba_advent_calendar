import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"

const appSettings = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "jolly-gift-log.firebaseapp.com",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: "jolly-gift-log",
    storageBucket: "jolly-gift-log.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

const app = initializeApp(appSettings)

export default app