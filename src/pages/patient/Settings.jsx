import React, { useContext, useEffect, useState } from 'react'
import HospitalContext from '../../context/HospitalContext'

function Settings() {
  const {showHide, user,fetchUser} = useContext(HospitalContext)
  const [oldpassword, setOldPassword] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [btype, setBtype] = useState('')
  const [genotype, setGenotype] = useState('')


  
   // Fetch existing user details on component mount
   useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('http://localhost:5000/user/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await res.json();
        
        
        if (res.ok) {
          // Populate state with existing user data
          setFirstName(data.user.first_name || '');
          setLastName(data.user.last_name || '');
          setDob(data.user.dob || '');
          setEmail(data.user.email || '');
          setAddress(data.user.address || '');
          setPhone(data.user.phone || '');
          setBtype(data.user.btype || '');
          setGenotype(data.user.genotype || '');
        } else {
          showHide('error', data.errMessage);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [showHide]);
  const submitHandler = async (e) => {
    e.preventDefault()
    if(newpassword !== confirmPassword){
      showHide('error','Password doesnt Match!!')
    }else{
      const res = await fetch('http://localhost:5000/user/updatepwd',{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({oldpassword,newpassword})
      })
      const data = await res.json()
      if (!res.ok) {
        showHide('error',data.errMessage)
      } else {
        showHide('success','Password Updated Successfully!')
        setConfirmPassword('')
        setNewPassword('')
        setOldPassword('')
      }}
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/user/updateprofile',{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify({first_name,last_name,email,phone,address,genotype,btype,dob})
    })
    const data = await res.json()

    if (!res.ok) {
      console.log(data);
      showHide('error',data.errMessage)      
    } else {
      console.log(data);
      fetchUser()
      showHide('success','User data updated successfully!')
    }
  }
  return (
    <>
   <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-10">
  <div className="bg-white m-5 space-y-5 rounded-lg shadow-lg border border-gray-200 p-6">
    <p className="text-xl font-semibold text-gray-700 border-b pb-3">Security Settings</p>
    <form onSubmit={submitHandler} className="space-y-4">
      <div className="">
        <label className="block mb-1 text-sm font-medium text-gray-600">Current Password</label>
        <input 
          type="password" 
          onChange={(e) => setOldPassword(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required 
        />
      </div>
      <div className="">
        <label className="block mb-1 text-sm font-medium text-gray-600">New Password</label>
        <input 
          type="password" 
          onChange={(e) => setNewPassword(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required 
        />
      </div>
      <div className="">
        <label className="block mb-1 text-sm font-medium text-gray-600">Confirm Password</label>
        <input 
          type="password" 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required 
        />
      </div>
      <button 
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
        type="submit"
      >
        Save
      </button>
    </form>
  </div>

  <div className="bg-white m-5 space-y-5 rounded-lg shadow-lg border border-gray-200 p-6">
    <p className="text-xl font-semibold text-gray-700 border-b pb-3">Account Settings</p>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="md:flex gap-4">
        <div className="md:w-1/2">
          <label className="block mb-1 text-sm font-medium text-gray-600">First Name</label>
          <input 
            type="text" 
            value={first_name} 
            onChange={(e) => setFirstName(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>
        <div className="md:w-1/2">
          <label className="block mb-1 text-sm font-medium text-gray-600">Last Name</label>
          <input 
            type="text" 
            value={last_name} 
            onChange={(e) => setLastName(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>
      </div>
      <div className="md:flex gap-4">
        <div className="md:w-1/2">
          <label className="block mb-1 text-sm font-medium text-gray-600">Date of Birth</label>
          <input 
            type="date" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>
        <div className="md:w-1/2">
          <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>
      </div>
      <div className="md:flex gap-4">
        <div className="md:w-1/2">
          <label className="block mb-1 text-sm font-medium text-gray-600">Address</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>
        <div className="md:w-1/2">
          <label className="block mb-1 text-sm font-medium text-gray-600">Phone Number</label>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>
      </div>
      <div className="md:flex gap-4">
        <div className="md:w-1/2">
          <label className="block mb-1 text-sm font-medium text-gray-600">Blood Type</label>
          <select 
            onChange={(e) => setBtype(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          >
            <option value="">Choose Blood Type</option>
            <option value="O Negative">O Negative</option>
            <option value="O positive">O positive</option>
            <option value="B Negative">B Negative</option>
            <option value="B Positive">B Positive</option>
            <option value="A Negative">A Negative</option>
            <option value="A Positive">A Positive</option>
            <option value="AB Positive">AB Positive</option>
            <option value="AB Negative">AB Negative</option>
          </select>
        </div>
        <div className="md:w-1/2">
          <label className="block mb-1 text-sm font-medium text-gray-600">Genotype</label>
          <select 
            onChange={(e) => setGenotype(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          >
            <option value="">Choose Genotype</option>
            <option value="AA">AA</option>
            <option value="AS">AS</option>
            <option value="AC">AC</option>
            <option value="SS">SS</option>
            <option value="SC">SC</option>
            <option value="CC">CC</option>
          </select>
        </div>
      </div>
      <div className="flex space-x-4">
        <button 
          className="bg-red-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-500 transition duration-300"
          type="reset"
        >
          Reset
        </button>
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>

    </>
  )
}

export default Settings