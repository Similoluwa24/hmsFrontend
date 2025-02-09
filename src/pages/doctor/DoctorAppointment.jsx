import React, { useContext, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HospitalContext from '../../context/HospitalContext';

function DoctorAppointment() {
  const{user, showHide,appointmentbyDoctor} = useContext(HospitalContext)
  const [appointment, setAppointment] = useState(null)
  const [search, setSearch] = useState('')


  return (
    <div className="overflow-x-auto w-full mt-6">
       <div className="p-3">
            <input 
            type="search" 
            id="default-search" 
            onChange={(e) => { setSearch(e.target.value) }} 
            className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
            placeholder="Search by Patient Name..." 
            required 
          />
        </div>
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <thead className="bg-[#007cff] text-white">
        <tr>
          <th className="px-4 py-2 text-left font-medium">Patient Id</th>
          <th className="px-4 py-2 text-left font-medium">Patient Name</th>
          <th className="px-4 py-2 text-left font-medium">Date</th>
          <th className="px-4 py-2 text-left font-medium">Time</th>
          <th className="px-4 py-2 text-left font-medium">Status</th>
          <th className="px-4 py-2 text-center font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
      {appointmentbyDoctor && appointmentbyDoctor.length > 0 ? (
  appointmentbyDoctor.filter((item)=>{
    return search.toLowerCase() === "" ? item : item.user.first_name.toLowerCase().includes(search) || item.user.last_name.toLowerCase().includes(search)
  }).map((appointment, index) => (
    <tr key={index} className="hover:bg-gray-50 border-b">
      <td className="px-4 py-3 text-gray-800 "><Link className='hover:underline hover:cursor-pointer' to={`/doctor/detailsdoc/${appointment.user._id}`}>{appointment.user.uniqueId}</Link></td>
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
