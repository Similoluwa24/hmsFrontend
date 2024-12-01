import React from 'react'
import DoctorSidebar from './DoctorSidebar'
import DoctorHeader from './DoctorHeader'
import { Outlet } from 'react-router-dom'

function DoctorLayout() {
  return (
    <div>
        <div className="flex">
            <div className="w-[19%] ">
                <DoctorSidebar/>
            </div>
            <div className="bg-slate-100  w-full">
                <DoctorHeader/>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DoctorLayout