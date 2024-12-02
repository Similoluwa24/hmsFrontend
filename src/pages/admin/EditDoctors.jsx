import React, { useContext, useEffect, useState } from 'react'
import HospitalContext from '../../context/HospitalContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditDoctors() {
    const {department,editDoctors,updateDoctorHandler,fetchUserAll,showHide,} = useContext(HospitalContext)
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [phone, setPhone] = useState('')
    const [photo, setPhoto] = useState('')
    const [address, setAddress] = useState('')
    const [school, setSchool] = useState('')
    const [departments, setDepartments] = useState('')
    const navigate = useNavigate()
    const id = editDoctors.items.item._id
 

    useEffect(()=>{
        setFirstName(editDoctors.items.item.first_name)
        setLastName(editDoctors.items.item.last_name)
        setGender(editDoctors.items.item.gender)
        setEmail(editDoctors.items.item.email)
        setDob(editDoctors.items.item.dob)
        setPhone(editDoctors.items.item.phone)
        setPhoto(editDoctors.items.item.photo)
        setAddress(editDoctors.items.item.address)
        setSchool(editDoctors.items.item.school)
        setDepartments(editDoctors.items.item.departments)
    },[editDoctors])
    
    // const submitHandler = async(e) =>{
    //   e.preventDefault()
    //   const res = await fetch(`https://hmsbackend-4388.onrender.com/user/admin/update/${id}`,{
    //     method:'PUT',
    //     headers:{
    //       'Content-Type':'application/json'
    //     },credentials:'include',
    //     body:JSON.stringify({
    //       first_name,
    //       last_name,
    //       gender,
    //       email,
    //       dob,
    //       phone,
    //       photo,
    //       address,
    //       school,
    //       departments
    //     })
    //   })
    //    const data = await res.json()
    //    if (!res.ok) {
    //     console.log(data);
    //     showHide('error', data.errMessage)
    //    } else {
    //     showHide('success','doctor updated')
    //     navigate('/admin/alldoc')
    //     await fetchUserAll()
    //    }     
    // }
    const submitHandler = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('gender', gender);
      formData.append('email', email);
      formData.append('dob', dob);
      formData.append('phone', phone);
      formData.append('photo', photo[0]); // Assuming `photo` is from `e.target.files`
      formData.append('address', address);
      formData.append('school', school);
      formData.append('departments', departments);
  
      try {
          const res = await fetch(`https://hmsbackend-4388.onrender.com/user/admin/update/${id}`, {
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
            await fetchUserAll()
            navigate('/admin/alldoc')
          }
          
          // handle response
      } catch (error) {
          console.error(error);
      }
  };
  return (
    <>
        <div className=" lg:mx-5 lg:min-w-[60rem] mt-4 form w-full">
            <form action="" onSubmit={submitHandler} className='space-y-8'>

                <div className=" lg:flex justify-between items-center mx-4  className">
                      <div className='lg:w-[48%] '>
                        <label for="first_name" className="block mb-2 text-sm font-medium">First name</label>
                       {console.log(editDoctors)
                       }
                        <input type="text" id="full_name" value={first_name} onChange={(e)=>{setFirstName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input Firstname" required />
                      </div>
                      <div className="lg:w-[48%]">
                        <label for="lastName" className="block mb-2 text-sm font-medium">Last Name</label>
                        <input type="text" id="lastName" value={last_name} onChange={(e)=>{setLastName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input Lastname" required />
                    </div>
                </div>

                <div className=" lg:flex justify-between mx-4  className">
                      <div className="lg:w-[48%]">
                        <label for="email" className="block mb-2 text-sm font-medium">Email address</label>
                        <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="john.doe@company.com" required />
                    </div>
                      <div className='lg:w-[48%] '>                       
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                        <input onChange={(e)=>{setPhoto(e.target.files)}}  className="block w-full text-sm text-[#007cff] border border-gray-300 rounded-lg cursor-pointer bg-gray-50 d focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file"/>
                        
                      </div>
                </div>

                <div className=" lg:flex justify-between mx-4">
                  <div className="lg:w-[48%] gender">
                     <label htmlFor="gender" className="block mb-2 text-sm font-medium">Select Gender</label>
                    <select id="gender" value={gender} onChange={(e)=>{setGender(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " required>
                        <option selected>Choose Your Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                        <option value="null">I'd rather not say</option>
                    </select>                      
                  </div>

                  <div className="lg:w-[48%] date">
                    <label htmlFor="" className="block mb-2 text-sm font-medium">Date of Birth</label>
                    <input type="date" name="date" id="dob" value={dob} onChange={(e)=>{setDob(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " required/>
                  </div>
                </div>

                <div className="lg:flex justify-between mx-4">
                    <div className='lg:w-[48%] phone'>
                        <label for="phone" className="block mb-2 text-sm font-medium">Phone number</label>
                        <input type="tel" id="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input Phone Number" pattern="[0-9]{11}" required />
                    </div>
                    <div className='lg:w-[48%] phone'>
                        <label for="department" className="block mb-2 text-sm font-medium">Department</label>
                        <select name="department" value={departments} id="department" onChange={(e)=>{setDepartments(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        {department.map((item, i) => (                        
                          <option key={i} value={item.name}>{item.name} </option>
                      ))}
                        </select>
                    </div>
                   
                </div>

                <div className="lg:flex justify-between mx-4">
                    <div className="lg:w-[48%]">
                        <label for="school" className="block mb-2 text-sm font-medium ">School Attended</label>
                        <input type="text" id="school" value={school} onChange={(e)=>{setSchool(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input School Attended" required />
                    </div> 
                    <div className="lg:w-[48%]">
                        <label for="address" className="block mb-2 text-sm font-medium"> Contact Address</label>
                        <input type="text" id="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input Contact Address" required />
                    </div> 
                </div>

                <div className="flex justify-start mx-4 m-auto">
                    <button type="submit"  class="text-white hover:text-white border bg-[#007cff] w-[200px] border-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Update Doctor</button>
                    <button type="reset" class="text-white hover:text-white border bg-amber-400 w-[200px]   font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2    ">Reset</button>               
                </div>
            </form>
          </div>
    </>
  )
}

export default EditDoctors