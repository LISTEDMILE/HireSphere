import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import Loader from "../../compo/loader";

export default function HostJobList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch jobs from the server
  useEffect(() => {
    setIsLoading(true);
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${apiURL}/host/hostJobList`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        let data = await response.json();
        await setJobs(data);
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
        alert("Job deleted successfully");
        setJobs(jobs.filter((job) => job._id !== jobId));
      } else {
        alert("Error deleting job: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
       alert("Error deleting job: ");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center z-[">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome active="hostJobList"/>
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center">
        <span className="relative z-10">Uploaded Vacancies</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>
      {jobs.length === 0 && <Empty />}
      <div className=" w-full sm:w-[80%] ">
        <ul className="gap-8 mt-12 flex flex-col sm:flex-row flex-wrap justify-around items-center w-full ">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg hover:shadow-cyan-500/20 
           transition transform hover:scale-[1.02] flex gap-12 flex-col    wrap-break-word p-6 w-[95%] sm:w-[400px] "
            >
              <div className="flex justify-between items-center border-b pb-3 border-white text-3xl pr-4">
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

      <Loader isLoading={isLoading}/>
      <Footer />
    </div>
  );
}
