import { useContext } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import AuthContext from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, isAuthReady } = useContext(AuthContext);

  const location = useLocation();


  if (!isAuthReady) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">
          Checking your session...
        </p>
      </div>
    );
  }


  if (!user) {
    return (
      <Link
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}