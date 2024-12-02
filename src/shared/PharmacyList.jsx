import React, { useContext, useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBinLine } from "react-icons/ri";
import Modals from './Modals'
import { TbTrashX } from 'react-icons/tb';
import { FaXmark } from "react-icons/fa6";
import HospitalContext from '../context/HospitalContext';
import { useNavigate, useParams } from 'react-router-dom';

function PharmacyList() {
    const { pharmacy,showHide,getallPharmacy, editPharmacy, editPharmacyHandler} = useContext(HospitalContext)
    const [openDelete, setOpenDelete] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [cName, setCname] = useState('')
    const [pDate, setPdate] = useState('')
    const [price, setPrice] = useState('')
    const [eDate, setEdate] = useState('')
    const [stock, setStock] = useState('')
    const [deleteId, setDeleteId] =  useState(null)
    const [deleteItem, setDeleteItem] = useState(null);
    const [editId, setEditId] =  useState(null)
    const token = editPharmacy.items._id

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const res = await fetch('https://hmsbackend-4388.onrender.com/pharmacy/add',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({
                name,
                category,
                cName,
                pDate,
                price,
                eDate,
                stock
            })
        })
        const data = await res.json()
        if (!res.ok) {
            console.log(data);            
        } else {
            setOpenAdd(false)
            showHide('success','medication added successfully')
            await getallPharmacy()
        }
    }
    const handleDeleteClick  = (id,item) =>{
        setDeleteItem(item)
        setDeleteId(id)
        setOpenDelete(true)
    } 

    const handleDelete = async()=> {
        const res = await fetch(`https://hmsbackend-4388.onrender.com/pharmacy/delete/${deleteId}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({deleteId})
        })
        const data = await res.json()
        if (!res.ok) {
            console.log(data);
            
        } else {
            setOpenDelete(false)
             showHide('success','deleted!')
             await getallPharmacy()
        }
    }

    const handleEditClick  = (item) =>{
        editPharmacyHandler(item)
        setOpenEdit(true)
    } 

    
   useEffect(()=>{
    if (editPharmacy.edit === true) {
        setName(editPharmacy.items.name)
        setCategory(editPharmacy.items.category)
        setCname(editPharmacy.items.cName)
        setPrice(editPharmacy.items.price)
        setPdate(editPharmacy.items.pDate)
        setEdate(editPharmacy.items.eDate)
        setStock(editPharmacy.items.stock)
    }
   },[editPharmacy])
   
   const editSubmitHandler = async(e)=>{
       e.preventDefault()
       try {
           const res = await fetch(`https://hmsbackend-4388.onrender.com/pharmacy/edit/${token}`,{
               method:'PUT',
               headers:{
                   'Content-type':'application/json'
               },
               credentials:'include',
               body:JSON.stringify({
                    name,
                   category,
                   cName,
                   price,
                   pDate,
                   eDate,
                   stock
               })
           })
           const data = await res.json()
           if (!res.ok) {
               console.log(data);    
               showHide('error',data.errMessage)   
           } else {
               setOpenEdit(false)
              showHide('success','updated successfully');
              await getallPharmacy()
                  
           }
       } catch (error) {
        console.log({message:error.message});
        
       }
   }
  return (
    <>
        <div className="space-y-4 m-4">
            <div className="flex justify-end">
                <button onClick={()=>{setOpenAdd(true)}}  className='bg-[#007cff] lg:p-2 text-[12px] font-[poppins] text-white rounded-lg'>Add Medications +</button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full min-w-[65rem] text-sm text-left text-gray-600 border-separate border-spacing-0">
                    <thead className="bg-blue-600 text-white text-xs uppercase">
                        <tr>
                        {['Medicine Name', 'Category', 'Company Name', 'Purchase Date', ' Price','Expiry Date','Stock', 'Actions'].map((header, index) => (
                            <th key={index} className={`px-6 py-3 ${index % 2 === 0 ? 'bg-blue-700' : ''}`}>
                            {header}
                            </th>
                        ))}
                        </tr>
                    </thead>
                      
                        <tbody>
                            {pharmacy.map((item,index)=>(

                             <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
                                <td className="px-6 py-4 font-medium text-gray-800 bg-blue-100">{item?.name} </td>
                                <td className="px-6 py-4">{item?.category}</td>
                                <td className="px-6 py-4">{item?.cName}</td>
                                <td className="px-6 py-4 text-gray-800 bg-blue-100">{item?.pDate}</td>
                                <td className="px-6 py-4">{item?.price}</td>
                                <td className="px-6 py-4">{item?.eDate}</td>
                                <td className="px-6 py-4">{item?.stock}</td>
                                <td className="px-6 py-4 flex space-x-2 items-center justify-center bg-blue-100">
                                       <span className="text-blue-600 hover:text-blue-800 transition" onClick={()=>{handleEditClick(item)}}><CiEdit/></span>
                                        <span className="text-red-600 hover:text-red-800 transition" onClick={()=>{handleDeleteClick(item._id,item)}}><RiDeleteBinLine/></span>
                                </td>
                            </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* modal for delete */}
            {openDelete &&
                <Modals>
                    <div className="max-w-[30rem] py-4 space-y-2 m-auto">
                        <div className="flex justify-end">
                            <FaXmark onClick={()=>{setOpenDelete(false)}}/>
                        </div>
                        <div className="flex justify-center">
                        <TbTrashX className='size-16 p-3 bg-red-600 rounded-full text-white flex '/>
                        </div>
                        <div className="m-auto space-y-3 capitalize text-gray-600 text-center">
                            <p className=''>are you sure you want to delete ?</p>
                            <ul className='space-x-3'>
                                <li>Name:{deleteItem.name}</li>
                                <li>Company: {deleteItem.cName}</li>
                                <li>Expiry Date:{deleteItem.eDate}</li>
                                <li>stock: {deleteItem.stock}</li>                           
                            </ul>
                        </div>
                        <div className="flex justify-center gap-4 footer">
                            <button onClick={()=>{setOpenDelete(false)}} className='bg-gray-200 py-3 px-5   rounded-md '>Cancel</button>
                            <button  onClick={handleDelete} className='bg-red-600 py-3 px-5  rounded-md'>Delete</button>
                        </div>
                    </div>
                </Modals>
            }
            {/* modal for delete */}
            {/* modal for adding */}
                {openAdd &&
                    <Modals>
                    <div className="max-w-[30rem] py-4 space-y-2 m-auto">
                        <div className="flex justify-end ">
                            <FaXmark onClick={()=>{setOpenAdd(false)}}/>
                        </div>
                        <form action="" className='space-y-3' onSubmit={handleSubmit}>
                            <div className="flex gap-3">
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Medicine Name</label>
                                    <input type="text" name="" id="" onChange={(e)=>{setName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Category</label>
                                    <input type="text" name="" id="" onChange={(e)=>{setCategory(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Company Name</label>
                                    <input type="text" name="" id="" onChange={(e)=>{setCname(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Purchase Date</label>
                                    <input type="date" name="" id="" onChange={(e)=>{setPdate(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Price</label>
                                    <input type="text" name="" id="" onChange={(e)=>{setPrice(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Expiry Date</label>
                                    <input type="date" name="" id="" onChange={(e)=>{setEdate(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>
                            </div>
                            <div className="flex  gap-3">
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Quantity In Stock</label>
                                    <input type="text" name="" id="" onChange={(e)=>{setStock(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                            
                            </div>
                            <div className="flex justify-start gap-5 m-auto">
                                <button type="" onClick={()=>{setOpenAdd(false)}} className="text-white hover:text-white border bg-gray-400 w-[200px]   font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Cancel</button>      
                                <button type="submit" className="text-white hover:text-white border bg-[#007cff] w-[200px] border-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Create Medications</button>
                            </div>
                        </form>
                    </div>
                    </Modals>
                }
            {/* modal for adding */}


              {/* modal for editing */}
              {openEdit && 
                    <Modals>
                    <div className="max-w-[30rem] py-4 space-y-2 m-auto">
                        <div className="flex justify-end ">
                            <FaXmark onClick={()=>{setOpenEdit(false)}}/>
                        </div>
                        <form  className='space-y-3' onSubmit={editSubmitHandler} action="" >
                            <div className="flex gap-3">
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Medicine Name</label>
                                    <input type="text" name="" value={name} id="" onChange={(e)=>{setName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Category</label>
                                    <input type="text" name="" value={category} id="" onChange={(e)=>{setCategory(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Company Name</label>
                                    <input type="text" name="" id="" value={cName} onChange={(e)=>{setCname(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Purchase Date</label>
                                    <input type="date" name="" id="" value={pDate} onChange={(e)=>{setPdate(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Price</label>
                                    <input type="text" name="" id="" value={price} onChange={(e)=>{setPrice(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Expiry Date</label>
                                    <input type="date" name="" id="" value={eDate} onChange={(e)=>{setEdate(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                            </div>
                            </div>
                            <div className="flex  gap-3">
                                <div className="w-[48%] ">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium">Quantity In Stock</label>
                                    <input type="text" name="" id="" value={stock} onChange={(e)=>{setStock(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                            
                            </div>
                            <div className="flex justify-start gap-5 m-auto">
                                <button type=""  className="text-white hover:text-white border bg-gray-400 w-[200px]   font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Cancel</button>      
                                <button type="submit" className="text-white hover:text-white border bg-[#007cff] w-[200px] border-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Update Medications</button>
                            </div>
                        </form>
                    </div>
                    </Modals>
              }
                
            {/* modal for editing */}

            
    </>
  )
}

export default PharmacyList