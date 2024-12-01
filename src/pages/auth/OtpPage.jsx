import React, { useContext, useRef } from 'react';
import otp from '../../assets/otpp.png';
import { AuthContext } from '../../context/AuthContext';
import HospitalContext from '../../context/HospitalContext';

function OtpPage() {
  const { user } = useContext(HospitalContext);
  const [state, dispatch] = useContext(AuthContext);

  // References to the input fields for focusing control
  const inputRefs = useRef([]);

  // Function to handle input and move to the next field
  const handleInputChange = (e, index) => {
    if (e.target.value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className='bg-white space-y-4 w-full h-[90vh]'>
      <div className="flex flex-col lg:pt-14 items-center">
        <img src={otp} alt="" className='w-[150px] h-[150px]' />
        <div className="txt">
          <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please enter the 6-digit code we sent via email.
          </p>
          <a href="mailto:someone@example.com" className='text-[#007cff] mt-2 text-sm font-semibold underline'>{user}</a>
        </div>
      </div>
      <div className="flex justify-center input">
        <form className="max-w-sm mx-auto">
          <div className="flex mb-2 space-x-2">
            {[...Array(6)].map((_, index) => (
              <div key={index}>
                <label htmlFor={`code-${index + 1}`} className="sr-only">{`Code ${index + 1}`}</label>
                <input
                  type="text"
                  maxLength="1"
                  id={`code-${index + 1}`}
                  className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="text-[#007cff] hover:text-white border bg-white w-full mt-5 border-[#007cff] hover:bg-[#007cff] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-5 mb-2"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpPage;
