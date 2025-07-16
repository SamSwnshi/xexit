import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../config/api";

const Resign = () => {
    const [lwd, setLwd] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); 
        
        try {
            await api.post('/user/resign', { lwd });
            toast.success("Resignation submitted successfully!", {
                position: "top-center",
                autoClose: 1000,
            });
            setLwd('');
            setTimeout(() => {
                navigate('/user/responses');
            }, 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit resignation", {
                position: "top-center",
                autoClose: 1000,
            });
            setIsSubmitting(false); 
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Submit Resignation</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-center">Last Working Day</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={lwd}
                            onChange={(e) => setLwd(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            disabled={isSubmitting} 
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-2 rounded flex items-center justify-center ${
                            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                        disabled={isSubmitting} 
                    >
                        {isSubmitting ? (
                            <div className="flex items-center">
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                Submitting...
                            </div>
                        ) : (
                            "Submit Resignation"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Resign;
