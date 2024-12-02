import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { GiEclipseFlare } from 'react-icons/gi'
import HospitalContext from '../../context/HospitalContext'
import Cookies from 'js-cookie';


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, dispatch] = useContext(AuthContext)
  const {isAuthenticated, showHide,fetchUser} = useContext(HospitalContext)
  const navigate = useNavigate()

  // if(isAuthenticated) {
  //     return <Navigate to="/" />
  // }

  const submitHandler = async(e)=>{
    e.preventDefault()
    try{
      const res = await fetch('https://hmsbackend-4388.onrender.com/user/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        credentials: 'include',
        body:JSON.stringify({
          email,
          password
        })
      })
      const data = await res.json()

      if (!res.ok) {
        console.log({ message: data });
        showHide('error',data.errMessage) // Log error message from the response
      } else {
        console.log(data); 
        showHide('success',`Welcome ${data.user.last_name}`)// Log the data only when the request succeeds
        localStorage.setItem('user', data.token);
        dispatch({ type: 'LOGIN', payload: data });
        Cookies.set('token', data.token, { expires: 1, path: '/' });
      
        // if(isAuthenticated){
          if( data.user.role === "admin") {
            navigate('/admin/home')
          }else if(data.user.role === "doctor") {
            navigate('/doctor/home')
          }else
          navigate('/user/home')
        }


        await fetchUser()  
  } catch (error) {
    console.log({ message: error.message });
  }
  }
  return (
    <>
       
    <div className="flex items-center justify-center min-h-screen  container">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8 font-[lora]">Enter My Patient Portal</h1>

        <form onSubmit={submitHandler} className='space-y-6'>
          <div className="">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              id="email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400" 
              placeholder="john.doe@company.com" 
              required 
            />
          </div>

          <div className="">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
              id="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400" 
              placeholder="Input Password" 
              required 
            />
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition">
              Log In
            </button>
          </div>

          <div className="mt-4 flex justify-between text-sm">
            <p className="text-gray-600">
              New Here? <Link to="/auth/register" className="text-blue-600 hover:underline">Join Us</Link>
            </p>
            <p className='text-gray-600'>
              Forgot Password? <Link to="/auth/forgot" className='text-blue-600 hover:underline'>Click Here!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
 

    </>
  )
}

export default Login