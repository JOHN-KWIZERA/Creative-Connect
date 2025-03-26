import React, { useState } from "react";
import JobList from "../components/JobList";
import JobApplicationForm from "../components/JobApplicationForm";
import "../styles/Home.css";

const Home = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="home-container">
      <h1>CreativeConnect Job Board</h1>
      <JobList onSelectJob={setSelectedJob} />
      {selectedJob && (
        <JobApplicationForm selectedJob={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default Home;
