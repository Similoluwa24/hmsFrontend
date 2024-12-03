import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
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
    <div className="relative banner bg-gradient-to-r from-[#0075FF] to-[#00c1ff] p-12">
      <div className="mx-auto text-center text-[#0075FF]">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">Restoring Health, Renewing Hope</h1>
        <p className="text-lg lg:text-xl font-semibold mb-6">
          We are committed to helping our patients regain their health and well-being, while providing emotional support and encouragement.
        </p>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-8 text-white p-8 rounded-lg bg-opacity-50 bg-black">
        <div className="text-center">
          <CountUp start={0} end={10} duration={2} suffix="+" className="text-4xl font-bold" />
          <p className="text-sm capitalize mt-2">Years of Experience</p>
        </div>
        <div className="text-center">
          <CountUp start={0} end={500} suffix="+" duration={2} className="text-4xl font-bold" />
          <p className="text-sm capitalize mt-2">Satisfied Patients</p>
        </div>
        <div className="text-center">
          <CountUp start={0} end={85} suffix="%" duration={2} className="text-4xl font-bold" />
          <p className="text-sm capitalize mt-2">Client Satisfaction</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
