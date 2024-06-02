/* eslint-disable react-hooks/exhaustive-deps */
import {  doc, getDoc } from 'firebase/firestore'
import { useEffect, useState} from "react";
import { db } from '../lib/firebash';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import userImage from '../../public/mihun.jpg'
import homeImage from '../../public/icons/home.png'
import dashboardImage from '../../public/icons/dashboard.png'
import { useAuth } from '../hook/auth';
import MqttData from '../components/mqttData';

export default function HomePage() {
  
  const [noRekamMedis, setNoRekamMedis] = useState('')
  const [name, setName] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState('')
  const [tanggalRehab, setTanggalRehab] = useState('')
  const [tinggiBadan, setTinggiBadan] = useState(0)
  const [beratBadan, setBeratBadan] = useState(0)
  const [time, setTime] = useState(15 * 60 * 1000); // 15 minutes in milliseconds
  const [isExpired, setIsExpired] = useState(false);

    const { currentUser } = useAuth()

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const fectData = async () => {
    const docRef = doc(db, 'users', currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      setNoRekamMedis(data.rekamMedis)
      setName(data.name)
      setTanggalLahir(data.tanggalLahir)
    //   setTanggalRehab(data.tanggalRehab)
    //   setTinggiBadan(data.tinggiBadan)
    //   setBeratBadan(data.beratBadan)
    } else {
        console.log('No such document')
    }
  }

  
  useEffect( () => {

    // const q = query(collection(db, 'sensorData'));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const dataArr = [];
    //   querySnapshot.forEach((doc) => {
    //     dataArr.push({ ...doc.data(), id: doc.id });
    //   });
    //   setSensorData(dataArr)
    //   console.log(dataArr[0].data)
    // });

    fectData()

    const targetTime = new Date().getTime() + time;
    const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        setIsExpired(true);
        setTime(0);
    } else {
        setTime(distance);
    }
    })
    return () => {
    clearInterval(timerInterval);
    // unsubscribe();
    };
  }, [])

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };
    return (
        <div>
            ini homes
            <MqttData/>
            {/* <p>
                        {JSON.stringify(sensorData.map((data)=> (data.data)))}
        </p> */}
        <div className="w-screen h-screen flex justify-between">
        <div className="hidden lg:block lg:w-2/12 h-full bg-[#0134b2] p-4 text-white">
            <div className="text-center text-l font-bold mb-4">
                Sistem Monitoring AFO
            </div>
            <div>
                <div className="flex gap-2 items-center mt-4 px-2 cursor-pointer">
                    <div>
                        <img src={homeImage} className="w-[22px]" alt=""/>
                    </div>
                    <div>
                        Dashboard
                    </div>
                </div>
                <div className="flex gap-2 items-center mt-4 px-2 cursor-pointer">
                    <div>
                        <img src={dashboardImage} className="w-[22px]" alt=""/>
                    </div>
                    <div>
                        Monitoring Pasien
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full lg:w-10/12 flex flex-col">
            <div className="p-4 flex justify-end items-center w-full">
                <div className="flex items-center gap-4 justify-end w-full">
                    <div className="text-gray-600">
                        {name}
                    </div>
                    <div className="w-[30px] h-[30px] overflow-hidden rounded-full">
                        <img src={userImage} className="w-[30px]" alt=""/>
                    </div>
                </div>
            </div>
            <div className="bg-gray-300 p-4 w-full h-full">
                <div className="font-semibold text-[27px] mt-3 mb-5">
                    Monitoring Data Pasien
                </div>
                <div className=" rounded-lg shadow-xl">
                    <div className="w-full p-3 font-bold text-[#0134b2] bg-white border-b-2 rounded-t-lg">
                        Data Pasien
                    </div>
                    <div className="p-5 bg-white rounded-b-lg">
                        <div className="w-full">
                            <table className="table-auto w-full border-collapse border border-gray-30y">
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 font-bold text-gray-500">No Rekam Medis</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <input type="text" value={noRekamMedis} className="w-full border-0"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 font-bold text-gray-500">Nama</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <input type="text" value={name} className="w-full border-0"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 font-bold text-gray-500">Tanggal Lahir</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <input type="text" value={tanggalLahir} className="w-full border-0"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 font-bold text-gray-500">Tanggal Rehab</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <input type="text" value={tanggalRehab} className="w-full border-0"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 font-bold text-gray-500">Tinggi Badan</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <input type="text" value={tinggiBadan} className="w-full border-0"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 font-bold text-gray-500">Berat Badan</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <input type="text" value={beratBadan} className="w-full border-0"/>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                        <button className="btn bg-blue-600 text-white p-1 rounded">
                            Submit
                        </button>
                        <div id="timer">
                          {isExpired ? 'Countdown expired' : formatTime(time)}
                        </div>
                        <h2>Charts</h2>
                        <div className="grid grid-cols-3">
                    <div>
                      <Line data={data} />
                        </div>
                    <div>
                      <Line data={data} />
                        </div>
                    <div>
                      <Line data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
        </div>
    )
}