import React, { useRef } from "react";
import axios from "axios";


const JobApplicationForm = ({ selectedJob, onClose }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const coverLetterRef = useRef(null);
  const resumeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("jobId", selectedJob._id);
    formData.append("applicantName", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("coverLetter", coverLetterRef.current.value);
    formData.append("resume", resumeRef.current.files[0]);

    try {
      await axios.post("http://localhost:5001/api/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Apply for {selectedJob.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Your Name" ref={nameRef} required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Your Email" ref={emailRef} required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea placeholder="Cover Letter" ref={coverLetterRef} required
            className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <input type="file" ref={resumeRef} required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex justify-between">
            <button type="submit" className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition">
              Submit
            </button>
            <button type="button" onClick={onClose} className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
