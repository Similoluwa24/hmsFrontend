import React, { useContext, useState } from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import HospitalContext from '../../context/HospitalContext';
import useLogout from '../../hooks/useLogout';

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {user, loading} = useContext(HospitalContext) 
  const logout = useLogout()

  const getInitials = (firstName, lastName)=>{
    if (!firstName && ! lastName) {
      return '?'
    }
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const logoutHandler = async () => {
    logout();
  };

  return (
    <header className="text-blue-600 bg-white shadow-lg">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/admin/home" className="text-2xl font-bold tracking-wide">
            Admin<span className="text-yellow-300">Panel</span>
          </Link>
        </div>


        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block">
            <input
              type="text"
              className="rounded-full bg-white text-gray-700 px-4 py-1 w-48 focus:ring-2 focus:ring-yellow-300"
              placeholder="Search..."
            />
            <FiSearch className="absolute right-3 top-2 text-gray-500" />
          </div>

          {/* Notifications Icon */}
          <button className="relative hover:text-yellow-300">
            <FiBell className="text-2xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
              5
            </span>
          </button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 hover:text-yellow-300"
            >
              <div className="bg-blue-500 p-3 rounded-full text-white">
            {getInitials(user?.first_name,user?.last_name)}
           </div>
            </button>
            {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
              <div className="p-4 border-b text-center">
              <div className="w-10 h-10 ml-14 flex justify-center items-center rounded-full bg-[#007cff] text-white font-bold overflow-hidden">
                {getInitials(user?.first_name,user?.last_name)}
              </div>
                <p className="mt-2 font-semibold text-gray-700">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-sm text-gray-500">{user?.uniqueId}</p>
              </div>
              <ul className="py-2 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to={'profile'}>View Profile</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to={'settings'}>Settings</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex justify-between items-center px-4 py-2 bg-blue-700">
        <button className="hover:text-yellow-300">
          <FiSearch className="text-2xl" />
        </button>
        <button className="hover:text-yellow-300">
          <FiBell className="text-2xl" />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
