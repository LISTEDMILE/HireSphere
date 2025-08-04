import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
                const response = await fetch(`http://localhost:3000/host/addAboutRecruiter/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    
                });
            
                const data = await response.json();
                setFormData({ ...data });
            }
            catch (error) {
                console.error("Error fetching About Recruiter", error);
            }
        };
        fetchAboutRecruiter();
    },[]);

  const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleArrayAdd = (e,field,value) => {
      e.preventDefault();
      if(value !== null && value.trim()!== "" && !formData[field].includes(value)){
      setFormData({...formData,[field]:[...formData[field],value]});
  
      }
    
      
    }
  
    const handleArrayRemove = (e,field,value) => {
      e.preventDefault();
      let elementsArray = [...formData[field]];
      elementsArray = elementsArray.filter(ele => ele!==value);
      setFormData({...formData,[field]:elementsArray});
  }
  

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let response = await fetch("http://localhost:3000/host/addAboutRecruiter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        setErrors(data.errors ? data.errors : null);
        if (!data.errors) {
          setMessage("Profile Updated Successfully");
        }
      }
      catch (error) {
        console.error("Error submitting:", error);
      }
    }

  
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
         Recruiter Profile
      </h1>
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

          <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="_id" value={formData._id} />
        {/* Full Name */}
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        {/* Profile Picture URL */}
        <InputField
          label="Profile Picture URL"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
        />

<input 
        type="text"
        name="role"
        onChange={(e)=>setRole(e.target.value)}
        value={role}
        />
        <button

        onClick ={(e)=>{handleArrayAdd(e,"rolesHiring",role);
          setRole("");
        }}
        >add</button>
        {formData.rolesHiring.map(role => {
          return(
            <>
            <p>{role}</p>
            <button onClick={(e) => handleArrayRemove(e,"rolesHiring",role)}>
              remove</button>
            </>
          )
        })}

        {/* Designation */}
        <InputField
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />

        {/* Company Name */}
        <InputField
          label="Company Name"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />

        {/* Company Logo */}
        <InputField
          label="Company Logo URL"
          name="companyLogo"
          value={formData.companyLogo}
          onChange={handleChange}
        />

        {/* Company Website */}
        <InputField
          label="Company Website"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
        />

        {/* Email */}
        <InputField
          label="Contact Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* LinkedIn */}
        <InputField
          label="LinkedIn Profile URL"
          name="linkedIn"
          value={formData.linkedIn}
          onChange={handleChange}
        />

        {/* Bio */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short professional bio"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          ></textarea>
        </div>

       

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >Profile
        </button>
      </form>
    </div>
  );
}

// Reusable InputField component
function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
}
