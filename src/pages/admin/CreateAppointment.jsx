import React, { useContext, useState } from 'react';
import HospitalContext from '../../context/HospitalContext';
import { Link, useNavigate } from 'react-router-dom';

function CreateAppointment() {
  const { doctors, showHide, getallApointment } = useContext(HospitalContext);
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [Id, setId ] = useState('')
  const [phone, setPhone ] = useState('')


    // Get today's date in the format 'YYYY-MM-DD'
    const getTodayDate = () => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

  const fetchPatientDetails = async () => {
    try {
      const res = await fetch(
        `https://hmsbackend-4388.onrender.com/user/details/${encodeURIComponent(uniqueId)}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user')}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setFirstName(data.patient.first_name || '');
        setLastName(data.patient.last_name || '');
        setEmail(data.patient.email || '');
        setPhone(data.patient.phone || '');
        setId(data.patient._id)
        
        showHide('success', 'Patient details fetched successfully!');
      } else {
        showHide('error', data.errMessage || 'Failed to fetch details.');
      }
    } catch (error) {
      console.error(error);
      showHide('error', 'An error occurred while fetching details.');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch('https://hmsbackend-4388.onrender.com/appointment/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        user:Id,
        first_name,
        last_name,
        email,
        doctor,
        date,
        time,
        message,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
    } else {
      showHide('success', 'Appointment Created');
      await getallApointment();
      navigate('/admin/allapp', { replace: true });
    }
  };

  return (
    <div className="my-8 overflow-hidden mx-5">
      <div className="lg:mx-5 lg:max-w-[60rem] my-4 form w-full">
        <p className="font-[poppins] text-lg text-gray-600 my-3">
          <Link to="/admin/allapp">{`Appointment List >> `}</Link>Create Appointment
        </p>
        <form action="" onSubmit={submitHandler} className="space-y-4 text-[#007cff] overflow-x-scroll capitalize">
          {/* Card Number and Fetch Button */}
          <div className="flex w-full">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter card number"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
            />
             <button
              type="button"
              onClick={fetchPatientDetails}
              className="ml-2 bg-gradient-to-r from-teal-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-teal-600 hover:to-green-700 transition duration-300"
            >
              Fetch Details
            </button>
          </div>

          {/* Patient Details */}
          <div className="lg:flex justify-between mx-4">
            <div className="w-[48%]">
              <label htmlFor="first_name" className="block mb-1 text-sm font-medium">
                First Name *
              </label>
              <input
                type="text"
                id="first_name"
                value={first_name}
                disabled
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            <div className="w-[48%]">
              <label htmlFor="last_name" className="block mb-1 text-sm font-medium">
                Last Name *
              </label>
              <input
                type="text"
                id="last_name"
                value={last_name}
                disabled
                onChange={(e) => setLastName(e.target.value)}
                className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="lg:flex justify-between mx-4">
            <div className="w-[48%] ">
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=""
              required
            />
            </div>
            <div className="w-[48%] ">
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Phone Number *
              </label>
              <input
                type="number"
                id="number"
                value={phone}
                disabled
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />  
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="mx-4">
            <label htmlFor="doctor" className="block mb-1 text-sm font-medium">
              Select Your Doctor *
            </label>
            <select
                name="doctors"
                id="doctor"
                onChange={(e) => setDoctor(e.target.value)}
                className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="">Choose Doctor</option>
                {doctors.map((item) => (
                  <option value={item._id} key={item._id}>
                    {`Dr. ${item.last_name} ${item.first_name}`}
                  </option>
                ))}
              </select>

          </div>

          {/* Date and Time */}
          <div className="flex mx-4 gap-4">
            <div className="w-1/2">
              <label htmlFor="date" className="block mb-1 text-sm font-medium">
                Select Appointment Date *
              </label>
              <input
                type="date"
                id="date"
                value={date}
                min={getTodayDate()}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="time" className="block mb-1 text-sm font-medium">
                Select Appointment Time *
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="mx-4">
            <label htmlFor="message" className="block mb-1 text-sm font-medium">
              Your Message *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="8"
              className="bg-white border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your message"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="bg-[#007cff] text-white px-5 py-3 rounded-xl">
              Create Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAppointment;
