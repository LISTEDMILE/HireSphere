import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AboutEmployee() {
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
        const response = await fetch(`http://localhost:3000/host/aboutEmployee/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setFormData({ ...data });
      } catch (error) {
        console.error("Error fetching About Employee", error);
      }
    };

    fetchAboutEmployee();
  }, [userId]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Employee Profile</h1>

      {formData.profilePicture && (
        <div className="flex justify-center mb-6">
          <img
            src={formData.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
      )}

      <DisplayItem label="Full Name" value={formData.fullName} />
      <DisplayItem label="Profession" value={formData.profession} />
      <DisplayItem label="Location" value={formData.location} />
      <DisplayItem label="Email" value={formData.email} />
      <DisplayItem
        label="LinkedIn"
        value={
          formData.linkedIn ? (
            <a href={formData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {formData.linkedIn}
            </a>
          ) : "N/A"
        }
      />
      <DisplayItem
        label="GitHub"
        value={
          formData.gitHub ? (
            <a href={formData.gitHub} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {formData.gitHub}
            </a>
          ) : "N/A"
        }
      />
      <DisplayItem label="Bio" value={formData.bio} />
      <DisplayArray label="Skills" items={formData.skills} />
      <DisplayArray label="Languages Known" items={formData.languageKnown} />
      <DisplayArray label="Job Preferences" items={formData.jobPreferences} />
      <DisplayItem label="Achievements" value={formData.achievements} />

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        {formData.education.map((edu, idx) => (
          <div key={idx} className="p-2 border rounded mb-2">
            <p><strong>Degree:</strong> {edu.degree}</p>
            <p><strong>College:</strong> {edu.college}</p>
            <p><strong>Passing Year:</strong> {edu.passingYear}</p>
            <p><strong>CGPA:</strong> {edu.CGPA}</p>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        {formData.experience.map((exp, idx) => (
          <div key={idx} className="p-2 border rounded mb-2">
            <p><strong>Company:</strong> {exp.company}</p>
            <p><strong>Role:</strong> {exp.role}</p>
            <p><strong>Duration:</strong> {exp.duration}</p>
            <p><strong>Description:</strong> {exp.descriptionWork}</p>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {formData.projects.map((proj, idx) => (
          <div key={idx} className="p-2 border rounded mb-2">
            <p><strong>Title:</strong> {proj.title}</p>
            <p><strong>Description:</strong> {proj.descriptionProject}</p>
            {proj.linkProject && (
              <p>
                <strong>Link:</strong>{" "}
                <a href={proj.linkProject} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {proj.linkProject}
                </a>
              </p>
            )}
            <p><strong>Technologies Used:</strong> {proj.technologiesUsed?.join(", ")}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

// Component to display simple field
function DisplayItem({ label, value }) {
  return (
    <div className="mb-3">
      <div className="text-gray-600 font-medium">{label}</div>
      <div className="text-gray-900">{value || "N/A"}</div>
    </div>
  );
}

// Component to display an array field
function DisplayArray({ label, items }) {
  return (
    <div className="mb-4">
      <div className="text-gray-600 font-medium mb-1">{label}</div>
      {items && items.length > 0 ? (
        <ul className="list-disc list-inside text-gray-900">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500">N/A</div>
      )}
    </div>
  );
}
