import React, { useContext, useState } from 'react'
import Header from '../landinPage/Header'
import { Link } from 'react-router-dom'
import About from '../landinPage/About'
import HospitalContext from '../context/HospitalContext'

function AboutPage() {
   
    const [selected, setSelected] = useState(null)

    const toggle = (i) =>{
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }
    const faq =  [
        {
          "question": "What are the hospital's visiting hours?",
          "answer": "Our visiting hours are from 9:00 AM to 8:00 PM, 7 days a week. Please note that visiting hours may be restricted in certain areas of the hospital, such as the Intensive Care Unit (ICU) or Pediatric Unit, due to patient care needs. We also ask that visitors be respectful of our patients' rest periods and quiet hours.",
          "id": "4dad"
        },
        {
          "question": "How do I get to the hospital?",
          "answer": "We are located at 123 Main St, Anytown, USA. You can take the bus (Route 10) and get off at the Main St stop, or drive and park in our parking garage, which offers free parking for patients and visitors. If you need assistance with transportation, please contact our patient services department.",
          "id": "55cc"
        },
        {
          "question": "What insurance plans do you accept?",
          "answer": "We accept most major insurance plans, including Blue Cross, Aetna, UnitedHealthcare, and Medicare. Please contact our billing department for more information on specific plans and coverage. We also offer financial assistance programs for patients who are uninsured or underinsured.",
          "id": "01c4"
        },
        {
          "question": "Can I request a specific doctor or nurse?",
          "answer": "Yes, you can request a specific doctor or nurse when you schedule your appointment or upon admission to the hospital. Please note that we will do our best to accommodate your request, but it may not always be possible due to staffing and patient care needs.",
          "id": "957a"
        },
        {
          "question": "Do you offer any support services for patients and families?",
          "answer": "Yes, we offer a range of support services, including counseling, social work, and spiritual care. Our social workers can assist with discharge planning, transportation, and home care arrangements, while our chaplains are available to provide emotional and spiritual support. Please ask your care team for more information on these services.",
          "id": "b249"
        },
        {
          "question": "How do I get a copy of my medical records?",
          "answer": "You can request a copy of your medical records by contacting our medical records department at 555-555-1234 or through our patient portal, MyHealth. Please allow 3-5 business days for processing and note that there may be a fee for copying and mailing records.",
          "id": "e49d"
        },
        {
          "question": "Can I bring my pet to the hospital?",
          "answer": "Unfortunately, no. For the safety and well-being of our patients and staff, we do not allow pets in the hospital, with the exception of service animals. We understand the importance of emotional support, but we must prioritize patient care and safety.",
          "id": "b3ad"
        },
        {
          "question": "What amenities do you offer for patients and visitors?",
          "answer": "We offer a range of amenities, including a cafeteria serving breakfast, lunch, and dinner, a gift shop with flowers, cards, and snacks, and free Wi-Fi throughout the hospital. We also have a patient library with books, magazines, and games, as well as a meditation room for quiet reflection.",
          "id": "966a"
        },
        {
          "question": "How do I schedule an appointment?",
          "answer": "You can schedule an appointment by calling our scheduling department at 555-555-5555, Monday-Friday, 8:00 AM-5:00 PM, or through our website using our online scheduling tool. Please have your insurance information and medical history ready to facilitate the scheduling process.",
          "id": "2b10"
        },
        {
          "question": "What if I have a medical emergency?",
          "answer": "If you have a medical emergency, please call 911 or go to the nearest emergency room. Our emergency department is open 24/7 and staffed by board-certified emergency medicine physicians and nurses. If you are experiencing symptoms such as chest pain, difficulty breathing, or severe bleeding, do not delay – seek immediate medical attention.",
          "id": "9861"
        }
      ]
  return (
    <div>
        <div className="abt">
            <Header/>
            <div className="banner-5">
                <div className="space-y-7 content">
                    <div className="text-white py-24 space-y-3 mx-5">
                            <p className='lg:text-xl  text-lg font-[poppins]'>About Us</p>
                            <hr className=' h-[0.2rem]  w-[12%]  bg-[#0075FF]' />                           
                            <h1 className='lg:text-6xl text-2xl  font-bold font-[poppins]'>General Information</h1>
                            <p className=' lg:text-[1rem] text-[12px] pb-6  font-[poppins]'>Get in touch with us to schedule an appointment,<br />
                            ask a question, or share your feedback.  We're here to
                                help. 
                            </p>
                            <div className="space-x-4 BOT0N">
                                <Link to='/doctors' className='bg-[#007cff] text-[white] px-5 py-3 rounded '>
                                <button>View Our Team</button>
                                </Link>
                                <Link to='/appointment' className='bg-[#043040] text-[white] px-5 py-3 rounded '>
                                <button>Book A Visit</button>
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
                <div className="text-[#007cff] mt-6 space-y-3 mx-5">
                        <p className='lg:text-xl text-gray-600 text-lg font-[poppins]'>FREQUENTLY ASKED QUESTIONS</p>
                        <hr className=' h-[0.2rem]  w-[12%]  bg-[#0075FF]' />
                        <h1 className='lg:text-5xl text-xl font-[poppins]'>Our Patients and</h1>
                        <h1 className='lg:text-6xl text-2xl  font-bold font-[poppins]'>OJ Hospitals Doctors</h1>
                        <p className=' lg:text-[1rem] text-[12px] pb-6 text-gray-600 font-[poppins]'>Committed to delivering exceptional patient
                             care, our team of dedicated healthcare <br /> professionals works tirelessly to provide compassionate, high-quality medical 
                             services to our community
                        </p>
                  </div>

                <div className="grid lg:grid-cols-2 lg:max-w-[70rem] mt-12 m-auto wrapper">
                    <div className=" space-y-3 img">
                        <img src="/image/abt.jpg" alt="" className='h-[290px] rounded' />
                        <img src="/image/abt2.jpg" alt="" className='h-[290px] rounded' />
                    </div>
                    <div className=" space-y-3 accordion">
                        {faq.map((item, i) =>(
                            <div className="bg-[whitesmoke] space-y-3 lg:w-[500px] p-2 item">
                                <div  className="flex justify-between title" onClick={()=>toggle(i)}>
                                    <h1 className='font-bold text-[#004cff] text-[1rem] font-[poppins] '>{item.question} </h1>
                                    <span>{selected === i ? "-" : "+" }</span>
                                </div>
                                <div className={selected === i ? "contet show" :"contet"}>
                                    <p>{item.answer} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            
        </div>
    </div>
  )
}

export default AboutPage