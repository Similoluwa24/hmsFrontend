import React, { useState } from 'react'
import reset from '../../assets/reset.png'
import { PiPassword, PiPasswordDuotone } from 'react-icons/pi'
import { GiPassport } from 'react-icons/gi'
import { useNavigate, useParams } from 'react-router-dom'

function ResetPwd() {
  const {token} = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }
  
      const res = await fetch(`http://localhost:5000/user/resetPwd/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ password, confirmPassword }),
      });
      const data = await res.json();
       if (!res.ok) {
      // throw new Error(`HTTP error! Status: ${res.status}, ${data}`);
      console.log(data);
      
    }
    console.log(data);
    navigate('/auth/login')  
    } catch (error) {
      console.error("Error in submitHandler:", error);
    }
  }
  
  return (
    <div className='w-[100%] h-[100vh]  bg-white '>
      <div className=" space-y-3 flex flex-col items-center">
        <div className="mt-7 border border-gray-300 p-3 rounded ">
         <PiPasswordDuotone className='size-12'/>
        </div>
        <div className="txt">
                <h1 className='font-bold text-gray-600 text-lg'>Set New Password</h1>
                <p className='text-gray-500 capitalize'>must be atleast 8 characters.</p>
            </div>
            <form action="" onSubmit={submitHandler} className="w-[20rem] space-y-3">
               <div className="">
                  <label htmlFor="password" className="block mb-1 text-sm font-medium">New Password</label>
                  <input type="password" onChange={(e)=>{setPassword(e.target.value)}} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-gray-500" placeholder="• • • • • • • • " required />
               </div>
               <div className="">
                  <label htmlFor="cpassword" className="block mb-1 text-sm font-medium">Confirm Password</label>
                  <input type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}} id="cpassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-gray-500" placeholder="• • • • • • • • " required />
               </div>
               <button type="submit" className='w-full bg-[#007cff] p-2 rounded-md text-white'>Reset Password</button>
            </form>
      </div>
    </div>
  )
}

export default ResetPwd