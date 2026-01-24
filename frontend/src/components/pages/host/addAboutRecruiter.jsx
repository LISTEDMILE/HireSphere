import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import Loader from "../../compo/loader";

export default function AddAboutRecruiter() {
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    profilePicture: "",
    designation: "",
    company: "",
    companyLogo: "",
    companyWebsite: "",
    email: "",
    linkedIn: "",
    bio: "",
    rolesHiring: [],
  });

  useEffect(() => {
    
    const fetchAboutRecruiter = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${apiURL}/host/addAboutRecruiter/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        setFormData({ ...data });
      } catch (error) {
        console.error("Error fetching About Recruiter", error);
      }
      setIsLoading(false);
    };
    fetchAboutRecruiter();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(null);
    setMessage(null);
  };

  const handleArrayAdd = (e, field, value) => {
    e.preventDefault();
    if (
      value !== null &&
      value.trim() !== "" &&
      !formData[field].includes(value)
    ) {
      setFormData({ ...formData, [field]: [...formData[field], value] });
    }
  };

  const handleArrayRemove = (e, field, value) => {
    e.preventDefault();
    let elementsArray = [...formData[field]];
    elementsArray = elementsArray.filter((ele) => ele !== value);
    setFormData({ ...formData, [field]: elementsArray });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const fd = new FormData();

    // Add normal fields
    for (let key in formData) {
      if (Array.isArray(formData[key])) {
        if (formData[key].length > 0) {
          formData[key].forEach((item) => fd.append(key, item));
        } else {
          fd[key] = [];
        }
      } else {
        fd.append(key, formData[key]);
      }
    }

    try {
      let response = await fetch(`${apiURL}/host/addAboutRecruiter`, {
        method: "POST",
        credentials: "include",
        body: fd, // No JSON.stringify, no headers
      });

      const data = await response.json();
      setErrors(data.errors ? data.errors : null);
      if (!data.errors) {
        setMessage("Profile Updated Successfully");
        alert("Profile Updated Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center ">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center">
        <span className="relative z-10">Your Profile</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>
      <div className="w-full sm:w-[80%]  p-4 sm:p-6 flex flex-col items-center rounded-lg text-white ">
       

        <form
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
          className="w-full flex flex-col gap-12 "
        >
          <img
            src={
              formData.profilePicture &&
              formData.profilePicture !== null &&
              formData.profilePicture !== ""
                ? `${formData.profilePicture}`
                : "/AlternateProfilePic.png"
            }
            className="w-[250px] h-[250px] self-center rounded-full mb-6"
          />

          <div
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-2 flex-col p-6"
          >
            <div className="flex flex-col gap-5 ">
              {[
                { field: "fullName", placeholder: "Full Name" },
                { field: "designation", placeholder: "Designation" },
                { field: "company", placeholder: "Company" },
                { field: "companyWebsite", placeholder: "Company Website" },
                { field: "email", placeholder: "Email" },
                { field: "linkedIn", placeholder: "Linked In Url" },
              ].map(({ field, placeholder }) => {
                return (
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-lg">
                      {placeholder}
                    </label>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                );
              })}

              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-lg">Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profilePicture: e.target.files[0],
                    })
                  }
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <input type="hidden" name="_id" value={formData._id} />

          <div className="w-full flex p-4 sm:p-6 border-2 border-white rounded-lg gap-6 flex-col">
            <div>
              <label className="block text-gray-400 font-medium mb-4">
                Roles Hiring:
              </label>
              <div className=" space-x-8">
                <input
                  type="text"
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Roles"
                />
                <button
                  onClick={(e) => {
                    handleArrayAdd(e, "rolesHiring", role);
                    setRole("");
                  }}
                  className="bg-amber-800 px-8 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex justify-start items-center gap-3 w-full flex-wrap">
              {formData.rolesHiring?.map((role) => {
                return (
                  <div className="bg-cyan-950 px-3 py-1 rounded-lg flex items-center">
                    <span>{role}</span>
                    <button
                      onClick={(e) => handleArrayRemove(e, "rolesHiring", role)}
                    >
                      <MdOutlineCancel className=" h-full ml-2" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-3">
            <label className="text-gray-400 text-lg">About Yourself</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="w-full h-44 p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

           {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
            {message}
          </div>
        )}

        {errors && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            <ul className="list-disc list-inside">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

          <button
            className="w-fit self-center mt-6  px-12 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            type="submit"
            disabled={isLoading}
          >
            Update
          </button>
        </form>
      </div>

      <Loader isLoading={isLoading}/>
      <Footer />
    </div>
  );
}
