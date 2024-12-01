import React, { useContext } from 'react'
import Header from '../landinPage/Header'
import Footer from '../landinPage/Footer'
import HospitalContext from '../context/HospitalContext'

function Doctors() {
    const {doctors} = useContext(HospitalContext)
  return (
    <div>
        <div className="bg-[whitesmoke] pb-7 doc">
            <Header/>
            <div className="text-start  flex flex-col  justify-center px-6 banner-3">
                <h1 className='text-white lg:text-7xl text-2xl font-[PT-Serif]'>Meet The Team</h1>
                <p className='text-white lg:text-xl text-[10px] font-[poppins]'>The hospital team is a dedicated group of
                     healthcare professionals working together to provide high-quality
                     patient care, led by experienced physicians and including skilled nurses, therapists, and technicians.</p>
            </div>            
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 pt-8  lg:max-w-[70rem] m-auto gap-3">
                {doctors.map((item, index)=>(
                <div key={index} className="bg-white h-[300px] rounded-lg doctor">
                    <div className="  card">
                        <div className="object-fit object-cover h-full card_img">
                          <img src={item.photo} alt="" />
                        </div>                    
                        <div className="space-y-2 text-center card_title">
                        <div className="text-gray-600 text-[1rem] pt-2">{item.departments}</div>
                          <p className='text-[#007cff] font-[poppins] font-semibold text-xl '>{item.first_name} {item.last_name}</p>
                          <p className="text-gray-600 text-[13px] pt-2">{item.email}</p>
                        </div>
                        
                    </div>

                </div>
                ))}

            </div>
            <Footer/>
        </div>
    </div>
  )
}

export default Doctors