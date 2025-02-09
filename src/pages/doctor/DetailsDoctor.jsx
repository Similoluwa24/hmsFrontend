import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetailsDoctor() {
  const { id } = useParams(); // Get patient ID from URL parameters
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(id);
  

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`https://hmsbackend-4388.onrender.com/user/admin/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user')}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data);
          throw new Error(data.errMessage || 'Failed to fetch patient details');
          
        }

        setPatient(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  if (loading) return <p>Loading patient details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Patient Details</h1>
      {patient ? (
        <div className="space-y-4">
          <p className="text-lg"><span className="font-semibold">Name:</span> {patient.first_name} {patient.last_name}</p>
          <p className="text-lg"><span className="font-semibold">Email:</span> {patient.email}</p>
          <p className="text-lg"><span className="font-semibold">Phone:</span> {patient.phone}</p>
          <p className="text-lg"><span className="font-semibold">Address:</span> {patient.address}</p>
          <p className="text-lg"><span className="font-semibold">Unique ID:</span> {patient.uniqueId}</p>
          <p className="text-lg"><span className="font-semibold">NHIS:</span> {patient.NHIS}</p>
          <p className="text-lg"><span className="font-semibold">Gender:</span> {patient.gender}</p>
          <p className="text-lg"><span className="font-semibold">Blood Type:</span> {patient.btype}</p>
          <p className="text-lg"><span className="font-semibold">Genotype:</span> {patient.genotype}</p>
          <p className="text-lg"><span className="font-semibold">Date of Birth:</span> {new Date(patient.dob).toLocaleDateString()}</p>
          <p className="text-lg"><span className="font-semibold">Age:</span> {calculateAge(patient.dob)} years</p>
          <p className="text-lg"><span className="font-semibold">Account Verified:</span> {patient.verified === 'true' ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p className="text-red-500">Patient not found</p>
      )}

      <div className="mt-6">
        <Link
          to="/doctor/home"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default DetailsDoctor;
