import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
    CGPA: ""
  });

  const [experience, setExperience] = useState({
    company: "",
    role: "",
    duration: "",
    descriptionWork:""
  })
    
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
                const response = await fetch(`http://localhost:3000/store/addAboutEmployee/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                       
                        
                  },
                  credentials: "include",
                } );
                const data = await response.json();
                setFormData({ ...data });
            }
            catch (error) {
                console.error("Error fetching About Employee", error);
            }
        };
        fetchAboutEmployee();
            
        
    },[]);

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
        (edu) =>
          edu.degree === degree 
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
          CGPA:""
        });
      } else {
        alert("This project already exists.");
      }
    }
  };

  const handleRemoveEducation = (e, value) => {
    e.preventDefault();
    let elementsArray = [...formData["education"]];
    elementsArray = elementsArray.filter(
      (edu) =>
        !(
          edu.degree === value.degree
        )
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
          exp.company === company && exp.role === role && exp.duration === duration 
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
          descriptionWork:""
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
          exp.company === value.company && exp.role === value.role && exp.duration === value.duration
        )
    );
    setFormData({ ...formData, ["experience"]: elementsArray });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/store/addAboutEmployee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
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
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
      <input name="profilePicture" value={formData.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" />
      <input name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="linkedIn" value={formData.linkedIn} onChange={handleChange} placeholder="LinkedIn" />
      <input name="gitHub" value={formData.gitHub} onChange={handleChange} placeholder="GitHub" />
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />

      <input
          type="text"
          name="experienceCompany"
          className="bg-pink-300"
          onChange={(e) => setExperience({ ...experience, company: e.target.value })}
          value={experience.company}
        />
        <input
          type="text"
          name="experienceRole"
          className="bg-pink-300"
          onChange={(e) => setExperience({ ...experience, role: e.target.value })}
          value={experience.role}
      />
      <input
          type="text"
          name="experienceDuration"
          className="bg-pink-300"
          onChange={(e) => setExperience({ ...experience, duration: e.target.value })}
          value={experience.duration}
      />
      <input
          type="text"
          name="experienceDescriptionWork"
          className="bg-pink-300"
          onChange={(e) => setExperience({ ...experience, descriptionWork: e.target.value })}
          value={experience.descriptionWork}
        />
      


      <button
          onClick={(e) => {
            handleAddExperience(e, experience);
        }}
        className="bg-yellow-400"
        >
          add Experience
        </button>
        {formData.experience.map((exp) => {
          return (
            <>
              <p>
                {exp.company}
                {exp.role}
                {exp.duration}
                {exp.descriptionWork}
              </p>
              <button onClick={(e) => handleRemoveExperience(e, exp)}>
                remove
              </button>
            </>
          );
        })}
      

      {/* Skills */}
      <input 
        type="text"
        name="skill"
        onChange={(e)=>setSkill(e.target.value)}
        value={skill}
        />
        <button

        onClick ={(e)=>{handleArrayAdd(e,"skills",skill);
          setSkill("");
        }}
        >add</button>
        {formData.skills.map(skill => {
          return(
            <>
            <p>{skill}</p>
            <button onClick={(e) => handleArrayRemove(e,"skills",skill)}>
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
        {formData.projects.map((pro) => {
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
      


     <input
          type="text"
          name="educationDegree"
          className="bg-pink-300"
          onChange={(e) => setEducation({ ...education, degree: e.target.value })}
          value={education.degree}
        />
        <input
          type="text"
          name="educationCollege"
          className="bg-pink-300"
          onChange={(e) => setEducation({ ...education, college: e.target.value })}
          value={education.college}
      />
      <input
          type="text"
          name="educationPassingYear"
          className="bg-pink-300"
          onChange={(e) => setEducation({ ...education, passingYear: e.target.value })}
          value={education.passingYear}
      />
      <input
          type="text"
          name="educationCGPA"
          className="bg-pink-300"
          onChange={(e) => setEducation({ ...education, CGPA: e.target.value })}
          value={education.CGPA}
        />
      


      <button
          onClick={(e) => {
            handleAddEducation(e, education);
        }}
        className="bg-yellow-300"
        >
          add Education
        </button>
        {formData.education.map((edu) => {
          return (
            <>
              <p>
                {edu.degree}
                {edu.college}
                {edu.passingYear}
                {edu.CGPA}
              </p>
              <button onClick={(e) => handleRemoveEducation(e, edu)}>
                remove
              </button>
            </>
          );
        })}

      

      <input 
        type="text"
        name="language"
        onChange={(e)=>setLanguage(e.target.value)}
        value={language}
        />
        <button

        onClick ={(e)=>{handleArrayAdd(e,"languageKnown",language);
          setLanguage("");
        }}
        >add</button>
        {formData.languageKnown.map(language => {
          return(
            <>
            <p>{language}</p>
            <button onClick={(e) => handleArrayRemove(e,"languageKnown",language)}>
              remove</button>
            </>
          )
        })}
      
      <input 
        type="text"
        name="achieve"
        onChange={(e)=>setAchieve(e.target.value)}
        value={achieve}
        />
        <button

        onClick ={(e)=>{handleArrayAdd(e,"achievements",achieve);
          setAchieve("");
        }}
        className="bg-red-200"
        >add</button>
        {formData.achievements.map(achi => {
          return(
            <>
            <p>{achi}</p>
            <button onClick={(e) => handleArrayRemove(e,"achievements",achi)}>
              remove</button>
            </>
          )
        })}
      
      <input 
        type="text"
        name="jobPreferred"
        onChange={(e)=>setJobPreferred(e.target.value)}
        value={jobPreferred}
        />
        <button

        onClick ={(e)=>{handleArrayAdd(e,"jobPreferences",jobPreferred);
          setJobPreferred("");
        }}
        >add</button>
        {formData.jobPreferences.map(pref => {
          return(
            <>
            <p>{pref}</p>
            <button onClick={(e) => handleArrayRemove(e,"jobPreferences",pref)}>
              remove</button>
            </>
          )
        })}

      <button type="submit">Submit</button>
    </form>
  );
}
