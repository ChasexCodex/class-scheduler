import {initializeApp} from "firebase/app";
import {getDatabase} from "@firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBnReTzt7FqXaWj0yqWTkFV21dzYH0UNkI",
    authDomain: "class-scheduler-4e586.firebaseapp.com",
    projectId: "class-scheduler-4e586",
    storageBucket: "class-scheduler-4e586.appspot.com",
    messagingSenderId: "83960691288",
    appId: "1:83960691288:web:2f110991314a36cf25a82d"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
