import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Pending() {
  const [pendingInvoices, setPendingInvoices] = useState([]);

  // Fetch pending invoices
  useEffect(() => {
    const fetchPendingInvoices = async () => {
      try {
        const res = await fetch('https://hmsbackend-4388.onrender.com/prescription/pending', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("user")}`
          },
          credentials: 'include', // Include cookies if needed
        });

        const data = await res.json();
        if (res.ok) {
          setPendingInvoices(data || []);
          console.log(data);
          
        } else {
          console.error(data || 'Failed to fetch pending invoices');
        }
      } catch (error) {
        console.error('Error fetching pending invoices:', error);
      }
    };

    fetchPendingInvoices();
  }, []);

  return (
    <div className="p-6 bg-gray-50 shadow-lg rounded-xl max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Pending Invoices</h1>
      <Link
          to={'/admin/transactions'}
          className="bg-gradient-to-r from-green-400 to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:from-green-500 hover:to-blue-700 transition duration-300"
        >
          Invoice List
        </Link>
      </div>

      {pendingInvoices.length === 0 ? (
        <p className="text-gray-600">No pending invoices found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Patient Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Ailment</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Medication</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Doctor</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingInvoices.map((invoice, index) => (
              <tr key={invoice._id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {invoice.patient.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 capitalize">{invoice.ailment}</td>
                <td className="border border-gray-300 px-4 py-2 capitalize">{invoice.medication}</td>
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {invoice.doctor?.first_name } {invoice.doctor?.last_name }
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(invoice.dop).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        <Link to={`/admin/invoice/${invoice._id}`}
                            // onClick={() => handleGenerateInvoice(invoice._id)}
                        >
                            Generate Invoice
                        </Link >
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// // Function to handle invoice generation
// const handleGenerateInvoice = async (prescriptionId) => {
//   try {
//     const res = await fetch('https://hmsbackend-4388.onrender.com/invoice/generate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify({ prescriptionId }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert('Invoice generated successfully!');
//       window.location.reload(); // Reload page to update the list
//     } else {
//       alert(`Error: ${data.error || 'Failed to generate invoice'}`);
//     }
//   } catch (error) {
//     console.error('Error generating invoice:', error);
//   }
// };

export default Pending;
