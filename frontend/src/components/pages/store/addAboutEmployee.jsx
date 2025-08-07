import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";

export default function AddAboutEmployee() {
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const [achieve, setAchieve] = useState("");

  const [insideProjectTechnologies, setInsideProjectTechnologies] =
    useState("");
  const [project, setProject] = useState({
    title: "",
    description: "",
    link: "",
    technologies: [],
  });
  const [education, setEducation] = useState({
    degree: "",
    college: "",
    passingYear: "",
    CGPA: "",
  });

  const [experience, setExperience] = useState({
    company: "",
    role: "",
    duration: "",
    descriptionWork: "",
  });

  const [skill, setSkill] = useState("");

  const [language, setLanguage] = useState("");
  const [jobPreferred, setJobPreferred] = useState("");

  const { userId } = useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    profilePicture: "",
    profession: "",
    location: "",
    email: "",
    linkedIn: "",
    gitHub: "",
    bio: "",
    mobile: "",
    education: [],
    skills: [],
    experience: [],
    projects: [],
    achievements: [],
    languageKnown: [],
    jobPreferences: [],
  });

  useEffect(() => {
    const fetchAboutEmployee = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/store/addAboutEmployee/${userId}`,
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
        console.error("Error fetching About Employee", error);
      }
    };
    fetchAboutEmployee();
  }, []);

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
      const alreadyExists = formData.projects.some(
        (proj) =>
          proj.title === title &&
          proj.description === description &&
          proj.link === link
      );

      if (!alreadyExists) {
        setFormData({
          ...formData,
          ["projects"]: [...formData["projects"], { ...value }],
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
    let elementsArray = [...formData["projects"]];
    elementsArray = elementsArray.filter(
      (proj) =>
        !(
          proj.title === value.title &&
          proj.description === value.description &&
          proj.link === value.link
        )
    );
    setFormData({ ...formData, ["projects"]: elementsArray });
  };

  const handleAddEducation = (e, value) => {
    e.preventDefault();
    const { degree, college, passingYear, CGPA } = value;
    if (
      degree.trim() === "" ||
      college.trim() === "" ||
      passingYear.trim() === "" ||
      CGPA.trim() === ""
    ) {
      alert("Please fill all Education fields ");
      return;
    } else {
      const alreadyExists = formData.education.some(
        (edu) => edu.degree === degree
      );

      if (!alreadyExists) {
        setFormData({
          ...formData,
          ["education"]: [...formData["education"], { ...value }],
        });
        setEducation({
          degree: "",
          college: "",
          passingYear: "",
          CGPA: "",
        });
      } else {
        alert("This Degree already exists.");
      }
    }
  };

  const handleRemoveEducation = (e, value) => {
    e.preventDefault();
    let elementsArray = [...formData["education"]];
    elementsArray = elementsArray.filter(
      (edu) => !(edu.degree === value.degree)
    );
    setFormData({ ...formData, ["education"]: elementsArray });
  };

  const handleAddExperience = (e, value) => {
    e.preventDefault();
    const { company, role, duration, descriptionWork } = value;
    if (
      company.trim() === "" ||
      role.trim() === "" ||
      descriptionWork.trim() === "" ||
      duration.trim() === ""
    ) {
      alert("Please fill all Education fields ");
      return;
    } else {
      const alreadyExists = formData.experience.some(
        (exp) =>
          exp.company === company &&
          exp.role === role &&
          exp.duration === duration
      );

      if (!alreadyExists) {
        setFormData({
          ...formData,
          ["experience"]: [...formData["experience"], { ...value }],
        });
        setExperience({
          company: "",
          role: "",
          duration: "",
          descriptionWork: "",
        });
      } else {
        alert("This project already exists.");
      }
    }
  };

  const handleRemoveExperience = (e, value) => {
    e.preventDefault();
    let elementsArray = [...formData["experience"]];
    elementsArray = elementsArray.filter(
      (exp) =>
        !(
          exp.company === value.company &&
          exp.role === value.role &&
          exp.duration === value.duration
        )
    );
    setFormData({ ...formData, ["experience"]: elementsArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/store/addAboutEmployee`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setErrors(data.errors ? data.errors : null);
      if (!data.errors) {
        setMessage("Profile Updated Successfully");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-black text-white">
      <NavHome />
      <h1 className="text-3xl font-bold my-6 text-center">Your Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="w-[80%] p-8 bg-emerald-950 rounded-lg flex flex-col gap-8"
      >
        <div className="flex flex-col gap-5 ">
          {[
            { field: "fullName", placeholder: "Full Name" },
            { field: "profilePicture", placeholder: "Profile Picture" },
            { field: "profession", placeholder: "Profession" },
            { field: "location", placeholder: "Location" },
            { field: "email", placeholder: "Email" },
            { field: "linkedIn", placeholder: "LinkedIn" },
            { field: "gitHub", placeholder: "GitHub" },
            { field: "mobile", placeholder: "Mobile" },
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

        <div className="flex flex-col p-6 gap-6 w-full rounded-lg bg-amber-950">
          <h2 className="pl-8 text-lg">Experience:</h2>
          <div className="flex p-8 w-full justify-between">
            <div className=" flex flex-col gap-3 w-[45%]">
              <label className="text-gray-400 text-lg">Company:</label>
              <input
                type="text"
                placeholder="Company Name"
                name="experienceCompany"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e) =>
                  setExperience({ ...experience, company: e.target.value })
                }
                value={experience.company}
              />

              <label className="text-gray-400 text-lg">Role:</label>
              <input
                type="text"
                placeholder="Role"
                name="experienceRole"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e) =>
                  setExperience({ ...experience, role: e.target.value })
                }
                value={experience.role}
              />

              <label className="text-gray-400 text-lg">Duration:</label>
              <input
                type="text"
                placeholder="Duration"
                name="experienceDuration"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e) =>
                  setExperience({ ...experience, duration: e.target.value })
                }
                value={experience.duration}
              />

              <button
                onClick={(e) => {
                  handleAddExperience(e, experience);
                }}
                className="w-[fit] mt-6 px-12 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
              >
                Add Experience
              </button>
            </div>

            <div className="flex flex-col gap-3 w-[45%]">
              <label className="text-gray-400 text-lg">Description:</label>
              <textarea
                name="experienceDescriptionWork"
                placeholder="Description"
                className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 h-full"
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    descriptionWork: e.target.value,
                  })
                }
                value={experience.descriptionWork}
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-8 mt-12 flex-wrap">
            {formData.experience.map((exp) => {
              return (
                <div className="bg-cyan-950 flex flex-col p-12 rounded-lg w-[80%] ">
                  <div className="flex flex-col gap-3">
                    <div className="flex  gap-3 ">
                      <label className="block text-gray-400 text-md ">
                        Company:
                      </label>
                      <p className="text-md">{exp.company}</p>
                    </div>
                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        Role:
                      </label>
                      <p className="text-md">{exp.role}</p>
                    </div>
                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        Duration:
                      </label>
                      <p className="text-md">{exp.duration}</p>
                    </div>

                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        Description:
                      </label>
                      <p className="text-md text-wrap">{exp.descriptionWork}</p>
                    </div>
                  </div>
                  <div className="flex mt-6 mb-2 justify-center ">
                    <button
                      onClick={(e) => handleRemoveExperience(e, exp)}
                      className=" w-min  px-12 bg-red-700 text-white py-2 rounded hover:bg-red-950 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col p-6 gap-6 w-full rounded-lg bg-amber-950">
          <h2 className="pl-8 text-lg">Education:</h2>
          <div className="flex p-8 w-full flex-col items-center">
            <div className=" flex justify-around w-[90%] gap-5 flex-wrap">
              <div className="flex flex-col gap-3 w-[45%]">
                <label className="text-gray-400 text-lg">Degree:</label>
                <input
                  type="text"
                  placeholder="Degree"
                  name="educationDegree"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) =>
                    setEducation({ ...education, degree: e.target.value })
                  }
                  value={education.degree}
                />
              </div>

              <div className="flex flex-col gap-3 w-[45%]">
                <label className="text-gray-400 text-lg">College:</label>
                <input
                  type="text"
                  placeholder="College"
                  name="educationCollege"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) =>
                    setEducation({ ...education, college: e.target.value })
                  }
                  value={education.college}
                />
              </div>

              <div className="flex flex-col gap-3 w-[45%]">
                <label className="text-gray-400 text-lg">Passing Year:</label>
                <input
                  type="text"
                  placeholder="Passing Year"
                  name="educationPassingYear"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) =>
                    setEducation({ ...education, passingYear: e.target.value })
                  }
                  value={education.passingYear}
                />
              </div>

              <div className="flex flex-col gap-3 w-[45%]">
                <label className="text-gray-400 text-lg">CGPA:</label>
                <input
                  type="text"
                  placeholder="CGPA"
                  name="educationCGPA"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) =>
                    setEducation({ ...education, CGPA: e.target.value })
                  }
                  value={education.CGPA}
                />
              </div>
            </div>

            <button
              onClick={(e) => {
                handleAddEducation(e, education);
              }}
              className="w-[fit] mt-6 px-12 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
            >
              Add Education
            </button>
          </div>

          <div className="w-full flex justify-around gap-8 mt-12 flex-wrap">
            {formData.education.map((edu) => {
              return (
                <div className="bg-cyan-950 flex flex-col p-12 rounded-lg w-[40%] ">
                  <div className="flex flex-col gap-3">
                    <div className="flex  gap-3 ">
                      <label className="block text-gray-400 text-md ">
                        Degree:
                      </label>
                      <p className="text-md">{edu.degree}</p>
                    </div>
                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        College:
                      </label>
                      <p className="text-md">{edu.college}</p>
                    </div>
                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        Passing Year:
                      </label>
                      <p className="text-md">{edu.passingYear}</p>
                    </div>

                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        CGPA:
                      </label>
                      <p className="text-md text-wrap">{edu.CGPA}</p>
                    </div>
                  </div>
                  <div className="flex mt-6 mb-2 justify-center ">
                    <button
                      onClick={(e) => handleRemoveEducation(e, edu)}
                      className=" w-min  px-12 bg-red-700 text-white py-2 rounded hover:bg-red-950 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
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
                placeholder="Title"
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
                placeholder="Description"
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
                placeholder="Link"
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
                  placeholder="Project Technologies Used"
                  name="insideProjectTechnologies"
                  onChange={(e) => setInsideProjectTechnologies(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={insideProjectTechnologies}
                />
                <button
                  onClick={(e) => {
                    handleAddProjectTechnologies(e, insideProjectTechnologies);
                    setInsideProjectTechnologies("");
                  }}
                  className="w-[fit] mt-6  px-4 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
                >
                  Add
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
                  Add Project
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-8 mt-12 flex-wrap">
            {formData.projects.map((pro) => {
              return (
                <div className="bg-cyan-950 flex flex-col rounded-lg w-[80%] p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        Title:
                      </label>
                      <p className="text-md">{pro.title}</p>
                    </div>
                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        Description:
                      </label>
                      <p className="text-md">{pro.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        Link:
                      </label>
                      <p className="text-md">{pro.link}</p>
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

        <div className="w-full flex flex-wrap gap-8 justify-around">
          <div className="w-[45%] bg-[#3C2A21] p-4 rounded-lg h-fit">
            <div className="w-full flex space-y-2 flex-col">
              <div>
                <label className="block text-gray-400 font-medium mb-2">
                  Skills
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
                      handleArrayAdd(e, "skills", skill);
                      setSkill("");
                    }}
                    className="bg-amber-800 px-6 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex justify-start items-center gap-3 w-full flex-wrap"></div>
              {formData.skills.map((skill) => {
                return (
                  <div className="bg-cyan-950 px-4 py-3 rounded-lg flex items-center justify-between border-white border-1">
                    <span>{skill}</span>
                    <button
                      onClick={(e) => handleArrayRemove(e, "skills", skill)}
                    >
                      <MdOutlineCancel className=" h-full ml-2" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-[45%] h-fit bg-[#3C2A21] p-4 rounded-lg">
            <div className="w-full flex space-y-2 flex-col">
              <div>
                <label className="block text-gray-400 font-medium mb-2">
                  Achievements
                </label>
                <div className="flex space-x-4 w-full">
                  <input
                    type="text"
                    placeholder="Achievements"
                    name="achieve"
                    onChange={(e) => setAchieve(e.target.value)}
                    value={achieve}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={(e) => {
                      handleArrayAdd(e, "achievements", achieve);
                      setAchieve("");
                    }}
                    className="bg-amber-800 px-6 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex justify-start items-center gap-3 w-full flex-wrap"></div>
              {formData.achievements.map((achi) => {
                return (
                  <div className="bg-cyan-950 px-4 py-3 rounded-lg flex items-center justify-between border-white border-1">
                    <span>{achi}</span>
                    <button
                      onClick={(e) =>
                        handleArrayRemove(e, "achievements", achi)
                      }
                    >
                      <MdOutlineCancel className=" h-full ml-2" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-[45%] bg-[#3C2A21] p-4 rounded-lg h-fit">
            <div className="w-full flex space-y-2 flex-col">
              <div>
                <label className="block text-gray-400 font-medium mb-2">
                  Job Preferences
                </label>
                <div className="flex space-x-4 w-full">
                  <input
                    type="text"
                    placeholder="Job Preference"
                    name="jobPreferred"
                    onChange={(e) => setJobPreferred(e.target.value)}
                    value={jobPreferred}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={(e) => {
                      handleArrayAdd(e, "jobPreferences", jobPreferred);
                      setJobPreferred("");
                    }}
                    className="bg-amber-800 px-6 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex justify-start items-center gap-3 w-full flex-wrap"></div>
              {formData.jobPreferences.map((pref) => {
                return (
                  <div className="bg-cyan-950 px-4 py-3 rounded-lg flex items-center justify-between border-white border-1">
                    <span>{pref}</span>
                    <button
                      onClick={(e) =>
                        handleArrayRemove(e, "jobPreferences", pref)
                      }
                    >
                      <MdOutlineCancel className=" h-full ml-2" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-[45%] h-fit bg-[#3C2A21] p-4 rounded-lg">
            <div className="w-full flex space-y-2 flex-col">
              <div>
                <label className="block text-gray-400 font-medium mb-2">
                  Languages Known
                </label>
                <div className="flex space-x-4 w-full">
                  <input
                    type="text"
                    placeholder="Languages Known"
                    name="language"
                    onChange={(e) => setLanguage(e.target.value)}
                    value={language}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={(e) => {
                      handleArrayAdd(e, "languageKnown", language);
                      setLanguage("");
                    }}
                    className="bg-amber-800 px-6 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex justify-start items-center gap-3 w-full flex-wrap"></div>
              {formData.languageKnown.map((lang) => {
                return (
                  <div className="bg-cyan-950 px-4 py-3 rounded-lg flex items-center justify-between border-white border-1">
                    <span>{lang}</span>
                    <button
                      onClick={(e) =>
                        handleArrayRemove(e, "languageKnown", language)
                      }
                    >
                      <MdOutlineCancel className=" h-full ml-2" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button
          className="w-fit self-center mt-12  px-12 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          type="submit"
        >
          Update
        </button>
      </form>
      <Footer />
    </div>
  );
}
