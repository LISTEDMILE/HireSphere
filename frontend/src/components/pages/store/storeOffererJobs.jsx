import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavHome from "../../compo/NavHome";

export default function StoreOffererJobs() {
    const [jobs, setJobs] = useState([]);
    const { offererId } = useParams();
    console.log(offererId)

  // Fetch jobs from the server
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/store/storeOffererJobs/${offererId}`, {
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
    };

    fetchJobs();
  }, []);

  


  return (
    <div className="w-full bg-black flex flex-col items-center">
      <NavHome />
      <h1 className="text-5xl font-bold my-6 text-white text-center">
        Uploaded Vacancies
      </h1>
      <div className="w-full ">
        <ul className="gap-8 mt-12 flex flex-col items-center w-full ">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="bg-[#0d212e80] flex gap-12 flex-col  border-white shadow-md  wrap-break-word rounded-lg p-6 w-[70%]"
            >
              
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
                    to={`/store/storeJobDetails/${job._id}`}
                    className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg mr-4 "
                  >
                    Details..
                  </Link>
                </div>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
