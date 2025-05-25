import { openDB } from 'idb'

export const dbPromise = openDB('hanashi-db', 2, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('stories')) {
            db.createObjectStore('stories', { keyPath: 'id', autoIncrement: true});
        }
        if (!db.objectStoreNames.contains('user')) {
            db.createObjectStore('user', { keyPath: 'uid'});
        }
    },
})

// Add a story
export async function addStory(story) {
    const db = await dbPromise
    return await db.add('stories', story)
}

// Get all stories
export async function getAllStories() {
    const db = await dbPromise
    return await db.getAll('stories')
}

// Delete a story
export async function deleteStory(id) {
    const db = await dbPromise
    return await db.delete('stories', id)
}

export async function updateStory(updatedStory) {
    const db = await dbPromise;
    try {
        await db.put('stories', updatedStory);
        // console.log('Story updated successfully:', updatedStory.id);
    } catch (e) {
        console.error('Error updating story:', e);
    }
}

export async function getStory(id) {
    const db = await dbPromise;
    try {
        const story = await db.get('stories', id);
        if (story) {
            // console.log('Story found:', story);
        } else {
            // console.log('No story found with id:', id);
        }
        return story;
    } catch (e) {
        console.error('Error retrieving story:', e);
        return null;
    }
}

export async function getStoryByTitle(title) {
    const db = await dbPromise;
    const tx = db.transaction('stories', 'readonly');
    const store = tx.objectStore('stories');

    const allStories = await store.getAll();

    const matchingStory = allStories.find(story => story.title === title);

    if (matchingStory) {
        // console.log("Found story:", matchingStory);
    } else {
        console.log("No story found with title:", title);
    }

    return matchingStory || null;
}

export async function saveUserToIDB(user) {
    try {
        console.log('Saving user to IndexedDB...');
        const db = await dbPromise;
         console.log(user);
        await db.put('user', user); // 'users' must match your store name
        // console.log('✅ User saved to IndexedDB');
    } catch (error) {
        alert("Error logging in.")
        console.error('❌ Failed to save user to IndexedDB:', error);
    }
}

export async function getSingleUserFromIDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('hanashi-db', 2); // Use your DB name and version

        request.onerror = () => reject('Failed to open DB');

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['user'], 'readonly');
            const store = transaction.objectStore('user');

            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                const allUsers = getAllRequest.result;
                resolve(allUsers.length > 0 ? allUsers[0] : null);
            };

            getAllRequest.onerror = () => reject('Error fetching user');
        };
    });
}

export async function deleteAnyUserFromIDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('hanashi-db', 2);

        request.onerror = () => reject('Failed to open DB');

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['user'], 'readwrite');
            const store = transaction.objectStore('user');

            const keysRequest = store.getAllKeys();

            keysRequest.onsuccess = () => {
                const keys = keysRequest.result;
                if (keys.length === 0) {
                    resolve('No user to delete.');
                    return;
                }

                const deleteRequest = store.delete(keys[0]);
                deleteRequest.onsuccess = () => resolve('User deleted.');
                deleteRequest.onerror = () => reject('Failed to delete user.');
            };

            keysRequest.onerror = () => reject('Failed to fetch keys.');
        };
    });
}
