import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAwgXQek-x5e7trQxGVuDXYfx6QZcbBAfI",
    authDomain: "todobox-b3620.firebaseapp.com",
    projectId: "todobox-b3620",
    storageBucket: "todobox-b3620.appspot.com",
    messagingSenderId: "199545095470",
    appId: "1:199545095470:web:e60c02767ea543128a66bf",
    measurementId: "G-4F2YW2ETF2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();

export default app;