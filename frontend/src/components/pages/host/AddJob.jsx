import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AddJobToServer } from "../../../../services/Services";
import { MdOutlineCancel } from "react-icons/md";
import { GrRadialSelected } from "react-icons/gr";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import Loader from "../../compo/loader";

export default function AddJob() {
  const [errors, setErrors] = useState(null);
  const [tag, setTag] = useState("");
  const [skill, setSkill] = useState("");
  const { jobId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const response = await fetch(`${apiURL}/host/editJob/${jobId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setFormData({ ...data });
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
    setIsLoading(false);
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
    setIsLoading(true);
    e.preventDefault();
    let data = await AddJobToServer(formData);
    setErrors(data.errors ? data.errors : null);
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/host/hostJobList");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center z-[">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center">
        <span className="relative z-10">
          {editing ? "Edit" : "Add"} Job Post
        </span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>
      <div className="w-full sm:w-[80%]  p-4 sm:p-6 flex flex-col items-center rounded-lg text-white">
       

        <form
          onSubmit={handleSubmit}
          className="space-y-8 py-6 sm:px-6 flex flex-col items-center w-full"
        >
          {editing && <input type="hidden" name="_id" value={formData._id} />}

          {/* Organization Name */}
          <div
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-2 flex-col p-6"
          >
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
                type="text"
                name="jobOwnerMobile"
                value={formData.jobOwnerMobile}
                onChange={handleChange}
                placeholder="Mobile No."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="w-full flex justify-between gap-y-6 flex-col sm:flex-row">
            <div
              className="w-full sm:w-[55%] bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-2 flex-col p-6"
            >
              <div className="w-full flex space-y-2 flex-col">
                <div>
                  <label className="block text-gray-400 font-medium mb-2">
                    Skills Required
                  </label>
                  <div className="flex space-x-4 w-full">
                    <input
                      type="text"
                      placeholder="Skills"
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
                      Add
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
            <div
              className="w-full sm:w-[40%] bg-[#111827]/70 backdrop-blur-sm border border-gray-700/40 
           rounded-xl shadow-md flex gap-2 flex-col p-6"
            >
              <h2 className="block text-gray-400 font-medium mb-2">
                Enter Employement Type
              </h2>
              {employmentTypes.map((emType) => {
                return (
                  <label
                    className={`bg-cyan-950 px-4 py-3 rounded-lg flex justify-between items-center ${
                      formData.jobEmploymentType.includes(emType)
                        ? "border-green-700  border-2 "
                        : "border-1 border-white"
                    }`}
                  >
                    {emType}
                    <input
                      type="checkbox"
                      value={emType}
                      onChange={() => handleEmploymentType(emType)}
                      className="hidden"
                    />

                    {formData.jobEmploymentType.includes(emType) && (
                      <GrRadialSelected className="text-green-300" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="w-full bg-[#3C2A21] p-4 rounded-lg flex flex-col text-lg gap-4">
            <h2 className="block text-gray-400 font-medium mb-2">
              Enter Job Type
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              {jobTypes.map((emType) => {
                return (
                  <label
                    className={`bg-cyan-950 px-4 py-3 rounded-lg flex w-full sm:w-fit gap-4 justify-between items-center ${
                      formData.jobType.includes(emType)
                        ? "border-green-700  border-2 "
                        : "border-1 border-white"
                    }`}
                  >
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
                Tags:
              </label>
              <div className=" space-x-8">
                <input
                  type="text"
                  placeholder="Tags"
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
                  Add
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


           {errors && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            <ul className="list-disc list-inside">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[fit]  px-12 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            disabled={isLoading}
          >
            {editing ? "Update" : "Add"} Job
          </button>
        </form>


      </div>

      <Loader isLoading={isLoading}/>
      <Footer />
    </div>
  );
}
