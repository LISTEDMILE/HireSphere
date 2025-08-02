import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ChoosenProfiles() {
  const [profiles, setProfiles] = useState([]);

  // Fetch selected profiles from the server
  useEffect(() => {
    const fetchProfiles = async () => {
      
          try{
            const response = await fetch(`http://localhost:3000/host/onlyChoosenProfiles`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type":
                  "application/json",
              },
            });
            const data = await response.json();
            if (data.error) {
              console.error("Error fetching choosen profiles:", data.error);
              return;
            }
            else {
              let ans = data.map(e => ({ ...e._doc,status:e.status }));
              var choosenProfilesWithoutFav = ans.map(profile => ({ ...profile, choosen: true })); // Add choosen property
            }
            

            const favResponse = await fetch("http://localhost:3000/host/favouriteProfile", {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const favs = await favResponse.json();
            if (favs.error) {
              console.error("Error fetching favourites:", favs.error);
              return;
            }
            const favIds = favs.favIds;

            let choosenProfiles = choosenProfilesWithoutFav.map(profile =>
              favIds.includes(profile._id) ? { ...profile, fav: true } : { ...profile, fav: false }
            );

            console.log(choosenProfiles);

            setProfiles(choosenProfiles);
            console.log(choosenProfiles);
          } catch (error) {
            console.error("Error fetching choosen profiles:", error);
          }
        };
    fetchProfiles();

  }, []);

  
  const handleHire = async (profileId) => {
    try {
      await fetch(`http://localhost:3000/host/hireProfile/${profileId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) => profile._id === profileId ? { ...profile, hired: !profile.hired , status:profile.choosen==true?null:"pending"  } : profile)
      );
    } catch (error) {
      console.error("Error hiring profile:", error);
    }
  };


  // Handle Favorite Toggle
  const handleFavorite = async (profileId) => {
    try {
      await fetch(`http://localhost:3000/host/favouriteProfile/${profileId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === profileId ? { ...profile, fav: !profile.fav } : profile
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Selected Candidates</h1>
      <ul className="space-y-4">
        {profiles.map((profile) => (
          <li key={profile._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{profile.profilePost}</h2>
              <button
                onClick={() => handleFavorite(profile._id)}
                className={`${
                  profile.fav ? "text-yellow-500" : "text-gray-500"
                } hover:underline`}
              >
                {profile.fav ? "★" : "☆"}
              </button>
            </div>
            <h3 className="text-gray-700">Name: {profile.profileName}</h3>
            <h3 className="text-gray-700">10th (%): {profile.profileTenth}</h3>
            <h3 className="text-gray-700">12th (%): {profile.profileTwelth}</h3>
            <div className="mt-2">
              <label className="block text-gray-600 font-medium">Skills:</label>
              <p className="text-gray-800">{profile.profileSkills}</p>
            </div>
            <button
              onClick={() => {
                console.log(profile._id);
                console.log(profile.profileName); handleHire(profile._id)
              }}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
              Deselect
            </button>
            <Link
              to={`/host/hostProfileDetails/${profile._id}`}
              className="text-teal-600 hover:underline mt-4 block"
            >
              Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}