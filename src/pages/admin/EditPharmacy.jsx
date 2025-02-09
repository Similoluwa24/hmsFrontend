import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPharmacy = () => {
  const { id } = useParams(); // Get pharmacy ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patients: "",
    doctor: "",
    drugs: [],
    linkedAppointment: "",
    linkedDiagnosis: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPharmacyRecord = async () => {
      try {
        const res = await fetch(`https://hmsbackend-4388.onrender.com/pharmacy/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("user")}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setFormData(data.data); // Set fetched data in form
          setLoading(false);
        } else {
          setError(data.message || "Failed to fetch record");
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching record");
        setLoading(false);
      }
    };

    fetchPharmacyRecord();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDrugChange = (index, field, value) => {
    const updatedDrugs = [...formData.drugs];
    updatedDrugs[index][field] = value;
    setFormData({ ...formData, drugs: updatedDrugs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`https://hmsbackend-4388.onrender.com/pharmacy/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("user")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Pharmacy record updated successfully!");
        navigate("/admin/pharmacy"); // Redirect to pharmacy list
      } else {
        setError(data.message || "Failed to update record");
      }
    } catch (err) {
      setError("Error updating record");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Pharmacy Record</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Field */}
            <div>
              <label className="block font-medium">Patient</label>
              <input
                type="text"
                name="patients"
                value={
                  formData.patients
                    ? `${formData.patients.first_name || ""} ${formData.patients.last_name || ""}`
                    : ""
                }
                readOnly
                className="w-full border p-2 rounded mt-1 bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* Doctor Field */}
            <div>
              <label className="block font-medium">Doctor</label>
              <input
                type="text"
                name="doctor"
                value={
                  formData.doctor
                    ? `Dr. ${formData.doctor.first_name || ""} ${formData.doctor.last_name || ""}`
                    : ""
                }
                readOnly
                className="w-full border p-2 rounded mt-1 bg-gray-200 cursor-not-allowed"
              />
            </div>


          {/* Drugs List */}
          <div>
            <label className="block font-medium">Drugs</label>
            {formData.drugs && formData.drugs.length > 0 ? (
  formData.drugs.map((drug, index) => (
    <div key={index} className="flex gap-2 mb-2">
      <input
        type="text"
        value={drug.name}
        onChange={(e) => handleDrugChange(index, "name", e.target.value)}
        className="border p-2 rounded w-1/3"
        placeholder="Drug Name"
      />
      <input
        type="number"
        value={drug.quantity}
        onChange={(e) => handleDrugChange(index, "quantity", e.target.value)}
        className="border p-2 rounded w-1/3"
        placeholder="Quantity"
      />
      <input
        type="text"
        value={drug.dosage}
        onChange={(e) => handleDrugChange(index, "dosage", e.target.value)}
        className="border p-2 rounded w-1/3"
        placeholder="Dosage"
      />
    </div>
  ))
) : (
  <p className="text-gray-500">No drugs added yet.</p>
)}

          </div>

          {/* Linked Appointment Field */}
          <div>
            <label className="block font-medium">Linked Appointment</label>
            <input
              type="text"
              name="linkedAppointment"
              value={formData.linkedAppointment}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* Linked Diagnosis Field */}
          <div>
            <label className="block font-medium">Linked Diagnosis</label>
            <input
              type="text"
              name="linkedDiagnosis"
              value={formData.linkedDiagnosis}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* Notes Field */}
          <div>
            <label className="block font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 h-24"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Update Record
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/records")}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPharmacy;
