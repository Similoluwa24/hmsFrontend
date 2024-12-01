import React, { useContext, useState } from 'react';
import { BsCreditCard, BsJournalBookmark } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { IoHomeOutline, IoReceiptOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdLocalHospital } from 'react-icons/md';
import { TbReportMedical } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useLogout from '../../hooks/useLogout';

function DoctorSidebar() {
  const [state, dispatch] = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Toggle state for mobile view
  const navigate = useNavigate();
  const logout = useLogout();

  const logoutHandler = async () => {
    logout();
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="fixed top-5 left-5 z-50 bg-[#007cff] text-white p-2 rounded-full lg:hidden"
      >
        <MdLocalHospital className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-56 bg-white text-[#007cff] border-r border-gray-200 shadow-lg transform transition-transform duration-300 z-40 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="py-5 px-4">
          {/* Logo */}
          <div className="mb-8 flex items-center justify-start space-x-2">
            <MdLocalHospital className="text-3xl lg:text-4xl p-2 bg-[#007cff] text-white rounded-full" />
            <p className="text-lg lg:text-xl font-bold text-[#007cff]">OJ Hospital</p>
          </div>

          {/* Menu Items */}
          <div className="space-y-6">
            <ul className="space-y-4">
              <li>
                <Link
                  to="home"
                  className="flex items-center space-x-4 p-3 rounded-xl bg-white hover:bg-[#e3f2fd] shadow-sm hover:shadow-md transition-all"
                >
                  <IoHomeOutline className="text-2xl text-[#007cff]" />
                  <span className="text-lg font-medium text-gray-700">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="appointment"
                  className="flex items-center space-x-4 p-3 rounded-xl bg-white hover:bg-[#e3f2fd] shadow-sm hover:shadow-md transition-all"
                >
                  <BsJournalBookmark className="text-2xl text-[#007cff]" />
                  <span className="text-lg font-medium text-gray-700">Appointments</span>
                </Link>
              </li>
              <li>
                <Link
                  to="prescription"
                  className="flex items-center space-x-4 p-3 rounded-xl bg-white hover:bg-[#e3f2fd] shadow-sm hover:shadow-md transition-all"
                >
                  <IoReceiptOutline className="text-2xl text-[#007cff]" />
                  <span className="text-lg font-medium text-gray-700">Prescriptions</span>
                </Link>
              </li>
              <li>
                <Link
                  to="diagnosis"
                  className="flex items-center space-x-4 p-3 rounded-xl bg-white hover:bg-[#e3f2fd] shadow-sm hover:shadow-md transition-all"
                >
                  <TbReportMedical className="text-2xl text-[#007cff]" />
                  <span className="text-lg font-medium text-gray-700">Diagnosis</span>
                </Link>
              </li>
              <li>
                <Link
                  to="billing"
                  className="flex items-center space-x-4 p-3 rounded-xl bg-white hover:bg-[#e3f2fd] shadow-sm hover:shadow-md transition-all"
                >
                  <BsCreditCard className="text-2xl text-[#007cff]" />
                  <span className="text-lg font-medium text-gray-700">Billings</span>
                </Link>
              </li>
              <li>
                <Link
                  to="payhistory"
                  className="flex items-center space-x-4 p-3 rounded-xl bg-white hover:bg-[#e3f2fd] shadow-sm hover:shadow-md transition-all"
                >
                  <BsCreditCard className="text-2xl text-[#007cff]" />
                  <span className="text-lg font-medium text-gray-700">Payment History</span>
                </Link>
              </li>
              <li>
                <Link
                  to="settings"
                  className="flex items-center space-x-4 p-3 rounded-xl bg-white hover:bg-[#e3f2fd] shadow-sm hover:shadow-md transition-all"
                >
                  <IoSettingsOutline className="text-2xl text-[#007cff]" />
                  <span className="text-lg font-medium text-gray-700">Settings</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="flex items-center space-x-4 p-3 rounded-xl bg-white hover:bg-red-100 shadow-sm hover:shadow-md transition-all w-full"
                >
                  <CiLogout className="text-2xl text-red-600" />
                  <span className="text-lg font-medium text-red-600">Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
        ></div>
      )}
    </div>
  );
}

export default DoctorSidebar;
