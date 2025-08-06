import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavHome from "../../compo/NavHome";

export default function HostProfileDetails() {
  const [profile, setProfile] = useState();
  const { profileId } = useParams();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/host/hostProfileDetails/${profileId}`,
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

        const favResponse = await fetch(
          "http://localhost:3000/host/favouriteProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const favs = await favResponse.json();
        if (favs.error) {
          console.error("Error fetching favourites:", favs.error);
          return;
        }
        const favIds = favs.favIds;

        const ProfileWithFav = favIds.includes(profileFetched._id)
          ? { ...profileFetched, fav: true }
          : { profileFetched, fav: false };

        const choosenResponse = await fetch(
          "http://localhost:3000/host/getChoosenProfiles",
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
      await fetch(`http://localhost:3000/host/favouriteProfile/${profileId}`, {
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
      const response = await fetch(
        `http://localhost:3000/host/hireProfile/${profileId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

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
    <div className="w-full text-white bg-black flex flex-col items-center">
      <NavHome />

      <h1 className="text-5xl font-bold text-center my-12">Resumes</h1>

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
                  <label className=" text-gray-400 font-medium">Tenth</label>
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
              </div>
            </div>
            <div className="w-full flex-col  mt-8 px-24 flex">
              <div className=" flex gap-6 w-full flex-col ">
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

              <div className="flex  items-center gap-3 mt-24">
                <Link
                  to={`/host/hostProfileDetails/${profile._id}`}
                  className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg "
                >
                  Details
                </Link>

                <Link
                  to={`/host/aboutEmployee/${profile.profileUploader}`}
                  className="bg-cyan-600 text-white hover:bg-cyan-800 px-4 py-2  rounded-lg  "
                >
                  Uploader Profile
                </Link>

                <Link
                  to={`/host/applicantProfiles/${profile.profileUploader}`}
                  className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg  "
                >
                  Get Uploaded Resumes
                </Link>
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
    </div>
  );
}
