import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HospitalContext from '../../context/HospitalContext';

function AppointmentDetails() {
  const { appointmentbyDoctor,showHide, getAppointmentbyDoctor} = useContext(HospitalContext);
  const params = useParams();
  const showApp = params.id;
  const [status, setStatus] = useState('');
  const navigate = useNavigate()
  
  // Find the appointment with the matching ID
  const appoint = appointmentbyDoctor.find((item) => item._id === showApp);

  if (!appoint) {
    return <div>Appointment not found.</div>;
  }

  const id = appoint._id;
  
  
  const handleEdit = async (newStatus) => {
    setStatus(newStatus);
    const res = await fetch(`https://hmsbackend-4388.onrender.com/appointment/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem("user")}`
      },
      credentials: 'include',
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Error:', data.errMessage);
      showHide('error',data.errMessage);
    } else {
      showHide('success','Appointment Updated');
      await getAppointmentbyDoctor()
      navigate('/doctor/appointment')
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 shadow-md rounded-lg max-w-4xl mx-auto mt-8">
      <div className="flex gap-2 justify-between">
        <h2 className="lg:text-2xl font-semibold text-[#007cff] mb-4">Appointment Details</h2>
        <p className='capitalize text-gray-400'><strong>Appointment Booked By:</strong> {appoint.user.first_name} {appoint.user.last_name}</p>
      </div>
      <div className="space-y-3">
        <p className='capitalize'><strong>Patient Name:</strong> {appoint.first_name} {appoint.last_name}</p>
        <p><strong>Date:</strong> {appoint.date}</p>
        <p><strong>Time:</strong> {appoint.time}</p>
        <p><strong>Status:</strong> {appoint.status}</p>
      </div>

      <div className="mt-6 flex justify-around">
        <button 
          onClick={() => handleEdit('confirmed')}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
          Confirm
        </button>
        <button 
          onClick={() => handleEdit('cancelled')}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AppointmentDetails;
