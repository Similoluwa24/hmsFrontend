import React from 'react'
import mail from '../../assets/mail.png'

function RedirectPage() {
  return (
    <div>
        <div className='w-[100%] h-[100vh]  bg-white '>
            <div className=" space-y-3 flex flex-col items-center">
                <div className="">
                    <img src={mail} className='w-[300px] h-[300px] ' alt="" />
                </div>
                <div className="txt text-center text-gray-500 font-[poppins]">
                    <h1>Email has been sent!</h1>
                    <p>please check your inbox and follow the instruction to reset your password</p>
                </div>
                <a href="https://mail.google.com/" className='bg-[#007cff] w-[40%] capitalize text-white text-center p-2 rounded-md '>go to gmail</a>
            </div>
        </div>
    </div>
  )
}

export default RedirectPage