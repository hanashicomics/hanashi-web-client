import { openDB } from 'idb'

export const dbPromise = openDB('hanashi-db', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('stories')) {
            db.createObjectStore('stories', { keyPath: 'id', autoIncrement: true})
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
        console.log('Story updated successfully:', updatedStory.id);
    } catch (e) {
        console.error('Error updating story:', e);
    }
}

export async function getStory(id) {
    const db = await dbPromise;
    try {
        const story = await db.get('stories', id);
        if (story) {
            console.log('Story found:', story);
        } else {
            console.log('No story found with id:', id);
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
        console.log("Found story:", matchingStory);
    } else {
        console.log("No story found with title:", title);
    }

    return matchingStory || null;
}
