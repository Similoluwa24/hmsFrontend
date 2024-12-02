import React, { useContext, useState } from 'react';
import HospitalContext from '../context/HospitalContext';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBinLine } from "react-icons/ri";
import Modals from './Modals';
import { Link } from 'react-router-dom';
import { TbEye, TbTrashX } from 'react-icons/tb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PatientList() {
  const { patient, showHide, editPatientHandler } = useContext(HospitalContext);
  const [deleteId, setDeleteId] = useState(null);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');

  const handleDeleteClick = (id) => {
    setModal(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    const res = await fetch(`https://hmsbackend-4388.onrender.com/user/delete/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem("user")}`
      },
      credentials: 'include'
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
    } else {
      setModal(false);
      showHide('success', 'Patient deleted!');
      return patient;
    }
  };

  return (
    <div>
      <div className="my-4 flex gap-3 justify-between">
        <input 
          type="search" 
          id="default-search" 
          onChange={(e) => { setSearch(e.target.value) }} 
          className="block w-[75%] p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
          placeholder="Search by First Name..." 
          required 
        />
        <Link to='/admin/createpa' className='bg-blue-600 hover:bg-blue-700 transition duration-200 p-2 text-xs font-semibold text-white rounded-lg'>
          Add New Patient +
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full min-w-[65rem] text-sm text-left text-gray-600 border-separate border-spacing-0">
          <thead className="bg-blue-600 text-white text-xs uppercase">
            <tr>
              {['ID', 'Full Name', 'Gender', 'Email', 'NHIS No.', 'Actions'].map((header, index) => (
                <th key={index} className={`px-6 py-3 ${index % 2 === 0 ? 'bg-blue-700' : ''}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {patient.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.first_name.toLowerCase().includes(search) || item.last_name.toLowerCase().includes(search);
            }).map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
                <td className="px-6 py-4 font-medium text-gray-800 bg-blue-100">
                  {item._id}
                </td>
                <td className="px-6 py-4 capitalize">
                  {`${item.first_name} ${item.last_name}`}
                </td>
                <td className="px-6 py-4 capitalize">
                  <span className={`px-2 py-1 rounded-md ${item.gender === 'female'? 'bg-pink-200 text-pink-700':'bg-blue-200 text-blue-700'}`}>{item.gender}</span>
                </td>
                <td className="px-6 py-4 bg-blue-100 text-gray-800">
                  {item.email}
                </td>
                <td className="px-6 py-4">
                  {item.NHIS || 'N/A'}
                </td>
                <td className="px-6 py-4 flex space-x-2 items-center justify-center bg-blue-100">
                  <Link to={`/admin/details/${item._id}`}  className="text-blue-600 hover:text-blue-800 transition">
                    <TbEye />
                  </Link>
                  <Link to={`/admin/editpa/${item._id}`} onClick={() => { editPatientHandler({ item }) }} className="text-blue-600 hover:text-blue-800 transition">
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
            <div className="max-w-[30rem] py-6 px-6 space-y-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-end">
                <button onClick={() => { setModal(false) }} className="text-gray-500 hover:text-gray-800">
                  X
                </button>
              </div>
              <div className="flex justify-center">
                <TbTrashX className='size-16 p-3 bg-red-600 rounded-full text-white' />
              </div>
              <div className="text-center text-gray-700">
                <p className="text-lg font-semibold">Are you sure you want to delete?</p>
                <p className="mt-2">This action cannot be undone and will permanently remove all data associated with this patient.</p>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={() => { setModal(false) }} className="bg-gray-200 py-2 px-6 rounded-md hover:bg-gray-300 transition">
                  Cancel
                </button>
                <button onClick={handleDelete} className="bg-red-600 py-2 px-6 text-white rounded-md hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </div>
          </Modals>
        )}
      </div>
    </div>
  );
}

export default PatientList;
