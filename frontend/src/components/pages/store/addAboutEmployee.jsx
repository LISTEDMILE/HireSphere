import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AddAboutEmployee() {

    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);

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
    achievements: "",
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
                        credentials: "include",
                        
                    }
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddArrayItem = (key, emptyObj = "") => {
    setFormData({ ...formData, [key]: [...formData[key], emptyObj] });
  };

  const handleArrayChange = (key, index, field, value) => {
    const updated = [...formData[key]];
    if (typeof updated[index] === "string") {
      updated[index] = value;
    } else {
      updated[index][field] = value;
    }
    setFormData({ ...formData, [key]: updated });
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

      {/* Education */}
      <div>
        <h4>Education</h4>
        {formData.education.map((edu, idx) => (
          <div key={idx}>
            <input placeholder="Degree" value={edu.degree} onChange={e => handleArrayChange("education", idx, "degree", e.target.value)} />
            <input placeholder="College" value={edu.college} onChange={e => handleArrayChange("education", idx, "college", e.target.value)} />
            <input placeholder="Passing Year" value={edu.passingYear} onChange={e => handleArrayChange("education", idx, "passingYear", e.target.value)} />
            <input placeholder="CGPA" value={edu.CGPA} onChange={e => handleArrayChange("education", idx, "CGPA", e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={() => handleAddArrayItem("education", { degree: "", college: "", passingYear: "", CGPA: "" })}>+ Add Education</button>
      </div>

      {/* Skills */}
      <div>
        <h4>Skills</h4>
        {formData.skills.map((skill, idx) => (
          <input key={idx} value={skill} onChange={e => handleArrayChange("skills", idx, null, e.target.value)} placeholder={`Skill ${idx + 1}`} />
        ))}
        <button type="button" onClick={() => handleAddArrayItem("skills", "")}>+ Add Skill</button>
      </div>

      {/* Experience */}
      <div>
        <h4>Experience</h4>
        {formData.experience.map((exp, idx) => (
          <div key={idx}>
            <input placeholder="Company" value={exp.company} onChange={e => handleArrayChange("experience", idx, "company", e.target.value)} />
            <input placeholder="Role" value={exp.role} onChange={e => handleArrayChange("experience", idx, "role", e.target.value)} />
            <input placeholder="Duration" value={exp.duration} onChange={e => handleArrayChange("experience", idx, "duration", e.target.value)} />
            <textarea placeholder="Work Description" value={exp.descriptionWork} onChange={e => handleArrayChange("experience", idx, "descriptionWork", e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={() => handleAddArrayItem("experience", { company: "", role: "", duration: "", descriptionWork: "" })}>+ Add Experience</button>
      </div>

      {/* Projects */}
      <div>
        <h4>Projects</h4>
        {formData.projects.map((proj, idx) => (
          <div key={idx}>
            <input placeholder="Title" value={proj.title} onChange={e => handleArrayChange("projects", idx, "title", e.target.value)} />
            <textarea placeholder="Description" value={proj.descriptionProject} onChange={e => handleArrayChange("projects", idx, "descriptionProject", e.target.value)} />
            <input placeholder="Link" value={proj.linkProject} onChange={e => handleArrayChange("projects", idx, "linkProject", e.target.value)} />
            <div>
              <h5>Technologies Used</h5>
              {(proj.technologiesUsed || []).map((tech, i) => (
                <input key={i} value={tech} onChange={e => {
                  const updatedTechs = [...proj.technologiesUsed];
                  updatedTechs[i] = e.target.value;
                  handleArrayChange("projects", idx, "technologiesUsed", updatedTechs);
                }} placeholder={`Tech ${i + 1}`} />
              ))}
              <button type="button" onClick={() => {
                const updated = [...formData.projects];
                updated[idx].technologiesUsed = [...(updated[idx].technologiesUsed || []), ""];
                setFormData({ ...formData, projects: updated });
              }}>+ Add Tech</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => handleAddArrayItem("projects", { title: "", descriptionProject: "", technologiesUsed: [], linkProject: "" })}>+ Add Project</button>
      </div>

      {/* Other Fields */}
      <textarea name="achievements" value={formData.achievements} onChange={handleChange} placeholder="Achievements" />
      
      <div>
        <h4>Languages Known</h4>
        {formData.languageKnown.map((lang, idx) => (
          <input key={idx} value={lang} onChange={e => handleArrayChange("languageKnown", idx, null, e.target.value)} placeholder={`Language ${idx + 1}`} />
        ))}
        <button type="button" onClick={() => handleAddArrayItem("languageKnown", "")}>+ Add Language</button>
      </div>

      <div>
        <h4>Job Preferences</h4>
        {formData.jobPreferences.map((pref, idx) => (
          <input key={idx} value={pref} onChange={e => handleArrayChange("jobPreferences", idx, null, e.target.value)} placeholder={`Preference ${idx + 1}`} />
        ))}
        <button type="button" onClick={() => handleAddArrayItem("jobPreferences", "")}>+ Add Preference</button>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
