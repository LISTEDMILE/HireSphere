import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AboutRecruiter() {
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
        const response = await fetch(
          `http://localhost:3000/store/aboutRecruiter/${userId}`,
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
        console.error("Error fetching About Recruiter", error);
      }
    };
    fetchAboutRecruiter();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Recruiter Profile</h1>

      {formData.profilePicture && (
        <div className="flex justify-center mb-4">
          <img
            src={formData.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
      )}

      <InfoItem label="Full Name" value={formData.fullName} />
      <InfoItem label="Designation" value={formData.designation} />

      {formData.companyLogo && (
        <div className="flex items-center mb-4">
          <img
            src={formData.companyLogo}
            alt="Company Logo"
            className="w-16 h-16 object-contain mr-4"
          />
          <div>
            <div className="text-lg font-semibold">{formData.company}</div>
            {formData.companyWebsite && (
              <a
                href={formData.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                {formData.companyWebsite}
              </a>
            )}
          </div>
        </div>
      )}

      <InfoItem label="Email" value={formData.email} />
      <InfoItem
        label="LinkedIn"
        value={
          formData.linkedIn ? (
            <a
              href={formData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {formData.linkedIn}
            </a>
          ) : (
            ""
          )
        }
      />

      <InfoItem label="Bio" value={formData.bio} />
      <InfoItem
        label="Roles Hiring For"
        value={
          formData.rolesHiring && formData.rolesHiring.length > 0
            ? formData.rolesHiring.join(", ")
            : "N/A"
        }
      />
    </div>
  );
}

// Reusable display-only field
function InfoItem({ label, value }) {
  return (
    <div className="mb-4">
      <div className="text-gray-600 font-medium">{label}</div>
      <div className="text-gray-900">{value || "N/A"}</div>
    </div>
  );
}
