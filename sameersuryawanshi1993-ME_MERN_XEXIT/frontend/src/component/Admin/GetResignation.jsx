import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../config/api';

const GetResignation = () => {
    const [resignations, setResignations] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResignations = async () => {
            try {
                const response = await api.get('/admin/resignations');
                setResignations(response.data.data);


                toast.success('Resignations loaded successfully!', {
                    position: 'top-center',
                    autoClose: 1000,
                });

            } catch (error) {
                setError('Failed to fetch resignations.');


                toast.error('Failed to fetch resignations. Please try again.', {
                    position: 'top-center',
                    autoClose: 1000,
                });

                console.error('Error fetching resignations:', error);
            }
        };

        fetchResignations();
    }, []);

    const handleResignationClick = (resignation) => {
        if (resignation.status === 'pending') {
            console.log('Navigating to:', resignation._id);
            navigate(`/admin/conclude_resignation/${resignation._id}`);


            toast.info('Navigating to conclude resignation...', {
                position: 'top-center',
                autoClose: 1500,
            });
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Resignations</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {resignations.length > 0 ? (
                <ul>
                    {resignations.map((resignation) => (
                        <li
                            key={resignation._id}
                            className={`mb-4 p-4 border rounded shadow ${resignation.status === 'pending' ? 'cursor-pointer hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                                }`}
                            onClick={() => handleResignationClick(resignation)}
                        >
                            <p><strong>Employee:</strong> {resignation.employeeId.username}</p>
                            <p><strong>Status:</strong> {resignation.status}</p>
                            <p><strong>Last Working Day:</strong> {new Date(resignation.lwd).toLocaleDateString()}</p>
                            <p><strong>Approved Last Working Day:</strong> {new Date(resignation.approvedLwd).toLocaleDateString()}</p>
                            <p><strong>Created At:</strong> {new Date(resignation.createdAt).toLocaleString()}</p>
                            <p><strong>Updated At:</strong> {new Date(resignation.updatedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No resignations found.</p>
            )}
        </div>
    );
};

export default GetResignation;
