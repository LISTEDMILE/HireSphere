import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getFavouriteJobs, applyToJob, toggleFavorite } from "../../../../services/JobService";

export default function StoreFavourites() {
  const [favouriteJobs, setFavouriteJobs] = useState([]);

  // Fetch favourite jobs from the server
  useEffect(() => {
    const fetchFavouriteJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/store/onlyFavourites", {
            method: "GET",
          credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
          const data = await response.json();
          console.log(data);
          if (data.error || data.length === 0) {
            console.error("Error fetching favourites:", data.error);
            return;
          }
          else {
              let favouriteJobs = data.map(job => ({...job, fav: true })); // Add fav property
            setFavouriteJobs(favouriteJobs);
          }
      } catch (error) {
        console.error("Error fetching favourite jobs:", error);
      }
    };

    fetchFavouriteJobs();
  }, []);

//   // Handle Apply/Cancel Apply
//   const handleApply = async (jobId, isApplied) => {
//     try {
//       await applyToJob(jobId, isApplied); // Replace with your API call
//       setFavouriteJobs((prevJobs) =>
//         prevJobs.map((job) =>
//           job._id === jobId ? { ...job, apply: !isApplied } : job
//         )
//       );
//     } catch (error) {
//       console.error("Error applying to job:", error);
//     }
//   };

  // Handle Favorite Toggle
  const handleFavorite = async (jobId) => {
    try {
      await fetch(`http://localhost:3000/store/favourite/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setFavouriteJobs((prevJobs) =>
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
      <h1 className="text-2xl font-bold mb-6 text-center">Favourite Posts</h1>
      <ul className="space-y-4">
        {favouriteJobs.map((job) => (
          <li key={job._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{job.jobPost}</h2>
              <button
                onClick={() => handleFavorite(job._id)}
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
              onClick={() => handleApply(job._id, job.apply)}
              className="mt-4 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
            >
              {job.apply ? "Cancel Apply" : "Apply"}
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