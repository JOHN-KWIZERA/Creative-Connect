import React from "react";
import "../styles/JobList.css";

const JobList = ({ jobs, onSelectJob }) => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse Jobs</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs available. Add one above!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600"><strong>Category:</strong> {job.category}</p>
                <p className="text-gray-600"><strong>Employer:</strong> {job.employer}</p>
                <p className="text-gray-600"><strong>Salary:</strong> ${job.salary || "Not specified"}</p>
                <button 
                  onClick={() => onSelectJob(job)} 
                  className="mt-4 w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default JobList;
