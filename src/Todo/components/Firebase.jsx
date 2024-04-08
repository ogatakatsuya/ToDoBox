import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD9vLWVk_--8apFIsu45z9x_eAI8rI6-4A",
    authDomain: "todolist-b16fc.firebaseapp.com",
    projectId: "todolist-b16fc",
    storageBucket: "todolist-b16fc.appspot.com",
    messagingSenderId: "414170615475",
    appId: "1:414170615475:web:dba219ee5f11bf7dd9aac6",
    measurementId: "G-0CE7DRRWVZ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();

export default app;