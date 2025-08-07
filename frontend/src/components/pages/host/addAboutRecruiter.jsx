import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";

export default function AddAboutRecruiter() {
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);

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
      try {
        const response = await fetch(
          `{process.env.REACT_APP_API_URL}/host/addAboutRecruiter/${userId}`,
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
    };
    fetchAboutRecruiter();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    e.preventDefault();
    try {
      let response = await fetch(
        `{process.env.REACT_APP_API_URL}/host/addAboutRecruiter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      setErrors(data.errors ? data.errors : null);
      if (!data.errors) {
        setMessage("Profile Updated Successfully");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <div className=" flex flex-col bg-black text-white items-center ">
      <NavHome />
      <h1 className="text-4xl font-bold mb-6 text-center">Your Profile</h1>
      <div className="w-[80%] bg-[#0a1f1d] rounded-lg p-12">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-12 ">
          <div className="flex flex-col gap-5 ">
            {[
              { field: "fullName", placeholder: "Full Name" },
              { field: "profilePicture", placeholder: "Profile Picture" },
              { field: "designation", placeholder: "Designation" },
              { field: "company", placeholder: "Company" },
              { field: "companyLogo", placeholder: "Company Logo" },
              { field: "companyWebsite", placeholder: "Company Website" },
              { field: "email", placeholder: "Email" },
              { field: "linkedIn", placeholder: "Linked In Url" },
            ].map(({ field, placeholder }) => {
              return (
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-lg">{placeholder}</label>
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
          </div>

          <input type="hidden" name="_id" value={formData._id} />

          <div className="w-full flex p-6 border-2 border-white rounded-lg gap-6 flex-col">
            <div>
              <label className="block text-gray-400 font-medium mb-2">
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
              {formData.rolesHiring.map((role) => {
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

          <button
            className="w-fit self-center mt-12  px-12 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
