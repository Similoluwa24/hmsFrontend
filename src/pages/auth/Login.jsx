import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import HospitalContext from '../../context/HospitalContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message for form validation
  const [capsLockWarning, setCapsLockWarning] = useState(false); // Caps Lock state
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(AuthContext);
  const { showHide, fetchUser } = useContext(HospitalContext);
  const navigate = useNavigate();

  // Validate email and password fields
  const validateForm = () => {
    if (!email.trim()) {
      setErrorMessage('Email is required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!password.trim()) {
      setErrorMessage('Password is required.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return false;
    }
    setErrorMessage(''); // Clear error if validation passes
    return true;
  };

  // Handle Caps Lock detection
  const handleKeyDown = (e) => {
    if (e.getModifierState('CapsLock')) {
      setCapsLockWarning(true);
    }
  };

  const handleKeyUp = (e) => {
    if (!e.getModifierState('CapsLock')) {
      setCapsLockWarning(false);
    }
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    setLoading(true);
    try {
      const response = await fetch('https://hmsbackend-4388.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        showHide('error', result.errMessage || 'Login failed');
        return;
      }

      const { user, token } = result;

      if (user.verified === 'false') {
        showHide('error', 'Please verify your account before logging in.');
        navigate('/auth/otp');
        return;
      }

      localStorage.setItem('user', token);
      dispatch({ type: 'LOGIN', payload: result });
      showHide('success', `Welcome ${user.last_name}`);
      const roleRedirects = {
        admin: '/admin/home',
        doctor: '/doctor/home',
        patient: '/user/home',
      };
      navigate(roleRedirects[user.role]);
      await fetchUser();
    } catch (error) {
      console.error('Login Error:', error.message);
      showHide('error', 'An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen container">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8 font-[lora]">Enter My Patient Portal</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400"
              placeholder="john.doe@company.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-blue-400"
              placeholder="Input Password"
            />
            {capsLockWarning && (
              <p className="text-red-500 text-xs mt-1">Warning: Caps Lock is ON!</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-medium transition ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </div>

          <div className="mt-4 flex justify-between text-sm">
            <p className="text-gray-600">
              New Here? <Link to="/auth/register" className="text-blue-600 hover:underline">Join Us</Link>
            </p>
            <p className="text-gray-600">
              Forgot Password? <Link to="/auth/forgot" className="text-blue-600 hover:underline">Click Here!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
