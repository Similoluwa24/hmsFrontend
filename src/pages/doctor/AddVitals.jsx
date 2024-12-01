import React, { useState } from 'react';

const AddVitals = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const vitalsData = {
      bloodPressure: {
        systolic,
        diastolic,
      },
      temperature,
      weight,
      height,
    };

    try {
      const response = await fetch('/api/vitals/add-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(vitalsData),
      });

      if (response.ok) {
        alert('Vitals added successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred while adding vitals.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Add Patient Vitals</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Vital</th>
              <th className="px-4 py-2 border border-gray-300">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Systolic BP</td>
              <td className="px-4 py-2 border border-gray-300">
                <input
                  type="number"
                  className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Diastolic BP</td>
              <td className="px-4 py-2 border border-gray-300">
                <input
                  type="number"
                  className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Temperature (°C)</td>
              <td className="px-4 py-2 border border-gray-300">
                <input
                  type="number"
                  className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Weight (kg)</td>
              <td className="px-4 py-2 border border-gray-300">
                <input
                  type="number"
                  className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Height (cm)</td>
              <td className="px-4 py-2 border border-gray-300">
                <input
                  type="number"
                  className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddVitals;
