import React from 'react';
import { MdLocalHospital } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer className='lg:h-[70vh] text-white bg-[#0075FF] footer'>
        <div className="grid lg:grid-cols-4 gap-6 lg:max-w-[68rem] m-auto border-b border-white pb-6">
          
          {/* Logo and Description */}
          <div className="m-auto space-y-6">
            <div className="logo flex items-center space-x-2">
              <MdLocalHospital className='size-12 p-2 border-r-2 border-white text-white' />
              <p className='text-2xl p-2 text-white font-semibold'>OJ Hospital</p>
            </div>
            <div className="text text-center">
              <p className='text-sm font-[lora]'>
                We are committed to helping our patients regain their health and well-being, while also providing emotional support and encouragement.
              </p>
            </div>
            <div className="search relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder-[#0075FF]"
                placeholder="Search"
                required
              />
              
              <button
                type="submit"
                className="text-[#0075FF] hover:text-[#B9D9EB] absolute right-1 bottom-1 bg-[#B9D9EB] border border-[#0075FF] hover:bg-[#0075FF] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
              >
                Go
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 m-auto pt-6">
            <h1 className='py-4 font-[oswald] text-2xl font-bold text-white'>Quick Links</h1>
            <div className="space-y-6">
              <ul className='font-[lora] space-y-5 text-[1rem]'>
              <Link to={"/service"}><li>About Us</li></Link> 
              <Link to={"/doctors"}><li>Find A Doctor</li></Link>
              <Link to={"/about"}> <li>FAQ</li></Link>
              <Link to={'/gallery'}><li>Gallery</li></Link>
              </ul>

            </div>
          </div>

          {/* Useful Information */}
          <div className="space-y-3 m-auto pt-6">
            <h1 className='py-4 font-[oswald] text-xl font-bold text-white'>Useful Information</h1>
            <ul className='space-y-5 text-[1rem] font-[lora]'>
              <li>Emergency Services: Available 24/7</li>
              <li>Health & Wellness Resources</li>
              <li>Insurance & Payment Information</li>
              <li>Patient Rights & Responsibilities</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-3 m-auto pt-6">
            <h1 className='py-4 font-[oswald] text-xl font-bold text-white'>Contact Us</h1>
            <ul className='space-y-5 text-[1rem] font-[lora]'>
              <li>ojhospital@info.com</li>
              <li>Anukool Chandra Banarjee Marg, near Parvati Hospital, Tagore Town, Prayagraj, Uttar Pradesh 211002, India</li>
              <li>(+91)0222-882-1787 (9am- 7pm EST, Monday-Saturday)</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright and Social Media Links */}
        <div className="flex mt-5 justify-between items-center px-6 py-4">
          <h1 className='font-[PT-Serif] text-sm'>&copy; 2024 OJ Hospital. All Rights Reserved</h1>
          <div className="flex space-x-6 text-2xl">
            <CiFacebook className='cursor-pointer hover:text-[#B9D9EB]' />
            <CiInstagram className='cursor-pointer hover:text-[#B9D9EB]' />
            <CiTwitter className='cursor-pointer hover:text-[#B9D9EB]' />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
