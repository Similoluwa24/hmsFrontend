import React from 'react'
import { MdOutlineEmergency, MdPregnantWoman } from "react-icons/md";
import { FaBedPulse, FaXRay } from "react-icons/fa6";
import { BsHeartPulse } from "react-icons/bs";
import { TbPhysotherapist } from "react-icons/tb";
import { GiMedicinePills } from "react-icons/gi";
import { FaHeartbeat,  FaBaby } from "react-icons/fa";

function Services() {
  return (
    <div className="bg-[whitesmoke] servicess">
            <div className="lg:max-w-6xl md:max-w-5xl sm:max-w-4xl xs:max-w-3xl   m-auto pt-6 pb-6 stage" id='service'>
                <h1 className='text-center pt-7 font-[oswald] text-6xl font-bold text-[#0075ff] '>Our Services</h1>
               <div className="space-x-3 lg:m-8 grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-3">
               <div className="box-1 text-[#0075FF] space-y-5 w-fit bg-white shadow-md h-72 m-auto rounded-tl-lg rounded-br-2xl  p-[2rem] block hover:text-[white] hover:bg-gradient-to-r hover:from-[#0075FF] hover:to-[#00c1ff] hover:duration-300">
                  <div className=" text-center  icon">
                  <MdOutlineEmergency className=' size-12 inline' />
                  </div>
                  <div className="texts">
                   <p className='font-semibold text-center font-serif mb-2'>Emergency Care</p>
                   <p className='text-[11px] font-[poppins]'>OJ Hospital Emergency Services provide 24/7 urgent medical care to patients in critical condition, 
                    offering prompt attention, diagnosis, and treatment for life-threatening injuries and illnesses.</p>
                  </div>
                </div>

                <div className="box-1 text-[#0075FF] space-y-5 bg-white shadow-md h-72 rounded-tl-lg rounded-br-2xl  p-[2rem] block hover:text-[white] hover:bg-gradient-to-r hover:from-[#0075FF] hover:to-[#00c1ff] hover:duration-300">
                  <div className="text-center icon">
                  <FaBedPulse className='size-12 inline'></FaBedPulse>
                  </div>
                  <div className="texts">
                    <p className='font-semibold text-center font-serif mb-2'>Inpatient Care</p>
                    <p className='text-[11px] font-[poppins]'>OJ Hospital inpatient services provide 24/7 medical care to patients who require close monitoring,
                         surgery, or intensive treatments, offering treatment, food, and lodging during their hospital stay.</p>
                  </div>
                </div>

                <div className="box-1 text-[#0075FF] space-y-5 bg-white shadow-md h-72 rounded-tl-lg rounded-br-2xl  p-[2rem] block hover:text-[white] hover:bg-gradient-to-r hover:from-[#0075FF] hover:to-[#00c1ff] hover:duration-300">
                  <div className="text-center icon">
                  <MdPregnantWoman className='size-12 inline'></MdPregnantWoman>
                  </div>
                  <div className="texts">
                    <p className='font-semibold text-center font-serif mb-2'>Maternity </p>
                    <p className='text-[11px] font-[poppins]'>We offer a warm and welcoming
                       environment for expectant mothers, providing  care and support 
                      throughout pregnancy, childbirth, and postpartum. Our experienced team of obstetricians,
                       midwives, and nurses ensure a safe and joyful experience for new families. </p>
                  </div>
                </div>

                <div className="box-1 text-[#0075FF] space-y-5 bg-white shadow-md h-72 rounded-tl-lg rounded-br-2xl  p-[2rem] block hover:text-[white] hover:bg-gradient-to-r hover:from-[#0075FF] hover:to-[#00c1ff] hover:duration-300">
                  <div className="text-center icon">
                      <GiMedicinePills className='size-12 inline'></GiMedicinePills>
                  </div>
                  <div className="texts">
                     <p className='font-semibold text-center font-serif mb-2'>Pharmacy </p> 
                     <p className='text-[11px] font-[poppins]'>OJ Hospital's Pharmacy provides convenient and efficient 
                      medication management services to our patients. Our team of licensed pharmacists and technicians work closely with healthcare providers to ensure accurate 
                      and timely dispensing of medications. </p> 
                  </div>
                </div>

                <div className="box-1 text-[#0075FF] space-y-5 bg-white shadow-md h-72 rounded-tl-lg rounded-br-2xl  p-[2rem] block hover:text-[white] hover:bg-gradient-to-r hover:from-[#0075FF] hover:to-[#00c1ff] hover:duration-300">
                  <div className="text-center icon">
                    <FaHeartbeat className='inline size-12'></FaHeartbeat>
                  </div>
                  <div className="texts">
                    <p className='font-semibold text-center font-serif mb-2'>Diagnostic Services</p>
                    <p className='text-[11px] font-[poppins]'>OJ Hospital's Diagnostic Services offers a comprehensive range of 
                      diagnostic tests and procedures to help diagnose and manage various medical conditions. Our state-of-the-art facilities and advanced technology, combined
                       with the expertise of our radiologists and technicians.</p>
                  </div>
                </div>

               <div className="box-1 text-[#0075FF] space-y-5 bg-white shadow-md h-72 rounded-tl-lg rounded-br-2xl  p-[2rem] block hover:text-[white] hover:bg-gradient-to-r hover:from-[#0075FF] hover:to-[#00c1ff] hover:duration-300">
                  <div className="text-center icon">
                    <FaXRay className='inline size-12'></FaXRay>
                  </div>
                  <div className="texts">
                      <p className='font-semibold text-center font-serif mb-2'>Imaging and Radiology</p>
                      <p className='text-[11px] font-[poppins]'>OJ Hospital's Diagnostic Services offers a comprehensive range of diagnostic
                         tests and procedures to help diagnose and manage various medical conditions.
                         of our radiologists  allowing for effective treatment and care.</p>
                  </div>
                </div>

                <div className="box-1 text-[#0075FF] space-y-5 bg-white shadow-md h-72 rounded-tl-lg rounded-br-2xl  p-[2rem] block hover:text-[white] hover:bg-gradient-to-r hover:from-[#0075FF] hover:to-[#00c1ff] hover:duration-300">
                  <div className="text-center icon">
                    <TbPhysotherapist className='size-12 inline '></TbPhysotherapist>
                  </div>
                  <div className="texts">
                    <p className='font-semibold text-center font-serif mb-2'>Rehabilitation Services</p>
                    <p className='text-[11px] font-[poppins]'> OJ Hospital rehabilitation services aim to help patients recover from injuries, illnesses, or surgeries,  functional
                         abilities through personalized therapy programs, including physical, occupational, and speech therapy</p>
                  </div>
                </div>

                <div className="box-1 text-[#0075FF] space-y-5 bg-white shadow-md h-72 rounded-tl-lg rounded-br-2xl  p-[2rem] block hover:text-[white] hover:bg-gradient-to-r hover:from-[#0075FF] hover:to-[#00c1ff] hover:duration-300">
                  <div className="text-center icon">
                    <FaBaby className='inline size-12'></FaBaby>
                  </div>
                  <div className="texts">
                    <p className='font-semibold text-center font-serif mb-2'>Pediatric Services</p>
                    <p className='text-[11px] font-[poppins]'>OJ Hospital pediatric services provide compassionate and specialized care to newborns, infants, children, and adolescents, offering a range of medical and surgical treatments
                        , including neonatal care, pediatric surgery, and pediatric intensive care.</p>
                  </div>
                </div>
              </div>
              {/* service done */}
            </div>
    </div>
  )
}

export default Services