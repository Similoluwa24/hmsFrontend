import React, { useContext, useState } from 'react';
import { MdLocalHospital } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom'; 
import HospitalContext from '../context/HospitalContext';

function Header() {
  const { isAuthenticated, user } = useContext(HospitalContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // // Redirect based on user role
  // if (user && isAuthenticated) {
  //   if (user.role === "admin") {
  //     navigate('/admin/home');
  //   } else if (user.role === "doctor") {
  //     navigate('/doctor/home');
  //   } else {
  //     navigate('/user/home');
  //   }
  // }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="flex z-10 w-full bg-white justify-between items-center px-6 py-2 header border-b-2 border-[#007cff]">
        <div className="logo">
          <MdLocalHospital className='inline size-12 p-2 border-r-2 border-[#007cff] text-[#007cff]' />
          <p className='inline text-2xl p-2 text-[#007cff]'>OJ Hospital</p>
        </div>
        <div className="text">
          <ul className='hidden lg:flex space-x-3 pr-3 header-list'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/service">Services</Link></li>
            <li><Link to="/doctors">Department</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/auth/login">Log In</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div className="lg:hidden navbar">
            <CiMenuKebab className='size-12 p-2 text-[#007cff]' onClick={toggleDropdown} />
          </div>
        </div>
        <div className="button">
          <button className='hidden lg:inline border border-[#007cff] hover:bg-[#007cff] p-2 rounded-full hover:text-white text-[#007cff]'>
            <Link to="/appointment">Appointment</Link>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile View */}
      {isDropdownOpen && (
        <div className="lg:hidden bg-white border border-[#007cff] rounded-lg shadow-md mt-2">
          <ul className="flex flex-col space-y-2 p-4">
            <li><Link to="/" onClick={() => setIsDropdownOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setIsDropdownOpen(false)}>About</Link></li>
            <li><Link to="/service" onClick={() => setIsDropdownOpen(false)}>Services</Link></li>
            <li><Link to="/doctors" onClick={() => setIsDropdownOpen(false)}>Department</Link></li>
            <li><Link to="/gallery" onClick={() => setIsDropdownOpen(false)}>Gallery</Link></li>
            <li><Link to="/auth/login" onClick={() => setIsDropdownOpen(false)}>Log In</Link></li>
            <li><Link to="/contact" onClick={() => setIsDropdownOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;