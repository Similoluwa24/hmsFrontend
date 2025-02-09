import React, { useContext, useState } from 'react'
import HospitalContext from '../context/HospitalContext'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBinLine } from "react-icons/ri";
import Modals from './Modals';
import { Link } from 'react-router-dom';
import { TbEye, TbTrashX } from 'react-icons/tb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoctorList() {
  const {doctors,editDoctorHandler,fetchUserAll,showHide} = useContext(HospitalContext)
  const [modal, setModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [search, setSearch] = useState('')

  const handleDeleteClick = (id)=>{
    setModal(true)
    setDeleteId(id)
    

  }
  const handleDelete = async()=>{
    const res = await fetch(`https://hmsbackend-4388.onrender.com/user/delete/${deleteId}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
             'Authorization': `Bearer ${localStorage.getItem("user")}`
        },
        credentials:'include'
    })
    const data = await res.json()
    if (!res.ok) {
        console.log(data);
        
    } else {
        setModal(false)
        showHide('success', 'Doctor Deleted')
        await fetchUserAll()      
    }
  }

  
  return (
    <div>
            <div className="my-4 flex gap-3 justify-between b0tt0n">
                <input type="search" id="default-search" onChange={(e)=>{setSearch(e.target.value)}} className="block w-[75%] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By Firstname..." required />
                <Link to='/admin/createdoc' className='bg-blue-600 hover:bg-blue-700 transition duration-200 p-2 text-xs font-semibold text-white rounded-lg'>Add New Doctor + </Link>
           </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  ">
      <table className="w-full min-w-[65rem] text-sm text-left text-gray-600 border-separate border-spacing-0">
          <thead className="bg-blue-600 text-white text-xs uppercase">
            <tr>
              {['ID', 'Full Name', 'Gender', 'Email', 'Department', 'Actions'].map((header, index) => (
                <th key={index} className={`px-6 py-3 ${index % 2 === 0 ? 'bg-blue-700' : ''}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
                <tbody>
                      {doctors.filter((item)=>{
                        return search.toLowerCase() === ""
                        ? item
                        : item.first_name.toLowerCase().includes(search)
                      }).map((item, index) => (

                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
                          <td className="px-6 py-4 font-medium text-gray-800 bg-blue-100">
                                {item.uniqueId}
                            </td>
                            <td className="px-6 py-4">
                                 {`${item.first_name} ${item.last_name}`}
                            </td>
                            <td className="px-6 py-4 capitalize">
                                 <span className={`px-2 py-1 rounded-md ${item.gender === 'female'? 'bg-pink-200 text-pink-700':'bg-blue-200 text-blue-700'}`}>{item.gender}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-800 bg-blue-100">
                                {item.email}
                            </td>
                            <td className="px-6 py-4">
                                {item.department} {item.departments}
                            </td>
                            <td className="px-6 py-4 flex space-x-2 items-center justify-center bg-blue-100"> 
                            <Link to={`/admin/details/doctor/${item._id}`}  className="text-blue-600 hover:text-blue-800 transition">
                              <TbEye />
                            </Link>                       
                                <Link to={`/admin/editdoc/${item._id}`} className="text-blue-600 hover:text-blue-800 transition" onClick={()=>{editDoctorHandler({item})}}><span><CiEdit className='inline'/></span></Link> 
                                <span  className="text-red-600 hover:text-red-800 transition"><RiDeleteBinLine onClick={()=>{handleDeleteClick(item._id)}} className='inline'/></span>
                            </td>
                        </tr>            
              ))}
                </tbody>
            </table>
          {modal &&
            <Modals>
                    <div className="max-w-[30rem] py-4 space-y-2 m-auto">
                        <div className="flex justify-end">
                            <button onClick={()=>{setModal(false)}} className='text-end'>X</button>
                        </div>
                        <div className="flex justify-center">
                        <TbTrashX className='size-16 p-3 bg-red-600 rounded-full text-white flex '/>
                        </div>
                        <div className="m-auto space-y-3 capitalize text-gray-600 text-center">
                            <p className=''>are you sure you want to delete ?</p>
                            <p className='capitalize'>Are you sure you want to deactivate your account? All of your data will be permanently removed.
                            This action cannot be undone.</p>
                        </div>
                        <div className="flex justify-center gap-4 footer">
                            <button onClick={()=>{setModal(false)}} className='bg-gray-200 py-3 px-5   rounded-md '>Cancel</button>
                            <button onClick={handleDelete} className='bg-red-600 py-3 px-5  rounded-md'>Delete</button>
                        </div>
                    </div>
            </Modals>
          }
         
      </div>
      <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={'colored'}
              />
    </div>
  )
}

export default DoctorList