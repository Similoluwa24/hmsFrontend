import React, { useContext, useState } from 'react';
import { MdLocalHospital } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from 'react-router-dom'; 
import HospitalContext from '../context/HospitalContext';

function Header() {
  const { isAuthenticated, user } = useContext(HospitalContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className=" top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <MdLocalHospital className="text-3xl text-[#007cff]" />
          <span className="text-2xl font-semibold text-[#007cff]">OJ Hospital</span>
        </div>

        {/* Navigation for Desktop */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-[#007cff] transition">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-[#007cff] transition">About</Link>
          <Link to="/service" className="text-gray-600 hover:text-[#007cff] transition">Services</Link>
          <Link to="/doctors" className="text-gray-600 hover:text-[#007cff] transition">Department</Link>
          <Link to="/gallery" className="text-gray-600 hover:text-[#007cff] transition">Gallery</Link>
          <Link to="/contact" className="text-gray-600 hover:text-[#007cff] transition">Contact</Link>
          {isAuthenticated ? (
            <span className="text-gray-600">Hi, {user?.first_name}</span>
          ) : (
            <Link to="/auth/login" className="text-gray-600 hover:text-[#007cff] transition">Log In</Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <button className="lg:hidden text-[#007cff] text-3xl" onClick={toggleDropdown}>
          <CiMenuKebab />
        </button>
      </div>

      {/* Dropdown for Mobile */}
      {isDropdownOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <ul className="flex flex-col py-2">
            <li><Link to="/" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Home</Link></li>
            <li><Link to="/about" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">About</Link></li>
            <li><Link to="/service" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Services</Link></li>
            <li><Link to="/doctors" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Department</Link></li>
            <li><Link to="/gallery" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Gallery</Link></li>
            <li><Link to="/contact" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Contact</Link></li>
            {!isAuthenticated && (
              <li><Link to="/auth/login" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Log In</Link></li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
