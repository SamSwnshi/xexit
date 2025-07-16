import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../config/api';

const ConcludeResignation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [approved, setApproved] = useState(false);
  const [lwd, setLwd] = useState('');

  const handleConclude = async () => {
    try {
      await api.put('/admin/conclude_resignation', {
        resignationId: id,
        approved,
        lwd,
      });


      toast.success('Resignation concluded successfully!', {
        position: 'top-center',
        autoClose: 1000,
      });

    
      setTimeout(() => {
        navigate('/admin/exit_responses');
      }, 2000);
    } catch (error) {
      setError('Failed to conclude resignation.');


      toast.error('Failed to conclude resignation. Please try again.', {
        position: 'top-center',
        autoClose: 2000,
      });

      console.error('Error concluding resignation:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Conclude Resignation</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 p-4 border rounded shadow">
        <div className="mt-4">
          <label className="block text-gray-700">Approve Resignation</label>
          <select
            value={approved}
            onChange={(e) => setApproved(e.target.value === 'true')}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="true">Approve</option>
            <option value="false">Reject</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Last Working Day</label>
          <input
            type="date"
            value={lwd}
            onChange={(e) => setLwd(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleConclude}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Conclude Resignation
          </button>
          <button
            onClick={() => navigate('/admin/resignations')}
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Back to Resignations
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConcludeResignation;
