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
     <div className="w-full min-h-[100vh] flex flex-col items-center ">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center">
        <span className="relative z-10">Recruiter Profile</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>
      <div className="w-full sm:w-[80%]  p-4 sm:p-6 flex flex-col items-center rounded-lg text-white gap-12">
        <div
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-2 flex-col p-6"
          >
           <div className="flex flex-col sm:flex-row justify-around w-full gap-8 mb-6 pb-6 border-b">
                  <img src={(formData.profilePicture && formData.profilePicture!==null) ? `${apiURL}${formData.profilePicture}` : "/AlternateProfilePic.png"}
                      className="w-[250px] h-[250px] self-center rounded-full mb-6" />
                    <div className='flex flex-col justify-center gap-8 items-start'>
                      <a className="flex gap-4 items-center hover:underline hover:text-red-100 bg-blue-900
                    hover:bg-[#183b34ab] px-6 py-3 rounded transition-all duration-300 ease-in-out" target={formData.linkedIn ? "_blank" : "_self"} href={formData.linkedIn ? formData.linkedIn.startsWith("http") ? `${formData.linkedIn}`: "#" :"#"}><span className="text-3xl"> <FaLinkedin/> </span>Linked In  </a>
                      <a className="flex gap-4 items-center hover:underline hover:text-red-100 bg-cyan-600
                    hover:bg-[#183b34ab] px-6 py-3 rounded transition-all duration-300 ease-in-out" target={formData.companyWebsite ? "_blank" : "_self"} href={formData.companyWebsite ? formData.companyWebsite.startsWith("http") ? `${formData.companyWebsite}` : "#" : "#"}> <span className="text-3xl"> < FaGlobeAmericas/> </span>Company Website </a>
                    </div>
                    </div>
          <div className="flex flex-col gap-5 ">
            {[
              { field: "fullName", placeholder: "Full Name" },
              { field: "designation", placeholder: "Designation" },
              { field: "company", placeholder: "Company" },
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
          <div className="flex w-full flex-col gap-3">
            <label className="text-gray-400 text-lg">About Recruiter</label>
            <p className="w-full h-fit p-4 border border-gray-300 rounded-lg ">
              {formData.bio}
            </p>
          </div>
        </div>
      
      <Footer />
    </div>
  );
}
