import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import HospitalContext from '../../context/HospitalContext'


function DocDetails() {
    const {doctors} = useContext(HospitalContext)
    const params = useParams()
    const showDeets = params.id
    const details = doctors.find((item)=>item._id === showDeets)
    console.log(details);

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
                <h1 className='text-gray-400 font-[poppins] '>Doctor Details</h1>
                <Link 
                 className="bg-gradient-to-r from-blue-300 to-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300" to={'/admin/alldoc'} >
                    Back To Doctor's List </Link>
            </div>
            {details &&
                <div className="about my-5">
                    <div className="flex lg:flex-row flex-col justify-evenly items-center">
                        <div className="border rounded-full bg-blue-400 h-[200px] w-[200px] flex items-center justify-center ">
                            <img src={details.photo} className="border rounded-full object-cover bg-blue-400 h-[200px] w-[200px] flex items-center justify-center " alt="" />
                            {/* <p className='text-white text-4xl font-[poppins]'>{getInitials(details.first_name, details.last_name)}</p> */}
                        </div>
                        <div className=" rounded-lg p-6 capitalize max-w-md mx-auto mt-10 space-y-4">
                            <div className="text-center border-b pb-4 mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">{`${details.first_name} ${details.last_name}`}</h2>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-600 lowercase">
                                <span className="font-medium capitalize text-gray-800">Email: </span>{details.email}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Phone: </span>{details.phone}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Department: </span>{details.departments}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Gender: </span>{details.gender}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Address: </span>{details.address}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">School Attended: </span>{details.school}
                                </p>
                                <p className="text-gray-600">
                                <span className="font-medium text-gray-800">ID: </span>{details._id}
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

export default DocDetails