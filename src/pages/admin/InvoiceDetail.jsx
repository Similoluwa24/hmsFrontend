import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function InvoiceDetail() {
    const params = useParams()
    const showIn = params.id
    const [details,setDetails] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        const fetchInvoice = async () => {
          const res = await fetch(`https://hmsbackend-4388.onrender.com/invoice/admin/${showIn}`,{
            method:'GET',
            headers:{
              'Content-Type':'application/json'
            },
            credentials:'include'
          })
          const data = await res.json()
          console.log(data);
          
          if (!res.ok) {
            console.log(data);
          } else {
            setDetails(data.invoice)
           setLoading(false)
          }
          
        }
        fetchInvoice()
      },[showIn])
  return (
    <>
        <div className="p-6 bg-white border border-gray-200 shadow-md rounded-lg max-w-4xl mx-auto mt-8">
            <div className=" rounded-lg p-6 capitalize max-w-md mx-auto mt-10 space-y-4">
                <div className="text-center border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-gray-400"><Link to={'/admin/transactions'} className="text-xl font-bold text-gray-400">{"Invoice >>>"}</Link> Invoice Details</h2>
                    
                </div>
                {loading ? (
                  <div className="flex justify-center items-center">
                      <div className="w-6 h-6 rounded-full border-t-4 border-blue-700 animate-spin"></div>
                      <p>Loading...</p>
                  </div>
                ):(

                details.map((details,index)=>(
                    <div className="space-y-2">
                        <p className="text-gray-600">
                        <span className="font-medium text-gray-800">ID: </span>{details._id}
                        </p>
                        <p className="text-gray-600 lowercase">
                        <span className="font-medium capitalize text-gray-800">Patient Name: </span>{`${details.patientId.first_name} ${details.patientId.last_name}`}
                        </p>
                        <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Phone: </span>{details.patientId.phone}
                        </p>
                        <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Invoice Created At: </span>{new Date(details.issuedDate).toLocaleString()}
                        </p>
                        <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Address: </span>{details.patientId.address}
                        </p>
                        <h3 className="font-medium text-gray-800">Services</h3>
                        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="border border-gray-300 px-4 py-2">Service</th>
                                    <th className="border border-gray-300 px-4 py-2">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                            {details.services.map((service, index) => (
                                <tr key={service._id}>
                                    <td className="border border-gray-300 px-4 py-2">{service.name}</td>
                                    <td className="border border-gray-300 px-4 py-2"><s>N</s>{service.cost.toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <h3 className="text-right text-lg font-semibold mt-4">
                            Total Cost: <s>N</s>{details.totalCost.toFixed(2)}
                        </h3>
                    </div>
                ))
                
                )}
            </div> 
        </div>
    </>
  )
}

export default InvoiceDetail