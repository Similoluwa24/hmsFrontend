import React, { useContext } from 'react';
import { CiDroplet } from "react-icons/ci";
import { BsHeartPulse, BsThermometer } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { GiDna1 } from "react-icons/gi";
import doc from '../../assets/welcome.png';
import bp from '../../assets/blood-pressure.png';
import hr from '../../assets/heart-rate.png';
import geno from '../../assets/geno.png';
import thermo from '../../assets/thermo.jpg';
import HospitalContext from '../../context/HospitalContext';
import Appointment from './Appointment';

function Home() {
  const { user, isAuthenticated } = useContext(HospitalContext);

  return (
    <div className="bg-[whitesmoke] p-4 sm:space-y-4">
      {/* Welcome Section */}
      <div className="py-7">
        <div className="w-full max-w-6xl mx-auto border-t-2 border-[#007cff] rounded-md p-3 flex flex-col lg:flex-row items-center bg-white gap-4">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src={doc} className="max-h-[200px]" alt="Welcome" />
          </div>
          <div className="w-full lg:w-1/2 space-y-2">
            <h2 className="text-gray-500 text-sm lg:text-lg font-[poppins]">
              Welcome Back
            </h2>
            <h1 className="text-[#007cff] text-lg lg:text-2xl font-[poppins]">
              {`${user?.first_name} ${user?.last_name}!`}
            </h1>
            <p className="text-gray-500 text-xs lg:text-sm font-[poppins]">
              We would like to take this opportunity to welcome you to our practice and to thank you for choosing our physicians to participate in your healthcare. We look forward to providing you with personalized, comprehensive health care focusing on wellness and prevention.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="lg:px-24 lg:py-6 flex flex-wrap gap-4 justify-center">
        {/* Blood Type Card */}
        <div className="flex flex-col justify-center items-center rounded-md text-center h-[150px] w-[200px] text-gray-500 border-t-2 border-[#007cff] bg-white cursor-pointer transition-transform hover:scale-105">
          <img src={bp} className="h-12" alt="Blood Type" />
          <p className="text-sm font-semibold">Blood Type</p>
          <p className="text-lg font-bold text-[#007cff] font-[poppins] tracking-wide">{user?.btype ?? ''}</p>
        </div>

        {/* Blood Pressure Card */}
        <div className="flex flex-col justify-center items-center rounded-md text-center h-[150px] w-[200px] text-gray-500 border-t-2 border-[#007cff] bg-white cursor-pointer transition-transform hover:scale-105">
          <img src={hr} className="h-12" alt="Blood Pressure" />
          <p className="text-sm font-semibold">Blood Pressure</p>
          <p className="text-lg font-bold text-[#007cff] font-[poppins] tracking-wide">{`110/90`}</p>
        </div>

        {/* Temperature Card */}
        <div className="flex flex-col justify-center items-center rounded-md text-center h-[150px] w-[200px] text-gray-500 border-t-2 border-[#007cff] bg-white cursor-pointer transition-transform hover:scale-105">
          <img src={thermo} className="w-16 h-16" alt="Temperature" />
          <p className="text-sm font-semibold">Temperature</p>
          <p className="text-lg font-bold text-[#007cff] font-[poppins] tracking-wide">{`36°C`}</p>
        </div>

        {/* Genotype Card */}
        <div className="flex flex-col justify-center items-center rounded-md text-center h-[150px] w-[200px] text-gray-500 border-t-2 border-[#007cff] bg-white cursor-pointer transition-transform hover:scale-105">
          <img src={geno} className="h-12" alt="Genotype" />
          <p className="text-sm font-semibold">Genotype</p>
          <p className="text-lg font-bold text-[#007cff] font-[poppins] tracking-wide">{user?.genotype ?? ''}</p>
        </div>
      </div>

      {/* Appointments and Prescriptions Section */}
      <div className="flex flex-col lg:flex-row gap-4 mx-auto max-w-6xl">
        {/* Appointments */}
        <div className="w-full lg:w-2/3 h-auto rounded-md bg-white shadow-sm">
          <p className="p-4 text-center text-gray-500 font-semibold font-[poppins] tracking-wide">
            Appointments
          </p>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <Appointment />
          </div>
        </div>

        {/* Prescriptions */}
        <div className="w-full lg:w-1/3 h-auto rounded-md bg-white shadow-sm">
          <p className="p-4 text-center text-gray-500 font-semibold font-[poppins] tracking-wide">
            My Prescriptions
          </p>
          <table className="table-auto divide-y text-sm text-left w-full rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4">Medication Name</th>
                <th scope="col" className="px-6 py-4">Dosage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4">Chloroquine</td>
                <td className="px-6 py-4">1-1-1 daily</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
