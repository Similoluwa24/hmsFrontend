import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HospitalContext from '../../context/HospitalContext';

function Diagnosis() {
    const {user,showHide} = useContext(HospitalContext)
    const [diagnosis, setDiagnosis] = useState('')
    const [doctor, setDoctor] = useState('')
    const [symptoms, setSymptoms] = useState('')
    const [patient, setPatient] = useState('')
    const [notes, setNotes] = useState('')
    const [userId, setUserId] = useState('')
    const navigate = useNavigate()

    const addDiagnosis = async(e)=>{
        e.preventDefault()
        const res = await fetch('https://hmsbackend-4388.onrender.com/diagnosis/add',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({userId,diagnosis,doctor,symptoms,patient,notes})
        })
        const data = await res.json()
        if (!res.ok) {
            console.log(data);
            showHide('error',data.errMessage)
        } else {
            showHide('success','Diagnosis Added!')
            navigate('/doctor/home')
        }
    }
    
    
  return (
    <>
        <div className="bg-gray-50 shadow-lg rounded-2xl p-8 max-w-4xl m-auto my-10 space-y-8">
    <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-900">New Diagnosis Form</h2>
        <Link 
            to={'/user/patient-history'} 
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 transition duration-300"
        >
            Back to History
        </Link>
    </div>

    <form onSubmit={addDiagnosis} className="bg-white rounded-lg p-6 shadow-md space-y-6">

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

                  {/* Patient Relationship Field */}
         <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Relationship</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter relationship (e.g., daughter, son) If Applicable"
              onChange={(e) => setPatient({ ...patient, relationship: e.target.value })}
            />
          </div>
        {/* Diagnosis Field */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Diagnosis</label>
            <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter diagnosis"
                onChange={(e)=>{setDiagnosis(e.target.value)}}
            />
        </div>

        {/* Doctor Field */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Doctor</label>
            <input 
                type="text"
                value={`Dr. ${user?.first_name}  ${user?.last_name}`}
                disabled
                className="w-full border border-gray-300 capitalize rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter doctor's name"
                onChange={(e)=>{setDoctor(e.target.value)}}
            />
        </div>

        {/* Treatment Plan Field */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Symptoms</label>
            <textarea 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="3"
                placeholder="Describe the Symptoms"
                onChange={(e)=>{setSymptoms(e.target.value)}}
            ></textarea>
        </div>

        {/* Medications Field */}
       {/* <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Medications</label>
            <input 
                type="text" 
                onChange={(e)=>{setMedication(e.target.value)}}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="List medications (comma-separated)"
            />
        </div> */}

        {/* Notes Field */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
            <textarea 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="4"
                placeholder="Additional notes or observations"
                onChange={(e)=>{setNotes(e.target.value)}}
            ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right">
            <button 
                type="submit" 
                className="bg-gradient-to-r from-teal-500 to-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-teal-600 hover:to-green-700 transition duration-300"
            >
                Submit Diagnosis
            </button>
        </div>
    </form>
</div>

    </>
  )
}

export default Diagnosis