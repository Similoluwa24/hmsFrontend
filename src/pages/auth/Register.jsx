import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import  HospitalContext  from '../../context/HospitalContext';
import Modals from "../../shared/Modals"
import otp from '../../assets/otpp.png'

function Register() {
  const [state, dispatch] = useContext(AuthContext);
  const { isAuthenticated, fetchUser } = useContext(HospitalContext);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(''); // Updated to a single input for OTP
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null); // Added state for user data

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();

    // Ensure password and confirm password match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('https://hmsbackend-4388.onrender.com/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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
        console.log({ message: data }); // Log error message from the response
      } else {
        console.log(data); // Log the data only when the request succeeds
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({ type: 'LOGIN', payload: data });
        setOpen(true);
        setUserData(data);
        console.log(isAuthenticated);
      }
    } catch (error) {
      console.log({ message: error.message });
    }
    await fetchUser();
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP entered matches the one in the database
    if (otp === userData?.user?.verificationToken) {
      if (userData.user.role === "admin") {
        navigate('/admin/home');
      } else if (userData.user.role === "doctor") {
        navigate('/doctor/home');
      } else {
        navigate('/user/home');
      }
      await fetchUser();
    } else {
      alert('Incorrect verification code. Please try again!');
    }
    setOpen(false);
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
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
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

      {open && (
        <Modals>
          <div className="bg-white space-y-4 my-8 w-full h-full">
            <div className="flex flex-col items-center">
              <img src={otp} alt="" className="w-[150px] h-[150px]" />
              <div className="txt">
                <p id="helper-text-explanation" className="mt-2 text-lg font-semibold text-gray-500 dark:text-gray-400">
                  Please introduce the code we sent to your email.
                </p>
                <p className="text-[#007cff] mt-2 text-lg font-semibold underline">
                  {userData?.user?.email || 'No email available'}
                </p>
              </div>
            </div>
            <div className="flex justify-center input">
              <form onSubmit={handleOtpSubmit} className="max-w-sm mx-auto">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 6-digit code"
                  required
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please do not refresh this page.</p>
                <button
                  type="submit"
                  className="text-[#007cff] hover:text-white border bg-white w-full mt-5 border-[#007cff] hover:bg-[#007cff] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-5 mb-2"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </Modals>
      )}
    </>
  );
}

export default Register;
