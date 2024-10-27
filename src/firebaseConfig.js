// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBf7o2rZHr9JXZbti5OiTvLfGKtsfPN9Ps",
    authDomain: "noor-du-jour.firebaseapp.com",
    projectId: "noor-du-jour",
    storageBucket: "noor-du-jour.appspot.com",
    messagingSenderId: "414819524916",
    appId: "1:414819524916:web:9ece131a761770b7164561",
    measurementId: "G-HR9DE2EWCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// Initialize and export storage
const storage = getStorage(app);
export { storage };
