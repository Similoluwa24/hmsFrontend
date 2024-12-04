import React from 'react'

function Table() {
  return (
    <>
     <div className="p-6 bg-gray-50">
  <h2 className="text-2xl font-bold mb-4 text-gray-700">Your Past Vital Signs</h2>

  <div className="overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 bg-white border border-gray-200">
      <thead className="text-xs text-gray-700 uppercase bg-gray-200">
        <tr>
          <th scope="col" className="px-6 py-3">Date</th>
          <th scope="col" className="px-6 py-3">Blood Pressure (mmHg)</th>
          <th scope="col" className="px-6 py-3">Temperature (°C)</th>
          <th scope="col" className="px-6 py-3">Weight (kg)</th>
          <th scope="col" className="px-6 py-3">Height (m)</th>
          <th scope="col" className="px-6 py-3">BMI</th>
        </tr>
      </thead>
      {/* <tbody>
        {vitals.map((vital, index) => (
          <tr key={index} className="border-b bg-white">
            <td className="px-6 py-4">{vital.date}</td>
            <td className={`px-6 py-4 ${getBPClass(vital.bp)}`}>
              {vital.bp}
            </td>
            <td className="px-6 py-4">{vital.temperature}</td>
            <td className="px-6 py-4">{vital.weight}</td>
            <td className="px-6 py-4">{vital.height}</td>
            <td className="px-6 py-4">
              {calculateBMI(vital.weight, vital.height).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody> */}
    </table>
  </div>

  <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Medical Guide</h3>
    <ul className="list-disc list-inside text-gray-600">
      <li><strong>Blood Pressure:</strong>
        <ul className="ml-6 mt-2 list-disc">
          <li>Normal: Less than 120/80 mmHg</li>
          <li>{`Elevated: 120-129/<80 mmHg`}</li>
          <li>High (Stage 1): 130-139/80-89 mmHg</li>
          <li>High (Stage 2): ≥140/≥90 mmHg</li>
        </ul>
      </li>
      <li className="mt-4"><strong>BMI:</strong>
        <ul className="ml-6 mt-2 list-disc">
          <li>Underweight: BMI &lt; 18.5</li>
          <li>Normal: BMI 18.5–24.9</li>
          <li>Overweight: BMI 25–29.9</li>
          <li>Obesity: BMI ≥ 30</li>
        </ul>
      </li>
    </ul>
  </div>
</div>
    </>
  )
}

export default Table