import React , {useEffect, useState} from "react";
import { Link } from "react-router-dom";

export default function StoreProfilesList() {
    
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch("http://localhost:3000/store/storeProfileList", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                let data = await response.json();
                await setProfiles(data);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };
        fetchProfiles();
    }, []);

    const handleDelete = async (profileId) => {
        try {
            const response = await fetch(`http://localhost:3000/store/deleteProfile/${profileId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            let data = await response.json();
            if (!data.error) {
                alert("Profile deleted successfully");
                setProfiles(profiles.filter((profile) => profile._id !== profileId));
            } else {
                alert("Error deleting profile: " + data.error);
            }

        }
        catch (error) {
            console.error("Error deleting profile:", error);
        }
    };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Navigation bar - insert your nav component */}
      {/* <NavStore /> */}

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Here are the added Profiles
        </h1>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((detail) => (
            <div
              key={detail._id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between h-full"
            >
              <div>
                <h2 className="text-xl font-semibold text-blue-600 mb-1">
                  {detail.profilePost}
                </h2>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {detail.profileName}
                </h3>

                <p className="text-sm mb-1">
                  <span className="font-semibold">10th (%):</span>{" "}
                  {detail.profileTenth}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">12th (%):</span>{" "}
                  {detail.profileTwelth}
                </p>

                <label className="block text-sm mt-3 font-semibold text-gray-600">
                  Skills
                </label>
                <p className="text-sm mb-3">{detail.profileSkills}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/store/storeProfileDetails/${detail._id}`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  More..
                </Link>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/store/addProfile/${detail._id}?editing=true`}
                    className="text-lg"
                  >
                    ✏️
                  </Link>

                  <form
                              onSubmit={(e) => {
                                  e.preventDefault();
                                  handleDelete(detail._id);
                              }}
                  >
                    <button
                      type="submit"
                      className="text-red-500 hover:text-red-700 text-lg"
                      title="Delete"
                    >
                      ✘
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 font-bold underline">
          test reached last
        </p>
      </div>

      {/* Footer - insert your footer component */}
      {/* <Footer /> */}
    </div>
  );
};

