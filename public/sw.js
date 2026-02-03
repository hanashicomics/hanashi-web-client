/// <reference lib="webworker" />
/* eslint-env serviceworker */
// @ts-check

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js");
importScripts("https://cdn.jsdelivr.net/npm/idb@7/build/umd.js");

let firebaseConfig = null;
let db = null;

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'ENV_VARS') {
        firebaseConfig = event.data.payload;
        initializeFirebase();
    }
});

function initializeFirebase() {
    if (!firebaseConfig) return;

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log('✅ Firebase initialized in service worker');
    }
}

// IndexedDB helper
function idbOpen() {
    return idb.openDB("hanashi-db", 2, {
        upgrade(db) {
            if (!db.objectStoreNames.contains("stories")) {
                db.createObjectStore("stories", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("user")) {
                db.createObjectStore("user", { keyPath: "uid" });
            }
        }
    });
}

async function getSingleUser(idb) {
    const tx = idb.transaction("user", "readonly");
    const store = tx.objectStore("user");
    const users = await store.getAll();
    return users[0] || null;
}

// Background sync handler
self.addEventListener("sync", (event) => {
    if (event.tag === "sync-idb-to-firestore") {
        event.waitUntil(syncIDBToFirebasePro());
    }
});

async function syncIDBToFirebasePro() {
    if (!db) {
        console.warn("Firestore not initialized yet — skipping sync");
        return;
    }

    try {
        const idb = await idbOpen();
        const user = await getSingleUser(idb);
        if (!user || user.plan !== "pro") {
            console.log("No pro user found, skipping sync");
            return;
        }

        const stories = await idb.transaction("stories").objectStore("stories").getAll();
        const userStories = stories.filter(s => s.userid === user.uid);

        const firestoreSnap = await db.collection("stories").where("userid", "==", user.uid).get();
        const firestoreStoryMap = {};
        firestoreSnap.forEach(doc => {
            firestoreStoryMap[doc.id] = doc.data();
        });

        for (const story of userStories) {
            if (firestoreStoryMap[story.id]) {
                await db.collection("stories").doc(story.id.toString()).set(story, { merge: true });
            } else {
                await db.collection("stories").doc(story.id.toString()).set(story);
            }
        }

        console.log("✅ Background sync completed");
    } catch (error) {
        console.error("❌ Sync error:", error);
    }
}