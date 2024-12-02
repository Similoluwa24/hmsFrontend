import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://hmsbackend-4388.onrender.com/user/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data.user); // Set the user data to state
      } catch (error) {
        setError(error.message); // Set error message to state
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchUser();
  }, []); // Run on component mount

  // Render loading, error, or user information
  if (loading) {
    return  <div className="flex justify-center items-center py-6">
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <span className="text-xl text-gray-700">Loading...</span>
    </div>
  </div>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-8 lg:kw-1/2 md:mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h1>
        <div className="flex gap-6">

            <img src={user.photo} className='rounded-full w-16 h-16 md:w-[200px] md:h-[200px] ' alt="" />
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-gray-500">Name</span>
                <p className="text-lg capitalize text-gray-700">{`${user.first_name} ${user.last_name}`}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Email</span>
                <p className="text-lg text-gray-700">{user.email}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Role</span>
                <p className="text-lg text-gray-700">{user.role}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Gender</span>
                <p className="text-lg text-gray-700">{user.gender}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Date of Birth</span>
                <p className="text-lg text-gray-700">{new Date(user.dob).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Phone</span>
                <p className="text-lg text-gray-700">{user.phone}</p>
              </div>
              
            </div>
        </div>
        </div>
      ) : (
        <p className="text-center text-white text-lg">No user data available.</p>
      )}
    </div>
  );
}

export default UserProfile;
