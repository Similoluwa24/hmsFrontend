import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Table() {
    const params = useParams()
    const id = params.id

    const [vital, setVitals] = useState('')
    const [loading, setLoading] = useState('')

    
        const calculateBMI = (weight, heightInCm) => {
          const heightInMeters = heightInCm / 100;
          return weight / (heightInMeters * heightInMeters);
        };
      
        const getBPClass = ({ systolic, diastolic }) => {
          if (systolic < 120 && diastolic < 80) return "text-green-500"; // Normal
          if (systolic >= 120 && systolic <= 129 && diastolic < 80) return "text-yellow-500"; // Elevated
          if (systolic >= 130 || diastolic >= 80) return "text-red-500"; // High
          return "text-gray-500";
        };
    useEffect(()=>{
        const getPayment = async()=>{
            const res = await fetch(`https://hmsbackend-4388.onrender.com/vitals/${id}`,{
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
                setVitals(data)
                setLoading(false)
            }
            
        }
        getPayment()
    },[])
  return (
    <>
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Patient Vital Details</h2>
        {loading ? (
            <div className="">Loading...</div>
        ):(
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-700">Recorded on: {new Date(vital.createdAt).toLocaleDateString()}</h3>

                <table className="w-full text-sm text-left text-gray-500 bg-white border border-gray-200 mb-6">
                <tbody>
                    <tr className="border-b">
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Blood Pressure</th>
                    <td className={`px-6 py-4 `}>
                        {vital?.bloodPressure?.systolic}/{vital?.bloodPressure?.diastolic} mmHg
                    </td>
                    </tr>
                    <tr className="border-b">
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Temperature</th>
                    <td className="px-6 py-4">{vital.temperature} °C</td>
                    </tr>
                    <tr className="border-b">
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Weight</th>
                    <td className="px-6 py-4">{vital.weight} kg</td>
                    </tr>
                    <tr className="border-b">
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Height</th>
                    <td className="px-6 py-4">{vital.height / 100} m</td>
                    </tr>
                    <tr>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">BMI</th>
                    <td className="px-6 py-4">{calculateBMI(vital.weight, vital.height).toFixed(2)}</td>
                    </tr>
                </tbody>
                </table>

                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Medical Guide</h4>
                <ul className="list-disc list-inside text-gray-600">
                    <li>
                    <strong>Blood Pressure:</strong>
                    <ul className="ml-6 mt-2 list-disc">
                        <li>Normal: Less than 120/80 mmHg</li>
                        <li>{`Elevated: 120-129/<80 mmHg`}</li>
                        <li>High (Stage 1): 130-139/80-89 mmHg</li>
                        <li>High (Stage 2): ≥140/≥90 mmHg</li>
                    </ul>
                    </li>
                    <li className="mt-4">
                    <strong>BMI:</strong>
                    <ul className="ml-6 mt-2 list-disc">
                        <li>Underweight: BMI &lt; 18.5</li>
                        <li>Normal: BMI 18.5–24.9</li>
                        <li>Overweight: BMI 25–29.9</li>
                        <li>Obesity: BMI ≥ 30</li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
        )}

      {/* <div className="flex justify-end mt-6">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => console.log('Edit Vital Record')}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          onClick={() => console.log('Delete Vital Record')}
        >
          Delete
        </button>
      </div> */}
    </div>
    </>
  )
}

export default Table