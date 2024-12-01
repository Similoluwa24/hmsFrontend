import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HospitalContext from '../../context/HospitalContext';

function MyPrescriptions() {
    const { isAuthenticated } = useContext(HospitalContext);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrescription = async () => {
            const res = await fetch('http://localhost:5000/prescription/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data);
            } else {
                setPrescriptions(data.prescription);
                console.log(data.prescription);
                setLoading(false);
            }
        };
        fetchPrescription();
    }, [isAuthenticated]);

    return (
        <>
            <div className="bg-gray-50 shadow-lg rounded-2xl p-8 max-w-4xl m-auto my-10 space-y-8">
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                    <h2 className="lg:text-3xl font-bold text-gray-900">Patient Prescription History</h2>
                    <Link
                        to={'/user/home'}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
                    >
                        Back to Portal
                    </Link>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center py-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                      <span className="text-xl text-gray-700">Loading...</span>
                    </div>
                  </div>
                ) : (
                    // Prescription Records
                    <div className="space-y-6">
                        {prescriptions.length >= 1 ? (
                            prescriptions.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300">
                                    <div className="flex justify-between gap-3 items-center mb-2">
                                        <h4 className="lg:text-xl text-[15px] font-semibold text-gray-800">Prescription Date: {item.dop}</h4>
                                        <span className="text-sm capitalize text-gray-500">{`Dr. ${item.doctor.first_name} ${item.doctor.last_name}`}</span>
                                    </div>
                                    <div className="text-gray-700 space-y-2">
                                        <p><strong>Patient: </strong>{item.patient.name}</p>
                                        <p><strong>Medications: </strong>{item.medication}</p>
                                        <p><strong>Dosage & Instructions: </strong>{item.dosage}</p>
                                        <p><strong>Additional Notes: </strong>{item.notes}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="">
                                <p className="px-4 py-3 text-center text-gray-600">No Prescription Found For This User</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyPrescriptions;