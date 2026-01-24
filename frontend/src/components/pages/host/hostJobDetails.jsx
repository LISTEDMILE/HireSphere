import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import Loader from "../../compo/loader";

export default function HostJobDetails() {
  const [job, setJob] = useState();
  const { jobId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch jobs from the server
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiURL}/host/hostJobDetails/${jobId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        let data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiURL}/host/deleteJob/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      let data = await response.json();
      if (!data.error) {
        alert("Vacancy Removed Successfully");
        const navigate = useNavigate();
        navigate("/host/hostJobList");
      } else {
        alert("Error deleting job: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center h-fit overflow-hidden">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center mb-8">
        <span className="relative z-10 ">Detailed Job</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>

      {!isLoading && (
        <div className="flex w-full sm:w-[80%] flex-col items-center p-4 gap-6">
          <div className="flex justify-end items-center border-b pb-3 gap-6 w-full border-white text-3xl pr-4">
            <Link
              to={`/host/addJob/${job._id}?editing=true`}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaUserEdit />
            </Link>

            <button
              onClick={() => handleDelete(job._id)}
              className="text-red-700 hover:underline text-4xl hover:text-red-900"
            >
              <MdDeleteSweep />
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
            <label className=" text-gray-400 text-xl">tags:</label>
            <div className="flex text-white justify-start items-center gap-3 w-full flex-wrap mb-8">
              {job.jobTags.map((tag) => {
                return (
                  <div className="bg-cyan-950 px-3 py-1 rounded-lg ">
                    <span>{tag}</span>
                  </div>
                );
              })}
            </div>{" "}
          </div>

          <div
            className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-6 flex-col wrap-break-word p-6 w-full  "
          >
            <div className="flex flex-col sm:flex-row justify-around items-start sm:items-center gap-4 sm:gap-0">
              <div className="flex gap-3 items-center">
                <label className=" text-gray-400 text-xl">Mobile NO:</label>
                <p className="text-white">{job.jobOwnerMobile}</p>
              </div>

              <div className="flex gap-3 items-center">
                <label className=" text-gray-400 text-xl">Email:</label>
                <p className="text-white">{job.jobOwnerEmail}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Loader isLoading={isLoading} />
      <Footer />
    </div>
  );
}
