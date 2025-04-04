import React, { useState, useEffect } from "react";
import JobList from "./components/JobList";
import JobApplicationForm from "./components/JobApplicationForm";
import JobForm from "./components/JobForm";
import axios from "axios";



const App = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    axios.get("https://creative-connect-backend.onrender.com/api/jobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const addJob = async (job) => {
    try {
      const response = await axios.post("https://creative-connect-backend.onrender.com/api/jobs", job);
      setJobs((prevJobs) => [...prevJobs, response.data]);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Job Portal</h1>
        <JobForm onAddJob={addJob} />
        <JobList jobs={jobs} onSelectJob={setSelectedJob} />
        {selectedJob && <JobApplicationForm selectedJob={selectedJob} onClose={() => setSelectedJob(null)} />}
      </div>
    </div>
  );
};

export default App;
