import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HospitalContext from '../../context/HospitalContext'

function EditPatient() {
  const {updatePatientHandler, editPatient,fetchUserAll,showHide} = useContext(HospitalContext)
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('') 
  const [email, setEmail] = useState()
  const [address, setAddress] = useState('')
  const [NHIS, setnhis] = useState("")
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const id = editPatient.items.item._id

  useEffect(()=>{
    if (editPatient.edit === true) {
      setFirstName(editPatient.items.item.first_name)
      setLastName(editPatient.items.item.last_name)
      setGender(editPatient.items.item.gender)
      setDob(editPatient.items.item.dob)
      setPhone(editPatient.items.item.phone)
      setEmail(editPatient.items.item.email)
      setAddress(editPatient.items.item.address)
      setnhis(editPatient.items.item.NHIS)
      // setPassword(editPatient.items.item.password)
      // setConfirmPassword(editPatient.items.item.confirmPassword)
    }
  },[editPatient])

  const submitHandler = async(e)=>{
    e.preventDefault()
    const res = await fetch(`http://localhost:5000/user/admin/update/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify({
        first_name,
        last_name,
        gender,
        dob,
        phone,
        email,
        address,
        NHIS

      })
    })
    const data = await res.json()
    if (!res.ok) {
      console.log(data);
      
      
    } else {
      showHide('success','patient updated')
      navigate("/admin/allpa")
      await fetchUserAll()
    }
  }
  return (
    <>
    <div className="">
    <div className=" lg:mx-5 lg:min-w-[63rem] mt-4 form w-full">
            <form action="" onSubmit={submitHandler} className='space-y-8'>

                <div className="lg:flex justify-between mx-4 className">
                      <div className='lg:w-[48%] '>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium">First name</label>
                        <input type="text" id="first_name" value={first_name} onChange={(e)=>{setFirstName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                      </div>
                      <div className='lg:w-[48%] '>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium">Last name</label>
                        <input type="text" id="last_name" value={last_name} onChange={(e)=>{setLastName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Lastname" required />
                      {console.log(editPatient)}
                    </div>
                </div>

                <div className="lg:flex justify-between mx-4">
                  <div className="lg:w-[48%] gender">
                     <label htmlhtmlFor="gender" className="block mb-2 text-sm font-medium">Select Gender</label>
                    <select id="gender" value={gender} onChange={(e)=>{setGender(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option selected>Choose Your Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                        <option value="null">I'd rather not say</option>
                    </select>                      
                  </div>

                  <div className="lg:w-[48%] date">
                    <label htmlFor="" className="block mb-2 text-sm font-medium">Date of Birth</label>
                    <input type="date" value={dob} name="date" id="dob" onChange={(e)=>{setDob(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                </div>

                <div className="lg:flex justify-between mx-4">
                    <div className='lg:w-[48%] phone'>
                        <label htmlFor="phone" class="block mb-2 text-sm font-medium">Phone number</label>
                        <input type="tel"  id="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} class="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Phone Number" pattern="[0-9]{11}" required />
                    </div>
                    <div className="lg:w-[48%]">
                        <label htmlFor="email" class="block mb-2 text-sm font-medium">Email address</label>
                        <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} class="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                    </div>
                </div>

                <div className="lg:flex justify-between mx-4">
                    <div className='lg:w-[48%] phone'>
                        <label htmlFor="adress" class="block mb-2 text-sm font-medium">Contact Address</label>
                        <input type="text" id="adress" value={address} onChange={(e)=>{setAddress(e.target.value)}} class="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Phone Number"  required />
                    </div>
                    <div className="lg:w-[48%]">
                        <label htmlFor="nhis" class="block mb-2 text-sm font-medium">NHIS No.</label>
                        <input type="text" id="nhis" value={NHIS} onChange={(e)=>{setnhis(e.target.value)}} class="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input NHIS Number"  />
                    </div>
                </div>

                {/* <div className="lg:flex justify-between mx-4">
                    <div class="lg:w-[48%]">
                        <label htmlFor="password" class="block mb-2 text-sm font-medium ">Password</label>
                        <input type="password" disabled id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Password" required />
                    </div> 
                    <div class="lg:w-[48%]">
                        <label htmlFor="confirm_password" class="block mb-2 text-sm font-medium">Confirm password</label>
                        <input type="password" id="confirm_password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} class="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Repeat Password" required />
                    </div> 
                </div> */}

                <div className="flex justify-start mx-4 m-auto">
                <button type="submit" class="text-white hover:text-white border bg-[#007cff] w-[200px] border-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Update Patient</button>
                <button type="reset" class="text-white hover:text-white border bg-amber-400 w-[200px]   font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Reset</button>
                
                </div>
            </form>
          </div>
    </div>
    </>
  )
}

export default EditPatient