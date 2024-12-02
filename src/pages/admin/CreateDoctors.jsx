import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HospitalContext from '../../context/HospitalContext'

function CreateDoctors() {
  const { department,showHide,fetchUserAll} = useContext(HospitalContext)
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
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

 
  console.log(photo);
  console.log(password,confirmPassword, first_name,
    last_name,
    gender,
    email,
    dob,
    phone,
    photo,
    address,
    school,
    departments,
    role);

  

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
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('role', role);

    try {
        const res = await fetch('  https://hmsbackend-4388.onrender.com/user/signup', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        const data = await res.json()
        console.log(data);
        
        // handle response
    } catch (error) {
        console.error(error);
    }
};

  return (
    <div className='my-8 mx-5'>
      <p className='font-[poppins] text-lg text-gray-600 '><Link to="/admin/alldoc" > {`Doctor's List >> `} </Link>CreateDoctors</p>
      <div className=" lg:mx-5 lg:min-w-[60rem] mt-4 form w-full">
            <form action="" onSubmit={submitHandler} className='space-y-8'>

                <div className=" lg:flex justify-between items-center mx-4  className">
                      <div className='lg:w-[48%] '>
                        <label for="first_name" className="block mb-2 text-sm font-medium">First name</label>
                        <input type="text" id="full_name" onChange={(e)=>{setFirstName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input Firstname" required />
                      </div>
                      <div className="lg:w-[48%]">
                        <label for="lastName" className="block mb-2 text-sm font-medium">Last Name</label>
                        <input type="text" id="lastName" onChange={(e)=>{setLastName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input Lastname" required />
                    </div>
                </div>

                <div className=" lg:flex justify-between mx-4  className">
                      <div className="lg:w-[48%]">
                        <label for="email" className="block mb-2 text-sm font-medium">Email address</label>
                        <input type="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="john.doe@company.com" required />
                    </div>
                      <div className='lg:w-[48%] '>                       
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                        <input onChange={(e)=>{setPhoto(e.target.files)}} class="block w-full text-sm text-[#007cff] border border-gray-300 rounded-lg cursor-pointer bg-gray-50 d focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file"/>
                        
                      </div>
                </div>

                <div className=" lg:flex justify-between mx-4">
                  <div className="lg:w-[48%] gender">
                     <label htmlFor="gender" className="block mb-2 text-sm font-medium">Select Gender</label>
                    <select id="gender" onChange={(e)=>{setGender(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " required>
                        <option selected>Choose Your Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>                      
                  </div>

                  <div className="lg:w-[48%] date">
                    <label htmlFor="" className="block mb-2 text-sm font-medium">Date of Birth</label>
                    <input type="date" name="date" id="dob" onChange={(e)=>{setDob(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " required/>
                  </div>
                </div>

                <div className="lg:flex justify-between mx-4">
                    <div className='lg:w-[48%] phone'>
                        <label for="phone" className="block mb-2 text-sm font-medium">Phone number</label>
                        <input type="tel" id="phone" onChange={(e)=>{setPhone(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input Phone Number" pattern="[0-9]{11}" required />
                    </div>
                    <div className="lg:w-[48%]">
                        <label for="address" className="block mb-2 text-sm font-medium"> Contact Address</label>
                        <input type="text" id="address" onChange={(e)=>{setAddress(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input Contact Address" required />
                    </div> 
                   
                </div>

                <div className="lg:flex justify-between gap-2 mx-4">
                    <div className='lg:w-[48%] phone'>
                        <label for="department" className="block mb-2 text-sm font-medium">Department</label>
                        <select name="department" id="department" onChange={(e)=>{setDepartments(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        {department.map((item, i) => (                        
                          <option key={i} value={item.name}>{item.name} </option>
                      ))}
                        </select>
                    </div>
                    <div className="lg:w-[48%]">
                        <label for="role" className="block mb-2 text-sm font-medium ">Role</label>
                        <select id="role" onChange={(e)=>{setRole(e.target.value)}} className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  text-[#007cff] "  required >
                          <option value="">Select Your Role</option>
                          <option value="doctor">Doctor</option>
                        </select>
                    </div> 
                    <div className="lg:w-[48%]">
                        <label for="school" className="block mb-2 text-sm font-medium ">School Attended</label>
                        <input type="text" id="school" onChange={(e)=>{setSchool(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input School Attended" required />
                    </div> 
                </div>

                <div className="lg:flex justify-between mx-4">
                    <div className="lg:w-[48%]">
                        <label for="password" className="block mb-2 text-sm font-medium ">Password</label>
                        <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Input Password" required />
                    </div> 
                    <div className="lg:w-[48%]">
                        <label for="confirm_password" className="block mb-2 text-sm font-medium">Confirm password</label>
                        <input type="password" id="confirm_password" onChange={(e)=>{setConfirmPassword(e.target.value)}} className="bg-gray-50 border border-gray-300 text-[#007cff] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  placeholder-[#007cff] " placeholder="Repeat Password" required />
                    </div> 
                </div>

                <div className="m-auto">
                <button type="submit" className="text-blue-700 hover:text-white border bg-white w-[200px] border-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Create Doctor</button>
                </div>
            </form>
            {/* <Modals>
              
            </Modals> */}
          </div>
       </div>
  )
}

export default CreateDoctors