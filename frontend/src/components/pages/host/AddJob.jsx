import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AddJobToServer } from "../../../../services/Services";

export default function AddJob() {

  const [errors, setErrors] = useState(null);
  const [tag,setTag] = useState("");
  const [skill, setSkill] = useState("");
  const { jobId } = useParams(); 
  const location = useLocation(); 
  const editing = new URLSearchParams(location.search).get("editing") === "true"; // Check if editing is true

  const [formData, setFormData] = useState({
    jobCompany: "",
    jobPost: "",
    jobLocation: "",
    jobOwnerEmail: "",
    jobOwnerMobile: "",
    jobSalaryOffered: "",
    jobEmploymentType: [],
    jobExperienceRequired: "",
    jobSkills: [],
    jobCompanyLogo: "",
    jobType: "",
    jobIndustry: "",
    jobTags: [],
    description: "",

  });
  const employmentTypes = [
    "Full-Time", 
    "Part-Time", 
    "Internship", 
    "Contract", 
    "Freelance", 
    "Temporary"
  ];
  


  useEffect(() => {
    if (editing) {
      fetchJobDetails();
    }
  }, [editing]);

  const fetchJobDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/host/editJob/${jobId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setFormData({...data});
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleEmploymentType = (value) => {
    let emTypes = [...formData["jobEmploymentType"]];
    emTypes = emTypes.includes(value)?emTypes.filter(entry => entry !== value):[...emTypes,value];
    setFormData({...formData,"jobEmploymentType":[...emTypes]});
  }

  

    const navigate = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault();
      let data = await AddJobToServer(formData);
      setErrors(data.errors ? data.errors : null);
      if (data.errors) {
        setErrors(data.errors);
      } else {
        navigate("/host/hostJobList");
      }

  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {editing ? "Edit" : "Add"} Job Post
      </h1>
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

        {/* Organization Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Organization Name
          </label>
          <input
            type="text"
            name="jobCompany"
            value={formData.jobCompany}
            onChange={handleChange}
            placeholder="Organization or Company"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <input 
        type="text"
        name="tag"
        onChange={(e)=>setTag(e.target.value)}
        value={tag}
        />
        <button

        onClick ={(e)=>{handleArrayAdd(e,"jobTags",tag);
          setTag("");
        }}
        >add</button>
        {formData.jobTags.map(tag => {
          return(
            <>
            <p>{tag}</p>
            <button onClick={(e) => handleArrayRemove(e,"jobTags",tag)}>
              remove</button>
            </>
          )
        })}


<input 
        type="text"
        name="skill"
        onChange={(e)=>setSkill(e.target.value)}
        value={skill}
        />
        <button

        onClick ={(e)=>{handleArrayAdd(e,"jobSkills",skill);
          setSkill("");
        }}
        >add</button>
        {formData.jobSkills.map(skill => {
          return(
            <>
            <p>{skill}</p>
            <button onClick={(e) => handleArrayRemove(e,"jobSkills",skill)}>
              remove</button>
            </>
          )
        })}


{employmentTypes.map(emType => {
  return(
  <label>{emType}
  <input type="checkbox" value={emType} checked={formData.jobEmploymentType.includes(emType)} onChange={()=>handleEmploymentType(emType)}/>
  </label>
  );
})}


        {/* Post to Seek */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Post to Seek for
          </label>
          <input
            required
            type="text"
            name="jobPost"
            value={formData.jobPost}
            onChange={handleChange}
            placeholder="Required Post"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            required
            type="text"
            name="jobLocation"
            value={formData.jobLocation}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Enter your Contact Email
          </label>
          <input
            required
            type="email"
            name="jobOwnerEmail"
            value={formData.jobOwnerEmail}
            onChange={handleChange}
            placeholder="Contact Email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Contact Mobile */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Contact Mobile
          </label>
          <input
            required
            type="number"
            name="jobOwnerMobile"
            min="6000000000"
            max="9999999999"
            value={formData.jobOwnerMobile}
            onChange={handleChange}
            placeholder="Mobile No."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Describe the Post
          </label>
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your Post here"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          {editing ? "Update" : "Add"} Job
        </button>
      </form>
    </div>
  );
}