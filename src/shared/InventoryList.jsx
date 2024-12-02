import React, { useContext, useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBinLine } from 'react-icons/ri'
import Modals from './Modals'
import { FaXmark } from 'react-icons/fa6'
import HospitalContext from '../context/HospitalContext'
import { TbTrashX } from 'react-icons/tb'

function InventoryList() {
    const {inventory, showHide, deleteInventory, editInventory, editInventoryHandler,getInventory, updateInventoryHandler} = useContext(HospitalContext)
    const [openAdd, setOpenAdd] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [pDate, setPdate] = useState('')
    const [price, setPrice] = useState('')
    const [details, setDetails] = useState('')
    const [deleteId, setDeleteId] =  useState(null)
    const [deleteItems, setDeleteItems] =  useState(null)
    const id = editInventory.items._id

    const submitHandler = async(e)=>{
        e.preventDefault()
        const res = await fetch('https://hmsbackend-4388.onrender.com/inventory/add',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({
                name,
                category,
                quantity,
                pDate,
                price,
                details
            })
        })
        const data = await res.json()
        if (!res.ok) {
            console.log(data);
            showHide('error',data.errMessage)            
        } else {
            showHide('success','Inventory Added!')
            await getInventory()
            setOpenAdd(false)
        }
    }
    const handleDeleteClick = (id,item)=>{
        setDeleteId(id)
        setDeleteItems(item)
        setOpenDelete(true)
    }
    const handleDelete =async()=>{
        const res = await fetch(`https://hmsbackend-4388.onrender.com/inventory/delete/${deleteId}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
        })
        const data = await res.json()
        if (!res.ok) {
            console.log(data);
            showHide('error',data.errMessage)
        } else {
            setOpenDelete(false)
            await getInventory()
            showHide('success','Inventory Deleted')
        }
    }
    const handleEditClick = (item)=>{
        editInventoryHandler(item)
        setOpenEdit(true)
    }

    useEffect(()=>{
        if (editInventory.edit === true) {
            setName(editInventory.items.name)
            setCategory(editInventory.items.category)
            setPdate(editInventory.items.pDate)
            setPrice(editInventory.items.price)
            setQuantity(editInventory.items.quantity)
            setDetails(editInventory.items.details)
        }
    },[editInventory])
    const editHandler = async(e)=>{
        e.preventDefault()
        const res = await fetch(`https://hmsbackend-4388.onrender.com/inventory/edit/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({
                name,
                category,
                quantity,
                pDate,
                price,
                details
            })
        })
        const data = await res.json()
        if (!res.ok) {
            console.log(data);
            showHide('error',data.errMessage)           
        } else {
            setOpenEdit(false)
            await getInventory()
            showHide('success','Inventory Updated Successfully!')
        }
    }
  return (
    <>
         <div className="space-y-4 m-4">
            <div className="flex justify-between">
                 <input type="search" name="" id="" className="bg-gray-50 w-[80%] border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                <button onClick={()=>{setOpenAdd(true)}} className='bg-[#007cff] lg:p-2 text-[12px] font-[poppins] text-white rounded-lg'>Add Inventory +</button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full min-w-[65rem] text-sm text-left text-gray-600 border-separate border-spacing-0">
                    <thead className="bg-blue-600 text-white text-xs uppercase">
                        <tr>
                        {['Item Name', 'Category', 'Quantity', 'Purchase Date', ' Price','Details', 'Actions'].map((header, index) => (
                            <th key={index} className={`px-6 py-3 ${index % 2 === 0 ? 'bg-blue-700' : ''}`}>
                            {header}
                            </th>
                        ))}
                        </tr>
                    </thead>
               
                        <tbody>
                            {inventory.map((item, index)=>(
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
                                <td className="px-6 py-4 font-medium text-gray-800 bg-blue-100">{item.name}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">{item.quantity}</td>
                                <td className="px-6 py-4 text-gray-800 bg-blue-100">{item.pDate}</td>
                                <td className="px-6 py-4">{item.price}</td>
                                <td className="px-6 py-4">{item.details}</td>
                                <td className="px-6 py-4 flex space-x-2 items-center justify-center bg-blue-100">
                                       <span className="text-blue-600 hover:text-blue-800 transition" onClick={()=>{handleEditClick(item)}}><CiEdit/></span>
                                        <span className="text-red-600 hover:text-red-800 transition" onClick={()=>{handleDeleteClick(item._id,item)}}><RiDeleteBinLine/></span>
                                </td>
                            </tr>
                            ))}
                        </tbody>

                    </table>
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
                                <li>Name:{deleteItems.name}</li>
                                <li>Category: {deleteItems.category}</li>
                                <li>Purchase Date: {deleteItems.pDate}</li>
                                <li>Price: {deleteItems.price}</li>                           
                                <li>Details: {deleteItems.details}</li>                           
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
                {/* adding modal */}
                {openAdd &&
                <Modals>
                <div className="max-w-[30rem] py-4 space-y-2 m-auto">
                        <div className="flex justify-end ">                          
                            <FaXmark onClick={()=>setOpenAdd(false)} />
                        </div>
                    <form action="" onSubmit={submitHandler} className='space-y-3'>
                        <div className="flex gap-3">
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Item Name</label>
                                <input type="text" name="" id="" onChange={(e)=>{setName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Category</label>
                                <input type="text" name="" id="" onChange={(e)=>{setCategory(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Quantity</label>
                                <input type="number" name="" id="" onChange={(e)=>{setQuantity(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Purchase Date</label>
                                <input type="date" name="" id="" onChange={(e)=>{setPdate(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Price</label>
                                <input type="text" name="" id="" onChange={(e)=>{setPrice(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Details</label>
                                <input type="text" name="" id="" onChange={(e)=>{setDetails(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                        </div>
                        <div className="flex justify-start gap-5 m-auto">
                                <button type="" onClick={()=>{setOpenAdd(false)}} className="text-white hover:text-white border bg-gray-400 w-[200px]   font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Cancel</button>      
                                <button type="submit" className="text-white hover:text-white border bg-[#007cff] w-[200px] border-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Create Inventory</button>
                       </div>
                    </form>
                </div>
                </Modals>
                }
                {/* adding modals */}
                {/* edit modal */}
                {openEdit &&
                <Modals>
                <div className="max-w-[30rem] py-4 space-y-2 m-auto">
                        <div className="flex justify-end ">                          
                            <FaXmark onClick={()=>setOpenEdit(false)} />
                        </div>
                    <form action="" onSubmit={editHandler}  className='space-y-3'>
                        <div className="flex gap-3">
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Item Name</label>
                                <input type="text" name="" id="" value={name} onChange={(e)=>{setName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                            {console.log(editInventory)
                            }
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Category</label>
                                <input type="text" name="" value={category} id="" onChange={(e)=>{setCategory(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Quantity</label>
                                <input type="number" name="" value={quantity} id="" onChange={(e)=>{setQuantity(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Purchase Date</label>
                                <input type="date" name="" id="" value={pDate} onChange={(e)=>{setPdate(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Price</label>
                                <input type="text" name="" id="" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                            <div className="w-[48%] ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium">Details</label>
                                <input type="text" name="" id="" value={details} onChange={(e)=>{setDetails(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
                            </div>
                        </div>
                        <div className="flex justify-start gap-5 m-auto">
                                <button type="" onClick={()=>{setOpenEdit(false)}} className="text-white hover:text-white border bg-gray-400 w-[200px]   font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Cancel</button>      
                                <button type="submit" className="text-white hover:text-white border bg-[#007cff] w-[200px] border-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Create Inventory</button>
                       </div>
                    </form>
                </div>
                </Modals>
                }
                {/* edit modals */}
            </div>
    </>
  )
}

export default InventoryList