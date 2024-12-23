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
  const [loading, setLoading] = useState(false)
  

  // if(isAuthenticated) {
  //     return <Navigate to="/" />
  // }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      // Make the login request
      const response = await fetch('https://hmsbackend-4388.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      // Handle unsuccessful response
      if (!response.ok) {
        console.error({ message: result });
        showHide('error', result.errMessage || 'Login failed'); // Display error notification
        return;
      }
  
      // Handle successful response
      const { user, token } = result;
  
      // Check if the user is verified
      if (result.user.verified === 'false') {
        showHide('error', 'Please verify your account before logging in.');
        navigate('/auth/otp'); // Redirect to verification page
        return;
      }
      localStorage.setItem('user', token);
      dispatch({ type: 'LOGIN', payload: result });
      showHide('success', `Welcome ${user.last_name}`);
      // Redirect user based on their role
      const roleRedirects = {
        admin: '/admin/home',
        doctor: '/doctor/home',
        patient: '/user/home',
      };
      navigate(roleRedirects[user.role]);
      await fetchUser();
    } catch (error) {
      console.error('Login Error:', error.message);
      showHide('error', 'An unexpected error occurred. Please try again later.');
    }finally{
      setLoading(false)
    }
  };
  
  
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
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-medium transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}>
              {loading ? 'Logging In' : 'Log In'}
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