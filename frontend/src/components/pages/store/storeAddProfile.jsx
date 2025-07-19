import React, { useState ,useEffect} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AddProfileToServer } from "../../../../services/Services";

export default function ProfileForm ()  {

    const [errors, setErrors] = useState(null);
    const {profileId} = useParams();
    const location = useLocation();
    const editing = new URLSearchParams(location.search).get("editing") === "true"; // Check if editing is true

  const [formData, setFormData] = useState({
    profileName: "",
    profileGender: "",
    profilePost: "",
    profileCourse: "",
    profileSkills: "",
    profileEmail: "",
    profileMobile: "",
    profileTenth: 0,
    profileTwelth: 0,
    profileGraduation: 0,
    profileDescription: "",
    profilePostDescription: ""
  });
    
    useEffect(() => {
        if(editing) {
            fetchProfileDetails();
        }
    }, [editing]);

    const fetchProfileDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/store/editProfile/${profileId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            setFormData({
                _id: data._id,
                profileName: data.profileName,
                profileGender: data.profileGender,
                profilePost: data.profilePost,
                profileCourse: data.profileCourse,
                profileSkills: data.profileSkills,
                profileEmail: data.profileEmail,
                profileMobile: data.profileMobile,
                profileTenth: data.profileTenth,
                profileTwelth: data.profileTwelth,
                profileGraduation: data.profileGraduation,
                profileDescription: data.profileDescription,
                profilePostDescription: data.profilePostDescription,
            });
        } catch (error) {
            console.error("Error fetching profile details:", error);
        }
    };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = await AddProfileToServer(formData);
        setErrors(data.errors ? data.errors : null);
        if (data.errors) {
          setErrors(data.errors);
        } else {
          navigate("/");
        }
  
    };

    return (
        <form
          onSubmit={handleSubmit}
          action={`/store/${editing ? "editProfile" : "addProfile"}`}
          method="POST"
          className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-6"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">{editing ? "Edit" : "Add"} Profile</h1>
      
          {editing && <input type="hidden" name="_id" value={formData._id} />}
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input fields */}
            {[
              ["Name", "profileName", "text"],
              ["Gender", "profileGender", "text"],
              ["Post", "profilePost", "text"],
              ["Courses Done", "profileCourse", "text"],
              ["Skills", "profileSkills", "text"],
              ["Email", "profileEmail", "email"],
              ["Mobile", "profileMobile", "number"],
            ].map(([label, name, type]) => (
              <div key={name} className="flex flex-col">
                <label className="font-semibold mb-1">{label}</label>
                <input
                  required
                  type={type}
                  name={name}
                  placeholder={label}
                  value={formData[name]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
      
            {/* Percentage fields with slider */}
            {[
              ["10th (%)", "profileTenth"],
              ["12th (%)", "profileTwelth"],
              ["Graduation (%)", "profileGraduation"],
            ].map(([label, name]) => (
              <div key={name} className="flex flex-col">
                <label className="font-semibold mb-1">{label}</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="mb-2 border border-gray-300 rounded px-3 py-2 focus:outline-none"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData[name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [name]: parseFloat(e.target.value) })
                  }
                  className="accent-blue-500"
                />
              </div>
            ))}
      
            {/* Textarea: Describe Yourself */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label className="font-semibold mb-1">Describe Yourself</label>
              <textarea
                required
                name="profileDescription"
                placeholder="Describe yourself here"
                value={formData.profileDescription}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
      
            {/* Textarea: Describe Post */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label className="font-semibold mb-1">Describe About Post You are Looking For</label>
              <textarea
                required
                name="profilePostDescription"
                placeholder="Describe your desired post here"
                value={formData.profilePostDescription}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
      
          {/* Submit Button */}
          <div className="text-center">
            <input
              id="submit"
              type="submit"
              value={editing ? "Update" : "Add"}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition duration-200"
            />
            <p className="text-sm text-gray-500 mt-2">*For multiple responses come back from the next page.</p>
          </div>
        </form>
      );
      
};

