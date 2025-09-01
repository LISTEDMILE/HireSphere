import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavHome from "../../compo/NavHome";
import Footer from "../../compo/Footer";
import { apiURL } from "../../../../apiUrl";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

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
    achievements: [],
    languageKnown: [],
    jobPreferences: [],
  });

  useEffect(() => {
    const fetchAboutEmployee = async () => {
      try {
        const response = await fetch(`${apiURL}/host/aboutEmployee/${userId}`, {
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
    <div className="w-full min-h-[100vh] flex flex-col items-center ">
      <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-gradient-to-b from-black via-[#042029] to-[#060a13] z-[-10]"></div>
      <NavHome />
      <h1 className="relative text-3xl w-full py-4 font-bold text-white text-center">
        <span className="relative z-10">Employee Profile</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></span>
      </h1>
      <div className="w-full sm:w-[80%]  p-4 sm:p-6 flex flex-col items-center rounded-lg text-white gap-12">
        <div
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl text-wrap shadow-lg flex gap-2 flex-col p-6"
        >
          <div className="flex flex-col sm:flex-row justify-around w-full gap-8 mb-6 pb-6 border-b">
            {/* no database */}

            {/* <img src={(formData.profilePicture && formData.profilePicture!==null) ? `${apiURL}${formData.profilePicture}` : "/AlternateProfilePic.png"}
              className="w-[250px] h-[250px] self-center rounded-full mb-6" /> */}
            <img
              src="/AlternateProfilePic.png"
              className="w-[250px] h-[250px] self-center rounded-full mb-6"
            />

            <div className="flex flex-col justify-center gap-8 items-start">
              <a
                className="flex gap-4 items-center hover:underline hover:text-red-100 bg-blue-900
          hover:bg-[#183b34ab] px-6 py-3 rounded transition-all duration-300 ease-in-out"
                target={formData.linkedIn ? "_blank" : "_self"}
                href={
                  formData.linkedIn
                    ? formData.linkedIn.startsWith("http")
                      ? `${formData.linkedIn}`
                      : "#"
                    : "#"
                }
              >
                <span className="text-3xl">
                  {" "}
                  <FaLinkedin />{" "}
                </span>
                Linked In{" "}
              </a>
              <a
                className="flex gap-4 items-center hover:underline hover:text-red-100  bg-black
          hover:bg-[#183b34ab] px-6 py-3 rounded transition-all duration-300 ease-in-out"
                target={formData.gitHub ? "_blank" : "_self"}
                href={
                  formData.gitHub
                    ? formData.gitHub.startsWith("http")
                      ? `${formData.gitHub}`
                      : "#"
                    : "#"
                }
              >
                {" "}
                <span className="text-3xl">
                  {" "}
                  <SiGithub />{" "}
                </span>
                Git Hub
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-5 mb-7">
            {[
              { field: "fullName", placeholder: "Full Name" },
              { field: "profession", placeholder: "Profession" },
              { field: "location", placeholder: "Location" },
              { field: "email", placeholder: "Email" },
              { field: "linkedIn", placeholder: "LinkedIn" },
              { field: "gitHub", placeholder: "GitHub" },
              { field: "mobile", placeholder: "Mobile" },
            ].map(({ field, placeholder }) => {
              return (
                <div className="flex gap-3">
                  <label className="text-gray-400  text-lg">
                    {placeholder}
                  </label>
                  <p className=" text-wrap overflow-x-scroll sm:overflow-hidden">
                    {" "}
                    {formData[field]}{" "}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-2 flex-col p-6"
        >
          <div className="w-full border-b p-4 rounded-lg h-fit">
            <div className="w-full flex space-y-2 flex-col">
              <label className="block text-gray-400 text-lg mb-4">
                Skills:
              </label>

              <div className="flex justify-start items-center gap-3 w-full flex-wrap">
                {formData.skills.map((skill) => {
                  return (
                    <span className="bg-cyan-950 px-4 py-1 rounded-lg flex items-center justify-between border-white border-1">
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full h-fit border-b p-4 rounded-lg">
            <div className="w-full flex space-y-2 flex-col">
              <label className="block text-gray-400 font-medium text-lg mb-4">
                Achievements:
              </label>

              <div className="flex justify-start items-center gap-3 w-full flex-wrap">
                {formData.achievements.map((achi) => {
                  return (
                    <span className="bg-cyan-950 px-4 py-1 rounded-lg flex items-center justify-between border-white border-1">
                      {achi}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full border-b p-4 rounded-lg h-fit">
            <div className="w-full flex space-y-2 flex-col">
              <label className="block text-gray-400 font-medium text-lg mb-4">
                Job Preferences
              </label>

              <div className="flex justify-start items-center gap-3 w-full flex-wrap">
                {formData.jobPreferences.map((pref) => {
                  return (
                    <span className="bg-cyan-950 px-4 py-1 rounded-lg flex items-center justify-between border-white border-1">
                      {pref}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full h-fit border-b p-4 rounded-lg">
            <div className="w-full flex space-y-2 flex-col">
              <label className="block text-gray-400 font-medium text-lg mb-4">
                Languages Known
              </label>
              <div className="flex justify-start items-center gap-3 w-full flex-wrap">
                {formData.languageKnown.map((lang) => {
                  return (
                    <span className="bg-cyan-950 px-4 py-1 rounded-lg flex items-center justify-between border-white border-1">
                      {lang}
                    </span>
                  );
                })}
              </div>{" "}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-gray-400 text-lg">About User</label>
          <p className="w-full h-fit p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
            {formData.bio}
          </p>
        </div>

        <div
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-2 flex-col p-6"
        >
          <h2 className=" text-lg">Experience:</h2>

          <div className=" mt-6 flex flex-col  w-full gap-8">
            {formData.experience.map((exp) => {
              return (
                <div className="bg-[#0034246b] flex flex-col gap-3 p-4 border rounded-lg ">
                  <div className="flex  gap-3 ">
                    <label className="block text-gray-400 text-md ">
                      Company:
                    </label>
                    <p className="text-sm">{exp.company}</p>
                  </div>
                  <div className="flex gap-3">
                    <label className="block text-gray-400 text-md ">
                      Role:
                    </label>
                    <p className="text-sm">{exp.role}</p>
                  </div>
                  <div className="flex gap-3">
                    <label className="block text-gray-400 text-md ">
                      Duration:
                    </label>
                    <p className="text-sm">{exp.duration}</p>
                  </div>

                  <div className="flex gap-3">
                    <label className="block text-gray-400 text-md ">
                      Description:
                    </label>
                    <p className="text-sm text-wrap">{exp.descriptionWork}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-2 flex-col p-6"
        >
          <h2 className="text-lg">Education:</h2>

          <div className="w-full flex flex-col sm:flex-row justify-around gap-8 mt-4 flex-wrap">
            {formData.education.map((edu) => {
              return (
                <div className="bg-cyan-950 flex flex-col p-4 rounded-lg w-full sm:w-[40%]  ">
                  <div className="flex flex-col gap-3">
                    <div className="flex  gap-3 ">
                      <label className="block text-gray-400 text-md ">
                        Degree:
                      </label>
                      <p className="text-sm">{edu.degree}</p>
                    </div>
                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        College:
                      </label>
                      <p className="text-sm">{edu.college}</p>
                    </div>
                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        Passing Year:
                      </label>
                      <p className="text-sm">{edu.passingYear}</p>
                    </div>

                    <div className="flex gap-3">
                      <label className="block text-gray-400 text-md ">
                        CGPA:
                      </label>
                      <p className="text-sm">{edu.CGPA}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 
           rounded-2xl shadow-lg flex gap-2 flex-col p-6"
        >
          <h1 className="text-2xl mb-4">Projects</h1>

          <div className="w-full flex flex-col items-center gap-8 mt-12 flex-wrap">
            {formData.projects.map((pro) => {
              return (
                <div className="bg-[#00fff213] flex flex-col rounded-lg w-full sm:w-[80%] p-4">
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

                    <div className="flex justify-end w-full gap-3">
                      <a
                        target={pro.link ? "_blank" : "_self"}
                        href={
                          pro.link
                            ? pro.link.startsWith("http")
                              ? `${pro.link}`
                              : "#"
                            : "#"
                        }
                        className="px-4 py-2 text-md rounded-lg bg-green-600"
                      >
                        Project Link{" "}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
