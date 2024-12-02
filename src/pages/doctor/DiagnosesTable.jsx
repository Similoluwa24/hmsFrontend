import React, { useContext, useEffect, useState } from 'react';
import HospitalContext from '../../context/HospitalContext';
import { Link } from 'react-router-dom';

const DiagnosesTable = () => {
  const { user, isAuthenticated, showHide } = useContext(HospitalContext);
  const [diagnoses, setDiagnosis] = useState([]);
  const [loading, setLoading] = useState(true);  // New loading state
  
  useEffect(() => {
    const fetchDiagnosis = async () => {
      const res = await fetch('https://hmsbackend-4388.onrender.com/diagnosis/doctor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem("user")}`
        },
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      } else {
        setDiagnosis(data.diagnosis);
        console.log(data);
      }
      setLoading(false);  // Set loading to false once data is fetched
    };
    fetchDiagnosis();
  }, [isAuthenticated]);

  return (
    <div className="overflow-x-auto w-full mt-6">
         <div className="flex items-center justify-between border-b pb-4 px-4 mb-6">
        <h2 className="lg:text-3xl font-bold text-gray-900">Diagnosis List</h2>
        <div className="space-x-4">
          <Link 
            to={'/doctor/diagnosis'} 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            Create New Diagnosis
          </Link>
          <Link 
            to={'/doctor/home'} 
            className="bg-gradient-to-r from-blue-300 to-purple-600 text-white hidden md:inline px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
      {loading ? (  // Display loading state
      <div className="flex justify-center items-center py-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <span className="text-xl text-gray-700">Loading...</span>
        </div>
      </div>
      
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-[#007cff] text-white">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Patient ID</th>
              <th className="px-4 py-2 text-left font-medium">Patient Name</th>
              <th className="px-4 py-2 text-left font-medium">Age</th>
              <th className="px-4 py-2 text-left font-medium">Relationship</th>
              <th className="px-4 py-2 text-left font-medium">Diagnosis</th>
              <th className="px-4 py-2 text-left font-medium">Symptoms</th>
              <th className="px-4 py-2 text-left font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {diagnoses.map((diagnosis, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm">{diagnosis.userId._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{diagnosis.patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{diagnosis.patient.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{diagnosis.patient.relationship || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{diagnosis.diagnosis}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{diagnosis.symptoms}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{diagnosis.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DiagnosesTable;
