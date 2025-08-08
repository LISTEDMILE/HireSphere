import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import { FaUserEdit } from "react-icons/fa";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  // Fetch applications from the server
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${apiURL}/host/hostApplications`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.error) {
          console.error("Error fetching applications:", data.error);
          return;
        }
        setApplications(data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  // Handle Reject Application
  const handleIgnore = async (jobId) => {
    try {
      await fetch(`${apiURL}/host/ignoreApplication/${jobId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setApplications((prevApplications) =>
        prevApplications.filter((application) => application.job._id !== jobId)
      ); // Remove the rejected application from the list
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  const handleAccept = async (jobId) => {
    try {
      await fetch(`${apiURL}/host/acceptApplication/${jobId}`, {
        method: "POST",

        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setApplications(
        (prevApplications) =>
          prevApplications.map((application) =>
            application.job._id == jobId
              ? { ...application, status: "accepted" }
              : application
          ) // Mark the application as accepted
      ); // Remove the accepted application from the list
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleReject = async (jobId) => {
    try {
      await fetch(`${apiURL}/host/rejectApplication/${jobId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setApplications(
        (prevApplications) =>
          prevApplications.map((application) =>
            application.job._id == jobId
              ? { ...application, status: "rejected" }
              : application
          ) // Mark the application as rejected
      ); // Remove the rejected application from the list
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <div className="w-full min-h-[100vh] bg-black flex flex-col items-center">
      <NavHome />
      <h1 className="text-3xl font-bold my-4 text-white text-center">
        Applications
      </h1>

      {applications.length === 0 && <Empty />}
      <div className="w-full ">
        <ul className="gap-8 mt-12 flex flex-col items-center w-full ">
          {applications.map((application) => (
            <li
              key={application.job._id}
              className="bg-[#0d212e80] flex gap-12 flex-col  border-white shadow-md  wrap-break-word rounded-lg p-6 w-[70%]"
            >
              <div className="flex justify-end items-center text-2xl gap-12 pr-8">
                <Link
                  to={`/host/addJob/${application.job._id}?editing=true`}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaUserEdit />
                </Link>
              </div>
              <div className="flex gap-24 ">
                <div className="h-[100px] w-[100px] bg-amber-200"></div>
                <div className="w-full flex flex-col gap-4">
                  <h2 className="text-3xl text-cyan-400 font-semibold">
                    {application.job.jobPost}
                  </h2>

                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 text-xl">
                      Organization:
                    </label>
                    <p className="text-white text-xl">
                      {application.job.jobCompany}
                    </p>
                  </div>

                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 font-medium">
                      Location:
                    </label>
                    <p className="text-white">{application.job.jobLocation}</p>
                  </div>

                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 font-medium">
                      Salary Offered:
                    </label>
                    <p className="text-cyan-300">
                      {application.job.jobSalaryOffered}
                    </p>
                  </div>

                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 font-medium">
                      Required Experience:
                    </label>
                    <p className="text-white">
                      {application.job.jobExperienceRequired}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <div className="flex gap-3 items-center ml-6">
                  <span className="text-gray-400 text-xl"> Status:</span>
                  <p className="text-cyan-300 text-xl">{application.status}</p>
                </div>

                <Link
                  to={`/host/hostJobDetails/${application.job._id}`}
                  className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg mr-4 "
                >
                  Details..
                </Link>
              </div>

              {/* Applier Profile Section */}
              <div className="mt-6 bg-[#0e201c8f] flex flex-col gap-3 p-8 rounded-lg shadow-inner">
                <h3 className="text-xl text-cyan-400 font-bold mb-2">
                  Applier Profile
                </h3>
                <div className="flex gap-3 items-center">
                  <strong className="text-gray-400 text-lg">Name:</strong>{" "}
                  <p className="text-white">
                    {application.applierProfile?.firstname || "N/A"}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <strong className="text-gray-400 text-lg">Email:</strong>{" "}
                  <p className="text-white">
                    {application.applierProfile?.aboutEmployee.email || "N/A"}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <strong className="text-gray-400 text-lg">Mobile:</strong>{" "}
                  <p className="text-white">
                    {application.applierProfile?.aboutEmployee.mobile || "N/A"}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <strong className="text-gray-400 text-lg">Bio:</strong>{" "}
                  <p className="text-white">
                    {application.applierProfile?.aboutEmployee.bio || "N/A"}
                  </p>
                </div>

                <div className="flex justify-end gap-3 pr-6">
                  <Link
                    to={`/host/aboutEmployee/${application.applierProfile._id}`}
                    className="bg-cyan-600 text-white hover:bg-cyan-800 px-4 py-2  rounded-lg  "
                  >
                    Profile
                  </Link>

                  <Link
                    to={`/host/applicantProfiles/${application.applierProfile._id}`}
                    className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg  "
                  >
                    Get Resumes
                  </Link>
                </div>
              </div>

              <div className="flex justify-end pr-8 gap-5 items-center">
                {application.status !== "rejected" && (
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded mt-4"
                    onClick={() => handleReject(application.job._id)}
                  >
                    Reject
                  </button>
                )}
                {application.status !== "accepted" && (
                  <button
                    onClick={() => handleAccept(application.job._id)} // Replace with your accept function
                    className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded mt-4 ml-2"
                  >
                    Accept
                  </button>
                )}

                <button
                  onClick={() => handleIgnore(application.job._id)}
                  className="bg-cyan-700 hover:bg-cyan-900 text-white px-4 py-2 rounded mt-4 ml-2"
                >
                  Ignore
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
