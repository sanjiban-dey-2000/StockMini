import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/user/verify", {
          withCredentials: true,
        });
        if (res.data.user) login(res.data.user);
      } catch (error) {
        console.error("Auth verification failed:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!user) verifyToken();
    else setLoading(false);
  }, [user, login]);

  if (loading) return <p className="text-center mt-10">Checking authentication...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
