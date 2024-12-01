import React from 'react'
import { Link } from 'react-router-dom'
import AppointmentList from '../../shared/AppointmentList'


function AllAppointment() {
 
  return (
    <div>
      <div className='my-8 mx-4' >
         <p className='font-[poppins] text-lg text-gray-600 '> Appointment List</p>
        <div className="max-w-[65rem] doc">
            <AppointmentList/>
        </div>
    </div>
    </div>
  )
}

export default AllAppointment