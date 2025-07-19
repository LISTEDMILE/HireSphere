import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function FavouriteProfileList() {
    
    const [favouriteProfiles, setFavouriteProfiles] = useState([]);

    useEffect(() => {
        const fetchFavouriteProfiles = async () => {
            try {
                const response = await fetch("http://localhost:3000/host/onlyFavourites", {
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
                else {
                    let favouriteProfiles = data.map(profile => ({ ...profile, fav: true })); // Add fav property
                    setFavouriteProfiles(favouriteProfiles);
                }
                }catch (error) {
                    console.error("Error fetching favourite profiles:", error);
                }
            };

            fetchFavouriteProfiles();
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
            setFavouriteProfiles((prevProfiles) =>
                prevProfiles.map((profile) =>
                    profile._id === profileId ? { ...profile, fav: !profile.fav } : profile
                )
            );
        } catch (error) {
            console.error("Error toggling favourite:", error);
        }
    };

  return (
    <>
      <div className="p-4 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Favourite Profiles</h1>
          <ul className="space-y-6">
            {favouriteProfiles.map((detail) => (
              <li key={detail._id} className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-xl font-semibold text-gray-800">{detail.profilePost}</h1>
                  <button
                onClick={() => handleFavourite(detail._id)}
                className={`${
                  detail.fav ? "text-yellow-500" : "text-gray-500"
                } hover:underline`}
              >
                {detail.fav ? "★" : "☆"}
              </button>
                </div>

                <h2 className="text-md text-gray-600"><strong>Name:</strong> {detail.profileName}</h2>
                <h2 className="text-md text-gray-600">10th(%): {detail.profileTenth}</h2>
                <h2 className="text-md text-gray-600">12th(%): {detail.profileTwelth}</h2>
                
                <label className="block mt-2 font-medium text-gray-700">Skills</label>
                <h2 className="text-md text-gray-700 mb-2">{detail.profileSkills}</h2>

                <form action="/host/chooseProfile" method="POST" className="flex items-center gap-4">
                  <input type="hidden" name="_id" value={detail._id} />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {detail.choosen ? 'Deselect' : 'Select'}
                  </button>
                  <a
                    href={`/host/hostProfileDetails/${detail._id}`}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Details
                  </a>
                </form>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-sm text-gray-500">
            <strong><u>test reached last</u></strong>
          </p>
        </div>
      </div>
    </>
  );
};

