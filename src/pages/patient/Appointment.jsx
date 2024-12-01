import React, { useContext, useEffect, useState } from 'react';
import { FaBookOpen, FaXmark } from 'react-icons/fa6';
import Modals from '../../shared/Modals';
import HospitalContext from '../../context/HospitalContext';
import { CiEdit } from 'react-icons/ci';
import { Link } from 'react-router-dom';

function Appointment() {
  const { doctors, appoint, editAppointmentHandler, editAppointment, showHide, getAppointmentById } = useContext(HospitalContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const id = editAppointment.items._id;
  // console.log(appoint);
  

    // Get today's date in the format 'YYYY-MM-DD'
    const getTodayDate = () => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/appointment/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
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
      showHide('error', data.errMessage);
      console.log(data);
      
    } else {
      showHide('success', 'Appointment Created');
      await getAppointmentById();
      setOpenAdd(false);
    }
  };

  const editOpener = (item) => {
    setOpenEdit(true);
    editAppointmentHandler(item);
  };

  useEffect(() => {
    if (editAppointment.edit === true) {
      setFirstName(editAppointment.items.first_name);
      setLastName(editAppointment.items.last_name);
      setEmail(editAppointment.items.email);
      setDoctor(editAppointment.items.doctor);
      setDate(editAppointment.items.date);
      setTime(editAppointment.items.time);
      setMessage(editAppointment.items.message);
    }
  }, [editAppointment]);

  const handleEdit = async () => {
    const res = await fetch(`http://localhost:5000/appointment/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
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
      showHide('error', data.errMessage);
    } else {
      showHide('success', 'Appointment Updated');
      setOpenEdit(false);
      await getAppointmentById();
    }
  };

  return (
    <>
      <div className="relative my-7 mx-3 overflow-x-auto text-gray-800 shadow-lg sm:rounded-lg bg-white">
        <div className="flex justify-end m-4">
          <button onClick={() => { setOpenAdd(true); }} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all'>Create Appointment +</button>
        </div>
        <table className="min-w-full divide-y text-sm text-left m-auto bg-white shadow-md rounded-lg">
          <thead className="text-xs text-gray-100 uppercase bg-blue-600 ">
            <tr>
              <th scope="col" className="px-6 py-4">Doctor's Name</th>
              <th scope="col" className="px-6 py-4">Appointment Date</th>
              <th scope="col" className="px-6 py-4">Appointment Time</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {appoint.length > 0 ? (
              appoint.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-all">
                  <td className="px-6 py-4 font-medium text-gray-700">
                      {item.doctor ? `Dr. ${item.doctor.first_name} ${item.doctor.last_name}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4">{item.date }</td>
                  <td className="px-6 py-4">{item.time}</td>
                  <td className="px-6 py-4">
                    <span className={`p-2 rounded-md capitalize ${item.status === 'pending' ? 'bg-yellow-200 text-yellow-700' : item.status === 'confirmed' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-4 items-center ">
                    <CiEdit onClick={() => { editOpener(item); }} className=' cursor-pointer text-blue-500 hover:text-blue-700 transition-all' />
                    <Link to={`/user/details/${item._id}`}>
                      <FaBookOpen className=' cursor-pointer text-blue-500 hover:text-blue-700 transition-all' />
                    </Link>
                  </td>
                </tr>
              ))
              
            ):
            <tr>
              <td colSpan="5" className="px-4 py-3 text-center text-gray-600">
                No appointments found.
              </td>
            </tr>
          } 
          </tbody>
        </table>

        {openAdd &&
          <Modals>
            <div className="my-2 bg-white shadow-xl rounded-lg px-6">
              <div className="flex justify-end">
                <FaXmark onClick={() => { setOpenAdd(false); }} className="text-xl cursor-pointer text-gray-700 hover:text-red-600" />
              </div>
              <form onSubmit={submitHandler} className='space-y-3 text-blue-600'>
                <p className='text-gray-800 font-semibold text-xl text-center'>Create Appointment</p>
                <div className="flex justify-between">
                  <div className="w-[48%]">
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium">Your First Name *</label>
                    <input type="text" id="first_name" onChange={(e) => { setFirstName(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" placeholder="John" required />
                  </div>
                  <div className="w-[48%]">
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium">Your Last Name *</label>
                    <input type="text" id="last_name" onChange={(e) => { setLastName(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Doe" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email *</label>
                  <input type="email" id="email" onChange={(e) => { setEmail(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" placeholder="email@example.com" required />
                </div>
                <div>
                  <label htmlFor="doctor" className="block mb-2 text-sm font-medium">Select Your Doctor *</label>
                  <select id="doctor" onChange={(e) => { setDoctor(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" required>
                    <option value="n/a">Choose Doctor</option>
                    {doctors.map((item, index) => (
                      <option key={index} value={item._id}>Dr. {item.first_name} {item.last_name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium">Select Appointment Date *</label>
                    <input type="date" id="date" min={getTodayDate()} onChange={(e) => { setDate(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" required />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="time" className="block mb-2 text-sm font-medium">Select Appointment Time *</label>
                    <input type="time" id="time" onChange={(e) => { setTime(e.target.value); }}  className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue -500" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">Message *</label>
                  <textarea id="message" rows="4" onChange={(e) => { setMessage(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Additional instructions" required />
                </div>
                <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-all">Create Appointment</button>
              </form>
            </div>
          </Modals>
        }

        {openEdit &&
          <Modals>
            <div className="my-2 bg-white shadow-xl rounded-lg px-6 py-2">
              <div className="flex justify-end">
                <FaXmark onClick={() => { setOpenEdit(false); }} className="text-xl cursor-pointer text-gray-700 hover:text-red-600" />
              </div>
              <form onSubmit={handleEdit} className="space-y-3 text-blue-600">
                <p className="text-gray-800 font-semibold text-xl text-center">Edit Appointment</p>
                <div className="flex justify-between">
                  <div className="w-[48%]">
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium">First Name *</label>
                    <input type="text" id="first_name" value={first_name} onChange={(e) => { setFirstName(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" placeholder="John" required />
                  </div>
                  <div className="w-[48%]">
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium">Last Name *</label>
                    <input type="text" id="last_name" value={last_name} onChange={(e) => { setLastName(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Doe" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email *</label>
                  <input type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" placeholder="email@example.com" required />
                </div>
                <div>
                  <label htmlFor="doctor" className="block mb-2 text-sm font-medium">Doctor *</label>
                  <select id="doctor" value={doctor} onChange={(e) => { setDoctor(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" required>
                    <option value="n/a">Choose Doctor</option>
                    {doctors.map((item, index) => (
                      <option key={index} value={item._id}>Dr. {item.first_name} {item.last_name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium">Date *</label>
                    <input type="date" id="date" value={date} min={getTodayDate()} onChange={(e) => { setDate(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" required />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="time" className="block mb-2 text-sm font-medium">Time *</label>
                    <input type="time" id="time" value={time} onChange={(e) => { setTime(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">Message *</label>
                  <textarea id="message" rows="4" value={message} onChange={(e) => { setMessage(e.target.value); }} className="w-full p-2 border rounded-lg text-sm text-blue-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Additional instructions" required />
                </div>
                <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-all">Update Appointment</button>
              </form>
            </div>
          </Modals>
        }
      </div>
    </>
  );
}

export default Appointment;