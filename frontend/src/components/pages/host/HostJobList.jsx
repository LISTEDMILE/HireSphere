import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";

export default function HostJobList() {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from the server
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `https://hire-sphere.onrender.com/host/hostJobList`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        let data = await response.json();
        await setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(
        `https://hire-sphere.onrender.com/host/deleteJob/${jobId}`,
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
        alert("Job deleted successfully");
        setJobs(jobs.filter((job) => job._id !== jobId));
      } else {
        alert("Error deleting job: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="w-full min-h-[100vh] bg-black flex flex-col items-center">
      <NavHome />
      <h1 className="text-4xl font-bold my-4 text-white text-center">
        Uploaded Vacancies
      </h1>
      {jobs.length === 0 && <Empty />}
      <div className="w-full ">
        <ul className="gap-8 mt-12 flex flex-col items-center w-full ">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="bg-[#0d212e80] flex gap-12 flex-col  border-white shadow-md  wrap-break-word rounded-lg p-6 w-[70%]"
            >
              <div className="flex justify-end items-center text-2xl gap-12 pr-8">
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
              <div className="flex gap-24 ">
                <div className="h-[100px] w-[100px] bg-amber-200"></div>
                <div className="w-full flex flex-col gap-4">
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
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Link
                  to={`/host/hostJobDetails/${job._id}`}
                  className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg mr-4 "
                >
                  Details..
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
