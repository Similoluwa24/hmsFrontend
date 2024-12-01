import React, { useContext, useEffect, useState } from 'react';
import HospitalContext from '../../context/HospitalContext';

function PatientDiagnosis() {
  const { isAuthenticated } = useContext(HospitalContext);
  const [diagnosis, setDiagnosis] = useState([]); // Set initial state as an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const res = await fetch('http://localhost:5000/diagnosis/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();

        if (!res.ok) {
          console.error(data);
        } else {
          setDiagnosis(data.diagnosis || []); // Ensure it sets an array
          console.log(data.diagnosis);
        }
      } catch (error) {
        console.error('Error fetching diagnosis:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnosis();
  }, []);

  return (
    <>
      <div className="overflow-x-auto w-full mt-6">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              <span className="text-xl text-gray-700">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Doctor Name</th>
                <th className="px-4 py-2 text-left font-medium">Patient Name</th>
                <th className="px-4 py-2 text-left font-medium">Diagnosis</th>
                <th className="px-4 py-2 text-left font-medium">Symptoms</th>
                <th className="px-4 py-2 text-left font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {diagnosis[0] !== null ? (
                diagnosis.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{`Dr. ${item.doctor.first_name} ${item.doctor.last_name}`}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.patient.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.diagnosis}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.symptoms}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Prescribed rest and fluids</td>
                    </tr>
                  ) // Skip rendering if item is null or properties are missing
                )
                
              ):(
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm" colSpan={5}>No Diagnosis Found for this user</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default PatientDiagnosis;
