import React from 'react'
import PatientList from '../../shared/PatientList'
import { Link } from 'react-router-dom'

function AllPatients() {
  return (
    <div className='my-8 mx-4' >
    <p className='font-[poppins] text-lg text-gray-600 '> Patient's List</p>
       <div className="max-w-[65rem] doc">
           <PatientList/>
       </div>
   </div>
  )
}

export default AllPatients