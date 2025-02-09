import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HospitalContext from '../../context/HospitalContext';

function Diagnosis() {
  const { user, showHide } = useContext(HospitalContext);
  const [uniqueId, setUniqueId] = useState('');
  const [patient, setPatient] = useState(null); // Stores fetched patient details
  const [appointment, setAppointment] = useState(null); // Stores fetched appointment details
  const [diagnosis, setDiagnosis] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  // Fetch patient and appointment details by card number
  const fetchPatientDetails = async () => {
    try {
      const res = await fetch(`https://hmsbackend-4388.onrender.com/user/details/${encodeURIComponent(uniqueId)}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user')}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setPatient(data.patient); 
        setAppointment(data.appointment); 
        showHide('success', 'Patient details fetched successfully!');
      } else {
        showHide('error', data.errMessage || 'Failed to fetch details.');
        console.log(data);
        
      }
    } catch (error) {
      console.error(error);
      showHide('error', 'An error occurred while fetching details.');
    }
  };
  

  const addDiagnosis = async (e) => {
    e.preventDefault();
    const payload = {
      userId: patient?._id, // Use fetched patient ID
      diagnosis,
      doctor: user?.id,
      symptoms,
      notes,
      patient: {
        name: patient?.name,
        age: patient?.age,
        relationship: patient?.relationship || "N/A"
      },
      appointmentId: appointment?._id // If there's an appointment, link it
    };

    try {
      const res = await fetch('https://hmsbackend-4388.onrender.com/diagnosis/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user')}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        showHide('success', 'Diagnosis added successfully!');
        navigate('/doctor/home');
      } else {
        console.error(data);
        showHide('error', data.errMessage || 'Failed to add diagnosis.');
      }
    } catch (error) {
      console.error(error);
      showHide('error', 'An error occurred while adding the diagnosis.');
    }
  };

  return (
    <div className="bg-gray-50 shadow-lg rounded-2xl p-8 max-w-4xl m-auto my-10 space-y-8">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-900">New Diagnosis Form</h2>
        <Link
          to={'/doctor/diagnosis/list'}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 transition duration-300"
        >
          Back to History
        </Link>
      </div>

      <form onSubmit={addDiagnosis} className="bg-white rounded-lg p-6 shadow-md space-y-6">
        {/* Card Number Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Card Number</label>
          <div className="flex">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter card number"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
            />
            <button
              type="button"
              onClick={fetchPatientDetails}
              className="ml-2 bg-gradient-to-r from-teal-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-teal-600 hover:to-green-700 transition duration-300"
            >
              Fetch Details
            </button>
          </div>
        </div>

        {patient && (
          <>
            {/* Auto-Filled Patient Details */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name</label>
              <input
                type="text"
                value={`${patient?.first_name} ${patient?.last_name}`}
                disabled
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-gray-100"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={patient?.age}
                disabled
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-gray-100"
              />
            </div> */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Relationship</label>
              <input
                type="text"
                value={patient?.relationship || "N/A"}
                disabled
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-gray-100"
              />
            </div>

            {appointment ? (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Appointment Details</label>
                        <textarea
                        value={`Date: ${appointment.date}\nReason: ${appointment.message}`}
                        disabled
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-gray-100"
                        rows="2"
                        ></textarea>
                    </div>
                    ) : (
                    <p className="text-sm text-red-500">No appointment found. Proceeding with emergency diagnosis.</p>
                    )}

          </>
        )}

        {/* Diagnosis Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Diagnosis</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>

        {/* Symptoms Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Symptoms</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="3"
            placeholder="Describe the symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>

        {/* Notes Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="4"
            placeholder="Additional notes or observations"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
  );
}

export default Diagnosis;
