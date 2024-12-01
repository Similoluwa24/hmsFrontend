import React from 'react'
import { MdLocalHospital } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci'

function Footer() {
  return (
    <div>
      <footer className=' lg:h-[70vh]  text-white bg-[#0075FF] footer'>
        <div className="grid lg:grid-cols-4 gap-4  lg:max-w-[68rem] m-auto    border-b border-white pb-5">
          <div className="m-auto space-y-5 one">
          <div className=" logo">
              <MdLocalHospital className='inline size-12 p-2 border-r-2 border-white text-white'></MdLocalHospital>
              <p className='inline text-2xl p-2 text-white'>OJ Hospital</p>
            </div>
            <div className="text"><p className='text-[13px] font-[lora] text-center'>We are committed to helping our patients regain their health and well-being, while also 
             providing emotional support and encouragement.</p></div>
            <div className=" search">
            <div className="relative ">
                        <input type="search" id="default-search" className="block relative w-full p-[0.7rem] ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-[#0075FF] dark:text-white " placeholder="Search" required />
                        <span className='absolute text-[#0075FF] top-3 ml-3'><FaSearch></FaSearch></span>
                        <button type="submit" className="text-[#0075FF] hover:text-[#B9D9EB] absolute end-1 bottom-[0.15rem] bg-[#B9D9EB] border border-[#0075FF] hover:bg-[#0075FF] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">Go</button>
                    </div>
            </div>

          </div>
          <div className="space-y-3 m-auto  pt-6 one">
            <h1 className=' py-4 font-[oswald] text-2xl font-bold text-white '>Quick Links</h1>
            <ul className='font-[lora] space-y-5 text-[1rem]'>
              <li>About Us</li>
              <li>Department</li>
              <li>Find A Doctor</li>
              <li>FAQ</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="space-y-3 m-auto pt-6 one">
            <h1 className=' py-4 font-[oswald] text-xl font-bold text-white '>Department</h1>
            <ul className='space-y-5 text-[1rem] font-[lora]'>
              <li>Internal Medicine</li>
              <li>Cardiology</li>
              <li>Uriology</li>
              <li>Surgery</li>
              <li>Obstetrics & Gynecology</li>
            </ul>
          </div>
          <div className="space-y-3 m-auto  pt-6 one"> 
            <h1 className=' py-4 font-[oswald] text-xl font-bold text-white '>Contact Us</h1>
            <ul className='space-y-5 text-[1rem] font-[lora]'>
              <li>ojhospital@info.com</li>
              <li>Anukool Chandra Banarjee Marg, near Parvati Hospital, Tagore Town, Prayagraj, Uttar Pradesh 211002, India</li>
              <li>(+91)0222-882-1787 (9am- 7pm EST, Monday-Saturday) </li>
            </ul>
          </div>
        </div>
        <div className="flex mt-5 justify-around items-center rights">
          <h1 className='font-[PT-Serif]'>© 2024 OJ Hospital. All Rights Reserved</h1>
          <div className="flex space-x-4 socials">
            <CiFacebook className='size-6'/>
            <CiInstagram className='size-6'/>
            <CiTwitter className='size-6'/>
          </div>
        </div>
      </footer>


    </div>
  )
}

export default Footer