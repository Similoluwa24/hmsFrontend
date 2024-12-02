import { createContext,useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
const HospitalContext = createContext()
import Cookies from 'js-cookie'
import useAlert from "../hooks/useAlert";

export const HospitalProvider = ({children})=>{
  // const [doctors, setDoctors] = useState([])
  const [faq, setFaq] = useState([])
  const [department, setDepartment] = useState([])
  // const [patient, setPatient] = useState([])
    const [appointment, setAppointment] = useState([])
    const [pharmacy, setPharmacy] = useState([])
    const [inventory, setInventory] = useState([])
    const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
    const [alluser, setallUser]  = useState([])
    const [appoint, setAppoint] = useState([])
    const [appointmentbyDoctor,  setAppointmentbyDoctor] = useState([])
    const [state, dispatch] =  useContext(AuthContext);
    const isAuthenticated = state.user !== null
    const token = Cookies.get('token') 
    const tokens = localStorage.getItem('user')
    // console.log(tokens);
    
    const {alertInfo, showHide} = useAlert()
    useEffect(()=>{
         fetchUser()
        fetchUserAll()
        getallDepartment()
        getallApointment()
        getallPharmacy()
        getInventory()
        getAppointmentById();
        getAppointmentbyDoctor();
    },[isAuthenticated])
    const [editAppointment, setEditAppointment] = useState({
      items:{},
      edit:false
    })
    const [editInventory , setEditInventory] = useState({
      edit: false,
      items:{}
    })
    const [editPatient, setEditPatient] = useState({
      edit : false,
      items:{}
    })
    const [editDoctors, setEditDoctors] = useState({
      edit:false,
      items:{}
    })
    const [editPharmacy, setEditPharmacy] = useState({
      edit:false,
      items:{}
    })
    const [editDepartment, setEditDepartment ] = useState({
      edit:false,
      items:{}
    })
    const[editUser, setEditUser] =useState({
      esit:false,
      items:{}
    })

  
  const fetchUser = async () => {
  try {
    const res = await fetch('https://hmsbackend-4388.onrender.com/user/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache', 
        'Authorization': `Bearer ${localStorage.getItem("user")}`
      },
       credentials: 'include',
    });
    console.log(localStorage.getItem("user"));
    
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

    
    // If you want to log the state when it changes:
    // useEffect(() => {
    //   console.log(user);
    // }, [user]);
    
    const fetchUserAll = async () => {
      try {
        const res = await fetch('https://hmsbackend-4388.onrender.com/user/admin',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem("user")}`
          },
          credentials: 'include', // This allows cookies to be sent with the request
        })
        const data = await res.json()
        
        
        if (res.ok) {
          setallUser(data.users)
        } else {
          console.log({message: data});
        }
      } catch (error) {
        console.log({message:error.message});
        
      }
    }
    const doctors = alluser.filter((user)=>user.role === 'doctor')
    const patient = alluser.filter((user)=>user.role === 'patient')
    const admin = alluser.filter((user)=>user.role === 'admin')


    
    const getallDepartment = async ()=>{
      try {
        const res = await fetch('https://hmsbackend-4388.onrender.com/department/admin/get',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem("user")}`
          },
          credentials:'include',
        })
        const data = await res.json()
        if (!res.ok) {
          console.log(data);
          showHide('error',data.errMessage)
        } else {
          setDepartment(data.findDept)    
          // console.log(data);
             
          
        }
      } catch (error) {
        console.log({message:error.message});
        
      }
        
    }
   

 

    const getallApointment = async () => {
      try {
        const res = await fetch('https://hmsbackend-4388.onrender.com/appointment/admin',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem("user")}`
          },
          credentials:'include',
        })
        const data = await res.json()
        if (res.ok) {
        //  console.log(data);
         
          setAppointment(data.findApp)      
        } else {
          console.log({message: data});
        }
      } catch (error) {
        console.log({message:error.message});
        
      }
    }
  
    //getappointment by Id
    
      const getAppointmentById = async () => {
        try {
          const res = await fetch(`https://hmsbackend-4388.onrender.com/appointment/get`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("user")}`
            },
            credentials: 'include', // Sends cookies with the request
          });
  
          const data = await res.json();
  
          if (!res.ok) {
            console.log(data);
            showHide('error', data.errMessage); // Show error if response is not ok
          } else {
            setAppoint(data.findApp); // Set the appointment data in state
            // console.log(data);
          }
        } catch (error) {
          console.error("Network error:", error);
          showHide('error', "Network error occurred. Please try again."); // Handle network error
        }
      };
  
     
      
        const getAppointmentbyDoctor = async () => {
            try {
                const res = await fetch(`https://hmsbackend-4388.onrender.com/appointment/doctor`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("user")}`
                    },
                    credentials: 'include' // Ensure the backend supports credentials
                });
    
                const data = await res.json();
    
                if (!res.ok) {
                    // console.error('Error response:', data);
                    // showHide('error', data.message || data.errMessage);
                } else {
                    setAppointmentbyDoctor(data.appointments); // Adjust based on the data structure
                    // console.log('Appointments data:', data);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        
    
    
      
      

    const getallPharmacy = async () => {
      try {
        const res = await fetch('https://hmsbackend-4388.onrender.com/pharmacy/meds',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem("user")}`
          },
          credentials:'include',
        })
        const data = await res.json()
        if (!res.ok) {
          console.log(data);       
        } else {
          setPharmacy(data.meds)
          // console.log(data);
             
        }
        
      } catch (error) {
        console.log({message:error.message});
        
      }
    }
    const getInventory = async () => {
      const res = await fetch(`https://hmsbackend-4388.onrender.com/inventory/admin/get`,{
        method:'GET',
        headers:{
          'Content-Type':"appication/json",
          'Authorization': `Bearer ${localStorage.getItem("user")}`
        },
        credentials:'include'
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data);
        showHide('error',data.errMessage)
      } else {
        setInventory(data.data)
        // console.log(data);
                
      }
    }
    
    const editAppointmentHandler = (items)=>{
      setEditAppointment({
        edit:true,
        items
      })
    }


 
 
    const editPatientHandler = (items)=>{
      setEditPatient({
        edit:true,
        items
      })
      console.log(editPatient);
      
    }


    const editDoctorHandler = (items)=>{
      setEditDoctors({
        edit: true,
        items
      })
    }

  

    const editPharmacyHandler = (items)=>{
      setEditPharmacy({
        edit:true,
        items
      })
    }


    const editDepartmentHandler = (items)=>{
      setEditDepartment({
        edit:true,
        items
      })
    }

    const editUserHandler = (items)=>{
      setEditUser({
        edit:true,
        items
      })
    }



    const editInventoryHandler = (items)=>{
      setEditInventory({
        edit:true,
        items
      })
    }
  
    return (
        <HospitalContext.Provider value={{
           user,
            isAuthenticated,
            alluser,
            doctors,
            faq,
            department,
            patient,
            pharmacy,
            inventory,
            editPatient,
            appointment,
            editAppointment,
            editDoctors,
            editPharmacy,
            editDepartment,
            editInventory,
            alertInfo,
            appoint,
            editUser,
            appointmentbyDoctor,
            getAppointmentbyDoctor,
            editUserHandler,
            getallApointment,
            fetchUserAll,
            fetchUser,
            getallPharmacy,
            getallDepartment,
            getInventory,
            getAppointmentById,
             showHide,
            editAppointmentHandler,
            editPatientHandler,
            editDoctorHandler,
            editPharmacyHandler,
            editDepartmentHandler,
            editInventoryHandler,

            
        }}>
                {children}
        </HospitalContext.Provider>
    )
}

export default HospitalContext