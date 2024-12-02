import React, { useContext, useEffect, useState } from 'react'
import HospitalContext from '../../context/HospitalContext'
import { Link } from 'react-router-dom'

function PaymentHistory() {
    const {showHide} = useContext(HospitalContext)
    const [receipts, setReceipts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const getPayment = async()=>{
            const res = await fetch('https://hmsbackend-4388.onrender.com/payment/me',{
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
                showHide('error','An error has occured!')
            } else {
                setReceipts(data)
                setLoading(false)
            }
            
        }
        getPayment()
    },[])
  return (
    <>
         <div className="bg-gray-50 shadow-lg rounded-2xl p-8 max-w-5xl m-auto my-10">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Payment Advice List</h2>
         
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-blue-700">
              <tr>
                <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Receipt ID</th>
                <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Patient Name</th>
                <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Date</th>
                <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Amount</th>
                <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Status</th>
                <th className="py-3 px-6 text-left text-gray-200 font-semibold border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : receipts.length > 0 ? (
                receipts.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-gray-600">{item._id}</td>
                    <td className="py-2 px-4 text-gray-600">{`${item.userId.first_name} ${item.userId.last_name}`}</td>
                    <td className="py-2 px-4 text-gray-600">{new Date(item.paymentDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-gray-600">{`${item.currency} ${item.amount.toLocaleString()}`}</td>
                    <td className="py-2 px-4 text-gray-600">{item.status || 'Pending'}</td>
                    <td className="py-2 px-4">
                      <Link
                        to={`/user/transaction/${item._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No receipts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
 

export default PaymentHistory