import React, { useContext, useEffect, useState } from 'react';
import { FaUserDoctor } from 'react-icons/fa6';
import { CiCalendar, CiUser, CiWallet } from 'react-icons/ci';

import HospitalContext from '../../context/HospitalContext';
import admin from '../../assets/morning-img-01.png';

function AdminHome() {
  const { doctors, user, appointment, patient, alluser } = useContext(HospitalContext);
  const [app, setApp] = useState([])
  const [pay, setPay] = useState(null)
  const [earn, setEarn] = useState(null)
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
  
      try {
        const [appointmentRes, paymentRes,earningRes, userRes] = await Promise.all([
          fetch('https://hmsbackend-4388.onrender.com/appointment/latest', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }),
          fetch('https://hmsbackend-4388.onrender.com/payment/pay', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }),
          fetch('https://hmsbackend-4388.onrender.com/payment/total-payments', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }),
          fetch('https://hmsbackend-4388.onrender.com/user/latest', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }),
        ]);
  
        const appointmentData = await appointmentRes.json();
        const paymentData = await paymentRes.json();
        const earnData = await earningRes.json()
        const userData = await userRes.json()
  
        // Check for response success
        if (!appointmentRes.ok) {
          console.error('Failed to fetch appointment:', appointmentData);
        } else {
          setApp(appointmentData);
          
        }
  
        if (!paymentRes.ok) {
          console.error('Failed to fetch payment:', paymentData);
        } else {
          setPay(paymentData);
        }
        if (!earningRes.ok) {
          console.error('Failed to fetch payment:', earnData);
        } else {
          setEarn(earnData.totalAmount);
        }
        if (!earningRes.ok) {
          console.error('Failed to fetch payment:', earnData);
        } else {
          setUsers(userData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success or error
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <>
      <div className="bg-[#F0F8FF] space-y-5">
        {/* Greeting Section */}
        <div className="lg:px-12 lg:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-md p-6 shadow-md">
            <div className="text">
              <h2 className="font-bold text-gray-700 text-3xl font-[poppins]">
                Good day, <span className="text-[#007cff]">{user?.first_name} {user?.last_name}</span>
              </h2>
              <p className="text-gray-400 font-[poppins]">Have a nice day at work!</p>
            </div>
            <div className="img mt-4 md:mt-0">
              <img src={admin} alt="Admin" className="w-[150px] h-[150px] md:w-[170px] md:h-[170px]" />
            </div>
          </div>
        </div>

        {/* Overview Cards Section */}
        <div className="lg:px-24 lg:py-6 flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center">
          <div className="flex flex-col rounded-md justify-center items-center text-center h-[100px] w-[200px] bg-white border-t-4 border-[#007cff] shadow-md cursor-pointer hover:shadow-lg duration-300">
            <CiUser className="text-3xl text-[#007cff]" />
            <p className="text-[1em] font-semibold">Patients</p>
            <p className="text-[0.8em] text-gray-500">{`${patient?.length} Users`}</p>
          </div>

          <div className="flex flex-col rounded-md justify-center items-center text-center h-[100px] w-[200px] bg-white border-t-4 border-[#007cff] shadow-md cursor-pointer hover:shadow-lg duration-300">
            <FaUserDoctor className="text-3xl text-[#007cff]" />
            <p className="text-[1em] font-semibold">Doctors</p>
            <p className="text-[0.8em] text-gray-500">{`${doctors?.length} Doctors`}</p>
          </div>

          <div className="flex flex-col rounded-md justify-center items-center text-center h-[100px] w-[200px] bg-white border-t-4 border-[#007cff] shadow-md cursor-pointer hover:shadow-lg duration-300">
            <CiCalendar className="text-3xl text-[#007cff]" />
            <p className="text-[1em] font-semibold">Appointments</p>
            <p className="text-[0.8em] text-gray-500">{`${appointment?.length} Appointments`}</p>
          </div>

          <div className="flex flex-col rounded-md justify-center items-center text-center h-[100px] w-[200px] bg-white border-t-4 border-[#007cff] shadow-md cursor-pointer hover:shadow-lg duration-300">
            <CiWallet className="text-3xl text-[#007cff]" />
            <p className="text-[1em] font-semibold">Earnings</p>
            <p className="text-[0.8em] text-gray-500">{`NGN ${earn}`}</p>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="lg:px-24 lg:py-6">
          <div className="bg-white rounded-md p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activities</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <div className="text-sm text-gray-600">New User registration: <span className="font-semibold text-gray-800">{loading ? (<p>Loading...</p>):(`${users.first_name} ${users.last_name}`)}</span></div>
                <span className="text-xs text-gray-500">{loading ? (<p>Loading...</p>):(new Date (users.createdAt).toLocaleString())}</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="text-sm text-gray-600"> <span className="font-semibold text-gray-800">{loading ? (<p>Loading...</p>):(`${pay.userId.first_name} ${pay.userId.last_name}`)}</span> made a new payment</div>
                <span className="text-xs text-gray-500">{loading ? (<p>Loading...</p>):(new Date (pay.paymentDate).toLocaleString())}</span> 
              </li>
              <li className="flex justify-between  items-center">
                <div className="text-sm text-gray-600">Appointment booked by <span className="font-semibold text-gray-800">{loading ? (<p>Loading...</p>):(`${app.user.first_name} ${app.user.last_name}`)}</span></div>
                
              </li>
            </ul>
          </div>
        </div>

        {/* Insights Section */}
        <div className="lg:px-24 lg:py-6">
          <div className="bg-white rounded-md p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Admin Insights</h3>
            <p className="text-sm text-gray-600">Monitor and manage hospital operations efficiently with real-time insights and updates. Stay informed about patient flow, appointment schedules, and earnings.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
