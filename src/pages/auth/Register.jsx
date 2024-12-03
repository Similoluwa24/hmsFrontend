import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import  HospitalContext  from '../../context/HospitalContext';
import Modals from "../../shared/Modals"
import otp from '../../assets/otpp.png'

function Register() {
  const [state, dispatch] = useContext(AuthContext);
  const { showHide } = useContext(HospitalContext);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
  
    // Ensure password and confirm password match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      // Send user details to the signup endpoint
      const res = await fetch('https://hmsbackend-4388.onrender.com/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          gender,
          dob,
          phone,
          password,
          confirmPassword,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error(data); 
        showHide('error',data.message); 
      } else {
        localStorage.setItem('email', email)
        showHide('success','Verification code sent to your email. Please check your inbox.');
        navigate('/auth/otp');
        
      }
    } catch (error) {
      console.error('Signup error:', error.message);
      showHide('error','An error occurred during signup. Please try again later.');
    }finally{
      setLoading(false) 
    }
  };
  

  return (
    <>
      <div className="flex items-center justify-center min-h-screen container">
        <div className="bg-white shadow-lg rounded-xl px-8 py-4 w-full max-w-2xl">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-8 font-[lora]">Create Your Account</h1>

          <form onSubmit={signupHandler} className="space-y-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-[48%]">
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400"
                placeholder="Input Firstname"
                required
              />
            </div>
            <div className="w-[48%]">
              <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400"
                placeholder="Input Lastname"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between">
            <div className="w-[48%]">
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-700">Select Gender</label>
              <select
                id="gender"
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400"
                required
              >
                <option defaultValue="n/a">Choose Your Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="w-[48%]">
              <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between">
            <div className="w-[48%]">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400"
                placeholder="Input Phone Number"
                pattern="[0-9]{11}"
                required
              />
            </div>
            <div className="w-[48%]">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400"
                placeholder="john.doe@company.com"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between">
            <div className="w-[48%]">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400"
                placeholder="Input Password"
                required
              />
            </div>
            <div className="w-[48%]">
              <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400"
                placeholder="Repeat Password"
                required
              />
            </div>
          </div>

          <div className="text-center">
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          </div>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Already have an account? <Link to="/auth/login" className="text-blue-600 hover:underline">Login here</Link>
            </p>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}

export default Register;
