import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HospitalContext from '../../context/HospitalContext';

function Billings() {
  const {showHide} = useContext(HospitalContext)
  const params = useParams()
    const showIn = params.id
    const [details,setDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    
    useEffect(()=>{
        const fetchInvoice = async () => {
          const res = await fetch(`https://hmsbackend-4388.onrender.com/invoice/admin/${showIn}`,{
            method:'GET',
            headers:{
              'Content-Type':'application/json',
               'Authorization': `Bearer ${localStorage.getItem("user")}`
            },
            credentials:'include'
          })
          const data = await res.json()
          console.log(data.invoice);
          
          if (!res.ok) {
            console.log(data);
          } else {
            setDetails(data.invoice)
           setLoading(false)
           
          }
          
        }
        fetchInvoice()
      },[showIn])

  


      const payUp = async (e) => {
        e.preventDefault();
        
        try {
          const res = await fetch('https://hmsbackend-4388.onrender.com/payment/initiate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               'Authorization': `Bearer ${localStorage.getItem("user")}`
            },
            credentials: 'include',
            body: JSON.stringify({ invoiceId: showIn }),
          });
      
          const data = await res.json();
      
          // Handle the case where the invoice is already paid
          if (data === 'This invoice has been paid') {
            showHide('error', 'This payment has been made');
            return; 
          }
      
          // Handle general errors
          if (!res.ok) {
            showHide('error', 'Something went wrong');
            console.error(data);
            return;
          }
      
          // Redirect the user to the payment link
          if (data.paymentLink) {
            window.location.href = data.paymentLink;
          }
        } catch (error) {
          console.error('An unexpected error occurred:', error);
          showHide('error', 'An unexpected error occurred. Please try again.');
        }
      };
      
  return (
    <>
    <div className="bg-gray-50 shadow-lg rounded-2xl p-8 max-w-3xl m-auto my-10 space-y-8 border border-gray-200">
      {
        loading ? (
          <div className="">Loading...</div>
        ):(
          details.map((detail, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="lg:text-3xl font-bold text-gray-900">Payment Invoice</h2>
                <p className="text-gray-600 text-[13px] md:text-lg "> #INV-{detail._id}</p>
              </div>
        
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Patient Name:</p>
                  <p className="text-lg">{detail.patientId.first_name} {detail.patientId.last_name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Date:</p>
                  <p className="text-lg">{new Date(detail.issuedDate).toDateString()}</p>
                </div>
              </div>
        
              <div className="mt-6 border-t pt-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Services Breakdown</h3>
                <div className="space-y-2">
                  {detail.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex justify-between border-b pb-2">
                      <p className="text-gray-700">{service.name}</p>
                      <p className="text-gray-700"><s>N</s>{service.cost.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
        
              <div className="mt-6 flex justify-between items-center border-t pt-4">
                <h3 className="text-xl font-bold">Total Amount Due:</h3>
                <p className="text-xl font-bold text-indigo-600"><s>N</s>{detail.totalCost.toFixed(2)}</p>
              </div>
        
              <div className="mt-8 text-right">
                <button onClick={payUp} className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 transition duration-300">
                  Pay Now
                </button>
              </div>
            </div>
          ))
        )}
</div>
    </>
  );
}

export default Billings;
