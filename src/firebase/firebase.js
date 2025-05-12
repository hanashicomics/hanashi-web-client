// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection, addDoc,doc,  query, where, getDocs,updateDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export async function saveStoryToFirestore(storyObject) {
    try {
        const docRef = await addDoc(collection(db, "stories"), storyObject);
        console.log("Story saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding story: ", error);
    }
}

export async function signUpUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User created:", user.uid);
        return user;
    } catch (error) {
        console.error("Error signing up:", error.code, error.message);
        throw error;
    }
}

export async function loginUser(email, password) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            sessionStorage.setItem('userid',user.uid);
            sessionStorage.setItem('email',user.email);
            console.log("Login successful:", user.email);
        })
        .catch((error) => {
            console.error("Error logging in:", error.code, error.message);
            alert("Login failed: " + error.message);
        });
}

export async function getDocumentsByField(collectionName, fieldName, value) {
    const db = getFirestore();
    const q = query(collection(db, collectionName), where(fieldName, "==", value));

    try {
        const querySnapshot = await getDocs(q);
        const results = [];

        querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
        });

        console.log("Documents found:", results);

        return results;
    } catch (error) {
        console.error("Error getting documents:", error);
        throw error;
    }
}

export async function updateDocument(collectionName, docId, updatedData) {
    const db = getFirestore();
    const docRef = doc(db, collectionName, docId);

    try {
        await updateDoc(docRef, updatedData);
        console.log("Document updated successfully.");
    } catch (error) {
        console.error("Error updating document:", error);
    }
}