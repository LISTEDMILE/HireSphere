import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import Empty from "../../compo/Empty";

export default function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch applied jobs from the server
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch(`${apiURL}/store/onlyAppliedJobs`, {
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
        } else {
          let ans = data.map((e) => ({ ...e._doc, status: e.status }));
          var appliedJobsWithoutFav = ans.map((job) => ({
            ...job,
            applied: true,
          })); // Add applied property
        }

        // Add fav property to each job
        const favResponse = await fetch(`${apiURL}/store/favourite`, {
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
        let appliedJobs = appliedJobsWithoutFav.map((job) =>
          favIds.includes(job._id)
            ? { ...job, fav: true }
            : { ...job, fav: false }
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
      await fetch(`${apiURL}/store/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setAppliedJobs((prevJobs) =>
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
      console.error("Error in application to job:", error);
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
    <div className="w-full min-h-[100vh] bg-black flex flex-col items-center">
      <NavHome />
      <h1 className="text-3xl font-bold my-6 text-white text-center">
        You Applied To
      </h1>

      {appliedJobs.length === 0 && <Empty />}
      <div className="w-full ">
        <ul className="gap-8 mt-12 flex flex-col items-center w-full ">
          {appliedJobs.map((job) => (
            <li
              key={job._id}
              className="bg-[#0d212e80] flex gap-12 flex-col  border-white shadow-md  wrap-break-word rounded-lg p-6 w-[70%]"
            >
              <div className="flex justify-between items-center text-3xl pr-8">
                <span></span>

                {job.applied == true && (
                  <div className="mt-2 flex gap-3">
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
    
               
                <div className="w-full flex flex-col gap-4 pl-16">
                  <h2 className="text-3xl text-cyan-400 font-semibold">
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

                  <div className="mt-4 flex gap-3 justify-end items-center pr-4">
                    <Link
                      to={`/store/storeJobDetails/${job._id}`}
                      className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2 rounded-lg  "
                    >
                      Details..
                    </Link>
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
          

              <div className="mt-8 items-center gap-3 pr-4 flex justify-end">
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
