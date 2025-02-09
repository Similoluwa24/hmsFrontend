import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import HospitalContext from "../../context/HospitalContext";

const PharmacyRecords = () => {
  const { records, getallPharmacy } = useContext(HospitalContext);
  const navigate = useNavigate();

  useEffect(() => {
    getallPharmacy(); // Fetch data when component mounts
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting record with ID:", id); // Debugging log

    if (!id) {
      console.error("Invalid ID:", id);
      return;
    }

    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const res = await fetch(`https://hmsbackend-4388.onrender.com/pharmacy/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("user")}`,
          "Content-Type": "application/json"
        },
      });
      const data = await res.json()

      if (res.ok) {
        console.log("Record deleted successfully:", id);
        await getallPharmacy(); // Refresh data
      } else {
        console.error("Failed to delete record");
        console.log(data);
        
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Pharmacy Records</h2>
      <Link to={"/admin/allpharm"} className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Add Pharmacy
      </Link>

      <table className="w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Patient</th>
            <th className="border border-gray-300 p-2">Doctor</th>
            <th className="border border-gray-300 p-2">Drugs</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records && records.length > 0 ? (
            records.map((record) => {
              console.log("Record ID:", record._id); // Debugging log

              return (
                <tr key={record._id}>
                  <td className="border border-gray-300 p-2">{new Date(record.dateDispensed).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2">
                    {`${record.patients?.first_name || ""} ${record.patients?.last_name || ""}`.trim() || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {`Dr ${record.doctor?.first_name || ""} ${record.doctor?.last_name || ""}`.trim() || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {record.drugs.map((drug, index) => (
                      <p key={index}>
                        {drug.name} - {drug.quantity} ({drug.dosage})
                      </p>
                    ))}
                  </td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <button 
                      onClick={() => navigate(`/admin/edit-pharmacy/${record._id}`)} 
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FiEdit size={18} />
                    </button>

                    <button 
                      onClick={() => handleDelete(record._id)} 
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">No pharmacy records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacyRecords;
