import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AddJobToServer } from "../../../../services/Services";
import { MdOutlineCancel } from "react-icons/md";
import { GrRadialSelected } from "react-icons/gr";
import NavHome from "../../compo/NavHome";

export default function AddJob() {
  const [errors, setErrors] = useState(null);
  const [tag, setTag] = useState("");
  const [skill, setSkill] = useState("");
  const { jobId } = useParams();
  const location = useLocation();
  const editing =
    new URLSearchParams(location.search).get("editing") === "true"; // Check if editing is true

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
    jobType: [],
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
    "Temporary",
    "Remote",
    "Hybrid",
  ];

  const jobTypes = ["Onsite", "Remote", "Hybrid"];

  useEffect(() => {
    if (editing) {
      fetchJobDetails();
    }
  }, [editing]);

  const fetchJobDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/host/editJob/${jobId}`,
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

  const handleEmploymentType = (value) => {
    let emTypes = [...formData["jobEmploymentType"]];
    emTypes = emTypes.includes(value)
      ? emTypes.filter((entry) => entry !== value)
      : [...emTypes, value];
    setFormData({ ...formData, jobEmploymentType: [...emTypes] });
  };

  const handleJobType = (value) => {
    let emTypes = [...formData["jobType"]];
    emTypes = emTypes.includes(value)
      ? emTypes.filter((entry) => entry !== value)
      : [...emTypes, value];
    setFormData({ ...formData, jobType: [...emTypes] });
  };

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
    <div className="w-full flex flex-col items-center bg-black">
      <NavHome active="addJob" />
      <div className="w-[80%] p-6 flex flex-col items-center shadow-md rounded-lg bg-[#0a1f1d] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">
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

        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-6 flex flex-col items-center w-full"
        >
          <input type="hidden" name="_id" value={formData._id} />

          {/* Organization Name */}
          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
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

          

          {/* Post to Seek */}
          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
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
          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
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

          {/* Skills */}
          <div className="w-full flex justify-between">
            <div className="w-[55%] bg-[#3C2A21] p-4 rounded-lg">
              <div className="w-full flex space-y-2 flex-col">
                <div>
                  <label className="block text-gray-400 font-medium mb-2">
                    Skills Required
                  </label>
                  <div className="flex space-x-4 w-full">
                    <input
                      type="text"
                      name="skill"
                      onChange={(e) => setSkill(e.target.value)}
                      value={skill}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={(e) => {
                        handleArrayAdd(e, "jobSkills", skill);
                        setSkill("");
                      }}
                      className="bg-amber-800 px-6 py-2 rounded-lg"
                    >
                      add
                    </button>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-3 w-full flex-wrap"></div>
                {formData.jobSkills.map((skill) => {
                  return (
                    <div className="bg-cyan-950 px-4 py-3 rounded-lg flex items-center justify-between border-white border-1">
                      <span>{skill}</span>
                      <button
                        onClick={(e) =>
                          handleArrayRemove(e, "jobSkills", skill)
                        }
                      >
                        <MdOutlineCancel className=" h-full ml-2" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-[40%] bg-[#3C2A21] p-4 rounded-lg flex flex-col text-lg gap-4">

              <h2  className="block text-gray-400 font-medium mb-2">Enter Employement Type</h2>
              {employmentTypes.map((emType) => {
                return (
                  <label className={`bg-cyan-950 px-4 py-3 rounded-lg flex justify-between items-center ${formData.jobEmploymentType.includes(emType) ? "border-green-700  border-2 " : "border-1 border-white"}`}>
                    {emType}
                    <input
                      type="checkbox"
                      value={emType}
                      onChange={() => handleEmploymentType(emType)}
                      className="hidden"
                    />
                    

                    {formData.jobEmploymentType.includes(emType) && <GrRadialSelected className="text-green-300"/> }
                    
                    
                  </label>
                );
              })}
            </div>
          </div>

          {/* Contact Email */}
          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
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

          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
              Salary Offered
            </label>
            <input
              name="jobSalaryOffered"
              value={formData.jobSalaryOffered}
              onChange={handleChange}
              placeholder="Salary Offered"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
              Enter Experience Required
            </label>
            <input
              name="jobExperienceRequired"
              value={formData.jobExperienceRequired}
              onChange={handleChange}
              placeholder="Experience Required"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="w-full bg-[#3C2A21] p-4 rounded-lg flex flex-col text-lg gap-4">

            <h2 className="block text-gray-400 font-medium mb-2">Enter Job Type</h2>


            <div className="flex space-x-4">

          {jobTypes.map((emType) => {
            return (
              
              <label className={`bg-cyan-950 px-4 py-3 rounded-lg flex w-fit gap-4 justify-between items-center ${formData.jobType.includes(emType) ? "border-green-700  border-2 " : "border-1 border-white"}`}>
                    {emType}
                <input
                  type="checkbox"
                  value={emType}
                  checked={formData.jobType.includes(emType)}
                  onChange={() => handleJobType(emType)}
                />
              </label>
            );
          })}
            </div>
            </div>

          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
              Company Logo
            </label>
            <input
              name="jobCompanyLogo"
              value={formData.jobCompanyLogo}
              onChange={handleChange}
              placeholder="Company Logo"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
              Enter Job Industry
            </label>
            <input
              name="jobIndustry"
              value={formData.jobIndustry}
              onChange={handleChange}
              placeholder="Enter Industry"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Contact Mobile */}
          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
              Contact Mobile
            </label>
            <input
              required
              type="number"
              name="jobOwnerMobile"
              value={formData.jobOwnerMobile}
              onChange={handleChange}
              placeholder="Mobile No."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Description */}
          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
              Describe the Post
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your Post here"
              className="w-full h-44 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          {/* tags */}
          <div className="w-full flex space-y-6 p-6 border-2 border-white rounded-lg flex-col">
            <div>
              <label className="block text-gray-400 font-medium mb-2">
                Tags
              </label>
              <div className=" space-x-8">
                <input
                  type="text"
                  name="tag"
                  onChange={(e) => setTag(e.target.value)}
                  value={tag}
                  className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={(e) => {
                    handleArrayAdd(e, "jobTags", tag);
                    setTag("");
                  }}
                  className="bg-amber-800 px-8 py-2 rounded-lg"
                >
                  add
                </button>
              </div>
            </div>
            <div className="flex justify-start items-center gap-3 w-full flex-wrap">
              {formData.jobTags.map((tag) => {
                return (
                  <div className="bg-cyan-950 px-3 py-1 rounded-lg flex items-center">
                    <span>{tag}</span>
                    <button
                      onClick={(e) => handleArrayRemove(e, "jobTags", tag)}
                    >
                      <MdOutlineCancel className=" h-full ml-2" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[fit]  px-12 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          >
            {editing ? "Update" : "Add"} Job
          </button>
        </form>
      </div>
    </div>
  );
}
