import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';


function AuthHandler({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Ensure that the correct property is accessed
  const role = user?.role || user?.user?.role;

  // // Redirect unauthenticated users to login page
  // if (isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
  //   return <Navigate to="/auth/login" />;
  // }

  // Redirect authenticated users from login/register pages
  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (role === "patient") {
      return <Navigate to="/user/home" />;
    } else {
      return <Navigate to="/doctor/home" />;
    }
  }

  // Restrict access to admin routes for non-admin users
  if (isAuthenticated && location.pathname.includes("/admin") && role !== "admin") {
    if (role === "patient") {
      return <Navigate to="/user/home" />;
    } else {
      return <Navigate to="/doctor/home" />;
    }
  }

  // Restrict access to user routes for non-patient users
  if (isAuthenticated && location.pathname.includes("/user") && role !== "patient") {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/doctor/home" />;
    }
  }

  // Restrict access to doctor routes for non-doctor users
  if (isAuthenticated && location.pathname.includes("/doctor") && role !== "doctor") {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/user/home" />;
    }
  }

  // Restrict access to shop routes for admin users
  if (isAuthenticated && location.pathname.includes("/shop") && role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  // Render the children elements if none of the above conditions are met
  return <>{children}</>;
}
export default AuthHandler;