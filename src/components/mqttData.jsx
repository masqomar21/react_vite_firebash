import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../lib/firebash";

export default function MqttData() {
    const [sensorData, setSensorData] = useState([])

    useEffect(() => {
        const q = query(collection(db, 'sensorData'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach((doc) => {
            dataArr.push({ ...doc.data(), id: doc.id });
        });
        setSensorData(dataArr)
        console.log(dataArr[0].data)
        });

        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div>
            <p>{JSON.stringify(sensorData.map((data)=> (data.data)))}</p>
        </div>
    )
}