import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: "bakerymanager-40c9e.firebaseapp.com",
  databaseURL: "https://bakerymanager-40c9e-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "bakerymanager-40c9e",
  storageBucket: "bakerymanager-40c9e.appspot.com",
  messagingSenderId: "671517362545",
  appId: "1:671517362545:web:8a9f34702af9a0081c4ed0",
  measurementId: "G-X5ENTF6NZJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { app, auth, db, database };
