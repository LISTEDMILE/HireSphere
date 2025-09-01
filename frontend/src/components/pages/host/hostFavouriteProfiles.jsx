import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";

export default function FavouriteProfileList() {
  const [favouriteProfiles, setFavouriteProfiles] = useState([]);

  useEffect(() => {
    const fetchFavouriteProfiles = async () => {
      try {
        const response = await fetch(`${apiURL}/host/onlyFavourites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
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
      await fetch(`${apiURL}/host/favouriteProfile/${profileId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
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
    <div className="w-full min-h-[100vh] flex flex-col items-center z-[">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center">
        <span className="relative z-10">Resumes</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>

      {favouriteProfiles.length === 0 && <Empty />}
      <div className=" w-full sm:w-[80%] ">
        <ul className="gap-8 mt-12 flex flex-col sm:flex-row flex-wrap justify-around items-center w-full ">
          {favouriteProfiles.map((detail) => (
            <li
              key={detail._id}
              className="bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg hover:shadow-cyan-500/20 
           transition transform hover:scale-[1.02] flex gap-12 flex-col    wrap-break-word p-6 w-[95%] sm:w-[400px] "
            >
              <div className="flex justify-between items-center border-b pb-3 border-white text-3xl pr-4">
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

              <div className="w-full flex flex-col gap-4">
                <h2 className="text-3xl self-center text-cyan-400 font-semibold">
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

                <div className="w-full text-white  flex justify-center">
                  <div className=" flex gap-6 w-full flex-col ">
                    <label className=" text-gray-400 font-medium">
                      Skills:
                    </label>
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

                <Link
                  to={`/host/hostProfileDetails/${detail._id}`}
                  className="bg-teal-600 text-white hover:bg-teal-800 px-4 py-2  rounded-lg "
                >
                  Details
                </Link>

                <div className="mt-2 flex gap-3 justify-start items-center pr-4">
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

              <div className="mt-4 items-center gap-3 pr-4 flex justify-end">
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
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
