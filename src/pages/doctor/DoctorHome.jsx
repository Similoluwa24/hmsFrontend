import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiUser , FiClipboard, FiCalendar, FiUserCheck, FiFolder } from 'react-icons/fi';
import doc from '../../assets/doc.png';
import HospitalContext from '../../context/HospitalContext';

function DoctorHome() {
  const { user } = useContext(HospitalContext);
  console.log(user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-5 md:p-10">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white shadow-md p-5 rounded-lg">
        <div className="text-center md:text-left">
          {user ? (
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 capitalize">
              Welcome, Dr. {user?.first_name} {user?.last_name}
            </h1>
          ) : (
            <p>Loading user data...</p>
          )}
          <p className='text-gray-400 font-[poppins]'>Have an amazing day today!</p>
        </div>
        <img src={doc} alt="Doctor" className='w-full md:w-[250px] h-auto md:h-[200px] mt-5 md:mt-0' />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Patient Management */}
        <Link to="/patients" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Patient Management</h2>
            <FiUser  className="text-3xl md:text-4xl text-blue-500" />
          </div>
          <p className="text-gray-600">View, manage, and update patient records easily.</p>
        </Link>

        {/* Appointments */}
        <Link to="/doctor/appointment" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Appointments</h2>
            <FiCalendar className="text-3xl md:text-4xl text-green-500" />
          </div>
          <p className="text-gray-600">Manage your schedule and upcoming appointments.</p>
        </Link>

        {/* Prescriptions */}
        <Link to="/doctor/prescription/list" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Prescriptions</h2>
            <FiClipboard className="text-3xl md:text-4xl text-red-500" />
          </div>
          <p className="text-gray-600">Create and manage patient prescriptions efficiently.</p>
        </Link>

        {/* Patient Requests */}
        <Link to="/requests" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Patient Requests</h2>
            <FiUser Check className="text-3xl md:text-4xl text-purple-500" />
          </div>
          <p className="text-gray-600">Review and respond to patient consultation requests.</p>
        </Link>

        {/* Reports */}
        <Link to="/reports" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Reports</h2>
            <FiFolder className="text-3xl md:text-4xl text-yellow-500" />
          </div>
          <p className="text-gray-600">Access detailed reports and patient analytics.</p>
        </Link>
      </div>
    </div>
  );
};

export default DoctorHome;