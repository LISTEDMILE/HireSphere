import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";

export default function FavouriteProfileList() {
  const [favouriteProfiles, setFavouriteProfiles] = useState([]);

  useEffect(() => {
    const fetchFavouriteProfiles = async () => {
      try {
        const response = await fetch(
          `https://hire-sphere.onrender.com/host/onlyFavourites`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.error || data.length === 0) {
          console.error("Error fetching favourites:", data.error);
          return;
        }

        const favouriteProfilesWithoutChoosen = data.map((profile) => ({
          ...profile,
          fav: true,
        })); // Add fav property

        const choosenResponse = await fetch(
          `https://hire-sphere.onrender.com/host/getChoosenProfiles`,
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
        } else {
          let choosenWhole = choosenData.choosenProfiles;

          const choosenIds = choosenWhole.map((pro) => pro.Ids);

          let favouriteProfilesComplete = favouriteProfilesWithoutChoosen.map(
            (profile) =>
              choosenIds.includes(profile._id)
                ? { ...profile, choosen: true }
                : { ...profile, choosen: false }
          );

          let status;

          const favouriteProfilesCompleteWithStatus =
            favouriteProfilesComplete.map((e) => {
              if (e.choosen == false) {
                return e;
              } else if (e.choosen == true) {
                choosenWhole.forEach((ele) => {
                  if (ele.Ids == e._id) {
                    status = ele.status;
                  }
                });
                return { ...e, status: status };
              }
            });

          setFavouriteProfiles(favouriteProfilesCompleteWithStatus);
        }
      } catch (error) {
        console.error("Error fetching favourite profiles:", error);
      }
    };

    fetchFavouriteProfiles();
  }, []);

  const handleHireProfile = async (profileId) => {
    try {
      const response = await fetch(
        `https://hire-sphere.onrender.com/host/hireProfile/${profileId}`,
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

      setFavouriteProfiles(
        favouriteProfiles.map((profile) =>
          profile._id === profileId
            ? {
                ...profile,
                choosen: !profile.choosen,
                status: profile.choosen == true ? null : "pending",
              }
            : profile
        )
      );
    } catch (error) {
      console.error("Error hiring profile:", error);
    }
  };

  const handleFavourite = async (profileId) => {
    try {
      await fetch(
        `https://hire-sphere.onrender.com/host/favouriteProfile/${profileId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      setFavouriteProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === profileId
            ? { ...profile, fav: !profile.fav }
            : profile
        )
      );
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  return (
    <div className="w-full min-h-[100vh] text-white bg-black flex flex-col items-center">
      <NavHome />

      <h1 className="text-3xl font-bold text-center my-4">Favourite Resumes</h1>

      {favouriteProfiles.length === 0 && <Empty />}
      <div className="w-[70%] pb-12">
        <ul className="gap-8 mt-12 flex flex-col items-center w-full ">
          {favouriteProfiles.map((detail) => (
            <li
              key={detail._id}
              className="bg-[#0d212e80] rounded-2xl shadow-md p-6 flex flex-col w-full justify-between "
            >
              <div className="flex justify-between items-center text-2xl mb-12  pr-8">
                <span></span>
                {detail.choosen == true && (
                  <div className="mt-2 flex gap-3">
                    <label className=" text-gray-400 text-xl">Status:</label>
                    <p className="text-white text-xl">{detail.status}</p>
                  </div>
                )}

                <button
                  onClick={() => handleFavourite(detail._id)}
                  className={`hover:underline text-3xl ${
                    detail.fav ? "text-yellow-500" : "text-gray-500"
                  }`}
                >
                  {detail.fav ? "★" : "☆"}
                </button>
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
              <div className="w-full flex-col  mt-8 px-24 flex">
                <div className=" flex gap-6 w-full flex-col ">
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

                <div className="flex  items-center gap-3 mt-24">
                  <Link
                    to={`/host/hostProfileDetails/${detail._id}`}
                    className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg "
                  >
                    Details
                  </Link>

                  <Link
                    to={`/host/aboutEmployee/${detail.profileUploader}`}
                    className="bg-cyan-600 text-white hover:bg-cyan-800 px-4 py-2  rounded-lg  "
                  >
                    Uploader Profile
                  </Link>

                  <Link
                    to={`/host/applicantProfiles/${detail.profileUploader}`}
                    className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg  "
                  >
                    Get Uploaded Resumes
                  </Link>
                </div>
              </div>

              <div className="w-full mt-6 flex justify-center ">
                <div className="flex pr-8  w-[90%] justify-end items-center mt-4">
                  <button
                    onClick={() => handleHireProfile(detail._id)}
                    className={`px-4 py-2 rounded-lg font-semibold text-white ${
                      detail.choosen
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {detail.choosen ? "Deselect" : "Select"}
                  </button>
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
