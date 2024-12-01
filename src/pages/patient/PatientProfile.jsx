import React, { useContext } from 'react'
import HospitalContext from '../../context/HospitalContext'
import { Link } from 'react-router-dom'

function PatientProfile() {
    const {user} = useContext(HospitalContext)
    const getInitials = (firstName,lastName)=>{
        if (!firstName && !lastName) {
            return "?"
        }
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`
    }
    
  return (
    <>
         <div className="p-6 bg-white border border-gray-200 shadow-md rounded-lg max-w-4xl mx-auto mt-8">
            <div className="flex justify-between items-center  border-b border-gray-200 p-5">
                <h1 className='text-gray-400 font-[poppins] '>Patient Details</h1>
                <Link 
                 className="bg-gradient-to-r from-blue-300 to-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300" to={'/user/home'} >
                    Back To Home </Link>
            </div>
            {user &&
                <div className="about my-5">
                    <div className="flex justify-evenly items-center">
                        <div className="border rounded-full bg-blue-400 h-[200px] w-[200px] flex items-center justify-center ">
                            <p className='text-white text-4xl font-[poppins]'>{getInitials(user.first_name, user.last_name)}</p>
                        </div>
                        <div className=" rounded-lg p-6 max-w-md mx-auto mt-10 space-y-4">
                            <div className="text-center border-b pb-4 mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">{`${user.first_name} ${user.last_name}`}</h2>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Email: </span>{user.email}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Phone: </span>{user.phone}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">NHIS: </span>{user.NHIS}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Gender: </span>{user.gender}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Address: </span>{user.address}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Blood Type: </span>{user.btype}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Genotype: </span>{user.genotype}
                                </p>
                            </div>
                            </div>
                    </div>
                </div>
            }
        </div>
    </>
  )
}

export default PatientProfile