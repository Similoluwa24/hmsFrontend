import React from 'react'
import { Outlet } from 'react-router-dom'
import { MdLocalHospital } from 'react-icons/md'
import Header from '../../landinPage/Header'

function AuthLayout() {
  return (
    <>
        <div className='w-full h-[110vh] auth '>
          <header>
            <Header/>
          </header>
            
            <div className=" h-[70vh] m-auto  main">
                <Outlet/>
            </div>
            
        </div>
        
    </>
  )
}

export default AuthLayout