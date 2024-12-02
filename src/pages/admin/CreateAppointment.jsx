import React, { useContext, useState } from 'react'
import HospitalContext from '../../context/HospitalContext'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateAppointment() {
  const {doctors, showHide, getallApointment} =  useContext(HospitalContext)
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [doctor, setDoctor] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')


  const submitHandler = async(e) =>{
    // const redirect = useNavigate()
      e.preventDefault()
      const res = await fetch('https://hmsbackend-4388.onrender.com/appointment/add',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
           'Authorization': `Bearer ${localStorage.getItem("user")}`
        },
        credentials:"include",
        body:JSON.stringify({
          first_name,
          last_name,
          email, 
          doctor,
          date,
          time,
          message
        })
      })
      const data = await res.json()       
      if (!res.ok) {
        console.log(data);
        
      } else {
         showHide('success','Appointment Created')
         await getallApointment()
        }
        navigate('/admin/allapp', { replace: true })       
      
  }
  return (
    <div className='my-8 overflow-hidden mx-5'>

      <div className="lg:mx-5 lg:min-w-[60rem] my-4 form w-full">
      <p className='font-[poppins] text-lg text-gray-600 my-3 '><Link to="/admin/allapp" > {`Appointment List >> `} </Link>Create Appointment</p>
      <form action="" onSubmit={submitHandler} className='space-y-4 text-[#007cff] overflow-x-scroll capitalize  '>
        <div className="lg:flex justify-between mx-4">
          <div className="w-[48%]">
              <label htmlFor="first_name" className="block mb-1 text-sm font-medium">your first name *</label>
              <input type="text" id="first_name" onChange={(e)=>{setFirstName(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
          </div>
          <div className="w-[48%]">
              <label htmlFor="last_name" className="block mb-1 text-sm font-medium">your last name *</label>
              <input type="text" id="last_name" onChange={(e)=>{setLastName(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
          </div>
        </div>
          <div className="mx-4">
              <label htmlFor="email" className="block mb-1 text-sm font-medium">your email *</label>
              <input type="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}  className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
          </div>
          <div className="mx-4">

            <label htmlFor="doctor" className="block mb-1 text-sm font-medium">select your doctor *</label>
              <select name="doctors" id="" onChange={(e)=>{setDoctor(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required>
                <option value="n/a">Choose Doctor</option>
                {doctors.map((item, index) =>(
              <option value={item.first_name} key={index} className='divide-y-4'  >{`Dr. ${item.last_name} ${item.first_name}`}</option>
            ))}
            </select>
          </div>
          <div className="flex mx-4 gap-4 ">
              <div className="w-1/2">
                  <label htmlFor="date" className="block mb-1 text-sm font-medium">select appointment date *</label>
                  <input type="date" id="date" onChange={(e)=>{setDate(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
              </div>
              <div className="w-1/2">
                  <label htmlFor="time" className="block mb-1 text-sm font-medium">select appointment time *</label>
                  <input type="time" id="time" onChange={(e)=>{setTime(e.target.value)}} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
              </div>
          </div>
          <div className="mx-4">
              <label htmlFor="message" className="block mb-1 text-sm font-medium">your message *</label>
              <textarea type="text" id="subject" onChange={(e)=>{setMessage(e.target.value)}} rows="8" className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
          </div>
          <div className="flex justify-center bott0n">
              <button type="submit" className='bg-[#007cff] text-[white] px-5 py-3 rounded-xl '>Create Appointment</button>
          </div>
        </form>
      </div>
           
    </div>
  )
}

export default CreateAppointment