import React, { useContext, useState } from "react";
import HospitalContext from "../context/HospitalContext";
import { useNavigate } from "react-router-dom";

const AddPharmacyRecord = ({ onSubmit }) => {
  const [patients, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [drugs, setDrugs] = useState([{ name: "", quantity: "", dosage: "" }]);
  const [linkedAppointment, setLinkedAppointment] = useState("");
  const [linkedDiagnosis, setLinkedDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const {patient, doctors,showHide, getallPharmacy} = useContext(HospitalContext)
  const navigate = useNavigate()

  const handleDrugChange = (index, field, value) => {
    const updatedDrugs = [...drugs];
    updatedDrugs[index][field] = value;
    setDrugs(updatedDrugs);
  };

  const addDrugField = () => {
    setDrugs([...drugs, { name: "", quantity: "", dosage: "" }]);
  };

  const formdata = {patients,
    doctor,
    drugs, 
    linkedAppointment,
    linkedDiagnosis,
    notes}
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formdata);
    
    const res = await fetch('https://hmsbackend-4388.onrender.com/pharmacy/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      },
      credentials: 'include',
      body: JSON.stringify(formdata),
    });
    const data = await res.json()
    if (!res.ok) {
      console.log(data);
      showHide('error', 'Something went wrong!')
    } else {
     showHide('success','Medication History Created Successfully')
     await getallPharmacy()
     navigate('/admin/records')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mt-12 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Pharmacy Record</h2>

      {/* Patient ID */}
      <div className="mb-3 p-3 border rounded bg-gray-50">

        <label htmlFor="patient">Patient</label>
          <select name="" id="" className="w-full border p-2 rounded mb-3 text-gray-400" onChange={(e) => setPatient(e.target.value)}>
            <option value="" className="">Choose Patient Name</option>
            {patient.map((item) => (
                        <option value={item._id} key={item._id}>
                          {` ${item.last_name} ${item.first_name}`}
                        </option>
                      ))}
          </select>

        {/* Doctor ID */}
        <label htmlFor="patient">Doctor</label>
        <select name="" id="" className="w-full border p-2 rounded mb-3 text-gray-400" onChange={(e) => setDoctor(e.target.value)}>
          <option value="">Choose Doctor Name</option>
          {doctors.map((item) => (
                      <option value={item._id} key={item._id}>
                        {`Dr. ${item.last_name} ${item.first_name}`}
                      </option>
                    ))}
        </select>
      </div>

      {/* Drugs Section */}
      <h3 className="font-semibold mb-2">Drugs</h3>
      {drugs.map((drug, index) => (
        <div key={index} className="mb-3 p-3 border rounded bg-gray-50">
          <input
            type="text"
            placeholder="Drug Name"
            value={drug.name}
            onChange={(e) => handleDrugChange(index, "name", e.target.value)}
            className="w-full border p-2 rounded mb-2"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={drug.quantity}
            onChange={(e) => handleDrugChange(index, "quantity", e.target.value)}
            className="w-full border p-2 rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="Dosage"
            value={drug.dosage}
            onChange={(e) => handleDrugChange(index, "dosage", e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
      ))}
      <button type="button" onClick={addDrugField} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        + Add Drug
      </button>

      {/* Optional Fields */}
      <input
        type="text"
        placeholder="Linked Appointment (Optional)"
        value={linkedAppointment}
        onChange={(e) => setLinkedAppointment(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="text"
        placeholder="Linked Diagnosis (Optional)"
        value={linkedDiagnosis}
        onChange={(e) => setLinkedDiagnosis(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <button type="submit" className="bg-green-500 text-white py-2 px-6 rounded w-full">
        Submit
      </button>
    </form>
  );
};

export default AddPharmacyRecord;
