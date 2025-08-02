import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function HostJobList() {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from the server
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/host/hostJobList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });


        let data = await response.json();
       await setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  
  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:3000/host/deleteJob/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      let data = await response.json();
      if (!data.error) {
        alert("Job deleted successfully");
        setJobs(jobs.filter((job) => job._id !== jobId));
      }
      else {
        alert("Error deleting job: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Here are the added Posts..</h1>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{job.jobPost}</h2>
              <div className="flex space-x-2">
                 
                <Link
                  to={`/host/addJob/${job._id}?editing=true`}
                  className="text-blue-500 hover:underline"
                >
                  ✏️
                </Link>
                
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-red-500 hover:underline"
                >
                  ✘
                </button>
              </div> 
            </div>
            <h3 className="text-gray-700">Company: {job.jobCompany}</h3>
           
            <div className="mt-2">
              <label className="block text-gray-600 font-medium">Location:</label>
              <p className="text-gray-800">{job.jobLocation}</p>
            </div>
            
            <Link
              to={`/host/hostJobDetails/${job._id}`}
              className="text-teal-600 hover:underline mt-4 block"
            >
              More..
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}