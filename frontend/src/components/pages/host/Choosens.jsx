import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Empty from "../../compo/Empty";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import Loader from "../../compo/loader";

export default function ChoosenProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch selected profiles from the server
  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiURL}/host/onlyChoosenProfiles`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) {
          console.error("Error fetching choosen profiles:", data.error);
          setIsLoading(false);
          return;
        } else {
          let ans = data.map((e) => ({ ...e._doc, status: e.status }));
          var choosenProfilesWithoutFav = ans.map((profile) => ({
            ...profile,
            choosen: true,
          })); // Add choosen property
        }

        const favResponse = await fetch(`${apiURL}/host/favouriteProfile`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const favs = await favResponse.json();
        if (favs.error) {
          console.error("Error fetching favourites:", favs.error);
          setIsLoading(false);
          return;
        }
        const favIds = favs.favIds;

        let choosenProfiles = choosenProfilesWithoutFav.map((profile) =>
          favIds.includes(profile._id)
            ? { ...profile, fav: true }
            : { ...profile, fav: false },
        );

        setProfiles(choosenProfiles);
      } catch (error) {
        console.error("Error fetching choosen profiles:", error);
      }
      setIsLoading(false);
    };
    fetchProfiles();
  }, []);

  const handleHire = async (profileId) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile._id === profileId
          ? {
              ...profile,
              choosen: !profile.choosen,
              status: profile.choosen == true ? null : "pending",
            }
          : profile,
      ),
    );
    try {
      await fetch(`${apiURL}/host/hireProfile/${profileId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error hiring profile:", error);
      alert("Error hiring profile:");
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === profileId
            ? {
                ...profile,
                choosen: !profile.choosen,
                status: profile.choosen == true ? null : "pending",
              }
            : profile,
        ),
      );
    }
  };

  // Handle Favorite Toggle
  const handleFavourite = async (profileId) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile._id === profileId ? { ...profile, fav: !profile.fav } : profile,
      ),
    );
    try {
      await fetch(`${apiURL}/host/favouriteProfile/${profileId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Error toggling favourite:");
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === profileId
            ? { ...profile, fav: !profile.fav }
            : profile,
        ),
      );
    }
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center z-[">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome active="choosenProfiles" />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center">
        <span className="relative z-10">Resumes</span>
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
                  onClick={() => handleHire(detail._id)}
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

      <Loader isLoading={isLoading} />
      <Footer />
    </div>
  );
}
