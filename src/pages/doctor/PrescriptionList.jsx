import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HospitalContext from '../../context/HospitalContext';

function PrescriptionList() {
  const {isAuthenticated} = useContext(HospitalContext)
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const fetchPrescription = async () => {
      const res = await fetch('https://hmsbackend-4388.onrender.com/prescription/doctor',{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include'
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data);
        
      } else {
        setPrescriptions(data.prescription)
        setLoading(false)
        
      }
      
    }
    fetchPrescription()
  },[isAuthenticated])


  return (
    <div className="bg-gray-50 shadow-lg rounded-2xl p-8 max-w-5xl m-auto my-10 space-y-8">
      <div className="flex items-center gap-3 justify-between border-b pb-4 mb-6">
        <h2 className="md:text-3xl font-bold text-gray-900">Prescription List</h2>
        <div className="space-x-4 w-full">
          <Link 
            to={'/doctor/prescription'} 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white md:text-lg text-[9px] px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            Create New Prescription
          </Link>
          <Link 
            to={'/doctor/home'} 
            className="bg-gradient-to-r from-blue-300 to-purple-600 text-white px-5 py-2 hidden md:inline rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <span className="text-xl text-gray-700">Loading...</span>
          </div>
        </div>
        ):( 
         prescriptions.map((prescription) => (
            <div key={prescription._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Patient: {prescription.patient.name}
                </h3>
                <p className='text-gray-400 font-[poppins]'>
                  Dr. {prescription.doctor.first_name} {prescription.doctor.last_name}
                </p>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Date: {new Date(prescription.dop).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Ailment: {prescription.ailment}
              </p>
              <div className="mb-3">
                <h4 className="font-semibold text-gray-700">Medications:</h4>
                <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 rounded-md p-3 border border-gray-200">
                  {prescription.medication}
                </pre>
              </div>
              <div className="mb-3">
                <h4 className="font-semibold text-gray-700">Dosage & Instructions:</h4>
                <p className="text-gray-700">{prescription.dosage}</p>
              </div>
              <div className="mb-3">
                <h4 className="font-semibold text-gray-700">Additional Notes:</h4>
                <p className="text-gray-700">{prescription.notes}</p>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default PrescriptionList;
