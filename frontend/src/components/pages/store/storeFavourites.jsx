import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import Empty from "../../compo/Empty";

export default function StoreFavourites() {
  const [favouriteJobs, setFavouriteJobs] = useState([]);

  // Fetch favourite jobs from the server
  useEffect(() => {
    const fetchFavouriteJobs = async () => {
      try {
        const response = await fetch(`${apiURL}/store/onlyFavourites`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error || data.length === 0) {
          console.error("Error fetching favourites:", data.error);
          return;
        } else {
          var favouriteJobsWithoutApplied = data.map((job) => ({
            ...job,
            fav: true,
          })); // Add fav property
        }

        const applyResponse = await fetch(`${apiURL}/store/appliedJobs`, {
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
        } else {
          let appliedWhole = appliedData.appliedIds;
          let appliedIds = appliedWhole.map((app) => app.Ids);
          let favouriteJobsComplete = favouriteJobsWithoutApplied.map((job) =>
            appliedIds.includes(job._id)
              ? { ...job, applied: true }
              : { ...job, applied: false }
          );

          let status;

          const favouriteJobsCompleteWithStatus = favouriteJobsComplete.map(
            (e) => {
              if (e.applied == false) {
                return e;
              } else if (e.applied == true) {
                appliedWhole.forEach((ele) => {
                  if (ele.Ids == e._id) {
                    status = ele.status;
                  }
                });
                return { ...e, status: status };
              }
            }
          );

          setFavouriteJobs(favouriteJobsCompleteWithStatus);
        }
      } catch (error) {
        console.error("Error fetching favourite jobs:", error);
      }
    };

    fetchFavouriteJobs();
  }, []);

  //   // Handle Apply/Cancel Apply
  const handleApply = async (jobId) => {
    try {
      await fetch(`${apiURL}/store/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setFavouriteJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? {
                ...job,
                applied: !job.applied,
                status: job.applied == true ? null : "pending",
              }
            : job
        )
      );
    } catch (error) {
      console.error("Error applying to job:", error);
    }
  };

  // Handle Favorite Toggle
  const handleFavourite = async (jobId) => {
    try {
      await fetch(`${apiURL}/store/favourite/${jobId}`, {
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
    <div className="w-full min-h-[100vh] flex flex-col items-center z-[">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center">
        <span className="relative z-10">Favourite Posts</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>
      {favouriteJobs.length === 0 && <Empty />}
      <div className=" w-full sm:w-[80%] ">
        <ul className="gap-8 mt-12 flex flex-col sm:flex-row flex-wrap justify-around items-center w-full ">
          {favouriteJobs.map((job) => (
            <li
              key={job._id}
              className="bg-white/5 backdrop-blur-md border border-white/10 
        rounded-2xl shadow-lg hover:shadow-cyan-500/20 
        transition transform hover:scale-[1.02] flex gap-12 flex-col    wrap-break-word p-6 w-[95%] sm:w-[400px] "
            >
              <div className="flex justify-between items-center border-b pb-3 border-white text-3xl pr-4">
                <span></span>

                {job.applied == true && (
                  <div className=" flex items-center gap-3">
                    <label className=" text-gray-400 text-xl">Status:</label>
                    <p className="text-white text-xl">{job.status}</p>
                  </div>
                )}
                <button
                  onClick={() => handleFavourite(job._id)}
                  className={`${
                    job.fav ? "text-yellow-500" : "text-gray-500"
                  } hover:underline`}
                >
                  {job.fav ? "★" : "☆"}
                </button>
              </div>
              <div className="w-full flex flex-col gap-4">
                <h2 className="text-3xl self-center text-cyan-400 font-semibold">
                  {job.jobPost}
                </h2>

                <div className="mt-2 flex gap-3">
                  <label className=" text-gray-400 text-xl">
                    Organization:
                  </label>
                  <p className="text-white text-xl">{job.jobCompany}</p>
                </div>

                <div className="mt-2 flex gap-3">
                  <label className=" text-gray-400 font-medium">
                    Location:
                  </label>
                  <p className="text-white">{job.jobLocation}</p>
                </div>

                <div className="mt-2 flex gap-3">
                  <label className=" text-gray-400 font-medium">
                    Salary Offered:
                  </label>
                  <p className="text-cyan-300">{job.jobSalaryOffered}</p>
                </div>

                <div className="mt-2 flex gap-3">
                  <label className=" text-gray-400 font-medium">
                    Required Experience:
                  </label>
                  <p className="text-white">{job.jobExperienceRequired}</p>
                </div>

                <Link
                  to={`/store/storeJobDetails/${job._id}`}
                  className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2 rounded-lg  "
                >
                  Details..
                </Link>

                <div className="mt-2 flex gap-3 justify-start items-center pr-4">
                  <Link
                    to={`/store/aboutRecruiter/${job.jobUploader}`}
                    className="bg-cyan-600 text-white hover:bg-cyan-800 px-4 py-2  rounded-lg  "
                  >
                    Uploader Profile
                  </Link>

                  <Link
                    to={`/store/storeOffererJobs/${job.jobUploader}`}
                    className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg  "
                  >
                    Get Uploaded Jobs
                  </Link>
                </div>
              </div>

              <div className="mt-4 items-center gap-3 pr-4 flex justify-end">
                <button
                  onClick={() => handleApply(job._id)}
                  className=" w-fit bg-cyan-800 text-white py-2 px-4 rounded hover:bg-teal-950 transition"
                >
                  {job.applied ? "Cancel Apply" : "Apply"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
