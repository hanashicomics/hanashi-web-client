export function registerServiceWorkerWithEnv() {
    window.REACT_ENV = {
        apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID
    };

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('✅ Service Worker registered');

                // Send Firebase config to SW
                if (registration.active) {
                    registration.active.postMessage({
                        type: 'ENV_VARS',
                        payload: {
                            apiKey: import.meta.env.VITE_API_KEY,
                            authDomain: import.meta.env.VITE_AUTH_DOMAIN,
                            projectId: import.meta.env.VITE_PROJECT_ID,
                            storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
                            messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
                            appId: import.meta.env.VITE_APP_ID,
                            measurementId: import.meta.env.VITE_MEASUREMENT_ID,
                        },
                    });
                }

                // Register background sync if supported
                if ('SyncManager' in window) {
                    await registration.sync.register('sync-idb-to-firestore');
                    console.log('✅ Background Sync registered');
                }
            } catch (error) {
                console.error('❌ Service Worker registration failed:', error);
            }
        });
    }
}