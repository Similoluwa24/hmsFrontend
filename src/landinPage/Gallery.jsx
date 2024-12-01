import React from 'react'
import Header from './Header'
function Gallery() {
  return (
    <div>
        
        <div className=" gallery">
            <Header/>    
                <div className="text-start  flex flex-col  justify-center px-6 banner-3">
                    <h1 className='text-white lg:text-7xl text-2xl font-[PT-Serif]'>Galleries</h1>
                    <p className='text-white lg:text-xl text-[10px] font-[poppins]'>Our hospital gallery is a showcase of the various departments and facilities within our medical center. 
                        Browse through our photo gallery to get a glimpse of our state-of-the-art equipment, modern facilities,
                        and compassionate care. From our emergency department to our patient rooms,
                        we're proud to provide a comfortable and healing environment for our patients and their loved ones</p>
                </div> 
                <div className="max-w-[75rem] mt-12 m-auto content">
                  <div className="text-[#007cff] space-y-3 mx-5">
                        <p className='lg:text-xl text-gray-600 text-lg font-[poppins]'>Photo Gallery</p>
                        <hr className=' h-[0.2rem]  w-[12%]  bg-[#0075FF]' />
                        <h1 className='lg:text-5xl text-xl font-[poppins]'>Our Patients and</h1>
                        <h1 className='lg:text-6xl text-2xl  font-bold font-[poppins]'>OJ Hospitals Doctors</h1>
                        <p className=' lg:text-[1rem] text-[12px] pb-6 text-gray-600 font-[poppins]'>Get in touch with us to schedule an appointment,<br />
                          ask a question, or share your feedback.  We're here to
                            help. 
                        </p>
                  </div>
                    <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-[73rem] m-auto">
                        <img src="/image/gallery1.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery2.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery3.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery4.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery5.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery6.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery7.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery8.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery9.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery10.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery11.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery12.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery13.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery14.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery15.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery16.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery17.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery18.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery19.jpg" className='object-fit object-cover h-full' alt="" />
                        <img src="/image/gallery20.jpg" className='object-fit object-cover h-full' alt="" />
                    </div>
                </div>
                  
                  </div>       
    </div>
  )
}

export default Gallery