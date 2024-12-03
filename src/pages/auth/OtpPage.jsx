import React, { useContext, useRef, useState } from 'react';
import otp from '../../assets/otpp.png';

import HospitalContext from '../../context/HospitalContext';
import { useNavigate } from 'react-router-dom';

function OtpPage() {
  const {showHide} = useContext(HospitalContext)
    const [verificationToken, setVerificationToken] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const email = localStorage.getItem('email')
  console.log(email);
  
    const handleVerification = async (e) => {
      e.preventDefault();
  
      if (!verificationToken) {
        alert('Please enter the verification token');
        return;
      }
  
      setLoading(true);
  
      try {
        const res = await fetch('https://hmsbackend-4388.onrender.com/user/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, token:verificationToken }),
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          showHide('error',data.message || 'Invalid verification token.');
        } else {
          showHide('success','Verification successful! Redirecting to login...');
          navigate('/auth/login');
          localStorage.removeItem('email')
        }
      } catch (error) {
        console.error('Verification error:', error.message);
        showHide('error','An error occurred during verification. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <img src={otp} alt="" className='w-[150px] h-[150px]' />
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Verify Your Account</h1>
      <form onSubmit={handleVerification} className="space-y-6">
        <div>
          <label htmlFor="verificationToken" className="block mb-2 text-sm font-medium text-gray-700">
            Verification Token
          </label>
          <input
            type="text"
            id="verificationToken"
            value={verificationToken}
            onChange={(e) => setVerificationToken(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
            placeholder="Enter your verification token"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default OtpPage;
