import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/api";

const UserHeader = () => {
  const navigate = useNavigate();
  const [resignationStatus, setResignationStatus] = useState(null);

  useEffect(() => {
    const fetchResignationStatus = async () => {
      try {
        const response = await api.post("/user/resignation_status");
        setResignationStatus(response.data.resignation?.status || null);
      } catch (error) {
        console.error("Failed to fetch resignation status:", error);
        setResignationStatus(null);
      }
    };

    fetchResignationStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <h1 className="text-lg font-bold">User Dashboard</h1>

      <div className="flex items-center gap-4">
        {resignationStatus ? (
          <Link 
            to="/user/status"
            className={`px-4 py-2 rounded text-white ${
              resignationStatus === "approved"
                ? "bg-green-500 hover:bg-green-600"
                : resignationStatus === "pending"
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {resignationStatus === "approved" ? "Resignation Approved" 
            : resignationStatus === "pending" ? "Pending Resignation" 
            : "Resignation Rejected"}
          </Link>
        ) : (
          <span className="px-4 py-2 bg-gray-500 text-white rounded">
            No Resignation Submitted
          </span>
        )}

        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

export default UserHeader;
