import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import { FaUserEdit } from "react-icons/fa";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import Loader from "../../compo/loader";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch applications from the server
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
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
          setIsLoading(false);
          return;
        }
        setApplications(data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
      setIsLoading(false);
    };

    fetchApplications();
  }, []);

  // Handle Reject Application
  const handleIgnore = async (applicationId) => {
    setIsLoading(true);
    try {
      await fetch(`${apiURL}/host/ignoreApplication/${applicationId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setApplications((prevApplications) =>
        prevApplications.filter(
          (application) => application._id !== applicationId,
        ),
      ); // Remove the rejected application from the list
    } catch (error) {
      console.error("Error rejecting application:", error);
      alert("Error Removing application:");
    }
    setIsLoading(false);
  };

  const handleAccept = async (applicationId) => {
    setIsLoading(true);
    try {
      await fetch(`${apiURL}/host/acceptApplication/${applicationId}`, {
        method: "POST",

        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setApplications(
        (prevApplications) =>
          prevApplications.map((application) =>
            application._id == applicationId
              ? { ...application, status: "accepted" }
              : application,
          ), // Mark the application as accepted
      ); // Remove the accepted application from the list
    } catch (error) {
      console.error("Error accepting application:", error);
      alert("Error Accepting:");
    }
    setIsLoading(false);
  };

  const handleReject = async (applicationId) => {
    setIsLoading(true);
    try {
      await fetch(`${apiURL}/host/rejectApplication/${applicationId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setApplications(
        (prevApplications) =>
          prevApplications.map((application) =>
            application._id == applicationId
              ? { ...application, status: "rejected" }
              : application,
          ), // Mark the application as rejected
      ); // Remove the rejected application from the list
    } catch (error) {
      console.error("Error rejecting application:", error);
      alert("Error Rejecting:");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center ">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome active="hostApplications" />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center">
        <span className="relative z-10">Applications</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>

      {applications.length === 0 && <Empty />}
      <div className=" w-full sm:w-[80%] ">
        <ul className="gap-8 mt-12 flex flex-col sm:flex-row flex-wrap justify-around items-center w-full ">
          {applications.map((application) => (
            <li
              key={application._id}
              className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg hover:shadow-cyan-500/20 
           transition transform hover:scale-[1.02] flex gap-12 flex-col    wrap-break-word p-6 w-[95%] sm:w-[80%] "
            >
              <div className="flex justify-end items-center border-b pb-3 border-white text-3xl gap-6 pr-4">
                <Link
                  to={`/host/addJob/${application.job._id}?editing=true`}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaUserEdit />
                </Link>
              </div>

              <div className="w-full flex flex-col gap-4">
                <h2 className="text-3xl self-center text-cyan-400 font-semibold">
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

              <div className="flex mt-6 items-center justify-end pr-6 gap-3">
                {application.status !== "rejected" && (
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded mt-4"
                    onClick={() => handleReject(application._id)}
                  >
                    Reject
                  </button>
                )}
                {application.status !== "accepted" && (
                  <button
                    onClick={() => handleAccept(application._id)} // Replace with your accept function
                    className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded mt-4 ml-2"
                  >
                    Accept
                  </button>
                )}

                <button
                  onClick={() => handleIgnore(application._id)}
                  className="bg-cyan-700 hover:bg-cyan-900 text-white px-4 py-2 rounded mt-4 ml-2"
                >
                  Ignore
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Loader isLoading={isLoading} />
      <Footer />
    </div>
  );
}
