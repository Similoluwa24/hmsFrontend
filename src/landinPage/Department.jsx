import React from 'react'

function Department({img, img2, img3, img4}) {
  return (
    <div>
        <div className="mt-10 pb-4 mx-auto depart" id='hod'>
            <h1 className='text-center pt-7  font-[oswald] lg:text-2xl font-bold text-[#0075FF] '>Managerial Team </h1>
               <br /> <hr className='w-[20%] h-[0.15rem] m-auto bg-[#0075FF]' />
            <h1 className='text-center py-4 font-[oswald] lg:text-4xl font-bold text-[#0075FF] '>Head of Department </h1>
            <div className="max-w-[57rem]  m-auto grid lg:grid-cols-2 gap-4 department">
                <div className=" bg-[whitesmoke] max-h-[700px] shadow-lg over">
                    <img src={img2} alt="" className='w-full object-cover object-top lg:w-[450px] h-[450px] ' />
                    <div className="w-[350px] lg:w-[450px] h-[250px] space-y-1 pt-4  overlay">     
                    <h1 className='text-[#0075ff] font-semibold text-lg text-center'> Head of Department of Internal Medicine</h1>
                    <p className='text-[#0075ff] font-[PT-Serif] text-3xl font-semibold text-center'>Chrystel Hallette</p>
                    <p className='text-[#0075ff] px-4 text-[12px] font-[poppins]  text-center'>Dr. Chrystel Hallette is a distinguished physician and leader in the field of internal medicine, serving as the Chief of Internal Medicine at OJ Hospital.
                         With over 12 years of experience in internal medicine, She has earned a reputation for her exceptional clinical skills, dedication to patient care, and commitment to advancing medical knowledge.</p>
                    </div>
                </div>
                <div className=" bg-[whitesmoke] max-h-[700px] shadow-lg over">
                    <img src={img3} alt="" className='w-full object-cover object-top lg:w-[450px] h-[450px] ' />
                    <div className="w-full lg:w-[450px] h-[250px] space-y-1 pt-4 overlay">
                        <p className='text-[#0075ff] font-semibold text-lg text-center'>Head of Department of Surgery</p>
                        <h1 className='text-[#0075ff] font-[PT-Serif] text-3xl font-semibold text-center'>Fanni Deveraux</h1>
                        <p className='text-[#0075ff] px-4 text-[12px] font-[poppins]  text-center'>Dr. Fanni Deveraux is a renowned surgeon and leader in the medical field, serving as the Chief of Surgery at OJ Hospital. With over 10 years of experience in surgical practice,
                             Dr. Fanni has established himself as a skilled and compassionate surgeon, dedicated to providing exceptional patient care.</p>
                   </div>
                    
                </div>
                <div className="bg-[whitesmoke] max-h-[700px] shadow-lg  over">
                    <img src={img} alt="" className='w-full object-cover object-top lg:w-[450px] h-[450px] ' />
                    <div className="lg:w-[450px] w-[350px] h-[250px] text-center space-y-1 pt-4 overlay">
                    <h1 className='text-[#0075ff] font-semibold text-center text-lg '> Head of Department of Pediatrics</h1>
                    <p className='text-[#0075ff] font-[PT-Serif] text-3xl text-center font-semibold '>Sophia Patel</p>
                    <p className='text-[#0075ff] px-4 text-[12px] text-center font-[poppins]'>Dr. Sophia Patel is a distinguished pediatrician and leader in the field of pediatric medicine, serving as the Chief of Pediatrics at OJ Hospital. With over 7 years of experience in pediatrics, Dr. Patel has earned a reputation 
                        for her exceptional clinical skills, dedication to patient care, and commitment to advancing medical knowledge</p>
                    </div>
                </div>
                <div className=" bg-[whitesmoke] max-h-[700px] shadow-lg over">
                     <img src={img4} alt="" className='w-full object-cover object-top lg:w-[450px] h-[450px] ' />
                     <div className="lg:w-[450px] w-[350px] h-[250px] pace-y-1 pt-4  overlay">
                    
                    <h1 className='text-[#0075ff] font-semibold text-lg text-center'> Head of Department of OB/GYN</h1>
                    <p className='text-[#0075ff] font-[PT-Serif] text-3xl font-semibold text-center'>Emily Lee</p>
                    <p className='text-[#0075ff] px-4 text-[12px] font-[poppins]  text-center'>Dr. Emily Lee is a renowned obstetrician-gynecologist and leader in the field of women's health, serving as the Chief of Obstetrics and Gynecology at OJ Hospital.
                         With over 15 years of experience in obstetrics and gynecology,
                         Dr. Lee has earned a reputation for her exceptional clinical skills, dedication to patient care, and commitment to advancing medical knowledge.</p>
                     </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Department