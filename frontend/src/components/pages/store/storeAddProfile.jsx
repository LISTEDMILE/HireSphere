import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AddProfileToServer } from "../../../../services/Services";
import { MdOutlineCancel } from "react-icons/md";
import { GrRadialSelected } from "react-icons/gr";
import NavHome from "../../compo/NavHome";

export default function ProfileForm() {
  const [errors, setErrors] = useState(null);
  const [preferredLocation, setPreferredLocation] = useState("");
  const [insideProjectTechnologies, setInsideProjectTechnologies] =
    useState("");
  const [project, setProject] = useState({
    title: "",
    description: "",
    link: "",
    technologies: [],
  });

  const [skill, setSkill] = useState("");

  const { profileId } = useParams();
  const location = useLocation();
  const editing =
    new URLSearchParams(location.search).get("editing") === "true"; // Check if editing is true

  const JobTypes = [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Contract",
    "Freelance",
    "Temporary",
    "Remote",
    "Hybrid",
  ];

  const [formData, setFormData] = useState({
    profileName: "",
    profileGender: "",
    profilePost: "",
    profileCourse: "",
    profileSkills: [],
    profileEmail: "",
    profileMobile: "",
    profileTenth: 0,
    profileTwelth: 0,
    profileGraduation: 0,
    profileExperience: "",
    profileJobType: [],
    profileExpectedSalary: "",
    profilePreferredLocations: [],
    profileProjects: [],
    profileDescription: "",
    profilePostDescription: "",
  });

  useEffect(() => {
    if (editing) {
      fetchProfileDetails();
    }
  }, [editing]);

  const fetchProfileDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/store/editProfile/${profileId}`,
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

  const handleAddProjectTechnologies = (e, value) => {
    e.preventDefault();
    if (
      value !== null &&
      value.trim() !== "" &&
      !project["technologies"].includes(value)
    ) {
      setProject({
        ...project,
        ["technologies"]: [...project["technologies"], value],
      });
    }
  };
  const handleAddProject = (e, value) => {
    e.preventDefault();
    const { title, description, link, technologies } = value;
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      link.trim() === "" ||
      !Array.isArray(technologies) ||
      technologies.length === 0
    ) {
      alert("Please fill all project fields and add at least one technology.");
      return;
    } else {
      const alreadyExists = formData.profileProjects.some(
        (proj) =>
          proj.title === title &&
          proj.description === description &&
          proj.link === link
      );

      if (!alreadyExists) {
        setFormData({
          ...formData,
          ["profileProjects"]: [...formData["profileProjects"], { ...value }],
        });
        setProject({
          title: "",
          description: "",
          link: "",
          technologies: [],
        });
      } else {
        alert("This project already exists.");
      }
    }
  };

  const handleRemoveProjectTechnologies = (e, value) => {
    e.preventDefault();
    let array = [...project["technologies"]];
    array = array.filter((tech) => tech !== value);
    setProject({ ...project, technologies: [...array] });
  };
  const handleRemoveProject = (e, value) => {
    e.preventDefault();
    let elementsArray = [...formData["profileProjects"]];
    elementsArray = elementsArray.filter(
      (proj) =>
        !(
          proj.title === value.title &&
          proj.description === value.description &&
          proj.link === value.link
        )
    );
    setFormData({ ...formData, ["profileProjects"]: elementsArray });
  };

  const handleJobType = (value) => {
    let emTypes = [...formData["profileJobType"]];
    emTypes = emTypes.includes(value)
      ? emTypes.filter((entry) => entry !== value)
      : [...emTypes, value];
    setFormData({ ...formData, profileJobType: [...emTypes] });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await AddProfileToServer(formData);
    setErrors(data.errors ? data.errors : null);
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/store/storeProfileList");
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-black">
      <NavHome active="addJob" />
      <div className="w-[80%] p-6 flex flex-col items-center shadow-md rounded-lg bg-[#0a1f1d] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {editing ? "Edit" : "Add"} Resume
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
          action={`/store/${editing ? "editProfile" : "addProfile"}`}
          method="POST"
          className="space-y-8 p-6 flex flex-col items-center w-full"
        >
          {editing && <input type="hidden" name="_id" value={formData._id} />}

          {/* Input fields */}
          {[
            ["Name", "profileName", "text"],
            ["Gender", "profileGender", "text"],
            ["Post", "profilePost", "text"],
            ["Courses Done", "profileCourse", "text"],

            ["Email", "profileEmail", "email"],
            ["Mobile", "profileMobile", "number"],
            ["Expected Salary", "profileExpectedSalary", "text"],
            ["Experience", "profileExperience", "text"],
          ].map(([label, name, type]) => (
            <div key={name} className="w-full">
              <label className="block text-gray-400 font-medium mb-2">
                {label}
              </label>
              <input
                required
                type={type}
                name={name}
                placeholder={label}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          ))}

          <div className="w-[80%] bg-[#3C2A21] p-4 rounded-lg">
            <div className="w-full flex space-y-2 flex-col">
              <div>
                <label className="block text-gray-400 font-medium mb-2">
                  Preferred Locations:
                </label>
                <div className="flex space-x-4 w-full">
                  <input
                    type="text"
                    name="preferredLocation"
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    value={preferredLocation}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={(e) => {
                      handleArrayAdd(
                        e,
                        "profilePreferredLocations",
                        preferredLocation
                      );
                      setPreferredLocation("");
                    }}
                    className="bg-amber-800 px-6 py-2 rounded-lg"
                  >
                    add
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-start flex-col mt-8 items-center gap-3 w-full flex-wrap">
              {formData.profilePreferredLocations.map((loc) => {
                return (
                  <div className="bg-cyan-950 px-4 py-3 rounded-lg flex  w-full text-wrap items-center justify-between border-white border-1">
                    <span>{loc}</span>
                    <button
                      onClick={(e) =>
                        handleArrayRemove(e, "profilePreferredLocations", loc)
                      }
                    >
                      <MdOutlineCancel className=" h-full ml-2" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div className="w-full flex justify-between">
            <div className="w-[55%] bg-[#3C2A21] p-4 rounded-lg">
              <div className="w-full flex space-y-2 flex-col">
                <div>
                  <label className="block text-gray-400 font-medium mb-2">
                    Skills:
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
                        handleArrayAdd(e, "profileSkills", skill);
                        setSkill("");
                      }}
                      className="bg-amber-800 px-6 py-2 rounded-lg"
                    >
                      add
                    </button>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-3 w-full flex-wrap"></div>
                {formData.profileSkills.map((skill) => {
                  return (
                    <div className="bg-cyan-950 px-4 py-3 rounded-lg flex items-center justify-between border-white border-1">
                      <span>{skill}</span>
                      <button
                        onClick={(e) =>
                          handleArrayRemove(e, "profileSkills", skill)
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
              <h2 className="block text-gray-400 font-medium mb-2">
                {" "}
                Job Type
              </h2>

              {JobTypes.map((emType) => {
                return (
                  <label
                    className={`bg-cyan-950 px-4 py-3 rounded-lg flex justify-between items-center ${
                      formData.profileJobType.includes(emType)
                        ? "border-green-700  border-2 "
                        : "border-1 border-white"
                    }`}
                  >
                    {emType}
                    <input
                      type="checkbox"
                      value={emType}
                      className="hidden"
                      onChange={() => handleJobType(emType)}
                    />
                    {formData.profileJobType.includes(emType) && (
                      <GrRadialSelected className="text-green-300" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="bg-[#3C2A21] p-4 rounded-lg w-full flex flex-col">
            <h1 className="text-2xl mb-4">Projects</h1>
            <div className="flex justify-around">
              <div className="flex flex-col gap-3 w-[45%]">
                <label className="block text-gray-400 font-medium mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) =>
                    setProject({ ...project, title: e.target.value })
                  }
                  value={project.title}
                />
                <label className="block text-gray-400 font-medium mb-2">
                  Description:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  name="projectDescription"
                  onChange={(e) =>
                    setProject({ ...project, description: e.target.value })
                  }
                  value={project.description}
                />
                <label className="block text-gray-400 font-medium mb-2">
                  Link:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  name="projectLink"
                  onChange={(e) =>
                    setProject({ ...project, link: e.target.value })
                  }
                  value={project.link}
                />
              </div>
              <div className="flex flex-col gap-8 w-[45%] border-2 border-white rounded-lg h-fit">
                <div className="flex flex-col  p-8 w-full">
                  <input
                    type="text"
                    name="insideProjectTechnologies"
                    onChange={(e) =>
                      setInsideProjectTechnologies(e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={insideProjectTechnologies}
                  />
                  <button
                    onClick={(e) => {
                      handleAddProjectTechnologies(
                        e,
                        insideProjectTechnologies
                      );
                      setInsideProjectTechnologies("");
                    }}
                    className="w-[fit] mt-6  px-4 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
                  >
                    add
                  </button>
                  <div className="flex justify-start items-center gap-3 w-full mt-4 flex-wrap">
                    {project.technologies.map((tech) => {
                      return (
                        <div className="bg-cyan-950 px-3 py-1 rounded-lg flex items-center">
                          <span>{tech}</span>
                          <button
                            onClick={(e) =>
                              handleRemoveProjectTechnologies(e, tech)
                            }
                          >
                            <MdOutlineCancel className=" h-full ml-2" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex mb-3 w-full justify-center">
                  <button
                    onClick={(e) => {
                      handleAddProject(e, project);
                    }}
                    className="  px-12 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
                  >
                    add Project
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-around gap-8 mt-12 flex-wrap">
              {formData.profileProjects.map((pro) => {
                return (
                  <div className="bg-cyan-950 flex flex-col rounded-lg w-[30%] p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3 items-center">
                        <label className="block text-gray-400 text-md ">
                          Title:
                        </label>
                        <p className="text-lg">{pro.title}</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <label className="block text-gray-400 text-md ">
                          Description:
                        </label>
                        <p className="text-lg">{pro.description}</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <label className="block text-gray-400 text-md ">
                          Link:
                        </label>
                        <p className="text-lg">{pro.link}</p>
                      </div>

                      <label className="block text-gray-400 text-md ">
                        Technologies Used:
                      </label>
                      <div className="flex justify-start items-center gap-3 w-full flex-wrap">
                        {pro.technologies.map((tech) => {
                          return (
                            <div className="bg-cyan-600 px-3 py-1 rounded-lg flex items-center">
                              <span>{tech}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex mt-6 mb-2 justify-center ">
                      <button
                        onClick={(e) => handleRemoveProject(e, pro)}
                        className=" w-min  px-12 bg-red-700 text-white py-2 rounded hover:bg-red-950 transition"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Percentage fields with slider */}
          <div className="w-full justify-around flex">
            {[
              ["10th (%)", "profileTenth"],
              ["12th (%)", "profileTwelth"],
              ["Graduation (%)", "profileGraduation"],
            ].map(([label, name]) => (
              <div key={name} className="w-[30%] flex flex-col gap-6">
                <label className="block text-gray-400 font-medium mb-2">
                  {label}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData[name]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [name]: parseFloat(e.target.value),
                    })
                  }
                  className="accent-blue-500 w-full"
                />
              </div>
            ))}
          </div>

          {/* Textarea: Describe Yourself */}
          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
              Describe Yourself
            </label>
            <textarea
              required
              name="profileDescription"
              placeholder="Describe yourself here"
              value={formData.profileDescription}
              onChange={handleChange}
              className="w-full h-44 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Textarea: Describe Post */}
          <div className="w-full">
            <label className="block text-gray-400 font-medium mb-2">
              Describe About Post You are Looking For
            </label>
            <textarea
              required
              name="profilePostDescription"
              placeholder="Describe your desired post here"
              value={formData.profilePostDescription}
              onChange={handleChange}
              className="w-full h-44 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <input
              id="submit"
              type="submit"
              value={editing ? "Update" : "Add"}
              className="w-[fit]  px-12 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            />
            <p className="text-sm text-gray-500 mt-2">
              *For multiple responses come back from the next page.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
