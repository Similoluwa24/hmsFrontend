import React, { useContext } from 'react';
import { BsJournalBookmark } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { IoHomeOutline, IoReceiptOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdLocalHospital } from 'react-icons/md';
import { TbReportMedical } from "react-icons/tb";
import { TbActivityHeartbeat } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import useLogout from '../../hooks/useLogout'

function DoctorSidebar() {
    const [state, dispatch] = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = useLogout()

    const logoutHandler = async () => {
       logout()
    };

    return (
        <div className="min-h-screen py-5 px-4 bg-white text-[#007cff] border-r border-gray-200 shadow-lg">
            <div className="mb-8 flex items-center justify-start space-x-2">
                <MdLocalHospital className="text-3xl lg:text-4xl p-2 bg-[#007cff] text-white rounded-full" />
                <p className="text-lg md:text-xl hidden md:inline font-bold text-[#007cff]">OJ Hospital</p>
            </div>
            <div className="space-y-8">
                <ul className="space-y-6">
                    <li>
                        <Link to='home' className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all">
                            <IoHomeOutline className="text-xl" />
                            <span className="text-sm md:text-base hidden lg:inline">My Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='appointment' className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all">
                            <BsJournalBookmark className="text-xl" />
                            <span className="text-sm md:text-base hidden lg:inline">Appointment</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='addvitals' className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all">
                            <TbActivityHeartbeat className="text-xl" />
                            <span className="text-sm md:text-base hidden lg:inline">Vital Signs</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='diagnosis/list' className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all">
                            <TbReportMedical className="text-xl" />
                            <span className="text-sm md:text-base hidden lg:inline">Diagnosis</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='prescription/list' className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all">
                            <IoReceiptOutline className="text-xl" />
                            <span className="text-sm md:text-base hidden lg:inline">Prescription</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='settings' className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#f0f4ff] hover:text-[#0056b3] transition-all">
                            <IoSettingsOutline className="text-xl" />
                            <span className="text-sm md:text-base hidden lg:inline">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={logoutHandler} className="flex items-center space-x-2 p-2 rounded-xl bg-white hover:bg-red-100 shadow-sm hover:shadow-md transition-all w-full">
                            <CiLogout className="text-xl text-red-600" />
                            <span className="text-sm md:text-base hidden lg:inline text-red-600">Log Out</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default DoctorSidebar;
