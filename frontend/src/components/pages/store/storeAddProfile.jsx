import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AddProfileToServer } from "../../../../services/Services";

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
      <h1 className="text-2xl font-bold mb-4 text-center">
        {editing ? "Edit" : "Add"} Profile
      </h1>

      {editing && <input type="hidden" name="_id" value={formData._id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input fields */}
        {[
          ["Name", "profileName", "text"],
          ["Gender", "profileGender", "text"],
          ["Post", "profilePost", "text"],
          ["Courses Done", "profileCourse", "text"],
         
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

        <input
          type="text"
          name="preferredLocation"
          onChange={(e) => setPreferredLocation(e.target.value)}
          value={preferredLocation}
        />
        <button
          onClick={(e) => {
            handleArrayAdd(e, "profilePreferredLocations", preferredLocation);
            setPreferredLocation("");
          }}
        >
          add
        </button>
        {formData.profilePreferredLocations.map((loc) => {
          return (
            <>
              <p>{loc}</p>
              <button
                onClick={(e) =>
                  handleArrayRemove(e, "profilePreferredLocations", loc)
                }
              >
                remove
              </button>
            </>
          );
        })}


<input 
        type="text"
        name="skill"
        onChange={(e)=>setSkill(e.target.value)}
        value={skill}
        />
        <button

        onClick ={(e)=>{handleArrayAdd(e,"profileSkills",skill);
          setSkill("");
        }}
        >add</button>
        {formData.profileSkills.map(skill => {
          return(
            <>
            <p>{skill}</p>
            <button onClick={(e) => handleArrayRemove(e,"profileSkills",skill)}>
              remove</button>
            </>
          )
        })}

        <input
          type="text"
          name="projectTitle"
          className="bg-pink-300"
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          value={project.title}
        />
        <input
          type="text"
          className="bg-pink-300"
          name="projectDescription"
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          value={project.description}
        />
        <input
          type="text"
          className="bg-pink-300"
          name="projectLink"
          onChange={(e) => setProject({ ...project, link: e.target.value })}
          value={project.link}
        />
        <input
          type="text"
          name="insideProjectTechnologies"
          onChange={(e) => setInsideProjectTechnologies(e.target.value)}
          value={insideProjectTechnologies}
        />
        <button
          onClick={(e) => {
            handleAddProjectTechnologies(e, insideProjectTechnologies);
            setInsideProjectTechnologies("");
          }}
        >
          add Technologies
        </button>
        {project.technologies.map((tech) => {
          return (
            <>
              <p>{tech}</p>
              <button onClick={(e) => handleRemoveProjectTechnologies(e, tech)}>
                remove
              </button>
            </>
          );
        })}

        <button
          onClick={(e) => {
            handleAddProject(e, project);
          }}
        >
          add Project
        </button>
        {formData.profileProjects.map((pro) => {
          return (
            <>
              <p>
                {pro.title}
                {pro.description}
                {pro.link}
                {pro.technologies.map((tech) => {
                  return <span>{tech}</span>;
                })}
              </p>
              <button onClick={(e) => handleRemoveProject(e, pro)}>
                remove
              </button>
            </>
          );
        })}

        {JobTypes.map((emType) => {
          return (
            <label>
              {emType}
              <input
                type="checkbox"
                value={emType}
                checked={formData.profileJobType.includes(emType)}
                onChange={() => handleJobType(emType)}
              />
            </label>
          );
        })}

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
          <label className="font-semibold mb-1">
            Describe About Post You are Looking For
          </label>
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
        <p className="text-sm text-gray-500 mt-2">
          *For multiple responses come back from the next page.
        </p>
      </div>
    </form>
  );
}
