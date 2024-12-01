import React, { useContext, useEffect, useState } from 'react'
import HospitalContext from '../../context/HospitalContext';
import { useParams } from 'react-router-dom';

function AdminReceipts() {
    const params = useParams()
    const id = params.id
    const { showHide } = useContext(HospitalContext);
    const [loading, setLoading] = useState(true);
    const [receipts, setReceipts] = useState([]);
  
    useEffect(() => {
      const fetchReceipts = async () => {
        const res = await fetch(`http://localhost:5000/payment/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        const data = await res.json();
        console.log(data);
        
        if (!res.ok) {
          console.log(data);
          showHide('error', 'Something went wrong');
        } else {
          setReceipts(data); // Ensure it's an array
          setLoading(false);
          // console.log(receipts);
          
        }
      };
  
      fetchReceipts();
    }, []);
  
  return (
    <>
         {
            loading ? (
                <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">Loading</div>
            ):(
                <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
                {/* Header */}
                <div className="text-center border-b pb-4">
                  <h1 className="text-2xl font-bold text-gray-800">Hospital Receipt</h1>
                  <p className="text-sm text-gray-500">Thank you for your payment!</p>
                </div>
              
                <div className="mt-4">
                  <h2 className="text-lg font-medium text-gray-800">Payment Details</h2>
                  <p className="text-sm text-gray-600">
                    <strong>Transaction Reference:</strong> {receipts.transactionReference}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Receipt Number:</strong> {receipts._id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong> {new Date(receipts.paymentDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        receipts.status === "Successful"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {receipts.status}
                    </span>
                  </p>
                </div>
          
                {/* Patient Info */}
                <div className="mt-4">
                  <h2 className="text-lg font-medium text-gray-800">Patient Information</h2>
                  <p className="text-sm text-gray-600">
                    <strong>Name:</strong> {`${receipts.userId.first_name} ${receipts.userId.last_name}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Address:</strong> {receipts.userId.address}
                  </p>
                </div>
          
                {/* Services */}
                <div className="mt-4">
                  <h2 className="text-lg font-medium text-gray-800">Services</h2>
                  <table className="w-full mt-2 text-sm text-left text-gray-500">
                    <thead className="text-gray-700 bg-gray-100">
                      <tr>
                        <th className="py-2 px-4">Service</th>
                        <th className="py-2 px-4 text-right">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receipts.invoiceId.services.map((service, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{service.name}</td>
                          <td className="py-2 px-4 text-right"><s>N</s>{service.cost.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
          
                {/* Total */}
                <div className="mt-4 text-right">
                  <p className="text-lg font-semibold text-gray-800">
                    Total Paid: <s>N</s>{receipts.invoiceId.totalCost.toFixed(2)}
                  </p>
                </div>
          
                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>If you have any questions, contact us at support@hospital.com</p>
                </div>
                
              </div> 
            )
         }
       
    </>
  )
}

export default AdminReceipts