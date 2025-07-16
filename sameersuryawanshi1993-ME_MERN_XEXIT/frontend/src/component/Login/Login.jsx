import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../config/api';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true); 

    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;

    try {
      const response = await api.post('/auth/login', { username, password });
      const { token, data } = response.data;
      const { role } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      toast.success('Login successful!', { position: 'top-center', autoClose: 1000 });

      if (role === 'admin') {
        navigate('/admin/resignations');
      } else if (role === 'employee') {
        navigate('/user/resign');
      } else {
        setError('Unauthorized access.');
        toast.error('Unauthorized access.', { position: 'top-center', autoClose: 2000 });
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      toast.error('Invalid credentials. Please try again.', { position: 'top-right', autoClose: 3000 });
    } finally {
      setIsSubmitting(false); // Stop loader
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
