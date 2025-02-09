import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'

function AdminLayout() {
  return (
    <div>
        <div className="h-full flex">
            <div className="w-[15%] side">
                <AdminSidebar/>
            </div>
            <div className="overflow-x-scroll bg-[#F0F8FF] lg:bg-inherit w-[85%] lg:overflow-auto main">
                <AdminHeader/>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AdminLayout