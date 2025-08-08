import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";

export default function StoreProfilesList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${apiURL}/store/storeProfileList`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        let data = await response.json();
        await setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
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
        setProfiles(profiles.filter((profile) => profile._id !== profileId));
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

      <h1 className="text-3xl font-bold text-center my-4">Your Resumes</h1>

      {profiles.length === 0 && <Empty />}

      <div className="w-[70%] pb-12">
        <ul className="gap-8 mt-12 flex flex-col items-center w-full ">
          {profiles.map((detail) => (
            <li
              key={detail._id}
              className="bg-[#0d212e80] rounded-2xl shadow-md p-6 flex flex-col w-full justify-between "
            >
              <div className="flex justify-end items-center text-2xl gap-12 pr-8">
                <Link
                  to={`/store/addProfile/${detail._id}?editing=true`}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaUserEdit />
                </Link>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDelete(detail._id);
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
              <div className="flex gap-24 ">
                <div className="h-[100px] w-[100px] bg-amber-200"></div>
                <div className="w-full flex flex-col gap-4">
                  <h2 className="text-3xl text-cyan-400 font-semibold">
                    {detail.profilePost}
                  </h2>
                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 text-xl">Name:</label>
                    <p className="text-white text-xl">{detail.profileName}</p>
                  </div>

                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 font-medium">Tenth</label>
                    <p className="text-white">
                      {" "}
                      <span className="font-semibold">10th (%):</span>{" "}
                      {detail.profileTenth}
                    </p>
                  </div>
                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 font-medium">
                      Twelth:
                    </label>
                    <p className="text-white">
                      {" "}
                      <span className="font-semibold">12th (%):</span>{" "}
                      {detail.profileTwelth}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full mt-8 flex justify-center">
                <div className=" flex gap-6 w-[80%] flex-col ">
                  <label className=" text-gray-400 font-medium">Skills:</label>
                  <div className="flex flex-wrap gap-3 items-center">
                    {detail.profileSkills.map((skill) => {
                      return (
                        <span className="px-8 py-2 bg-cyan-950 rounded-lg">
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="w-full mt-6 flex justify-center ">
                <div className="flex  w-[90%] justify-end items-center mt-4">
                  <Link
                    to={`/store/storeProfileDetails/${detail._id}`}
                    className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg mr-4 "
                  >
                    Details
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
