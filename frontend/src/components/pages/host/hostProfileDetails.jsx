import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";

export default function HostProfileDetails() {
  const [profile, setProfile] = useState();
  const { profileId } = useParams();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `${apiURL}/host/hostProfileDetails/${profileId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        let data = await response.json();
        if (data.error) {
          console.error("Error fetching profiles:", data.error);
          return;
        }
        let profileFetched = data.profile;

        const favResponse = await fetch(`${apiURL}/host/favouriteProfile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const favs = await favResponse.json();
        if (favs.error) {
          console.error("Error fetching favourites:", favs.error);
          return;
        }
        const favIds = favs.favIds;

        const ProfileWithFav = favIds.includes(profileFetched._id)
          ? { ...profileFetched, fav: true }
          : { ...profileFetched, fav: false };

        const choosenResponse = await fetch(
          `${apiURL}/host/getChoosenProfiles`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const choosenData = await choosenResponse.json();
        if (choosenData.error) {
          console.error("Error fetching choosen profiles:", choosenData.error);
          return;
        }

        let choosenWhole = choosenData.choosenProfiles;
        const choosenIds = choosenWhole.map((pro) => pro.Ids);

        const updatedProfile = choosenIds.includes(ProfileWithFav._id)
          ? { ...ProfileWithFav, choosen: true }
          : { ...ProfileWithFav, choosen: false };

        let status;
        let updatedProfileWithstatus;

        if (updatedProfile.choosen == true) {
          choosenWhole.forEach((element) => {
            if (element.Ids == updatedProfile._id) {
              status = element.status;
            }
          });
          updatedProfileWithstatus = { ...updatedProfile, status: status };
        } else if (updatedProfile.choosen == false) {
          updatedProfileWithstatus = updatedProfile;
        }
        setProfile(updatedProfileWithstatus); // ✅ update once with combined data
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
      setFetching(false);
    };
    fetchProfiles();
  }, []);

  const handleFavourite = async (profileId) => {
    try {
      await fetch(`${apiURL}/host/favouriteProfile/${profileId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setProfile({ ...profile, fav: !profile.fav });
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  const handleHireProfile = async (profileId) => {
    try {
      const response = await fetch(`${apiURL}/host/hireProfile/${profileId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (data.error) {
        alert("Error hiring profile: " + data.error);
        return;
      }

      setProfile({
        ...profile,
        choosen: !profile.choosen,
        status: profile.choosen == true ? null : "pending",
      });
    } catch (error) {
      console.error("Error hiring profile:", error);
    }
  };

  return (
    <div className="w-full min-h-[100vh] text-white bg-black flex flex-col items-center">
      <NavHome />

      <h1 className="text-3xl font-bold text-center my-4">
        Detailed Resume : 
      </h1>

      {!fetching && (
        <div className="gap-8 mt-12 flex flex-col items-center w-full ">
          <li
            key={profile._id}
            className="bg-[#0d212e80] rounded-2xl shadow-md p-6 flex flex-col w-[80%] justify-between "
          >
            <div className="flex justify-between items-center text-2xl mb-12  pr-8">
              <span></span>
              {profile.choosen == true && (
                <div className="mt-2 flex gap-3">
                  <label className=" text-gray-400 text-xl">Status:</label>
                  <p className="text-white text-xl">{profile.status}</p>
                </div>
              )}

              <button
                onClick={() => handleFavourite(profile._id)}
                className={`hover:underline text-3xl ${
                  profile.fav ? "text-yellow-500" : "text-gray-500"
                }`}
              >
                {profile.fav ? "★" : "☆"}
              </button>
            </div>
            <div className="flex gap-24 ">
              <div className="h-[100px] w-[100px] bg-amber-200"></div>
              <div className="w-full flex flex-col gap-4">
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
                          <p className="text-white text-md">
                            {proj.description}
                          </p>
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

            <div className="w-full mt-6 flex justify-center ">
              <div className="flex pr-8  w-[90%] justify-end items-center mt-4">
                <button
                  onClick={() => handleHireProfile(profile._id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-white ${
                    profile.choosen
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {profile.choosen ? "Deselect" : "Select"}
                </button>
              </div>
            </div>
          </li>
        </div>
      )}
      <Footer />
    </div>
  );
}
