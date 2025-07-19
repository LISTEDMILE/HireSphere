import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StoreJobList() {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from the server
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch jobs
        const response = await fetch("http://localhost:3000/store/storeJobList", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        if (data.error) {
          console.error("Error fetching jobs:", data.error);
          return;
        }
  
        let jobList = data.details;
  
        // Fetch favourites
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
  
        // Merge fav info into job list
        const updatedJobs = jobList.map(job =>
          favIds.includes(job._id) ? { ...job, fav: true } : job
        );
  
        setJobs(updatedJobs); // ✅ update once with combined data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchJobs();
  }, []);
  

//   // Handle Apply/Cancel Apply
//   const handleApply = async (jobId, isApplied) => {
//     try {
//       await applyToJob(jobId, isApplied); // Replace with your API call
//       setJobs((prevJobs) =>
//         prevJobs.map((job) =>
//           job._id === jobId ? { ...job, apply: !isApplied } : job
//         )
//       );
//     } catch (error) {
//       console.error("Error applying to job:", error);
//     }
//   };

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
      setJobs((prevJobs) =>
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
        {jobs.map((job) => (
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
            <div className="mt-2">
              <label className="block text-gray-600 font-medium">Location:</label>
              <p className="text-gray-800">{job.jobLocation}</p>
            </div>

            {/* <button
              onClick={() => handleApply(job._id, job.apply)}
              className="mt-4 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
            >
              {job.apply ? "Cancel Apply" : "Apply"}
            </button> */}
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