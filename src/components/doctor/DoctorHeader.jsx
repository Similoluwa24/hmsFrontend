import React, { useContext, useState } from 'react';
import { FaRegBell, FaRegEnvelope, FaSearch } from "react-icons/fa";
import HospitalContext from '../../context/HospitalContext';
import useLogout from '../../hooks/useLogout';
import { Link } from 'react-router-dom';

function DoctorHeader() {
  const { user } = useContext(HospitalContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logout = useLogout();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logoutHandler = () => {
    logout();
  };

  // Function to get initials from the user's first and last name
  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return "?";
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <div className="bg-white shadow-md p-4 w-full flex justify-end md:justify-between items-center border-b border-gray-200">
      {/* Search bar or logo placeholder */}
      <div className="md:flex hidden items-center space-x-3">
        <FaSearch className="text-[#007cff] cursor-pointer" />
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#007cff]"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <FaRegBell className="text-[#007cff] hidden md:inline cursor-pointer hover:text-blue-700 transition duration-200" />
        <FaRegEnvelope className="text-[#007cff] hidden md:inline cursor-pointer hover:text-blue-700 transition duration-200" />
        
        <div className="relative">
          <div onClick={toggleDropdown} className="flex items-center space-x-2 cursor-pointer">
            <p className="font-medium text-sm text-gray-700">
              {user?.first_name} {user?.last_name}
            </p>
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-[#007cff] text-white font-bold overflow-hidden">
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt={`${user?.first_name}'s profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                getInitials(user?.first_name, user?.last_name)
              )}
            </div>
          </div>
          
          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
              <div className="p-4 border-b text-center">
                <div className="w-12 h-12 flex justify-center items-center rounded-full bg-[#007cff] text-white font-bold mx-auto overflow-hidden">
                  {user?.photo ? (
                    <img
                      src={user.photo}
                      alt={`${user?.first_name}'s profile`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    getInitials(user?.first_name, user?.last_name)
                  )}
                </div>
                <p className="mt-2 font-semibold text-gray-700">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <ul className="py-2 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to={'profile'}>View Profile</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to={'settings'}>Settings</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorHeader;
