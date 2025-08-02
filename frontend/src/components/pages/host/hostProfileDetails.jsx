import React , {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";

export default function HostProfileDetails() {
    
    const [profile, setProfile] = useState();
    const { profileId } = useParams();
    const [ fetching, setFetching ] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            
            try {
                
                const response = await fetch(`http://localhost:3000/host/hostProfileDetails/${profileId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                let data = await response.json();
                if (data.error) {
                    console.error("Error fetching profiles:", data.error);
                    return;
                }
                let profileFetched = data.profile;

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

                const ProfileWithFav = favIds.includes(profileFetched._id) ? { ...profileFetched, fav: true } : {profileFetched, fav: false
            };
                

              
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


                const updatedProfile =
                    choosenIds.includes(ProfileWithFav._id) ? { ...ProfileWithFav, choosen: true } : { ...ProfileWithFav, choosen: false };
           
              let status;
              let updatedProfileWithstatus
    
    if (updatedProfile.choosen == true) {
        choosenWhole.forEach(element => {
            if (element.Ids == updatedProfile._id) {
                status = element.status;
            }
        });
         updatedProfileWithstatus = { ...updatedProfile, status: status };
    }
    else if (updatedProfile.choosen == false) {
         updatedProfileWithstatus = updatedProfile;
    }
               
                setProfile(updatedProfileWithstatus ); // ✅ update once with combined data
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

            setProfile(
                 { ...profile, fav: !profile.fav } 
            );
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

        setProfile( { ...profile, choosen: !profile.choosen, status:profile.choosen==true?null:"pending"  } );
    } catch (error) {
        console.error("Error hiring profile:", error);
    }
  };

    

            
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
     

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Candidates Applied</h1>

              <ul className="space-y-6">
                  {!fetching && 
                  
                  <li className="bg-white shadow-md rounded-xl p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-blue-600">{profile.profilePost}</h2>
                    
                    <button onClick={() => handleFavourite(profile._id)} className={`text-lg ${profile.fav ? 'text-yellow-500' : 'text-gray-500'}`}>
                              {profile.fav ? '★' : '☆'}
                          </button>
                          
                  </div>
    
                  <h3 className="text-lg font-medium text-gray-700">{profile.profileName}</h3>
                  <h2>status{profile.status}</h2>
    
                  <p className="text-sm mt-2">
                    <span className="font-semibold">10th (%):</span> {profile.profileTenth}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">12th (%):</span> {profile.profileTwelth}
                  </p>
    
                  <label className="block font-semibold mt-4">Skills</label>
                  <p className="text-sm mb-4">{profile.profileSkills}</p>
    
                 
                  <button
                    onClick={() => handleHireProfile(profile._id)}
                      className={`px-4 py-2 rounded-lg font-semibold text-white ${
                        profile.choosen ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {profile.choosen ? "Deselect" : "Select"}
                    </button>
                  
    
                </li>
              
                  }
         
          
        </ul>

        <p className="text-center mt-10 font-bold underline">test reached last</p>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

