import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import { FaLinkedin } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";

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
          `${apiURL}/store/aboutRecruiter/${userId}`,
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
    <div className=" flex flex-col bg-black text-white items-center ">
      <NavHome />
      <h1 className="text-3xl font-bold my-6 text-center">Recruiter Profile</h1>
      <div className="w-[80%] bg-[#0a1f1d] rounded-lg p-12">
        <div className="flex flex-col gap-12 ">
           <div className="flex justify-between px-32">
                  <img src={(formData.profilePicture && formData.profilePicture!==null) ? `${apiURL}${formData.profilePicture}` : "/AlternateProfilePic.png"}
                      className="w-[250px] h-[250px] self-center rounded-full mb-6" />
                    <div className='flex flex-col justify-center gap-8 items-start'>
                      <a className="flex gap-4 items-center hover:underline hover:text-red-100 bg-blue-900
                    hover:bg-[#183b34ab] px-6 py-3 rounded transition-all duration-300 ease-in-out" target={formData.linkedIn ? "_blank" : "_self"} href={formData.linkedIn ? `${formData.linkedIn}`: ""}><span className="text-3xl"> <FaLinkedin/> </span>Linked In  </a>
                      <a className="flex gap-4 items-center hover:underline hover:text-red-100 bg-cyan-600
                    hover:bg-[#183b34ab] px-6 py-3 rounded transition-all duration-300 ease-in-out" target={formData.companyWebsite ? "_blank" : "_self"} href={formData.companyWebsite ? `${formData.companyWebsite}` : ""}> <span className="text-3xl"> < FaGlobeAmericas/> </span>Company Website </a>
                    </div>
                    </div>
          <div className="flex flex-col gap-5 ">
            {[
              { field: "fullName", placeholder: "Full Name" },
              { field: "designation", placeholder: "Designation" },
              { field: "company", placeholder: "Company" },
              { field: "companyLogo", placeholder: "Company Logo" },
              { field: "companyWebsite", placeholder: "Company Website" },
              { field: "email", placeholder: "Email" },
              { field: "linkedIn", placeholder: "Linked In Url" },
            ].map(({ field, placeholder }) => {
              return (
                <div className="flex items-center gap-3">
                  <label className="text-gray-400 text-lg">{placeholder}</label>
                  <p className="text-md">{formData[field]}</p>
                </div>
              );
            })}
          </div>

          <div className="w-full flex p-6 border-2 border-white rounded-lg gap-6 flex-col">
            <label className="block text-gray-400 font-medium mb-2">
              Roles Hiring:
            </label>

            <div className="flex justify-start items-center gap-3 w-full flex-wrap">
              {formData.rolesHiring.map((role) => {
                return (
                  <span className="bg-cyan-950 px-3 py-1 rounded-lg flex items-center">
                    {role}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-3">
            <label className="text-gray-400 text-lg">About Recruiter</label>
            <p className="w-full h-44 p-4 border border-gray-300 rounded ">
              {formData.bio}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
