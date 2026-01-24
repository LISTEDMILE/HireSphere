import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import Loader from "../../compo/loader";

export default function StoreProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    fetchProfiles();
  
  }, []);

  const handleDelete = async (profileId) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center z-[">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome active="storeProfileList"/>
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center">
        <span className="relative z-10">Your Resumes</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>

      {profiles.length === 0 && <Empty />}

      <div className=" w-full sm:w-[80%] ">
        <ul className="gap-8 mt-12 flex flex-col sm:flex-row flex-wrap justify-around items-center w-full ">
          {profiles.map((detail) => (
            <li
              key={detail._id}
              className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg hover:shadow-cyan-500/20 
           transition transform hover:scale-[1.02] flex gap-12 sm:gap-6 flex-col    wrap-break-word p-6 w-[95%] sm:w-[400px] "
            >
              <div className="flex justify-end gap-4 items-center border-b pb-3 border-white text-3xl pr-4">
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
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-3xl text-cyan-400 font-semibold self-center">
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
                  <label className=" text-gray-400 font-medium">Twelth:</label>
                  <p className="text-white">
                    {" "}
                    <span className="font-semibold">12th (%):</span>{" "}
                    {detail.profileTwelth}
                  </p>
                </div>
              </div>

              <div className="w-full text-white  flex justify-center">
                <div className=" flex gap-6 w-full flex-col ">
                  <label className=" text-gray-400 font-medium">Skills:</label>
                  <div className="flex flex-wrap gap-3 items-center text-md">
                    {detail.profileSkills.map((skill) => {
                      return (
                        <span className="px-6 py-1.5 bg-cyan-950 rounded-lg">
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center ">
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

      <Loader isLoading={isLoading}/>
      <Footer />
    </div>
  );
}
