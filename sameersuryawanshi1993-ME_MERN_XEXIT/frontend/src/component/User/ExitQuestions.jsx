import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../config/api';

const DEFAULT_QUESTIONS = [
  "What is your primary reason for leaving?",
  "How would you describe your relationship with your manager?",
  "What did you like most about working here?",
  "What did you like least about working here?",
  "Would you recommend this company to others? Why or why not?",
  "What suggestions do you have for improving the work environment?",
  "Did you have the resources and support needed to perform your job effectively?",
  "How would you describe the company culture?",
];

const ExitQuestions = () => {
  const [responses, setResponses] = useState(
    DEFAULT_QUESTIONS.map(q => ({ questionText: q, response: '' }))
  );
  const navigate = useNavigate();

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index].response = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/responses', { responses });

   
      toast.success('Exit questionnaire submitted successfully!', {
        position: 'top-center',
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate('/user/status'); 
      }, 2000);
      
    } catch (error) {
    
      toast.error(error.response?.data?.message || 'Failed to submit questionnaire', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Exit Interview Questionnaire</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {responses.map((item, index) => (
            <div key={index} className="space-y-2">
              <label className="block font-medium">{item.questionText}</label>
              <textarea
                className="w-full p-3 border rounded min-h-[120px]"
                value={item.response}
                onChange={(e) => handleResponseChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 text-lg"
          >
            Submit Questionnaire
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExitQuestions;
