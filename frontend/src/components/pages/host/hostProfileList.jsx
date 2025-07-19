import React , {useEffect, useState} from "react";
import { Link } from "react-router-dom";

export default function HostProfileList() {
    
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch("http://localhost:3000/host/hostProfileList", {
                    method: "GET",  
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                let data = await response.json();
                if(data.error) {
                    console.error("Error fetching profiles:", data.error);
                    return;
                }
                let profileList = data.profiles;

                const favResponse = await fetch("http://localhost:3000/host/favouriteProfile", {
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

                const updatedProfiles = profileList.map(profile =>
                    favIds.includes(profile._id) ? { ...profile, fav: true } : profile
                );

                setProfiles(updatedProfiles); // ✅ update once with combined data
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
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

            setProfiles(profiles.map(profile =>
                profile._id === profileId ? { ...profile, fav: !profile.fav } : profile
            ));
        } catch (error) {
            console.error("Error toggling favourite:", error);
        }
    };

    

            
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Include your NavHost component */}
      {/* <NavHost /> */}

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Candidates Applied</h1>

        <ul className="space-y-6">
          {profiles.map((detail) => (
            <li key={detail._id} className="bg-white shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-blue-600">{detail.profilePost}</h2>
                
                <button onClick={() => handleFavourite(detail._id)} className={`text-lg ${detail.fav ? 'text-yellow-500' : 'text-gray-500'}`}>
                          {detail.fav ? '★' : '☆'}
                      </button>
                      
              </div>

              <h3 className="text-lg font-medium text-gray-700">{detail.profileName}</h3>

              <p className="text-sm mt-2">
                <span className="font-semibold">10th (%):</span> {detail.profileTenth}
              </p>
              <p className="text-sm">
                <span className="font-semibold">12th (%):</span> {detail.profileTwelth}
              </p>

              <label className="block font-semibold mt-4">Skills</label>
              <p className="text-sm mb-4">{detail.profileSkills}</p>

              <form
                action="/host/chooseProfile"
                method="POST"
                className="flex items-center gap-3"
              >
                <input type="hidden" name="_id" value={detail._id} />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg font-semibold text-white ${
                    detail.choosen ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {detail.choosen ? "Deselect" : "Select"}
                </button>
              </form>

              <div className="mt-4">
                <Link
                  to={`/host/hostProfileDetails/${detail._id}`}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-center mt-10 font-bold underline">test reached last</p>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

