export async function triggerSync() {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        try {
            const registration = await navigator.serviceWorker.ready;
            await registration.sync.register('sync-idb-to-firestore');
            console.log("🔁 Sync job registered");
        } catch (err) {
            console.error("❌ Failed to register sync:", err);
            // Optional fallback: run sync immediately
             //await syncIDBToFirebasePro(); // If you import it here
        }
    } else {
        console.warn("⚠️ Background Sync not supported");
    }
}