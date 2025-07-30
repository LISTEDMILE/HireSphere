import React, { use } from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { RiScrollToBottomLine } from "react-icons/ri";

const LandingPage = () => {
  const circle1 = useRef(null);
  const circle2 = useRef(null);
  const circle3 = useRef(null);
  const circle4 = useRef(null);
  const circle5 = useRef(null);
  const circle6 = useRef(null);
  const circle7 = useRef(null);
  const circle8 = useRef(null);
  const circle9 = useRef(null);
  const circle10 = useRef(null);
  const circle11 = useRef(null);
  const circle12 = useRef(null);
  const circle13 = useRef(null);
  const circle14 = useRef(null);
  const circle15 = useRef(null);
  const circle16 = useRef(null);
  const circle17 = useRef(null);
  const circle18 = useRef(null);
  const circle19 = useRef(null);
  const circle20 = useRef(null);


  const rain1 = useRef(null);
  const rain2 = useRef(null);
  const rain3 = useRef(null);
  const rain4 = useRef(null);
  const rain5 = useRef(null);
  const rain6 = useRef(null);


  const exhaust1 = useRef(null);
  const exhaust2 = useRef(null);
  const exhaust3 = useRef(null);
  const exhaust4 = useRef(null);
  const exhaust5 = useRef(null);
  const exhaust6 = useRef(null);
  const exhaust7 = useRef(null);
  const exhaust8 = useRef(null);
  const exhaust9 = useRef(null);
  const exhaust10 = useRef(null);
  

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(circle1.current, { x: 100, y: -150, duration: 4, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle2.current, { x: -80, y: 200, duration: 3.5, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle3.current, { x: 120, y: 50, duration: 4.5, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle4.current, { x: -150, y: -100, duration: 5, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle5.current, { x: 60, y: 180, duration: 3.8, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle6.current, { x: -200, y: -70, duration: 4.3, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle7.current, { x: 140, y: 100, duration: 4, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle8.current, { x: -100, y: 150, duration: 4.7, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle9.current, { x: 90, y: -200, duration: 5.2, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle10.current, { x: -130, y: 80, duration: 3.6, ease: "power1.inOut", repeat: -1, yoyo: true });

gsap.to(circle11.current, { x: 200, y: -120, duration: 4.1, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle12.current, { x: -170, y: 60, duration: 4.6, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle13.current, { x: 100, y: 120, duration: 3.9, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle14.current, { x: -110, y: -150, duration: 4.2, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle15.current, { x: 180, y: 200, duration: 5.1, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle16.current, { x: -90, y: -190, duration: 3.7, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle17.current, { x: 150, y: -60, duration: 4.9, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle18.current, { x: -120, y: 130, duration: 4.4, ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(circle19.current, { x: 70, y: -170, duration: 4.6, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(circle20.current, { x: -140, y: 90, duration: 5.3, ease: "power1.inOut", repeat: -1, yoyo: true });
    


    gsap.to(rain1.current, {
      y: "110vh",
      duration: 8,
      ease: "power3.in",
      repeat: -1,
      delay:2,
    });

    gsap.to(rain2.current, {
      y: "110vh",
      duration: 10,
      ease: "power3.in",
      repeat: -1,
      delay:3,
    });

    gsap.to(rain2.current, {
      y: "110vh",
      duration: 8,
      ease: "power3.in",
      repeat: -1,
      delay:1,
    });

    gsap.to(rain4.current, {
      y: "110vh",
      duration: 9,
      ease: "power3.in",
      repeat: -1,
      delay:2,
    });

    gsap.to(rain5.current, {
      y: "110vh",
      duration: 6,
      ease: "power3.in",
      repeat: -1,
      delay:3
    });

    gsap.to(rain6.current, {
      y: "110vh",
      duration: 10,
      ease: "power3.in",
      repeat: -1,
      delay:1,
    });


    gsap.to(exhaust1.current, {
      y: -100,
      delay: 0.2,
      duration: 0.6,
      repeat: -1,
      ease: "linear"
    });
    gsap.to(exhaust2.current, {
      y: -80,
      delay: 0.3,
      duration: 0.3,
      repeat: -1,
      ease: "linear"
    });
    gsap.to(exhaust3.current, {
      y: -40,
      delay: 0.3,
      duration: 1,
      repeat: -1,
      ease: "linear"
    });
    gsap.to(exhaust4.current, {
      y: -90,
      delay: 0.1,
      duration: 0.5,
      repeat: -1,
      ease: "linear"
    });
    gsap.to(exhaust5.current, {
      y: -120,
      delay: 0.4,
      duration: 0.3,
      repeat: -1,
      ease: "linear"
    });
    gsap.to(exhaust6.current, {
      y: -60,
      delay: 0.5,
      duration: 0.6,
      repeat: -1,
      ease: "linear"
    });
    gsap.to(exhaust7.current, {
      y: -200,
      delay: 0.4,
      duration: 1,
      repeat: -1,
      ease: "linear"
    });
    gsap.to(exhaust8.current, {
      y: -50,
      delay: 0.3,
      duration: 0.8,
      repeat: -1,
      ease: "linear"
    });
    gsap.to(exhaust9.current, {
      y: -150,
      delay: 0.1,
      duration: 0.9,
      repeat: -1,
      ease: "linear"
    });
    gsap.to(exhaust10.current, {
      y: -80,
      delay: 0.2,
      duration: 0.4,
      repeat: -1,
      ease: "linear"
    });


  
    
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
    });

    gsap.to(".TitleBlack", {
      scrollTrigger: {
        trigger: ".TitleTrigger",
        toggleActions: "play none none reverse",
        start: "top 70%",
        end: "top -150%",
        pin:true,
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

      translateX: "90vw",
    });
  });


  useEffect(() => {
    const styleSheet = document.styleSheets[0];

    // Typewriter effect
    styleSheet.insertRule(`
      @keyframes typewriter {
        0%, 100% { width: 0 }
        50% { width: 22ch }
      }
    `, styleSheet.cssRules.length);

    // Blinking cursor effect
    styleSheet.insertRule(`
      @keyframes blink {
        50% { border-color: transparent }
      }
    `, styleSheet.cssRules.length);
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col justify-between">
      <NavHome active="landingPage" />
      <div className="fixed h-[100vh] w-full top-0 left-0 z-0">
        <div ref={circle1} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[38%] left-[91%]" />
<div ref={circle2} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[33%] left-[62%]" />
<div ref={circle3} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[76%] left-[34%]" />
<div ref={circle4} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[21%] left-[78%]" />
<div ref={circle5} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[79%] left-[28%]" />
<div ref={circle6} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[4%] left-[18%]" />
<div ref={circle7} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[11%] left-[45%]" />
<div ref={circle8} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[27%] left-[73%]" />
<div ref={circle9} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[32%] left-[71%]" />
<div ref={circle10} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[64%] left-[85%]" />

<div ref={circle11} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[31%] left-[45%]" />
<div ref={circle12} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[93%] left-[21%]" />
<div ref={circle13} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[45%] left-[51%]" />
<div ref={circle14} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[41%] left-[58%]" />
<div ref={circle15} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[73%] left-[13%]" />
<div ref={circle16} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[18%] left-[32%]" />
<div ref={circle17} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[61%] left-[25%]" />
<div ref={circle18} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[78%] left-[36%]" />
<div ref={circle19} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[39%] left-[27%]" />
<div ref={circle20} className="absolute bg-white rounded-full animate-pulse w-2 h-2 shadow-[0_0_50px_5px_white] top-[87%] left-[47%]" />

      </div>
      
      <div className="fixed h-[100vh] w-full top-0 left-0 z-0 ">
        <div ref={rain1} className="h-[40px]  w-[1px] bg-gradient-to-t from-white to-transparent  absolute top-[-40px] left-[10%] ">
          <div className="h-[8px] w-[5px] bg-white rounded-full absolute -translate-x-1/2 left-1/2 bottom-0 "></div>
        </div>
        <div ref={rain2} className="h-[30px] w-[1px] bg-gradient-to-t from-white to-transparent  absolute top-[-30px] left-[30%] ">
          <div className="h-[8px] w-[5px] bg-white rounded-full absolute -translate-x-1/2 left-1/2 bottom-0 "></div>
        </div>
        <div ref={rain3} className="h-[60px] w-[1px]  bg-gradient-to-t from-white to-transparent  absolute top-[-60px] left-[50%] ">
          <div className="h-[8px] w-[5px] bg-white rounded-full absolute -translate-x-1/2 left-1/2 bottom-0 "></div>
        </div>
        
        <div ref={rain4} className="h-[80px] w-[1px]  bg-gradient-to-t from-white to-transparent absolute top-[-80px] left-[60%] ">
          <div className="h-[8px] w-[5px] bg-white rounded-full absolute -translate-x-1/2 left-1/2 bottom-0 "></div>
        </div>
        <div ref={rain5} className="h-[40px] w-[1px]  bg-gradient-to-t from-white to-transparent absolute top-[-40px] left-[80%] ">
          <div className="h-[8px] w-[5px] bg-white rounded-full absolute -translate-x-1/2 left-1/2 bottom-0 "></div>
        </div>
        <div ref={rain6} className="h-[20px] w-[1px]  bg-gradient-to-t from-white to-transparent  absolute top-[-20px] left-[90%] ">
          <div className="h-[8px] w-[5px] bg-white rounded-full absolute -translate-x-1/2 left-1/2 bottom-0 "></div>
          </div>
      </div>

      <div className="absolute h-[500px] w-full flex flex-col justify-center items-center">
      <h1
      className=" overflow-hidden whitespace-nowrap border-r-4 border-white text-6xl font-bold text-white"
      style={{
        width: "22ch",
        animation: "typewriter 6s steps(22) infinite alternate, blink 0.7s step-end infinite",
      }}
    >
      Welcome to HireSphere
    </h1>
        <h1 className="text-white text-9xl"><RiScrollToBottomLine /> </h1>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow relative">
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
          <div className="absolute top-0 w-2/4 left-1/2 -translate-1/2">
            <div ref={exhaust1} className="h-6 w-[1px] bg-gradient-to-b from-cyan-300 to-transparent absolute top-[-100%] left-[10%]" />
            <div ref={exhaust2} className="h-12 w-[1px] bg-gradient-to-b from-cyan-300 to-transparent absolute top-[-100%] left-[20%]" />
            <div ref={exhaust3} className="h-5 w-[1px] bg-gradient-to-b from-cyan-300 to-transparent absolute top-[-100%] left-[30%]" />
            <div ref={exhaust4} className="h-4 w-[1px] bg-gradient-to-b from-cyan-300 to-transparent absolute top-[-100%] left-[40%]" />
            <div ref={exhaust5} className="h-8 w-[1px] bg-gradient-to-b from-cyan-300 to-transparent absolute top-[-100%] left-[50%]" />
            <div ref={exhaust6} className="h-2 w-[1px] bg-gradient-to-b from-cyan-300 to-transparent absolute top-[-100%] left-[60%]" />
            <div ref={exhaust7} className="h-10 w-[1px] bg-gradient-to-b from-cyan-300 to-transparent absolute top-[-100%] left-[70%]" />
            <div ref={exhaust8} className="h-3 w-[1px] bg-gradient-to-b from-cyan-300 to-transparent absolute top-[-100%] left-[80%]" />
            <div ref={exhaust9} className="h-6 w-[1px] bg-gradient-to-b from-cyan-300 to-transparent absolute top-[-100%] left-[90%]" />
            <div ref={exhaust10} className="h-5 w-[1px] bg-gradient-to-b from-cyan-300 to-transparent absolute top-[-100%] left-[100%]" />
          </div>
        </div>
        
        <div className="TitleTrigger overflow-hidden relative w-fit h-fit flex justify-center items-center mt-64 mb-[1800px]">
          <p className="Title z-0 text-5xl font-extrabold bg-gradient-to-r from-teal-500 via-red-600 to-green-600 text-transparent bg-clip-text">
            The ultimate solution for Placements
          </p>
          <div className="TitleBlack absolute top-0 left-0 bg-black w-full h-full z-10"></div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
