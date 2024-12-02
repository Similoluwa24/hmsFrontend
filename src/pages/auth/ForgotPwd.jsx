import React, { useState } from 'react'
import pwd from '../../assets/pwd.png'
import { useNavigate } from 'react-router-dom'

function ForgotPwd() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const res = await fetch('https://hmsbackend-4388.onrender.com/user/forgotpwd',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify({email})
        })
        const data = res.json()
        console.log(data);
        if(res.ok){
            navigate(`/auth/redirect`)
        }
        
    }
  return (
    <div className='w-[100%] h-[100vh]  bg-white '>
        <div className=" space-y-3 flex flex-col items-center">
            <div className="forgot ">
                <img src={pwd} alt="" className='w-[150px] h-[150px] ' />
            </div>
            <div className="txt">
                <h1 className='font-bold text-gray-600 text-lg'>Forgot Password?</h1>
                <p className='text-gray-500 capitalize'>no worries we'll send you the reset instructions.</p>
            </div>
            <form action="" onSubmit={handleSubmit} className="w-[20rem] space-y-3">
               <div className="">
                  <label htmlFor="email" className="block mb-1 text-sm font-medium">Email address</label>
                  <input type="email" onChange={(e)=>{setEmail(e.target.value)}} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
               </div>
               <button type="submit" className='w-full bg-[#007cff] p-2 rounded-md text-white'>Reset Password</button>
            </form>
        </div>
    </div>
  )
}

export default ForgotPwd