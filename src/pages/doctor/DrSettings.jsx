import React, { useContext, useEffect, useState } from 'react'
import HospitalContext from '../../context/HospitalContext'

function DrSettings() {
  const {showHide, user, fetchUser} = useContext(HospitalContext)
  const [oldpassword, setOldPassword] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [photo, setPhoto] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [btype, setBtype] = useState('')
  const [genotype, setGenotype] = useState('')


  
   // Fetch existing user details on component mount
   useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('https://hmsbackend-4388.onrender.com/user/me', {
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
          setPhoto(data.user.photo || '');
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
      const res = await fetch('https://hmsbackend-4388.onrender.com/user/updatepwd',{
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const res = await fetch('https://hmsbackend-4388.onrender.com/user/updateprofile',{
  //     method:'PUT',
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     credentials:'include',
  //     body:JSON.stringify({first_name,last_name,photo,phone,address,genotype,btype,dob})
  //   })
  //   const data = await res.json()

  //   if (!res.ok) {
  //     console.log(data);
  //     showHide('error',data.errMessage)      
  //   } else {
  //     console.log(data);
      
  //     showHide('success','User data updated successfully!')
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('dob', dob);
    formData.append('phone', phone);
    formData.append('photo', photo[0]); // Assuming `photo` is from `e.target.files`
    formData.append('address', address);
    console.log(formData);
    
    try {
        const res = await fetch('https://hmsbackend-4388.onrender.com/user/updateprofile', {
            method: 'PUT',
            credentials: 'include',
            body: formData,
        });
        const data = await res.json()
        console.log(data);
        if (!res.ok) {
          console.log(data);
          showHide('error', 'An Error Has Occured!')
        } else {
          showHide('success','Profile Updated Successfully')
          await fetchUser()
          navigate('/admin/alldoc')
        }
        
        // handle response
    } catch (error) {
        console.error(error);
    }
};
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
              <label className="block mb-1 text-sm font-medium text-gray-600">photo</label>
              <input onChange={(e)=>{setPhoto(e.target.files)}}  className="block w-full text-sm text-[#007cff] border border-gray-300 rounded-lg cursor-pointer bg-gray-50 d focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file"/>
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

export default DrSettings