import React, { useContext } from 'react'
import PatientHeader from './PatientHeader'
import PatientSidebar from './PatientSidebar'
import { Outlet } from 'react-router-dom'
import HospitalContext from '../../context/HospitalContext'

function PatientLayout() {
  const { user } = useContext(HospitalContext)
  
  
  return (
    <>
      <div className="h-[100vh] flex justify-between p-layout">
        <div className="w-[17%] sidebar">
          <PatientSidebar />
        </div>
        <div className="w-[83%] bg-[whitesmoke] h-fit main">
          <PatientHeader />
          {(!user?.bgroup || !user?.genotype) && (
            <marquee behavior="slide" direction="left" className="bg-blue-500 text-white font-bold text-lg p-3 rounded-md shadow-md">
              Please complete the form in the settings section to update your blood group and genotype. Thank you!
            </marquee>
          )}
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default PatientLayout
