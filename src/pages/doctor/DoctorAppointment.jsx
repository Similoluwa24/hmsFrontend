import React, { useContext, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HospitalContext from '../../context/HospitalContext';

function DoctorAppointment() {
  const{user, showHide,appointmentbyDoctor} = useContext(HospitalContext)
  const [appointment, setAppointment] = useState(null)


  return (
    <div className="overflow-x-auto w-full mt-6">
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <thead className="bg-[#007cff] text-white">
        <tr>
          <th className="px-4 py-2 text-left font-medium">Patient Name</th>
          <th className="px-4 py-2 text-left font-medium">Date</th>
          <th className="px-4 py-2 text-left font-medium">Time</th>
          <th className="px-4 py-2 text-left font-medium">Status</th>
          <th className="px-4 py-2 text-center font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
      {appointmentbyDoctor && appointmentbyDoctor.length > 0 ? (
  appointmentbyDoctor.map((appointment, index) => (
    <tr key={index} className="hover:bg-gray-50 border-b">
      <td className="px-4 py-3 text-gray-800">
        {appointment.user.first_name} {appointment.user.last_name}
      </td>
      <td className="px-4 py-3 text-gray-800">{appointment.date}</td>
      <td className="px-4 py-3 text-gray-800">{appointment.time}</td>
      <td className={`px-4 py-3 font-semibold ${appointment.status === 'confirmed' ? 'text-green-600': appointment.status === 'pending'? 'text-yellow-600':'text-red-600'}`}>
        {appointment.status}
      </td>
      <td className="px-4 py-3 text-center">
        <button className="text-[#007cff] hover:text-blue-700">
          <Link to={`/doctor/details/${appointment._id}`}>
            <FaEye className="inline-block text-xl" />
          </Link>
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5" className="px-4 py-3 text-center text-gray-600">
      No appointments found.
    </td>
  </tr>
)}

      </tbody>
    </table>
  </div>
  
  );
}

export default DoctorAppointment;
