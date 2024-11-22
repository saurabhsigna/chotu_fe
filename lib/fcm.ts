// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    "apiKey": "AIzaSyDeDwKjm5DIORu65psq6jL4DiFkt3JZfUg",
    "authDomain": "firstprojectchotu.firebaseapp.com",
    "projectId": "firstprojectchotu",
    "storageBucket": "firstprojectchotu.appspot.com",
    "messagingSenderId": "1037532851070",
    "appId": "1:1037532851070:web:1325c24bf4d5b10405612f",
    "measurementId": "G-JEVSGWMPQE"
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging =
    typeof window !== "undefined" ? getMessaging(app) : null;

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging!!, (payload) => {
            console.log("payload", payload);
            resolve(payload);
        });
    });

