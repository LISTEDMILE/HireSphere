import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { IoArrowBackSharp } from "react-icons/io5";

export default function HostJobDetails() {
  const [job, setJob] = useState();
  const { jobId } = useParams();
  const [fetching, setFetching] = useState(true);

  // Fetch jobs from the server
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/host/hostJobDetails/${jobId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        let data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
      setFetching(false);
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/host/deleteJob/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

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
  };

  return (
    <div className="w-full bg-black flex flex-col items-center">
      <NavHome />

      {!fetching && (
        <div
          key={job._id}
          className="bg-[#0d212e80] flex gap-12 flex-col  border-white shadow-md  wrap-break-word rounded-lg p-6 w-[90%] mb-12"
        >
          <div className="flex justify-between items-center text-2xl  px-8">
            <Link
              to={`/host/hostJobList`}
              className=" text-white  hover:text-gray-400  rounded-lg text-3xl "
            >
              <IoArrowBackSharp />
            </Link>
            <div className="flex gap-12 items-center">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
