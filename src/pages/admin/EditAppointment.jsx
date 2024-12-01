import React, { useContext, useEffect, useState } from 'react'
import HospitalContext from '../../context/HospitalContext'
import { useNavigate, useParams } from 'react-router-dom'

function EditAppointment() {
    const {doctors,editAppointment,showHide, getallApointment}  = useContext(HospitalContext)
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [doctor, setDoctor] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        setFirstName(editAppointment.items.item.first_name)
        setLastName(editAppointment.items.item.last_name)
        setEmail(editAppointment.items.item.email)
        setDoctor(editAppointment.items.item.doctor)
        setDate(editAppointment.items.item.date)
        setTime(editAppointment.items.item.time)
        setMessage(editAppointment.items.item.message)
        setStatus(editAppointment.items.item.status)
    },[editAppointment]);
    
    
    const submitHandler = async(e)=>{
        e.preventDefault()
        const res = await fetch(`http://localhost:5000/appointment/edit/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({
                first_name,
                last_name,
                email, 
                doctor,
                date,
                time,
                status,
                message
            })
        })
        const data = await res.json()
        if (!res.ok) {
            console.log(data);
            
        } else {
            navigate('/admin/allapp')
             showHide('success','edited successfully')
            await getallApointment()
        }
    }
  return (
    <>
    <div className="lg:mx-5 lg:min-w-[60rem] my-4 form w-full">
        <form action="" onSubmit={submitHandler}  className='space-y-4 text-[#007cff] overflow-x-scroll capitalize  '>
            <div className="lg:flex justify-between mx-4">
            <div className="w-[48%]">
                <label htmlFor="first_name" className="block mb-1 text-sm font-medium">your first name *</label>
                <input type="text" id="first_name" value={first_name} onChange={(e)=>{setFirstName(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
                    {console.log({editAppointment})
                    }
            </div>
            <div className="w-[48%]">
                <label htmlFor="last_name" className="block mb-1 text-sm font-medium">your last name *</label>
                <input type="text" id="last_name" value={last_name} onChange={(e)=>{setLastName(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
            </div>
            </div>
            <div className="mx-4">
                <label htmlFor="email" className="block mb-1 text-sm font-medium">your email *</label>
                <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}  className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
            </div>
            <div className="mx-4">

                <label htmlFor="doctor"  className="block mb-1 text-sm font-medium">select your doctor *</label>
                <select name="doctors" value={doctor} id="" onChange={(e)=>{setDoctor(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required>
                    <option value="n/a">Choose Doctor</option>
                    {doctors.map((item, index) =>(
                <option value={item.first_name}  key={index} className='divide-y-4'  >{`Dr. ${item.last_name} ${item.first_name}`}</option>
                ))}
                </select>
            </div>
            <div className="flex flex-col lg:flex-row mx-4 gap-4 ">
                <div className="w-1/2">
                    <label htmlFor="date" className="block mb-1 text-sm font-medium">select appointment date *</label>
                    <input type="date" value={date} id="date" onChange={(e)=>{setDate(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
                </div>
                <div className="w-1/2">
                    <label htmlFor="time" className="block mb-1 text-sm font-medium">select appointment time *</label>
                    <input type="time" value={time} id="time" onChange={(e)=>{setTime(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
                </div>
                <div className="w-1/2">
                    <label htmlFor="status" className="block mb-1 text-sm font-medium">select appointment status *</label>
                    <select name="status" id="status" value={status} onChange={(e)=>{setStatus(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required>
                        <option value="">Confirm your appointment Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className="mx-4">
                <label htmlFor="message" className="block mb-1 text-sm font-medium">your message *</label>
                <textarea type="text" value={message} id="subject" onChange={(e)=>{setMessage(e.target.value)}} rows="8" className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
            </div>
            <div className="flex justify-start mx-4 m-auto">
                <button type="submit" class="text-white hover:text-white border bg-[#007cff] w-[200px] border-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Update Profile</button>
                <button type="reset" class="text-white hover:text-white border bg-amber-400 w-[200px]   font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Reset</button>
                
                </div>
             </form>
        </div>
    </>
  )
}

export default EditAppointment