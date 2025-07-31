import React, { useState } from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { BackgroundAnimation, RocketFlames } from "../compo/anima";
import { FaRegPaperPlane } from "react-icons/fa";
import { HiOutlineChartBar } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
import { AiOutlineProfile } from "react-icons/ai";
import { RiShieldCheckLine, RiScrollToBottomLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdAssignmentTurnedIn,
  MdSearch,
  MdWorkOutline,
  MdChecklist,
  MdUploadFile,
  MdStarOutline,
} from "react-icons/md";
import { GiCompass } from "react-icons/gi";

const LandingPage = () => {
  const features = [
    {
      feature: "Smart Job Matching",
      explanation:
        "Automatically matches candidates to jobs based on their skills, experience, and preferences using AI algorithms — saving time for both recruiters and applicants.",
      icon: MdWorkOutline,
    },
    {
      feature: "Resume Builder",
      explanation:
        "Easily craft professional resumes with customizable templates, AI-powered suggestions, and industry-specific formatting. Highlight your strengths and stand out to recruiters with minimal effort.",
      icon: AiOutlineProfile,
    },
    {
      feature: "One-Click Apply",
      explanation: "Apply instantly with saved profiles and resumes.",
      icon: FaRegPaperPlane,
    },
    {
      feature: "Real-Time Tracking",
      explanation: "Track job status updates live as they happen.",
      icon: HiOutlineChartBar,
    },

    {
      feature: "Verified Listings",
      explanation: "All companies are verified for authenticity.",
      icon: RiShieldCheckLine,
    },
    {
      feature: "Secure & Private",
      explanation: "Your data is encrypted and private.",
      icon: FiLock,
    },
  ];

  const steps = [
    {
      icon: MdSearch,
      title: "Explore Opportunities",
      description:
        "Dive into a wide range of jobs, internships, and companies tailored to your field of interest. Discover roles that align with your skills, goals, and passion—all in one place.",
    },
    {
      icon: MdAssignmentTurnedIn,
      title: "Apply with Ease",
      description:
        "Save time by applying to multiple positions using a smart, pre-filled profile or resume. Our streamlined process ensures you never miss an opportunity that fits you.",
    },
    {
      icon: MdChecklist,
      title: "Track Applications",
      description:
        "Stay informed every step of the way. Track all your job applications in one place, receive timely updates, and know exactly where you stand with each employer.",
    },
    {
      icon: MdUploadFile,
      title: "Upload Resume",
      description:
        "Seamlessly upload, update, and manage multiple versions of your resume or CV. Tailor your documents for specific jobs to increase your chances of getting noticed.",
    },
    {
      icon: MdStarOutline,
      title: "Get Shortlisted",
      description:
        "Boost your visibility with an optimized profile and personalized job matches. Stand out from the crowd and increase your chances of being shortlisted by top recruiters.",
    },
    {
      icon: MdWorkOutline,
      title: "Start Your Career",
      description:
        "Kickstart your professional journey with confidence. From interviews to offer letters, we support you through every step toward landing your dream job or internship.",
    },
  ];

  const [stepsDescription, setStepsDescription] = useState(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".rocket", {
      scrollTrigger: {
        trigger: ".logoDiv",
        toggleActions: "play none none reverse",
        start: "top 10px",
        end: "bottom 70%",
        scrub: 3,
        ease: "bounce.out",
      },
      yPercent: 230,
      rotate: -90,
    });

    gsap.from(".logoImg", {
      scrollTrigger: {
        trigger: ".logoImg",
        toggleActions: "play none none reverse",
        start: "top 80%",
        end: "top 35%",
        scrub: 3,
      },
      opacity: 0,
      transform: "translateY(300px)",
      scale: 0,
      transform: "translateX(300px)",
    });

    gsap.to(".TitleBlack", {
      scrollTrigger: {
        trigger: ".TitleTrigger",
        toggleActions: "play none none reverse",
        start: "top 70%",
        end: "top -150%",
        pin: true,
        scrub: 3,
      },
      transform: "translateX(120%)",
    });

    gsap.to(".rocket", {
      scrollTrigger: {
        trigger: ".TitleTrigger",
        toggleActions: "play none none reverse",
        start: "top 70%",
        end: "top -150%",
        scrub: 3,
      },
      translateX: "87vw",
    });

    gsap.to(".TitleTrigger", {
      scrollTrigger: {
        trigger: ".TitleTrigger",
        toggleActions: "play none none reverse",
        start: "top 30%",
        end: "top 20%",
        scrub: 3,
      },
      opacity: 0,
    });

    gsap.to(".rocket", {
      scrollTrigger: {
        trigger: ".TitleTrigger",
        toggleActions: "play none none reverse",
        start: "top 55%",
        end: "top 45%",
        scrub: 3,
      },
      opacity: 0,
    });

    gsap.utils.toArray(".headings").forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          toggleActions: "play none none reverse",
          start: "top 50%",
        },
        opacity: 0,
        duration: 0.8,
        transform: "translateY(20px)",
      });
    });

    gsap.utils.toArray(".right").forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          toggleActions: "play none none reverse",
          start: "top 80%",
          end: "top 50%",
          scrub: 3,
        },
        opacity: 0,
        x: 400,
      });
    });

    gsap.utils.toArray(".left").forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          toggleActions: "play none none reverse",
          start: "top 80%",
          end: "top 50%",
          scrub: 3,
        },
        opacity: 0,
        x: -400,
      });
    });

    gsap.utils.toArray(".steps").forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          toggleActions: "play none none reverse",
          start: "top 80%",
          end: "top 50%",
          scrub: 3,
        },
        opacity: 0,
        x: -400,
      });
    });
  });

  useEffect(() => {
    const styleSheet = document.styleSheets[0];

    // Typewriter effect
    styleSheet.insertRule(
      `
      @keyframes typewriter {
        0%, 100% { width: 0 }
        50% { width: 22ch }
      }
    `,
      styleSheet.cssRules.length
    );

    // Blinking cursor effect
    styleSheet.insertRule(
      `
      @keyframes blink {
        50% { border-color: transparent }
      }
    `,
      styleSheet.cssRules.length
    );
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col justify-between">
      <NavHome active="landingPage" />

      <BackgroundAnimation />

      <div className="absolute h-[500px] w-full flex flex-col justify-center items-center">
        <h1
          className=" overflow-hidden whitespace-nowrap border-r-4 border-white text-6xl font-bold text-white"
          style={{
            width: "22ch",
            animation:
              "typewriter 6s steps(22) infinite alternate, blink 0.7s step-end infinite",
          }}
        >
          Welcome to HireSphere
        </h1>
        <h1 className="text-white text-9xl">
          <RiScrollToBottomLine />{" "}
        </h1>
      </div>

      <div className="overflow-hidden flex flex-col items-center justify-center flex-grow relative">
        <div className="logoDiv flex justify-around w-full">
          <img
            src="/LogoMain.png"
            alt="Logo"
            className="logoImg h-72 mb-40 mt-96 rounded-lg shadow-lg shadow-yellow-200"
          />
        </div>
        <div className="rocket z-30 fixed top-[-300px] left-32">
          <img
            src="/Rocket.png"
            alt="Rocket"
            className=" h-[300px] w-auto object-cover opacity-100 filter drop-shadow-[0_-50px_15px_yellow]"
          />
          <RocketFlames />
        </div>

        <div className="TitleTrigger overflow-hidden relative w-fit h-fit flex justify-center items-center mt-64 ">
          <p className="Title z-0 text-5xl font-extrabold bg-gradient-to-r from-teal-500 via-red-600 to-green-600 text-transparent bg-clip-text">
            The ultimate solution for Placements
          </p>
          <div className="TitleBlack absolute top-0 left-0 bg-black w-full h-full z-10"></div>
        </div>
        <div className="mt-[1800px]"></div>

        <div className="flex items-center flex-col w-full ">
          <h1 className="headings text-white text-6xl mb-24 underline">
            <IoMdNotificationsOutline className="text-yellow-400 inline mr-6" />
            Key Features...
          </h1>

          <div className="flex w-[70%] mb-64 justify-around flex-wrap h-fit">
            {features.map((fea, index) => {
              return (
                <div
                  className={`bg-black mb-10 ${
                    index % 2 == 0 ? "left" : "right"
                  } `}
                  key={index}
                >
                  <div className="bg-[#0E1F1B]/60 h-full w-[400px] rounded-lg p-8">
                    <div className="space-x-6 flex items-center pb-2 mb-6 border-b-[1px] border-[#1D8A6D] ">
                      <fea.icon className="text-white text-5xl" />
                      <h2 className="text-cyan-400 text-2xl">{fea.feature}</h2>
                    </div>
                    <p className="text-white text-shadow-md">
                      {fea.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center flex-col w-full mb-10">
          <h1 className="headings text-white text-6xl mb-24 underline">
            <GiCompass className="text-yellow-400 inline mr-6" />
            Get Started...
          </h1>
          <div className="flex flex-col items-center w-[70%]">
            {steps.map((step) => {
              return (
                <div className=" steps bg-black w-full mb-4">
                  <div className="flex flex-col p-6 w-full  bg-[#0E1F1B]/40 rounded-lg">
                    <button
                      className="flex items-center w-full"
                      onClick={() => {
                        if (stepsDescription === step.title) {
                          setStepsDescription(null);
                        } else {
                          setStepsDescription(step.title);
                        }
                      }}
                    >
                      <step.icon className="mr-6 text-yellow-400 text-5xl" />
                      <h2 className="text-white text-2xl ">{step.title}</h2>
                      <span
                        className="ml-auto text-white text-6xl"
                        onClick={() => {
                          if (stepsDescription === step.title) {
                            setStepsDescription(null);
                          } else {
                            setStepsDescription(step.title);
                          }
                        }}
                      >
                        {stepsDescription === step.title ? "-" : "+"}
                      </span>
                    </button>
                    {stepsDescription === step.title && (
                      <p className="w-full text-white text-lg">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <h1 className="text-white text-5xl bg-amber-900 flex justify-center align-center w-full p-12">
          {" "}
          Registor Now..
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
