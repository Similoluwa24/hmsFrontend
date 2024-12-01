import React from 'react'
import { Link } from 'react-router-dom'

import DoctorList from '../../shared/DoctorList';

function AllDoctors() {

  return (
    <div className='my-8 mx-4' >
      <p className='font-[poppins] text-lg text-gray-600 '> Doctor's List</p>
        <div className="max-w-[65rem] doc">
            <DoctorList/>
        </div>
    </div>
  )
}

export default AllDoctors