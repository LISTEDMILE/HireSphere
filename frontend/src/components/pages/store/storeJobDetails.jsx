import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";

export default function StoreJobDetails() {
  const [job, setJob] = useState();
  const { jobId } = useParams();
  const [fetching, setFetching] = useState(true);

  // Fetch jobs from the server
  useEffect(() => {
    const fetchJobs = async () => {
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
          }
        );

        const data = await response.json();
        if (data.error) {
          console.error("Error fetching jobs:", data.error);
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
      setFetching(false);
    };

    fetchJobs();
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
      setJob({
        ...job,
        applied: !job.applied,
        status: job.applied == true ? null : "pending",
      });
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
      setJob({ ...job, fav: !job.fav });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="w-full bg-black flex flex-col items-center">
      <NavHome />

      <h1 className="text-3xl font-bold my-6 text-white text-center">
        Detailed Post
      </h1>

      {!fetching && (
        <div
          key={job._id}
          className="bg-[#0d212e80] flex gap-12 flex-col  border-white shadow-md  wrap-break-word rounded-lg p-6 w-[90%] mb-24"
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
          <div className="flex gap-24 ">
            <div className="h-[100px] w-[100px] bg-amber-200"></div>
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-3xl text-cyan-400 font-semibold">
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

          <div className="flex justify-center w-full">
            <div className="flex flex-col mt-4 w-[80%]">
              <label className=" text-gray-400 mb-4 text-xl">
                Skills Required:
              </label>

              <div className="flex text-white justify-start items-center gap-3 w-full flex-wrap">
                {job.jobSkills.map((skill) => {
                  return (
                    <div className="bg-cyan-950 px-3 py-1 rounded-lg ">
                      <span>{skill}</span>
                    </div>
                  );
                })}
              </div>

              <label className=" text-gray-400 mt-12 mb-4 text-xl">
                Employement Type:
              </label>

              <div className="flex text-white justify-start items-center gap-3 w-full flex-wrap">
                {job.jobEmploymentType.map((empType) => {
                  return (
                    <div className="bg-cyan-950 px-3 py-1 rounded-lg ">
                      <span>{empType}</span>
                    </div>
                  );
                })}
              </div>

              <label className=" text-gray-400 mt-12 mb-4 text-xl">
                Job Options:
              </label>

              <div className="flex text-white justify-start items-center gap-3 w-full flex-wrap">
                {job.jobType.map((jobType) => {
                  return (
                    <div className="bg-cyan-950 px-3 py-1 rounded-lg ">
                      <span>{jobType}</span>
                    </div>
                  );
                })}
              </div>

              <label className=" text-gray-400 mt-12 mb-4 text-xl">
                Description:
              </label>

              <p className=" bg-cyan-950 rounded-lg px-12 py-4 text-white text-wrap">
                {job.description}
              </p>

              <label className=" text-gray-400 mt-12 mb-4 text-xl">tags:</label>

              <div className="flex text-white justify-start items-center gap-3 w-full flex-wrap">
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

              <div className="flex justify-around items-center mt-12 mb-12">
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
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
