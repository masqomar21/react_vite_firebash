
export const CONFIG = {
    firebase : {
        apiKey :import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ,
        projectId : import.meta.env.VITE_FIREBASE_PROJECT_ID ,
        storageBucket : import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId : import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ,
        appId : import.meta.env.VITE_FIREBASE_APP_ID ,
        measurementId : import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    },
    mqtt : {
        host : import.meta.env.VITE_MQTT_HOST || 'broker.hivemq.com',
        port : import.meta.env.VITE_MQTT_PORT || 8000,
        path : import.meta.env.VITE_MQTT_PATH || '/mqtt',
        protocol : import.meta.env.VITE_MQTT_PROTOCOL || 'ws',
        topic : import.meta.env.VITE_MQTT_TOPIC || 'topic/test'
    }
}