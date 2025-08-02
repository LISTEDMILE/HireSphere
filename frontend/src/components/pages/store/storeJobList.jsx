import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";

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

        const applyResponse = await fetch("http://localhost:3000/store/appliedJobs", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const appliedData = await applyResponse.json();
        if (appliedData.error) {
          console.error("Error fetching applied jobs:", appliedData.error);
          return;
        }
        let appliedWhole = appliedData.appliedIds;

        let appliedIds = appliedWhole.map(app => app.Ids);
        
  
        // Merge fav info into job list and applied list
        const updatedJobs = jobList.map(job =>
          favIds.includes(job._id) ? { ...job, fav: true } : job
        ).map(job =>
          appliedIds.includes(job._id) ? { ...job, applied: true } : { ...job, applied: false }
        );

        let status;

        const updatedJobsWithStatus = updatedJobs.map(e => {
          if (e.applied == false) {
            return e;
          }
          else if (e.applied == true) {
            appliedWhole.forEach(ele => {
              if (ele.Ids == e._id) {
                 status = ele.status;
              }
            })
            return ({ ...e, status: status });
         }
        })
        console.log(updatedJobsWithStatus)
  
        setJobs(updatedJobsWithStatus); // ✅ update once with combined data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchJobs();
  }, []);
  

//   // Handle Apply/Cancel Apply
  const handleApply = async (jobId) => {
    try {
      await fetch(`http://localhost:3000/store/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, applied: !job.applied , status:"pending" } : job
        )
      );
    }
  
  catch (error) {
      console.error("Error applying to job:", error);
    }
  };
  

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
    <div className="w-full bg-black flex flex-col items-center">
      <NavHome active="storeJobList"/>
      <div className="w-[70%] mt-12 pb-12 rounded-lg flex flex-col items-center bg-[#20332e3b]">
      <h1 className="w-full  text-gray-300 text-5xl mb-12 py-6 font-bold  underline text-center">Vacancies</h1>
      <ul className="space-y-8 w-[90%] ">
        {jobs.map((job) => (
          <li key={job._id} className="bg-[#0e201c] w-full shadow-md rounded-lg p-4">
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
            <h3 className="text-white"> status: {job.status}</h3>
            <h3 className="text-gray-700">Company: {job.jobCompany}</h3>
            <div className="mt-2">
              <label className="block text-gray-600 font-medium">Location:</label>
              <p className="text-gray-800">{job.jobLocation}</p>
            </div>

             <button
              onClick={() => handleApply(job._id)}
              className="mt-4 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
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
      <Footer/>
    </div>
  );
}