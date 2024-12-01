import React, { useContext, useEffect, useState } from 'react';
import HospitalContext from '../context/HospitalContext';

import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'; // Add more icons as needed

function Alert() {
    const { alertInfo } = useContext(HospitalContext);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (alertInfo.show) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alertInfo.show]);

    // Define icons based on alert type
    const icon = alertInfo.type === 'success' 
        ? <FaCheckCircle className="inline text-white" /> 
        : <FaExclamationTriangle className="inline text-white" />;

    return (
        <div>
            {isVisible && (
                <div
                    className={`${alertInfo.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
                    fixed top-5 left-1/2 transform -translate-x-1/2 z-50 text-center p-4 max-w-sm rounded-lg shadow-lg transition-transform duration-300 ease-in-out 
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} text-white`}
                >
                    <div className="space-x-4 capitalize ">
                        {icon} {/* Use icon variable */}
                        <span>{alertInfo.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Alert;
