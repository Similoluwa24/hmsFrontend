import React from 'react'
import Header from '../landinPage/Header'
import Services from '../landinPage/Services'

function ServicePage() {
  return (
    <div>
        <div className="serv">
        <Header/>
        <div className="text-start flex  flex-col justify-center px-6 banner-2">
            <h1 className='text-white lg:text-7xl text-2xl font-[PT-Serif]'>Services</h1>
            <p className='text-white lg:text-xl text-[10px] font-[poppins]'>Our comprehensive range of medical services are
                 designed to provide <br /> exceptional care and support to our patients, from diagnosis to recovery.</p>
        </div>
        <div className=" content">
        <Services/>
        </div>
        <div className="text-start text-white space-y-3 p-8 lg:h-[100vh] services">
            <p className='text-2xl font-[poppins]'>How we do it?</p>
            <h1 className='text-7xl font-[poppins]'><span>Our </span><span className='font-bold text-[#043040]'>process</span></h1>
            <p className='text-[1rem] font-[Roboto]'>Our streamlined process ensures timely and efficient delivery of care,<br /> from initial consultation to 
                treatment and follow-up,<br /> providing a seamless experience for our patients.</p>

            <div className="flex flex-col lg:flex-row  lg:max-w-[72rem] lg:space-x-5 m-auto process">
                <div className="w-[22rem] p-4 space-y-3 lg:h-[10rem]  one">
                    <img src="/image/patient.jpg" alt="" className='w-[150px] h-[150px] object-cover rounded-full ' />
                    <h1  className='text-lg font-semibold capitalize font-[poppins]'>Patient based care</h1>
                    <p className='text-[11px] lg:text-[14px] font-light font-[Roboto]'>we focus on individualized care by understanding patients' unique needs, values, and preferences. 
                        This involves active listening,
                         empathy, and open communication to ensure that patients receive personalized attention and treatment</p>
                </div>

                <div className="w-[22rem] p-4 space-y-3 lg:h-[10rem]  one">
                <img src="/image/drugs.jpg" alt="" className='w-[150px] h-[150px] object-cover rounded-full' />
                    <h1  className='text-lg font-semibold capitalize font-[poppins]'>evidence based practice</h1>
                    <p className='text-[11px] lg:text-[14px] font-light font-[Roboto]'>We stay updated with the latest medical research and guidelines to ensure that healthcare providers
                         are using the most effective and proven treatments. This involves continuous education,
                         training, and quality improvement initiatives to maintain the highest standards of care.</p>
                </div>

                <div className="w-[22rem] p-4 space-y-3 lg:h-[10rem]  one">
                     <img src="/image/team.jpg" alt="" className='w-[150px] h-[150px] object-cover rounded-full' />
                    <h1  className='text-lg  font-semibold capitalize font-[poppins]'> Collaborative Care Teams</h1>
                    <p className='text-[11px] lg:text-[14px] font-light font-[Roboto]'>We foster a culture of collaboration among healthcare professionals, including doctors, nurses,
                         and other support staff. This involves clear communication, mutual respect, and a shared commitment to
                         delivering high-quality care.</p>
                </div>
            </div>
        </div>

        </div>
    </div>
  )
}

export default ServicePage