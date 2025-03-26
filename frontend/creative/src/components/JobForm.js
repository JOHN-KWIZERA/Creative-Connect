import React, { useState } from "react";

const JobForm = ({ onAddJob }) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [employer, setEmployer] = useState("");
    const [salary, setSalary] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newJob = { title, category, employer, salary };
      onAddJob(newJob);
      setTitle(""); setCategory(""); setEmployer(""); setSalary("");
    };
  
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)}
            required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}
            required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Employer Email" value={employer} onChange={(e) => setEmployer(e.target.value)}
            required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="number" placeholder="Salary (optional)" value={salary} onChange={(e) => setSalary(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
            Add Job
          </button>
        </form>
      </div>
    );
  };

export default JobForm;
