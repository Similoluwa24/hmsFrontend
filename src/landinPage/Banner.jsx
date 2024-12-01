import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import CountUp from 'react-countup'
import HospitalContext from '../context/HospitalContext';

function Banner() {
  const { isAuthenticated, user } = useContext(HospitalContext);
  const navigate = useNavigate();
  

  // Redirect based on user role
  if (user && isAuthenticated) {
    if (user.role === "admin") {
      navigate('/admin/home');
    } else if (user.role === "doctor") {
      navigate('/doctor/home');
    } else {
      navigate('/user/home');
    }
  }
  return (
    <div>
             <div className="relative  banner" id='top'>
            <div className="text-[#007cff] mx-10 pt-28 text-start capitalize banner-text">
            <p className='text-3xl  pt-10   lg:text-5xl font-bold  head'>Restoring Health, Renewing Hope</p>
            <p className='lg:text-lg text-[#007cff] text-start py-6 font-[poppins] font-semibold'>we are committed to helping our patients regain their health and well-being, while also 
              <br /> providing emotional support and encouragement.</p>
            </div>
            <div className="lg:ml-9 mt-2 button">
            <button className='bg-gradient-to-r from-[#0075FF] to-[#00c1ff] uppercase text-white p-3 rounded-full hover:bg-gradient-to-r hover:from-[#ffeeff] hover:to-white hover:text-[#0075ff]  duration-300 ini'><Link to="">Appointment Now</Link></button>
            </div>
            <div className="absolute bottom-0 right-0 space-x-4 rounded-lg flex p-5 lg:space-x-12 text-white  testi">
              <div className="text-1">
                <CountUp start={0} end={10} duration={2} suffix='+' className='text-center text-4xl font-bold  '/>
                <p className='text-[15px] capitalize ini'>years experience</p>
              </div>
              <div className="text-2">
                <p className='text-center text-4xl font-bold  '><CountUp start={0} end={500} suffix='+' duration={2}/></p>
                <p className='text-[15px] capitalize ini'>satisfied patient</p>
              </div>
              <div className="text-3">
                <p className='text-center text-4xl font-bold  '><CountUp start={0} end={85} suffix='%' duration={2}/></p>
                <p className='text-[15px] capitalize ini'>client satisfaction rating</p>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Banner