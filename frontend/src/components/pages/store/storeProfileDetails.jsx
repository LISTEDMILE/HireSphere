import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import NavHome from "../../compo/NavHome";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";

export default function StoreProfilesDetails() {
  const [profile, setProfile] = useState();
  const { profileId } = useParams();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `${apiURL}/store/storeProfileDetails/${profileId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        let data = await response.json();
        await setProfile(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
      setFetching(false);
    };
    fetchProfiles();
  }, []);

  const handleDelete = async (profileId) => {
    try {
      const response = await fetch(
        `${apiURL}/store/deleteProfile/${profileId}`,
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
        alert("Profile deleted successfully");
        const navigate = useNavigate();
        navigate("/host/hostJobList");
      } else {
        alert("Error deleting profile: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center h-fit overflow-hidden">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center mb-8">
        <span className="relative z-10 ">Detailed Resume</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>
      {!fetching && (
        <div className="flex w-full sm:w-[80%] flex-col items-center p-4 gap-6">
          <div className="flex justify-end items-center border-b pb-3 gap-6 w-full border-white text-3xl pr-4">
            <Link
              to={`/store/addProfile/${profile._id}?editing=true`}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaUserEdit />
            </Link>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete(profile._id);
              }}
            >
              <button
                type="submit"
                className="text-red-700 hover:underline text-4xl hover:text-red-900"
                title="Delete"
              >
                <MdDeleteSweep />
              </button>
            </form>
          </div>
          <div
            className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-6 flex-col wrap-break-word p-6 w-full  "
          >
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-3xl self-center text-cyan-400 font-semibold">
                {profile.profilePost}
              </h2>
              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 text-xl">Name:</label>
                <p className="text-white text-xl">{profile.profileName}</p>
              </div>
              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">Gender:</label>
                <p className="text-white text-md">{profile.profileGender}</p>
              </div>

              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">Tenth:</label>
                <p className="text-white">
                  {" "}
                  <span className="font-semibold">10th (%):</span>{" "}
                  {profile.profileTenth}
                </p>
              </div>
              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">Twelth:</label>
                <p className="text-white">
                  {" "}
                  <span className="font-semibold">12th (%):</span>{" "}
                  {profile.profileTwelth}
                </p>
              </div>
              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">
                  Graduation:
                </label>
                <p className="text-white">
                  {" "}
                  <span className="font-semibold">Graduation (%):</span>{" "}
                  {profile.profileGraduation}
                </p>
              </div>

              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">
                  Expected Salary:
                </label>
                <p className="text-white text-md text-wrap">
                  {profile.profileExpectedSalary}
                </p>
              </div>
              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">
                  Experience:
                </label>
                <p className="text-white text-md text-wrap">
                  {profile.profileExperience}
                </p>
              </div>

              <div className="mt-2 flex gap-3">
                <label className=" text-gray-400 font-medium">Courses:</label>
                <p className="text-white text-md text-wrap">
                  {profile.profileCourse}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full mt-4 flex flex-col sm:items-center ">
            <div
              className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg p-6 hover:shadow-cyan-500/20 w-full
           transition transform hover:scale-[1.02]"
            >
              <div className="text-white flex gap-6 w-full flex-col ">
                <label className=" text-gray-400 font-medium">Skills:</label>
                <div className="flex flex-wrap gap-3 items-center text-md">
                  {profile.profileSkills.map((skill) => {
                    return (
                      <span className="px-4 py-2 bg-cyan-950 rounded-lg">
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="text-white flex gap-6 mt-12 w-full flex-col ">
                <label className=" text-gray-400 font-medium">Job Type:</label>
                <div className="flex flex-wrap gap-3 items-center text-md">
                  {profile.profileJobType.map((jType) => {
                    return (
                      <span className="px-4 py-2 bg-cyan-950 rounded-lg">
                        {jType}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className=" flex gap-6 mt-12 w-full flex-col ">
                <label className=" text-gray-400 font-medium">
                  Preferred Locations:
                </label>
                <div className=" text-white flex flex-wrap gap-3 items-center text-md">
                  {profile.profilePreferredLocations.map((loc) => {
                    return (
                      <span className="px-4 py-2 bg-cyan-950 rounded-lg">
                        {loc}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className=" flex gap-6 mt-12 border-2 border-white p-4 sm:p-8 rounded-lg w-full flex-col ">
              <label className=" text-gray-400 font-medium">Projects:</label>
              <div className="flex flex-col gap-8  w-full">
                {profile.profileProjects.map((proj) => {
                  return (
                    <div className="w-full bg-gray-800 flex flex-col gap-4 p-8 rounded-lg">
                      <div className=" flex gap-3">
                        <label className=" text-gray-400 font-medium">
                          Title:
                        </label>
                        <p className="text-white text-md">{proj.title}</p>
                      </div>

                      <div className=" flex gap-3">
                        <label className=" text-gray-400 font-medium">
                          Description:
                        </label>
                        <p className="text-white text-md">{proj.description}</p>
                      </div>

                      <div className=" flex gap-3">
                        <label className=" text-gray-400 font-medium">
                          Link:
                        </label>
                        <p className="text-white text-md">{proj.link}</p>
                      </div>

                      <div className="flex flex-col gap-3 w-full">
                        <label className=" text-gray-400 font-medium">
                          Technologies Used:
                        </label>
                        <div className="text-white flex flex-wrap gap-3 items-center text-md">
                          {proj.technologies.map((tech) => {
                            return (
                              <span className="px-4 sm:px-8 py-2 bg-cyan-950 rounded-lg">
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className=" flex gap-6 mt-18 w-full flex-col ">
              <label className=" text-gray-400 text-xl">About You:</label>

              <p
                className=" bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg hover:shadow-cyan-500/20 
           transition transform hover:scale-[1.02] w-full px-6 sm:px-12 py-8 text-white text-wrap"
              >
                {profile.profileDescription}
              </p>

              <label className=" text-gray-400 mt-8 text-xl">
                Describe Post:
              </label>

              <p
                className=" bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg hover:shadow-cyan-500/20 
           transition transform hover:scale-[1.02]  px-6 sm:px-12 py-8 text-white text-wrap"
              >
                {profile.profilePostDescription}
              </p>
            </div>
          </div>

          <div
            className="flex sm:justify-around flex-col sm:flex-row gap-6 sm:gap-0 sm:items-center w-full  mt-12 mb-12 bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg hover:shadow-cyan-500/20 
           transition transform hover:scale-[1.02] p-6"
          >
            <div className="flex gap-3 items-center">
              <label className=" text-gray-400 text-xl">Mobile NO:</label>
              <p className="text-white">{profile.profileMobile}</p>
            </div>

            <div className="flex gap-3 items-center">
              <label className=" text-gray-400 text-xl">Email:</label>
              <p className="text-white">{profile.profileEmail}</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
