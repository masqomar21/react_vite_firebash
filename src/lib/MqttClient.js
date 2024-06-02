import mqtt from "mqtt";
import { db } from "./firebash";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CONFIG } from "../config";


const topic = CONFIG.mqtt.topic;


const options = {
    host: CONFIG.mqtt.host,
    port: CONFIG.mqtt.port,
    path: CONFIG.mqtt.path,
    protocol: CONFIG.mqtt.protocol,
};

const client = mqtt.connect(options)

client.on('connect', () => {
    console.log('Connected to MQTT');
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log('Subscribed to topic', topic);
        }
    });
});

client.on('message', async (topic, message) => {
        console.log('Received message:', message.toString());
        const data = JSON.parse(message.toString());
        console.log(data)

        await addDoc(collection(db, 'sensorData'), {
            data : data,
            Timestamp : serverTimestamp()
        })
});

export {client}
