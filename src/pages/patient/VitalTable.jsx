import React, { useContext, useEffect, useState } from 'react'
import HospitalContext from '../../context/HospitalContext'
import { Link } from 'react-router-dom'

function VitalTable() {
    const {showHide} = useContext(HospitalContext)
 const [vitals, setVitals] = useState([])
 const [loading, setLoading] = useState(true)
 useEffect(()=>{
     const getVitals = async()=>{
         const res = await fetch('https://hmsbackend-4388.onrender.com/vitals/me',{
             method:'GET',
             headers:{
                 'Content-Type':'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("user")}`
             },
             credentials:'include'
         })
         const data = await res.json()
         console.log(data);
         if (!res.ok) {
             console.log(data);
             showHide('error','An error has occured!')
         } else {
             setVitals(data.data)
             setLoading(false)
         }
         
     }
     getVitals()
 },[])

  return (
    <>
        <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Patient Vital Signs</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Blood Pressure</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Temperature</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Weight</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Height</th>
                <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700">Action</th>
            </tr>
            </thead>
            <tbody>
            {
                loading ? (
                    <div className="">Loading ....</div>
                ):(
                    vitals.map((vital, index) => (
                        <tr key={index} className="hover:bg-gray-50 border-b border-gray-300">
                        <td className="py-3 px-6 text-sm text-gray-700">{new Date(vital.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-6 text-sm text-gray-700">{`${vital.bloodPressure.systolic}/${vital.bloodPressure.diastolic}`}</td>
                        <td className="py-3 px-6 text-sm text-gray-700">{vital.temperature}°C</td>
                        <td className="py-3 px-6 text-sm text-gray-700">{vital.weight} kg</td>
                        <td className="py-3 px-6 text-sm text-gray-700">{vital.height} cm</td>
                       
                        <td className="py-3 px-6 text-center">
                            <Link 
                            to={`/user/vitals/${vital._id}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                            View Details
                            </Link>
                        </td>
                        </tr>
                    ))
                )
            }
            </tbody>
        </table>
        </div>
    </>
  )
}

export default VitalTable



