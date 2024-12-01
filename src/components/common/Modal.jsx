import React, { useState } from 'react'
import Modals from '../../shared/Modals'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Modal() {
    const [modal, setModal] = useState(false)
    const notify = ()=>{
      toast.success('🦄 Wow so easy!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  return (
    <>
    <div className='max-w-[70rem] m-auto'>
        <button onClick={()=>{setModal(true)}} className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Open</button>
        
{/*             
            {modal &&
                <div  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in modalBg">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 modalContainer">
                        <button onClick={()=>setModal(false)}>X</button>
                        <div className="title">
                        <h1>are you sure you want to delete ?</h1>
                        </div>
                        <div className="body">
                            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.
                            This action cannot be undone.</p>
                        </div>
                        <div className="footer">
                        <button onClick={()=>{setModal(false)}} className='bg-gray-200 py-3 px-5   rounded-md '>Cancel</button>
                        <button className='bg-red-600 py-3 px-5  rounded-md'>Delete</button>
                        </div>
                    </div>
                    </div>
                </div>
            } */}

            {modal && <Modals>
                <button onClick={()=>setModal(false)}>X</button>
                        <div className="title">
                        <h1>are you sure you want to delete ?</h1>
                        </div>
                        <div className="body">
                            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.
                            This action cannot be undone.</p>
                        </div>
                        <div className="footer">
                        <button onClick={()=>{setModal(false)}} className='bg-gray-200 py-3 px-5   rounded-md '>Cancel</button>
                        <button className='bg-red-600 py-3 px-5  rounded-md'>Delete</button>
                        </div>
            </Modals>}

            <button onClick={notify} className='p-3 bg-rose-500 mt-24'>see</button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={'light'}
              />
        
    </div>
    </>
  )
}

export default Modal