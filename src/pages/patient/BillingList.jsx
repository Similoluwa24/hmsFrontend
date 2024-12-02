import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FaRegEye } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function BillingList() {
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchInvoice =  async () => {
            const res = await fetch ('https://hmsbackend-4388.onrender.com/invoice/user',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                     'Authorization': `Bearer ${localStorage.getItem("user")}`
                },
                credentials:'include'
            })
            const data = await res.json()
            console.log(data);
            if (!res.ok) {
                console.log(data);
                
            } else {
                setInvoices(data.invoice)
                setLoading(false)
            }
            
        }
        fetchInvoice()
    },[])

    
  return (
    <div>
         <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-blue-700">
                    <tr>
                    <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Invoice ID</th>
                    <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Date</th>
                    <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Amount</th>
                    <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Status</th>
                    <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Action</th>
                    </tr>
                </thead>
                {loading ? (
            <div className="flex justify-center items-center py-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                <span className="text-xl text-gray-700">Loading...</span>
              </div>
            </div>
          ):(
            <tbody>
                {invoices[0] !== null ? (
                    
                    invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b capitalize hover:bg-gray-50">
                        <td className="py-3 px-6 text-gray-700">{invoice._id}</td>
                        <td className="py-3 px-6 text-gray-700">{new Date(invoice.issuedDate).toLocaleDateString()}</td>
                        <td className="py-3 px-6 text-gray-700">NGN {invoice.totalCost}</td>
                        <td className={`py-3 px-6 text-gray-700 font-semibold ${
                        invoice.status === 'paid' ? 'text-green-600' :
                        invoice.status === 'pending' ? 'text-yellow-600' :
                        'text-red-600'
                        }`}>{invoice.status}</td>
                        <td className="px-6 py-3 flex space-x-2 items-center justify-center bg-blue-100">
                        <Link to={`/user/billing/${invoice._id}`}><FaRegEye className="text-blue-600 hover:text-blue-800 transition"/></Link>
                        
                        </td>
                    </tr>
                    ))
                ):(
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                     <td className="px-6 py-4 whitespace-nowrap text-sm" colSpan={5}>No Invoice Found for this user</td>
                </tr>
                )}
            </tbody>

          )}
            </table>
          </div>
    </div>
  )
}

export default BillingList