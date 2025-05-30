
import React from 'react';
import NavHome from '../compo/NavHome';
import Footer from '../compo/Footer';

const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-between">
      <NavHome active="landingPage" />
      <div className="flex flex-col items-center justify-center flex-grow relative">
        <img
          src="/Logo.png"
          alt="Logo"
          className="h-72 mb-10 rounded-lg shadow-[2px_2px_3px_3px_yellow]"
        />
        <p className="text-5xl font-extrabold bg-gradient-to-r from-teal-500 via-red-600 to-green-600 text-transparent bg-clip-text">
          The ultimate solution for Placements
        </p>
        {/* Animated circles */}
        <div className="absolute inset-0">
          <div className="absolute bg-cyan-400/40 rounded-full animate-pulse w-2 h-2 shadow-[0_0_0_0_cyan] top-0 left-2/3"></div>
          <div className="absolute bg-cyan-400/40 rounded-full animate-pulse w-2 h-2 shadow-[0_0_0_0_cyan] top-0 left-1/4"></div>
          <div className="absolute bg-cyan-400/40 rounded-full animate-pulse w-2 h-2 shadow-[0_0_0_0_cyan] bottom-1/4 left-1/3"></div>
          <div className="absolute bg-cyan-400/40 rounded-full animate-pulse w-2 h-2 shadow-[0_0_0_0_cyan] bottom-1/3 right-1/4"></div>
          <div className="absolute bg-cyan-400/40 rounded-full animate-pulse w-2 h-2 shadow-[0_0_0_0_cyan] top-1/3 right-1/3"></div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;