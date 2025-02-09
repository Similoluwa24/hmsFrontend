import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLocalHospital, MdOutlineInventory } from 'react-icons/md';
import { BsJournalBookmark } from 'react-icons/bs';
import { CiLogout, CiMoneyBill, CiStethoscope, CiCreditCard1, CiCalculator1, CiUser } from 'react-icons/ci';
import { IoHomeOutline } from 'react-icons/io5';
import { SiAwsorganizations } from 'react-icons/si';
import { GiMedicinePills } from 'react-icons/gi';
import { TbReceipt2 } from 'react-icons/tb';
import { AuthContext } from '../../context/AuthContext';
import useLogout from '../../hooks/useLogout';
import HospitalContext from '../../context/HospitalContext';

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state
  const [state, dispatch] = useContext(AuthContext);
  const {user, loading} = useContext(HospitalContext)
  const logout = useLogout();

  const toggleSidebar = () => setIsOpen(!isOpen); // Toggle function

  const logoutHandler = async () => {
    logout();
  };

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className={`fixed top-4 z-50 bg-[#007cff] text-white p-2 rounded-md transition-all ${
          isOpen ? 'left-[120px]' : 'left-'
        } md:hidden`}
        onClick={toggleSidebar}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-[#007cff] border-r border-gray-200 transition-transform z-40 w-48 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="mb-8 flex items-center justify-start px-4 py-3 space-x-2">
          <MdLocalHospital className="text-2xl lg:text-3xl p-2 bg-[#007cff] text-white rounded-full" />
          <p className="text-lg font-bold text-[#007cff] hidden lg:block">OJ Hospital</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-4 overflow-auto px-2">
          <ul className="space-y-4">
            <li>
              <p className="text-gray-400 font-[poppins] text-[15px]">ID: {loading ?'...' : user?.uniqueId}</p>
            </li>
            <li>
              <Link
                to="/admin/home"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all"
              >
                <IoHomeOutline className="text-xl" />
                <span className="text-sm">My Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/allapp"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all"
              >
                <BsJournalBookmark className="text-xl" />
                <span className="text-sm">Appointment</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/allpa"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all"
              >
                <CiUser className="text-xl" />
                <span className="text-sm">Patients</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/alldoc"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all"
              >
                <CiStethoscope className="text-xl" />
                <span className="text-sm">Doctors</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/records"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all"
              >
                <GiMedicinePills className="text-xl" />
                <span className="text-sm">Pharmacy</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/alldepart"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all"
              >
                <SiAwsorganizations className="text-xl" />
                <span className="text-sm">Department</span>
              </Link>
            </li>
           
            <li>
              <Link
                to="/admin/pending"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all"
              >
                <CiCalculator1 className="text-xl" />
                <span className="text-sm">Accounts</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reciept"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all"
              >
                <TbReceipt2 className="text-xl" />
                <span className="text-sm">Payment Advice</span>
              </Link>
            </li>
          </ul>
        {/* Logout Button */}
        <div className="px-4 mt-auto">
          <button
            onClick={logoutHandler}
            className="flex items-center space-x-3 p-2 w-full rounded-lg bg-red-50 text-red-600 hover:bg-red-100 shadow-sm hover:shadow-md transition-all"
          >
            <CiLogout className="text-xl" />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
        </nav>

      </div>

      {/* Backdrop for Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default AdminSidebar;
