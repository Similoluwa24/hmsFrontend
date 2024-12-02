import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HospitalContext from '../../context/HospitalContext'

function DrPrescription() {
    const {user, showHide} = useContext(HospitalContext)
    const [patient, setPatient] = useState('')
    const [dop, setDop] = useState('')
    const [ailment, setAilment] = useState('')
    const [medication, setMedication] = useState('')
    const [dosage, setDosage] = useState('')
    const [notes, setNotes] = useState('')
    const [doctor, setDoctor] = useState('')
    const [userId, setUserId] = useState('')
    const navigate = useNavigate()

      // Get today's date in the format 'YYYY-MM-DD'
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };
    const addPrescription = async (e) => {
        e.preventDefault()
        const res = await fetch('https://hmsbackend-4388.onrender.com/prescription/add',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                 'Authorization': `Bearer ${localStorage.getItem("user")}`
            },
            credentials:'include',
            body:JSON.stringify({patient,dop,ailment,medication,dosage,notes,userId,doctor})
        })
        const data = await res.json()
        if (!res.ok) {
            console.log(data);
            showHide('error', data.errMessage)           
        } else {
          showHide('success','Prescription Added!') 
          navigate('/doctor/home') 
        }
    }
  return (
    <>
      <div className="bg-gray-50 shadow-lg rounded-2xl p-8 max-w-4xl m-auto my-10 space-y-8">
    <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Prescription Form</h2>
        <Link 
            to={'/doctor/prescription/list'} 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
        >
            Back to Prescriptions
        </Link>
    </div>

    <form onSubmit={addPrescription} className="bg-white rounded-lg p-6 shadow-md space-y-6">
        {/* Patient ID Field */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Patient ID</label>
            <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter patient ID"
                onChange={(e)=>{setUserId(e.target.value)}}
            />
        </div>
      
        
         {/* Patient Name Field */}
         <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter patient name"
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
            />
          </div>

          {/* Patient Age Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Age</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter patient age"
              onChange={(e) => setPatient({ ...patient, age: e.target.value })}
            />
          </div>




          {/* Date of Prescription Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Prescription</label>
            <input
              type="date"
              min={getTodayDate()}
              onChange={(e) => setDop(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Ailment Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Ailment</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter ailment or condition"
              onChange={(e) => setAilment(e.target.value)}
            />
          </div>

      

        {/* Medications Field */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Medications</label>
            <textarea 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                onChange={(e)=>{setMedication(e.target.value)}}
                placeholder="Enter prescribed medications and details (e.g., Paracetamol 500mg - 1 tablet twice a day)"
            ></textarea>
        </div>

        {/* Dosage and Instructions Field */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Dosage & Instructions</label>
            <textarea 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                onChange={(e)=>{setDosage(e.target.value)}}
                placeholder="Provide specific dosage and any special instructions"
            ></textarea>
        </div>

        {/* Additional Notes Field */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Notes</label>
            <textarea 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Add any additional notes or warnings"
                onChange={(e)=>{setNotes(e.target.value)}}
            ></textarea>
        </div>

        {/* Doctors Name Field */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Doctor Name</label>
            <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter doctor name"
                disabled
                value={`Dr. ${user.first_name} ${user.last_name}`}
                onChange={(e)=>{setDoctor(e.target.value)}}
            />
        </div>

        {/* Submit Button */}
        <div className="text-right">
            <button 
                type="submit" 
                className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-700 transition duration-300"
            >
                Submit Prescription
            </button>
        </div>
    </form>
</div>

    </>
  )
}

export default DrPrescription