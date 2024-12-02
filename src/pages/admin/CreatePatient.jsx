import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HospitalContext from '../../context/HospitalContext'

function CreatePatient() {
  const {fetchUserAll, showHide} =  useContext(HospitalContext)
  const navigate = useNavigate()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('') 
  const [email, setEmail] = useState()
  const [address, setAddress] = useState('')
  const [NHIS, setnhis] = useState("")
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const nvigate = useNavigate()

  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
      const res = await fetch('https://hmsbackend-4388.onrender.com/user/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
           'Authorization': `Bearer ${localStorage.getItem("user")}`
        },
        body:JSON.stringify({first_name,last_name,gender, dob,phone, email, address, NHIS,password,confirmPassword})
      })
      const data = await res.json()
      if (res.ok) {
        showHide("success","Submitted");
        await fetchUserAll()
        navigate('/admin/allapp')
      }else{
        console.log(data.message);
        
      }
    } catch (error) {
      
    }
    // const newPatient =
    // addPatient(newPatient)
    navigate("/admin/allpa")
  }
  return (
    <div className='my-8 mx-5'>
      <p className='font-[poppins] text-lg text-gray-600 '><Link to="/admin/allpa" > {`Patient's List >> `} </Link>Create Patient</p>
      <div className=" lg:mx-5 lg:min-w-[60rem] mt-4 form w-full">
            <form action="" onSubmit={submitHandler} className='space-y-8'>

                <div className="lg:flex justify-between mx-4 className">
                      <div className='lg:w-[48%] '>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium">First name</label>
                        <input type="text" id="first_name" onChange={(e)=>{setFirstName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Firstname" required />
                      </div>
                      <div className='lg:w-[48%] '>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium">Last name</label>
                        <input type="text" id="last_name" onChange={(e)=>{setLastName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Lastname" required />
                    </div>
                </div>

                <div className="lg:flex justify-between mx-4">
                  <div className="lg:w-[48%] gender">
                     <label htmlFor="gender" className="block mb-2 text-sm font-medium">Select Gender</label>
                    <select id="gender" onChange={(e)=>{setGender(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option defaultValue={"n/a"}>Choose Your Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>                      
                  </div>

                  <div className="lg:w-[48%] date">
                    <label htmlFor="" className="block mb-2 text-sm font-medium">Date of Birth</label>
                    <input type="date" name="date" id="dob" onChange={(e)=>{setDob(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                </div>

                <div className="lg:flex justify-between mx-4">
                    <div className='lg:w-[48%] phone'>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone number</label>
                        <input type="tel" id="phone" onChange={(e)=>{setPhone(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Phone Number" pattern="[0-9]{11}" required />
                    </div>
                    <div className="lg:w-[48%]">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Email address</label>
                        <input type="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                    </div>
                </div>

                <div className="lg:flex justify-between mx-4">
                    <div className='lg:w-[48%] phone'>
                        <label htmlFor="adress" className="block mb-2 text-sm font-medium">Contact Address</label>
                        <input type="text" id="adress" onChange={(e)=>{setAddress(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Phone Number"  required />
                    </div>
                    <div className="lg:w-[48%]">
                        <label htmlFor="nhis" className="block mb-2 text-sm font-medium">NHIS No.</label>
                        <input type="text" id="nhis" onChange={(e)=>{setnhis(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input NHIS Number"  />
                    </div>
                </div>

                <div className="lg:flex justify-between mx-4">
                    <div className="lg:w-[48%]">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium ">Password</label>
                        <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Password" required />
                    </div> 
                    <div className="lg:w-[48%]">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium">Confirm password</label>
                        <input type="password" id="confirm_password" onChange={(e)=>{setConfirmPassword(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Repeat Password" required />
                    </div> 
                </div>

                <div className="flex justify-start mx-4 m-auto">
                <button type="submit" className="text-white hover:text-white border bg-[#007cff] w-[200px] border-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Create Profile</button>
                <button type="reset" className="text-white hover:text-white border bg-amber-400 w-[200px]   font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Reset</button>      
                </div>
            </form>
          </div>
    </div>
  )
}

export default CreatePatient