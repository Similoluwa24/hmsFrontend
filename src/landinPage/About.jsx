import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

function About({img, img2, img3, img4}) {
  useEffect(()=>{
    AOS.init({duration: 2000})
  },[] )
  return (
    <div>
        <div className="about" id='about'>
            
            <div className="lg:max-w-6xl w-fit pt-12 m-auto lg:flex">
                <div className=" lg:w-[50%] m-3 lg:ml-5 grid grid-cols-2 gap-1 img">
                    <img src={img} alt="" className='lg:w-[100%] object-cover rounded-tl-2xl lg:h-[100%]' />
                    <img src={img4} alt="" className='lg:w-[100%] object-cover rounded-tr-2xl lg:h-[100%]' />
                    <img src={img3} alt="" className='lg:w-[100%] object-cover rounded-bl-2xl lg:h-[100%]' />
                    <img src={img2} alt="" className='lg:w-[100%] object-cover rounded-br-2xl lg:h-[100%]' />
                </div>
                <div className="lg:w-[50%] m-3  space-y-4 text">
                      <h1 className='text-center pt-7 font-[oswald] text-4xl font-bold text-[#0075FF] '>Why Choose Us</h1>
                    <div className="space-y-5 lg:max-w-72 m-auto reasons">
                      <div className="bg-gradient-to-r from-[#0075FF] to-[#00c1ff] text-[#ffefff]  p-2 space-y-2 rounded-xl animation" data-aos='zoom-in'>
                        <h1 className='font-semibold text-sm  text-center font-serif  '> Expertise and Specialized Care</h1>
                        <p className='text-center  text-[15px] font-[poppins] '> Ojay Hospital has a team of experienced medical professionals, including specialists and
                           sub-specialists, who provide high-quality care in their respective fields.</p>
                      </div>
                      <div className="bg-gradient-to-r from-[#0075FF] to-[#00c1ff] text-[#ffefff] p-2 space-y-2 rounded-xl animation" data-aos='zoom-in'>
                        <h1 className='font-semibold text-sm  text-center font-serif  '>Advanced Technology and Facilities</h1>
                        <p className='text-center  text-[15px] font-[poppins] '> The hospital is equipped with state-of-the-art medical technology, including advanced
                           diagnostic equipment and modern surgical facilities.</p>
                      </div>
                      <div className="bg-gradient-to-r from-[#0075FF] to-[#00c1ff] text-[#ffefff] p-2 space-y-2 rounded-xl animation" data-aos='zoom-in'>
                        <h1 className='font-semibold text-sm  text-center font-serif  '> Comprehensive Services</h1>
                        <p className='text-center  text-[15px] font-[poppins] '>Ojay Hospital offers a wide range of medical services, including emergency care, surgical
                           services, maternity care, and more.This means that patients can receive comprehensive care 
                           under one roof, without having to visit multiple hospitals or clinics.</p>
                      </div>
                      <div className="bg-gradient-to-r from-[#0075FF] to-[#00c1ff] text-[#ffefff] p-2 space-y-2 rounded-xl animation" data-aos='zoom-in'>
                        <h1 className='font-semibold text-sm  text-center font-serif'>Patient-Centric Approach</h1>
                        <p className='text-center  text-[15px] font-[poppins] '>The hospital prioritizes patient comfort and needs, ensuring a stress-free experience. From 
                          comfortable rooms to nutritious food,
                           the hospital strives to make the patient's experience as comfortable and stress-free as possible</p>
                      </div>
                      <div className="bg-gradient-to-r from-[#0075FF] to-[#00c1ff] text-[#ffefff] p-2 space-y-2 rounded-xl animation" data-aos='zoom-in'>
                        <h1 className='font-semibold text-sm  text-center font-serif'>Affordable Care</h1>
                        <p className='text-center  text-[15px] font-[poppins] '>Ojay Hospital is committed to providing affordable healthcare to all patients, without compromising
                           on quality. The hospital offers competitive pricing and flexible payment options, making quality healthcare
                            accessible</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About;