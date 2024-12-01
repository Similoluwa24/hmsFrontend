import React, { useState } from 'react'
import Header from './Header'
import { PiAmbulanceLight } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { BsHeartPulse } from "react-icons/bs";

import Footer from './Footer';
import { Link } from 'react-router-dom';

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')

  const submitHandler = async(e)=>{
    e.preventDefault()
    const res = await fetch('http://localhost:5000/contact/add',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials:"include",
      body:JSON.stringify({name,email,message,subject})
    })
    const data = await res.json()
    if (!res.ok) {
      console.log(data); 
    } else {
      return alert('Message sent!')
    }
  }
  return (
    <div>
        <div className="pb-12 bg-[whitesmoke] contact">
            <Header/>
            <div className="text-start  flex flex-col  justify-center px-6 banner-4">
                <h1 className='text-white lg:text-7xl  text-2xl font-[PT-Serif]'>Contact us</h1>
                <p className='text-white lg:text-xl text-[10px] font-[poppins]'>Get in touch with us to schedule an appointment,
                   ask a question,<br /> or share your feedback. We're here to help. Call, email, or visit us today!</p>
            </div> 
            <div className="text-[#007cff]  px-8  capitalize p-3 space-y-2 contact-form">
              <p className='lg:text-xl text-gray-600 text-lg font-[poppins]'>Contact us</p>
              <hr className=' h-[0.2rem]  w-[12%]  bg-[#0075FF]' />
              <h1 className='lg:text-5xl text-xl font-[poppins]'>Send us</h1>
              <h1 className='lg:text-6xl text-2xl  font-bold font-[poppins]'>your comments</h1>
              <p className=' lg:text-[1rem] text-[12px] text-gray-600 font-[poppins]'>Get in touch with us to schedule an appointment,<br />
                 ask a question, or share your feedback.  We're here to
                  help. 
              </p>
                <div className="lg:flex mx-5 space-y-6 gap-7 contact-ux">
                    <form action="" onSubmit={submitHandler} className='space-y-4  lg:w-[70%]'>
                      <div className="">
                          <label for="name" class="block mb-1 text-sm font-medium">your name *</label>
                          <input type="text" id="name" onChange={(e)=>setName(e.target.value)} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
                      </div>
                      <div className="">
                          <label for="email" className="block mb-1 text-sm font-medium">email *</label>
                          <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
                      </div>
                      <div className="">
                          <label for="subject" className="block mb-1 text-sm font-medium">subject *</label>
                          <input type="text" id="subject" onChange={(e)=>setSubject(e.target.value)} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
                      </div>
                      <div className="">
                          <label for="message" className="block mb-1 text-sm font-medium">your message *</label>
                          <textarea type="text" id="subject" rows="8" onChange={(e)=>setMessage(e.target.value)} className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required />
                      </div>
                      <div className="bott0n">
                          <button type="submit" className='bg-[#007cff] text-[white] px-5 py-3 rounded-xl '>Submit</button>
                      </div>
                    </form>
                    <div className="lg:w-[30%] space-y-8 m-auto  tab">
                    <div className="icons space-y-3">
                      <div className="lg:flex justify-center icon">
                        <PiAmbulanceLight className="size-20 bg-white border border-[#007cff] p-6 rounded-full hover:bg-[#007cff] hover:text-white "/>
                      </div>
                      <div className="lg:text-center  text">
                        <h1 className='font-[poppins] text-lg'>EMERGENCY CONTACT</h1>
                        <p className='font-[Roboto] text-[13px]'>free toll 24/7 <br /> 09084567395779</p>
                      </div>
                    </div>

                    <div className="icons space-y-3">
                      <div className=" lg:flex justify-center icon">
                          <FaUserDoctor className="size-20 bg-white border border-[#007cff] p-6 rounded-full hover:bg-[#007cff] hover:text-white "/>
                      </div>
                      <div className="text lg:text-center">
                        <h1 className='font-[poppins] text-lg'>HOME VISIT</h1>
                        <p className='font-[Roboto] text-[13px]'>chargeable call <br /> 0959485930985</p>
                      </div>
                    </div>

                    <div className="icons space-y-3">
                      <div className="lg:flex justify-center icon">
                        <FaPhoneVolume className="size-20 bg-white border border-[#007cff] p-6 rounded-full hover:bg-[#007cff] hover:text-white "/>
                      </div>
                      <div className="lg:text-center text">
                        <h1 className='font-[poppins] text-lg'>PHONE CONTACT</h1>
                        <p className='font-[Roboto] text-[13px]'>within work hours <br /> 850586940-30595</p>
                      </div>
                    </div>

                    </div>

                </div>
            </div>           
            <div className="relative bg-[whitesmoke]  map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14410.020216982177!2d81.85268675407637!3d25.454805740733036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAnukool%20Chandra%20Banarjee%20Marg%2C%20near%20Parvati%20Hospital%2C%20Tagore%20Town%2C%20Prayagraj%2C%20Uttar%20Pradesh%20211002%2C%20India!5e0!3m2!1sen!2sng!4v1726754044285!5m2!1sen!2sng"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div className="absolute bg-white h-[95vh] lg:w-[25%] w-[40%] left-[10%] top-[3%] space-y-4  contact-us">
              <p className='capitalize text-2xl text-[#007cff] font font-semibold p-3 text-center'>working hours</p>
              <div className="grid   space-y-2 max-w-60 uppercase m-auto text-gray-600 days">
                <div className="m-auto day">
                  <p>mon-wed</p>
                  <p>8am-7pm</p>
                </div>
                <hr className=' h-[0.1rem]  bg-[#0075FF]' />
                <div className="m-auto day">
                  <p>thursday</p>
                  <p>8am-6pm</p>
                </div>
                <hr className=' h-[0.1rem]  bg-[#0075FF]' />
                <div className="m-auto day">
                  <p>fri</p>
                  <p>9am-8pm</p>
                </div>
                <hr className=' h-[0.1rem]  bg-[#0075FF]' />
                <div className="m-auto day">
                  <p>sat-sun</p>
                  <p>10pm-6pm</p>
                </div>
                <hr className=' h-[0.1rem]  bg-[#0075FF]' />
                <div className="flex items-center justify-around">
                  <p ><IoPhonePortraitOutline className='size-8'/></p>
                  <p className='text-[1rem] capitalize'>0-800-2336-7820</p>
                </div>
                <hr className=' h-[0.1rem]  bg-[#0075FF]' />
                <div className="flex items-center justify-around">
                  <p><CiLocationOn className='size-8'/></p>
                  <p className='text-[1rem] capitalize'>27th Avenue New York,<br /> W2 3XE, US</p>
                </div>
                <hr className=' h-[0.1rem]  bg-[#0075FF]' />
                <div className="flex items-center justify-around">
                  <p><BsHeartPulse className='size-8'/></p>
                  <p className='text-[1rem] capitalize'><Link>Click here to book an <br /> appointment at Medicare.</Link></p>
                </div>
                <hr className=' h-[0.1rem]  bg-[#0075FF]' />
              </div>
            </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Contact