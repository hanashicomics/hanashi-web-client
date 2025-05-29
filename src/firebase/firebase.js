// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection, addDoc,doc,  query, where, getDocs,getDoc,setDoc,updateDoc,deleteDoc,Timestamp} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut,sendPasswordResetEmail} from "firebase/auth";
import {deleteAnyUserFromIDB, getAllStories, getSingleUserFromIDB, saveUserToIDB} from "../lib/db.js";

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
export const db = getFirestore(app);
const auth = getAuth(app);

export async function saveStoryToFirestore(storyObject) {
    try {
        const docRef = await addDoc(collection(db, "stories"), storyObject);
        // console.log("Story saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding story: ", error);
    }
}

export async function saveUserPlanToFirestore(uid,email) {
    try {
        const docRef = doc(db, "users", uid); // create a document reference with uid as the ID
        await setDoc(docRef, {
            uid: uid,
            email: email,
            plan: 'free',
            upgradedAt: Timestamp.fromDate(new Date()),
            createdAt: Timestamp.fromDate(new Date()),
        });
        // console.log("User plan saved successfully.");
    } catch (error) {
        console.error("Error saving user plan: ", error);
    }
}

export async function saveStoryToFirestoreForPro(storyObject, storyId) {
    if (!storyId && !storyObject.id) {
        throw new Error("Story must have an ID to save uniquely.");
    }

    // Use storyId param if given, else fallback to storyObject.id
    const idToUse = storyId || storyObject.id;

    try {
        // Save or update the story with the specific ID (no duplicates)
        await setDoc(doc(db, "stories", idToUse.toString()), storyObject);
    } catch (error) {
        console.error("Error saving story:", error);
    }
}

export async function resetPassword(email) {
    const auth = getAuth();

    try {
        await sendPasswordResetEmail(auth, email);
        console.log(`Reset email sent to ${email}`);
    } catch (error) {
        console.error("Error sending reset email:", error.message);
        throw error;
    }
}

export async function signUpUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await saveUserPlanToFirestore(user.uid,email);
        return user;
    } catch (error) {
        //console.error("Error signing up:", error.code, error.message);
        alert("Sign up failed: " + error.message);
        throw error;
    }
}

export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userPlanInfo = await getUserPlan(user.uid);

        await saveUserToIDB({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous,
            createdAt: user.metadata.creationTime,
            lastLogin: user.metadata.lastSignInTime,
            plan: userPlanInfo.plan,
            username: userPlanInfo.username,
            upgradedAt: userPlanInfo.upgradedAt,
        });
    } catch (error) {
        console.error("Error logging in:", error.code, error.message);
        alert("Login failed: " + error.message);
    }
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

        // console.log("Documents found:", results);

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
        // console.log("Document updated successfully.");
    } catch (error) {
        console.error("Error updating document:", error);
    }
}

export const logoutUser = async () => {
    const auth = getAuth();
    try {
        await signOut(auth);
        await deleteAnyUserFromIDB();
        console.log("User signed out successfully.");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

export async function deleteDocument(collectionName, docId) {
    const db = getFirestore();
    const docRef = doc(db, collectionName, docId);

    try {
        await deleteDoc(docRef);
        console.log("Document deleted successfully.");
    } catch (error) {
        console.error("Error deleted document:", error);
    }
}

export async function markUserAsPro(userId) {
    if (!userId) throw new Error('No user ID provided');

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    const now = new Date();

    if (!userSnap.exists()) {
        // If the user doc doesn't exist, create it with default + Pro info
        await setDoc(userRef, {
            uid:userId,
            plan: 'pro',
            createdAt: now,
            upgradedAt: now,
        });
    } else {
        // If the user exists, just update the plan
        await updateDoc(userRef, {
            plan: 'pro',
            upgradedAt: now,
        });
    }
}

export async function getUserPlan(userId) {
    if (!userId) throw new Error('No user ID provided');

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        return null; // No user doc found
    }

    const userData = userSnap.data();
    return {
        plan: userData.plan,
        username: userData.username,
        upgradedAt: userData.upgradedAt,
        createdAt: userData.createdAt,
    };
}

export async function syncIDBToFirebasePro() {
    const userStuff = await getSingleUserFromIDB();
    const uid = userStuff.uid;

    if(userStuff.plan === "pro"){
        const idbObjects = await getAllStories();
        if (!idbObjects || idbObjects.length === 0) return;


        if (!userStuff) {
            console.error('No user found in IDB');
            return;
        }

        // Filter IndexedDB stories by current user's uid only
        const userStories = idbObjects.filter(story => story.userid === uid);

        // Get all Firestore stories for this user once
        const firestoreStories = await getDocumentsByField("stories", "userid", uid);

        // Create a map for quick lookup by story id
        const firestoreStoryMap = {};
        firestoreStories.forEach(story => {
            firestoreStoryMap[story.id] = story;
        });

        for (const idbStory of userStories) {
            const matchingFirestoreStory = firestoreStoryMap[idbStory.id];

            if (matchingFirestoreStory) {
                // Update existing Firestore story with IndexedDB data
                await updateDocument("stories", matchingFirestoreStory.id.toString(), idbStory);
                // console.log(`Updated story with ID "${idbStory.id}" in Firestore.`);
            } else {
                // Save new story from IndexedDB to Firestore
                await saveStoryToFirestoreForPro(idbStory,idbStory.id);
                // console.log(`Saved new story with ID "${idbStory.id}" to Firestore.`);
            }
        }
    }
}

export async function saveTransaction(uid, transactionData) {
    try {
        const docRef = await db.collection("transactions").add({
            uid,
            transactionData: transactionData,
            createdAt: Timestamp.fromDate(new Date()),
        });
        console.log("Transaction saved with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving transaction:", error);
        throw error;
    }
}

