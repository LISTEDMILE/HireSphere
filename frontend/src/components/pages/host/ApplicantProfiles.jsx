import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";

export default function ApplicantProfiles() {
  const [profiles, setProfiles] = useState([]);

  const { applicantId } = useParams();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `${apiURL}/host/hostApplicantProfiles/${applicantId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        let data = await response.json();
        await setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="w-full min-h-[100vh] text-white bg-black flex flex-col items-center">
      <NavHome />

      <h1 className="text-3xl font-bold text-center my-4">
          Resumes BY ....
      </h1>

      {profiles.length === 0 && <Empty />}

      <div className="w-[70%] pb-12">
        <ul className="gap-8 mt-12 flex flex-col items-center w-full ">
          {profiles.map((detail) => (
            <li
              key={detail._id}
              className="bg-[#0d212e80] rounded-2xl shadow-md py-8 px-12 flex flex-col w-full justify-between "
            >
              
               
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
                    to={`/host/hostProfileDetails/${detail._id}`}
                    className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg mr-4 "
                  >
                    Details..
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
