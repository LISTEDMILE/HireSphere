import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import Loader from "../../compo/loader";

export default function StoreJobDetails() {
  const [job, setJob] = useState();
  const { jobId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch jobs from the server
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Fetch jobs
        const response = await fetch(
          `${apiURL}/store/storeJobDetails/${jobId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();
        if (data.error) {
          console.error("Error fetching jobs:", data.error);
          setIsLoading(false);
          return;
        }

        let jobFetched = data.detail;

        // Fetch favourites
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
          setIsLoading(false);
          return;
        }

        const favIds = favs.favIds;

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
          setIsLoading(false);
          return;
        }
        let appliedWhole = appliedData.appliedIds;

        let appliedIds = appliedWhole.map((app) => app.Ids);

        // Merge fav info into job list and applied list
        const updatedJob = favIds.includes(jobFetched._id)
          ? { ...jobFetched, fav: true }
          : jobFetched;

        const updatedJobWithApplied = appliedIds.includes(updatedJob._id)
          ? { ...updatedJob, applied: true }
          : { ...updatedJob, applied: false };

        let status;
        let updatedJobWithAppliedAndStatus;
        if (updatedJobWithApplied.applied == false) {
          updatedJobWithAppliedAndStatus = updatedJobWithApplied;
        } else if (updatedJobWithApplied.applied == true) {
          appliedWhole.forEach((ele) => {
            if (ele.Ids == updatedJobWithApplied._id) {
              status = ele.status;
            }
          });
          updatedJobWithAppliedAndStatus = {
            ...updatedJobWithApplied,
            status: status,
          };
        }

        setJob({ ...updatedJobWithAppliedAndStatus }); // ✅ update once with combined data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  // Handle Apply
  const handleApply = async (jobId) => {
    setJob({
      ...job,
      applied: !job.applied,
      status: job.applied == true ? null : "pending",
    });
    try {
      const resApply = await fetch(`${apiURL}/store/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const ansApply = await resApply.json();

      if (ansApply.message !== "success") {
        alert("Error applying");
        setJob({
          ...job,
          applied: !job.applied,
          status: job.applied == true ? null : "pending",
        });
      }
    } catch (error) {
      console.error("Error in application to job:", error);
    }
  };

  // Handle Favorite Toggle
  const handleFavourite = async (jobId) => {
    setJob({ ...job, fav: !job.fav });
    try {
      const resFav = await fetch(`${apiURL}/store/favourite/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const ansFav = await resFav.json();

      if (ansFav.message !== "success") {
        setJob({ ...job, fav: !job.fav });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center h-fit overflow-hidden">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center mb-8">
        <span className="relative z-10 ">Detailed Post</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>
      {!isLoading ? (
        <div
          key={job._id}
          className=" flex gap-8 flex-col  border-white shadow-md  wrap-break-word rounded-lg w-[90%] mb-24"
        >
          <div className="flex justify-between items-center text-3xl pr-8 border-b border-white pb-4">
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
          <div
            className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-6 flex-col wrap-break-word p-6 w-full  "
          >
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-3xl self-center text-cyan-400 font-semibold">
                {job.jobPost}
              </h2>

              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 text-xl">Organization:</label>
                <p className="text-white text-xl">{job.jobCompany}</p>
              </div>

              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">Location:</label>
                <p className="text-white">{job.jobLocation}</p>
              </div>

              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">
                  Salary Offered:
                </label>
                <p className="text-cyan-300">{job.jobSalaryOffered}</p>
              </div>

              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">Industry:</label>
                <p className="text-white">{job.jobIndustry}</p>
              </div>

              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">
                  Required Experience:
                </label>
                <p className="text-white">{job.jobExperienceRequired}</p>
              </div>
            </div>
          </div>

          <div
            className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg p-6 hover:shadow-cyan-500/20 w-full
           transition transform hover:scale-[1.02]"
          >
            <div className="text-white flex gap-6 w-full flex-col ">
              <label className=" text-gray-400 font-medium">
                Skills Required:
              </label>
              <div className="flex flex-wrap gap-3 items-center text-md">
                {job.jobSkills.map((skill) => {
                  return (
                    <span className="px-4 py-2 bg-cyan-950 rounded-lg">
                      {skill}{" "}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="text-white flex gap-6 mt-12 w-full flex-col ">
              <label className=" text-gray-400 font-medium">
                Employement Type:
              </label>
              <div className="flex flex-wrap gap-3 items-center text-md">
                {job.jobEmploymentType.map((empType) => {
                  return (
                    <span className="px-4 py-2 bg-cyan-950 rounded-lg">
                      {empType}{" "}
                    </span>
                  );
                })}
              </div>{" "}
            </div>
            <div className="text-white flex gap-6 mt-12 w-full flex-col ">
              <label className=" text-gray-400 font-medium">Job Options:</label>
              <div className="flex flex-wrap gap-3 items-center text-md">
                {job.jobType.map((jobType) => {
                  return (
                    <span className="px-4 py-2 bg-cyan-950 rounded-lg">
                      {jobType}{" "}
                    </span>
                  );
                })}
              </div>
            </div>{" "}
          </div>

          <div
            className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-6 flex-col wrap-break-word p-6 w-full  "
          >
            <label className=" text-gray-400  text-xl">Description:</label>

            <p className=" bg-cyan-950 rounded-lg  p-4 text-white text-wrap">
              {job.description}
            </p>
          </div>

          <div
            className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-6 flex-col wrap-break-word p-6 w-full  "
          >
            <label className=" text-gray-400 text-xl">tags:</label>

            <div className="flex text-white justify-start items-center gap-3 w-full flex-wrap mb-8">
              {job.jobTags.map((tag) => {
                return (
                  <div className="bg-cyan-950 px-3 py-1 rounded-lg ">
                    <span>{tag}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end mt-4 items-center gap-3">
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

          <div
            className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex flex-col sm:flex-row gap-6 justify-around wrap-break-word p-6 w-full  "
          >
            <div className="flex gap-3 items-center">
              <label className=" text-gray-400 text-xl">Mobile NO:</label>
              <p className="text-white">{job.jobOwnerMobile}</p>
            </div>

            <div className="flex gap-3 items-center">
              <label className=" text-gray-400 text-xl">Email:</label>
              <p className="text-white">{job.jobOwnerEmail}</p>
            </div>
          </div>
          <button
            onClick={() => handleApply(job._id)}
            className="mt-4 bg-teal-600 text-white w-fit self-center py-2 px-24 rounded hover:bg-teal-700 transition"
          >
            {job.applied ? "Cancel Apply" : "Apply"}
          </button>
        </div>
      ) : (
        <Loader isLoading={isLoading} />
      )}

      <Footer />
    </div>
  );
}
