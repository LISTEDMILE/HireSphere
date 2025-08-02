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

                const ProfilesWithFav = profileList.map(profile =>
                    favIds.includes(profile._id) ? { ...profile, fav: true } : profile
                );

              
              const choosenResponse = await fetch("http://localhost:3000/host/getChoosenProfiles", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
              });
              const choosenData = await choosenResponse.json();
              if (choosenData.error) {
                  console.error("Error fetching choosen profiles:", choosenData.error);
                return;
              }
            
              let choosenWhole = choosenData.choosenProfiles;
              const choosenIds = choosenWhole.map(pro => pro.Ids);


              const updatedProfiles = ProfilesWithFav.map(profile =>
                choosenIds.includes(profile._id) ? { ...profile, choosen: true } : { ...profile, choosen: false }
              );
              let status;

              const updatedProfilesWithstatus = updatedProfiles.map(e => {
                if (e.choosen == false) {
                  return e;
                }
                else if (e.choosen == true) {
                  choosenWhole.forEach(ele => {
                    if (ele.Ids == e._id) {
                      status = ele.status;
                    }
                  })
                  return ({ ...e, status: status });
                }
              })
                setProfiles(updatedProfilesWithstatus ); // ✅ update once with combined data
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
  
  const handleHireProfile = async (profileId) => {
    try {
        const response = await fetch(`http://localhost:3000/host/hireProfile/${profileId}`, {
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

        setProfiles(profiles.map(profile =>
            profile._id === profileId ? { ...profile, choosen: !profile.choosen, status:profile.choosen==true?null:"pending"  } : profile
        ));
    } catch (error) {
        console.error("Error hiring profile:", error);
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
              <h2>status{detail.status}</h2>

              <p className="text-sm mt-2">
                <span className="font-semibold">10th (%):</span> {detail.profileTenth}
              </p>
              <p className="text-sm">
                <span className="font-semibold">12th (%):</span> {detail.profileTwelth}
              </p>

              <label className="block font-semibold mt-4">Skills</label>
              <p className="text-sm mb-4">{detail.profileSkills}</p>

             
              <button
                onClick={() => handleHireProfile(detail._id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-white ${
                    detail.choosen ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {detail.choosen ? "Deselect" : "Select"}
                </button>
              

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

