import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch applied jobs from the server
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
       
        const response = await fetch("http://localhost:3000/store/onlyAppliedJobs", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) {
          console.error("Error fetching applied jobs:", data.error);
          return;
        }
        else {
           var appliedJobsWithoutFav = data.map(job => ({ ...job, applied: true })); // Add applied property
        }
      


        // Add fav property to each job
        const favResponse = await fetch("http://localhost:3000/store/favourite", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const favs = await favResponse.json();
        if (favs.error) {
          console.error("Error fetching favourites:", favs.error);
          return;
        }
        const favIds = favs.favIds;
        let appliedJobs = appliedJobsWithoutFav.map(job =>
          favIds.includes(job._id) ? { ...job, fav: true  } : { ...job, fav: false }
        );
        
        setAppliedJobs(appliedJobs);

      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs();
  }, []);

  // Handle Apply
  const handleApply = async (jobId) => {
    try {
      await fetch(`http://localhost:3000/store/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setAppliedJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, applied: !job.applied } : job
        )
      );
    }
    catch (error) {
      console.error("Error in application to job:", error);
    }
  }
  
  

  // Handle Favorite Toggle
  const handleFavourite = async (jobId) => {
    try {
      await fetch(`http://localhost:3000/store/favourite/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setAppliedJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, fav: !job.fav } : job
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Added Vacancies</h1>
      <ul className="space-y-4">
        {appliedJobs.map((job) => (
          <li key={job._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{job.jobPost}</h2>
              <button
                onClick={() => handleFavourite(job._id)}
                className={`${
                  job.fav ? "text-yellow-500" : "text-gray-500"
                } hover:underline`}
              >
                {job.fav ? "★" : "☆"}
              </button>
            </div>
            <h3 className="text-gray-700">Company: {job.jobCompany}</h3>
            <h3 className="text-gray-700">Expected Salary: {job.jobSalaryOffered}</h3>
            <div className="mt-2">
              <label className="block text-gray-600 font-medium">Location:</label>
              <p className="text-gray-800">{job.jobLocation}</p>
            </div>
            <div className="mt-2">
              <label className="block text-gray-600 font-medium">Skills Required:</label>
              <p className="text-gray-800">{job.jobSkills}</p>
            </div>
            <button
              onClick={() => handleApply(job._id)}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
              {job.applied ? "Cancel Apply" : "Apply"}
            </button>
            <Link
              to={`/store/storeJobDetails/${job._id}`}
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