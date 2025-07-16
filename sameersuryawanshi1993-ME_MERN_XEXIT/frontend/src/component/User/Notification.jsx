import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../config/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/user/notifications');
        console.log("Response Data:", response);
        
    
        setNotifications(response.data.notifications || []);

        if (response.data.notifications?.length > 0) {
          toast.success('Notifications fetched successfully!', {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      } catch (error) {
        setError('Failed to fetch notifications. Please try again.');
        toast.error('Failed to fetch notifications!', {
          position: 'top-center',
          autoClose: 1000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const isResignationApproved = notifications.some(
    (notification) => notification.title === 'Resignation Approved'
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Notifications</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : notifications.length === 0 ? (
          <p className="text-center text-gray-600">No notifications available.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification, index) => (
              <li
                key={notification._id || index}
                className={`p-4 rounded text-center ${
                  notification.status === 'accepted' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <p className="font-semibold">{notification.title}</p>
                <p>{notification.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Resign Button - Disabled if Resignation is Approved */}
      <button
        onClick={() => navigate('/resign')}
        disabled={isResignationApproved}
        className={`mt-6 px-6 py-2 rounded transition ${
          isResignationApproved
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Resign Again
      </button>
    </div>
  );
};

export default Notifications;
