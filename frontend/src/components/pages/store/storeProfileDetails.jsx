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
    <div className="w-full min-h-[100vh] text-white bg-black flex flex-col items-center">
      <NavHome />

      <h1 className="text-3xl font-bold text-center my-4">Detailed Resume</h1>
      {!fetching && (
        <div className="w-[70%] p-12  bg-[#0d212e80] rounden-lg">
          <div className="flex justify-end items-center text-2xl gap-12 pr-8">
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
       <div className="w-full flex flex-col gap-4 pl-16">
              <h2 className="text-3xl text-cyan-400 font-semibold">
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
          
          <div className="w-full mt-12 flex flex-col items-center">
            <div className=" flex gap-6 w-[80%] flex-col ">
              <label className=" text-gray-400 font-medium">Skills:</label>
              <div className="flex flex-wrap gap-3 items-center">
                {profile.profileSkills.map((skill) => {
                  return (
                    <span className="px-8 py-2 bg-cyan-950 rounded-lg">
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className=" flex gap-6 mt-12 w-[80%] flex-col ">
              <label className=" text-gray-400 font-medium">Job Type:</label>
              <div className="flex flex-wrap gap-3 items-center">
                {profile.profileJobType.map((jType) => {
                  return (
                    <span className="px-8 py-2 bg-cyan-950 rounded-lg">
                      {jType}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className=" flex gap-6 mt-12 w-[80%] flex-col ">
              <label className=" text-gray-400 font-medium">
                Preferred Locations:
              </label>
              <div className="flex flex-wrap gap-3 items-center">
                {profile.profilePreferredLocations.map((loc) => {
                  return (
                    <span className="px-8 py-2 bg-cyan-950 rounded-lg">
                      {loc}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className=" flex gap-6 mt-12 border-2 border-white p-8 rounded-lg w-[80%] flex-col ">
              <label className=" text-gray-400 font-medium">Projects:</label>
              <div className="flex flex-col gap-8  w-full">
                {profile.profileProjects.map((proj) => {
                  return (
                    <div className="w-full bg-amber-950 flex flex-col gap-4 p-8 rounded-lg">
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
                        <div className="flex flex-wrap w-full gap-3 items-center">
                          {proj.technologies.map((tech) => {
                            return (
                              <span className="px-8 py-2 bg-cyan-950 rounded-lg">
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

            <div className=" flex gap-6 mt-12 w-[80%] flex-col ">
              <label className=" text-gray-400 text-xl">About You:</label>

              <p className=" bg-cyan-950 rounded-lg px-12 py-4 text-white text-wrap">
                {profile.profileDescription}
              </p>

              <label className=" text-gray-400 mt-8 text-xl">
                Describe Post:
              </label>

              <p className=" bg-cyan-950 rounded-lg px-12 py-4 text-white text-wrap">
                {profile.profilePostDescription}
              </p>
            </div>
          </div>

          <div className="flex justify-around items-center mt-12 mb-12">
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
