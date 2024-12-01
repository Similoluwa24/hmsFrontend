import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import HospitalContext from '../../context/HospitalContext';

function AppDetails() {
    const { appointment } = useContext(HospitalContext);
    const params = useParams();
    const showApp = params.id;
    const appoint = appointment.find((items) => items._id === showApp);

    console.log(appoint);

    return (
        <>
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl m-auto space-y-6 w-full relative my-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="lg:text-3xl font-bold text-gray-900">Appointment Details</h2>
                    <Link
                        to={'/user/appointment'}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 text-sm lg:text-lg lg:px-5 lg:py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
                    >
                        Back to Appointments
                    </Link>
                </div>
                <div className="space-y-6">
                    {[
                        { label: "First Name", value: appoint.first_name },
                        { label: "Last Name", value: appoint.last_name },
                        { label: "Email", value: appoint.email },
                        { label: "Doctor", value: appoint.doctor ? `Dr. ${appoint.doctor.first_name} ${appoint.doctor.last_name}` : "N/A" },
                        { label: "Date", value: appoint.date },
                        { label: "Time", value: appoint.time },
                        { label: "Message", value: appoint.message },
                        { label: "Status", value: appoint.status }
                    ].map((item, index) => (
                        <div key={index} className="border-b border-gray-200 pb-3">
                            <label className="block text-sm font-semibold text-gray-500">{item.label}</label>
                            <p className="text-lg text-gray-800">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AppDetails;
