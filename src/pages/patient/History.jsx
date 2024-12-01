import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import HospitalContext from '../../context/HospitalContext'

function History() {
  const {user} = useContext(HospitalContext)
  console.log({user});
  
  return (
    <>
        <div className="bg-gray-50 shadow-lg rounded-2xl p-8 max-w-4xl m-auto my-10 space-y-8">
    <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Patient Treatment History</h2>
        <Link
            to={'/user/patient-history'} 
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 transition duration-300"
        >
            Back to Records
        </Link>
    </div>

    {/* Patient Details */}
    <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
        <div className="flex items-center space-x-4">
            {/* <img src="/path/to/profile-picture.jpg" alt="Profile" className="w-20 h-20 rounded-full shadow-md" /> */}
            <div>
                <h3 className="text-2xl font-semibold text-gray-800">{user.first_name} {user.last_name} </h3>
                <p className="text-gray-600">45 years old</p>
                <p className="text-gray-500">{user.phone} </p>
            </div>
        </div>
    </div>

    {/* Treatment Records */}
    <div className="space-y-6">
        {/* Treatment Card 1 */}
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-semibold text-gray-800">Diagnosis: Hypertension</h4>
                <span className="text-sm text-gray-500">March 15, 2023</span>
            </div>
            <div className="text-gray-700 space-y-2">
                <p><strong>Doctor:</strong> Dr. Emily Smith</p>
                <p><strong>Treatment:</strong> Lifestyle changes, blood pressure monitoring</p>
                <p><strong>Medications:</strong> Amlodipine, Lisinopril</p>
                <p><strong>Notes:</strong> Patient advised to reduce sodium intake and increase exercise.</p>
            </div>
        </div>

        {/* Treatment Card 2 */}
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-semibold text-gray-800">Diagnosis: Type 2 Diabetes</h4>
                <span className="text-sm text-gray-500">June 10, 2023</span>
            </div>
            <div className="text-gray-700 space-y-2">
                <p><strong>Doctor:</strong> Dr. Michael Johnson</p>
                <p><strong>Treatment:</strong> Diet modification, regular blood sugar checks</p>
                <p><strong>Medications:</strong> Metformin, Insulin</p>
                <p><strong>Notes:</strong> Suggested regular follow-ups every 3 months.</p>
            </div>
        </div>

        {/* Treatment Card 3 */}
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-semibold text-gray-800">Diagnosis: Annual Check-up</h4>
                <span className="text-sm text-gray-500">September 20, 2023</span>
            </div>
            <div className="text-gray-700 space-y-2">
                <p><strong>Doctor:</strong> Dr. Sarah Lee</p>
                <p><strong>Treatment:</strong> Routine examination, blood work</p>
                <p><strong>Medications:</strong> None</p>
                <p><strong>Notes:</strong> All results normal; patient advised to continue current health regimen.</p>
            </div>
        </div>
    </div>
</div>

    </>
  )
}

export default History