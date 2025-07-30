import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Applications() {
  const [applications, setApplications] = useState([]);

  // Fetch applications from the server
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:3000/host/hostApplications", {
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
       await fetch(`http://localhost:3000/host/ignoreApplication/${jobId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== jobId)
      ); // Remove the rejected application from the list
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  const handleAccept = async (jobId) => {
    try {
      await fetch(`http://localhost:3000/host/acceptApplication/${jobId}`, {
        method: "POST",
        
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setApplications((prevApplications) =>
        prevApplications.map((application) => application._id == jobId ? { ...application, status: "accepted" } : application) // Mark the application as accepted
      ); // Remove the accepted application from the list
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleReject = async (jobId) => {
    try {
      await fetch(`http://localhost:3000/host/rejectApplication/${jobId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setApplications((prevApplications) =>
        prevApplications.map((application) => application._id == jobId ? { ...application, status: "rejected" } : application) // Mark the application as rejected
      ); // Remove the rejected application from the list
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Here are the added Posts</h1>
      <ul className="space-y-4">
        {applications.map((application) => (
          <li key={application._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{application.jobPost}</h2>
              <div className="flex space-x-2">
                <Link
                  to={`/host/editJob/${application.job._id}?editing=true`}
                  className="text-blue-500 hover:underline"
                >
                  ✏️
                </Link>
                <button
                  onClick={() => handleIgnore(application._id)}
                  className="text-red-500 hover:underline"
                >
                  ✘
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => handleReject(application.job._id)}>
              Reject
            </button>
            <button
              onClick={() => handleAccept(application.job._id)} // Replace with your accept function
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-2">
              Accept
            </button>
                
              </div>
            </div>
            <h3 className="text-gray-700">Company: {application.jobCompany}</h3>
            <h3 className="text-gray-700">Expected Salary: {application.jobSalaryOffered}</h3>
            <div className="mt-2">
              <label className="block text-gray-600 font-medium">Location:</label>
              <p className="text-gray-800">{application.jobLocation}</p>
            </div>
            <div className="mt-2">
              <label className="block text-gray-600 font-medium">Skills Required:</label>
              <p className="text-gray-800">{application.jobSkills}</p>
            </div>
            <Link
              to={`/host/hostJobDetails/${application._id}`}
              className="text-teal-600 hover:underline mt-4 block"
            >
              More..
            </Link>

            {/* Applier Profile Section */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-bold mb-2">Applier Profile</h3>
              <p className="text-gray-700">
                <strong>Name:</strong> {application.applierProfile?.firstname || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {application.applierProfile?.email || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Mobile:</strong> {application.applierProfile?.mobile || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Skills:</strong> {application.applierProfile?.skills || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Education:</strong> {application.applierProfile?.education || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Description:</strong> {application.applierProfile?.description || "N/A"}
              </p>
            </div>
            
          </li>
          
        ))}
      </ul>
    </div>
  );
}