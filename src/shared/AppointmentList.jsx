import React, { useContext, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBinLine } from "react-icons/ri";
import HospitalContext from '../context/HospitalContext';
import { Link } from 'react-router-dom';
import Modals from './Modals';
import { TbTrashX } from 'react-icons/tb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppointmentList() {
  const {appointment,editAppointmentHandler, getallApointment, showHide} = useContext(HospitalContext)
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState(null)
 
  
  const handleDeleteClick = (id) => {
    setModal(true)
    setAppointmentIdToDelete(id)
  }

  const handleDelete = async() => {
    const res = await fetch(`https://hmsbackend-4388.onrender.com/appointment/delete/${appointmentIdToDelete}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
      },
      credentials:"include",
      body:JSON.stringify({appointmentIdToDelete})
    })
    const data = await res.json()
    if (!res.ok) {
      console.log(data);
      if (data.errMessage === "Appointment not Found") {
        showHide('error','Appointment Not Found')
      }
    } else {
      setModal(false)
        showHide('success','Appointment Deleted')
        await getallApointment()
    }
  }

  
  return (

    <>
           <div className="my-4 flex gap-3 justify-between">
  <input 
    type="search" 
    id="default-search" 
    onChange={(e) => { setSearch(e.target.value) }} 
    className="block w-[75%] p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
    placeholder="Search by First Name..." 
    required 
  />
  <Link to="/admin/createapp" className="bg-blue-600 hover:bg-blue-700 transition duration-200 p-2 text-xs md:text-sm font-semibold text-white rounded-lg">
    Add New Appointment +
  </Link>
</div>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full min-w-[60rem] text-sm text-left text-gray-600 border-separate border-spacing-0">
    <thead className="bg-blue-600 text-white uppercase text-xs">
      <tr>
        {[ "Full Name", "Email", "Doctor", "Appointment Date", "Appointment Time", "Appointment Status", "Actions"].map((header, index) => (
          <th key={index} className={`px-6 py-3 ${index % 2 === 0 ? 'bg-blue-700' : ''}`}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="bg-white">
      {appointment.filter((item) => {
        return search.toLowerCase() === "" ? item : item.first_name.toLowerCase().includes(search);
      }).map((item, index) => (
        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
          {/* <td className="px-6 py-4 font-medium text-gray-800 bg-blue-100">
            {item._id}
          </td> */}
          <td className="px-6 py-4 capitalize">
            {`${item.first_name} ${item.last_name}`}
          </td>
          <td className="px-6 py-4">
            {item.email}
          </td>
          <td className="px-6 py-4 font-medium text-gray-700">
                    {item.doctor ? `Dr. ${item.doctor.first_name} ${item.doctor.last_name}` : 'N/A'}
          </td>
          <td className="px-6 py-4">
            {item.date}
          </td>
          <td className="px-6 py-4">
            {item.time}
          </td>
          <td className="px-6 py-4">
            <span className={`px-2 py-1 rounded-md ${item.status === 'pending' ? 'bg-yellow-200 text-yellow-700' :item.status === "cancelled"?'bg-red-300 text-red-700' : 'bg-green-200 text-green-700'}`}>
              {item.status}
            </span>
          </td>
          <td className="px-6 py-4 flex space-x-2 items-center justify-center bg-blue-100">
            <Link to={`/admin/editapp/${item._id}`} onClick={() => { editAppointmentHandler({ item }) }} className="text-blue-600 hover:text-blue-800 transition">
              <CiEdit />
            </Link>
            <button onClick={() => handleDeleteClick(item._id)} className="text-red-600 hover:text-red-800 transition">
              <RiDeleteBinLine />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {modal && (
    <Modals>
      <div className="max-w-[30rem] py-4 space-y-4 m-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button onClick={() => { setModal(false) }} className="text-gray-500 hover:text-gray-800">
            X
          </button>
        </div>
        <div className="flex justify-center">
          <TbTrashX className="size-16 p-3 bg-red-600 rounded-full text-white" />
        </div>
        <div className="text-center text-gray-600">
          <p>Are you sure you want to delete this appointment?</p>
          <p>This action cannot be undone.</p>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => { setModal(false) }} className="bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 transition">
            Cancel
          </button>
          <button onClick={handleDelete} className="bg-red-600 py-2 px-4 text-white rounded-md hover:bg-red-700 transition">
            Delete
          </button>
        </div>
      </div>
    </Modals>
  )}
</div>

    </>
  )
}

export default AppointmentList;