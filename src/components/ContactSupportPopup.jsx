import React, { useState } from 'react';
import { Mail, MessageSquare, X } from 'lucide-react';

const ContactSupportPopup = ({ isVisible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    query: '',
  });
  const [status, setStatus] = useState(''); // 'idle', 'submitting', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Basic validation
    if (!formData.email || !formData.query) {
      setStatus('error');
      alert('Please fill out both your Email ID and your Query.');
      return;
    }

    // --- START: Backend Submission Logic Placeholder ---
    try {
      // 1. Replace this with your actual API call (e.g., axios.post('/api/support'))
      //    This is where you send formData to your admin backend.
      console.log('Submitting data to backend:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

      // 2. On successful submission:
      setStatus('success');
      // Clear form
      setFormData({ email: '', query: '' });

      // Close the popup after a brief success message
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000); 

    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('error');
      alert('Failed to submit query. Please try again.');
    }
    // --- END: Backend Submission Logic Placeholder ---
  };

  if (!isVisible) return null;

  return (
    // Backdrop Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 transition-opacity duration-300">
      
      {/* Popup Container */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-[#E3D3B5] overflow-hidden transform scale-100 transition-transform duration-300">
        
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-[#FCF7E6] border-b border-[#E3D3B5]">
          <h2 className="text-xl font-bold text-[#5B2C06] flex items-center space-x-2">
            <MessageSquare size={24} className="text-[#E17B25]" />
            <span>Contact Support</span>
          </h2>
          <button onClick={onClose} className="text-[#5B2C06] hover:text-[#E17B25] transition cursor-pointer ">
            <X size={24} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#5B2C06] mb-1">
              Your Email ID
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7B5E2E]" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-[#E3D3B5] rounded-lg focus:ring-2 focus:ring-[#E17B25] focus:border-[#E17B25] outline-none text-[#5B2C06] transition"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Query Textarea */}
          <div>
            <label htmlFor="query" className="block text-sm font-medium text-[#5B2C06] mb-1">
              Your Query/Issue
            </label>
            <textarea
              id="query"
              name="query"
              rows="4"
              value={formData.query}
              onChange={handleChange}
              required
              className="w-full p-3 border border-[#E3D3B5] rounded-lg focus:ring-2 focus:ring-[#E17B25] focus:border-[#E17B25] outline-none text-[#5B2C06] transition resize-none"
              placeholder="Describe your issue or question..."
            ></textarea>
          </div>

          {/* Submission Status & Button */}
          <div>
            {status === 'submitting' && (
              <p className="text-[#E17B25] font-medium text-center mb-3">Sending query...</p>
            )}
            {status === 'success' && (
              <p className="text-green-600 font-bold text-center mb-3">✅ Query Sent Successfully! We'll be in touch soon.</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 font-bold text-center mb-3">❌ Submission failed. Check fields and try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className={`w-full py-3 rounded-lg font-semibold tracking-wide transition cursor-pointer active:scale-[0.96] ${
                status === 'submitting' || status === 'success'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#99804D] text-white hover:bg-[#9f8b63]'
              }`}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit to Support'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ContactSupportPopup;