import React, { useRef } from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  Rocket,
  Code2,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Hero
      gsap.from(".hero", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".heroText > *", {
        opacity: 0,
        y: 40,
        stagger: 0.18,
        duration: 0.9,
        ease: "power3.out",
      });

      // Floating Blob
      gsap.to(".blob", {
        x: 40,
        y: 35,
        repeat: -1,
        yoyo: true,
        duration: 7,
        ease: "sine.inOut",
      });

      // Reveal Sections
      gsap.utils.toArray(".reveal").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 70,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      });

      // Cards
    
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="min-h-screen bg-gradient-to-b from-black via-[#080810] to-black text-white overflow-x-hidden"
    >
      <NavHome active="aboutPage" />

      {/* Background */}

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blob absolute top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[180px]" />
      </div>

      {/* ================= HERO ================= */}

      <section className="hero min-h-screen flex items-center px-8">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div className="heroText">

            <span className="px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
              About Hire Sphere
            </span>

            <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight">

              Connecting

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">

                Talent

              </span>

              With Opportunity

            </h1>

            <p className="mt-8 text-lg leading-9 text-white/70 max-w-xl">

              Hire Sphere is a modern recruitment platform built to
              simplify hiring for companies and help students,
              developers, and professionals discover meaningful
              career opportunities.

            </p>

            <div className="mt-12 flex gap-5">

             

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <div className="relative">

              <img
                src="/me.jpg"
                alt=""
                className="h-[450px] rounded-3xl border border-white/10 object-cover shadow-2xl"
              />

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-5">

                <h2 className="text-2xl font-bold">
                  Kunal Sharma
                </h2>

                <p className="text-cyan-400">
                  MERN Stack Developer
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= STORY ================= */}

      <section className="reveal py-32 px-8">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl font-bold mb-12">
            Our Story
          </h2>

          <p className="text-xl text-white/70 leading-10">

            Every student dreams of landing their first job, but
            finding the right opportunity often feels overwhelming.
            Endless applications, outdated job listings, and
            complicated recruitment processes inspired us to build
            something better.

          </p>

          <p className="mt-8 text-xl text-white/70 leading-10">

            Hire Sphere was created to bridge the gap between
            talented candidates and forward-thinking companies,
            providing a faster, smarter, and more transparent hiring
            experience.

          </p>

        </div>

      </section>
          {/* ================= MISSION ================= */}

      <section className="reveal py-28 px-8 bg-white/[0.02]">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-bold text-center mb-20">
            What Drives Us
          </h2>

          <div className="cards grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            <div className="card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-cyan-400/40 transition-all duration-300 ">

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
                <Users size={32} className="text-cyan-400" />
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                Empower Talent
              </h3>

              <p className="text-white/60 leading-8">
                Helping students, graduates, and professionals
                discover opportunities that match their skills and
                ambitions.
              </p>

            </div>

            <div className="card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-violet-400/40 transition-all duration-300 ">

              <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-6">
                <Briefcase size={32} className="text-violet-400" />
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                Connect Companies
              </h3>

              <p className="text-white/60 leading-8">
                We simplify hiring by giving employers a modern,
                intuitive platform to find exceptional candidates.
              </p>

            </div>

            <div className="card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-pink-400/40 transition-all duration-300 ">

              <div className="w-16 h-16 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6">
                <Rocket size={32} className="text-pink-400" />
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                Accelerate Careers
              </h3>

              <p className="text-white/60 leading-8">
                From internships to full-time roles, our goal is to
                help every user grow professionally.
              </p>

            </div>

            <div className="card rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-green-400/40 transition-all duration-300 ">

              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
                <Code2 size={32} className="text-green-400" />
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                Innovation
              </h3>

              <p className="text-white/60 leading-8">
                Built with modern technologies to deliver a seamless,
                secure, and lightning-fast experience.
              </p>

            </div>

          </div>

        </div>

      </section>

     

 

      {/* ================= WHY CHOOSE US ================= */}

      <section className="reveal py-32 px-8">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-5xl font-bold mb-10">
            Why Choose Hire Sphere?
          </h2>

          <div className="space-y-8 text-xl text-white/70 leading-9">

            <p>✔ Modern and intuitive user interface.</p>

            <p>✔ Secure authentication for recruiters and candidates.</p>

            <p>✔ Fast and responsive experience.</p>

            <p>✔ Easy job discovery and application tracking.</p>

            <p>✔ Built by developers who understand hiring challenges.</p>

          </div>

        </div>

      </section>
    
          {/* ================= VISION ================= */}

      <section className="reveal py-36 px-8 bg-white/[0.02]">

        <div className="max-w-5xl mx-auto text-center">

          <span className="px-6 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
            Our Vision
          </span>

          <h2 className="text-5xl lg:text-6xl font-black mt-8 leading-tight">
            Building the Future
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
              of Recruitment
            </span>
          </h2>

          <p className="mt-10 text-xl text-white/70 leading-10">
            We envision a world where every talented individual has equal
            access to meaningful opportunities, and every organization can
            effortlessly discover exceptional talent.
          </p>

          <p className="mt-8 text-xl text-white/70 leading-10">
            Hire Sphere is not just another job portal. It is a growing
            ecosystem where careers begin, companies grow, and innovation
            thrives.
          </p>

        </div>

      </section>

      {/* ================= QUOTE ================= */}

      <section className="reveal py-32 px-8">

        <div className="max-w-5xl mx-auto text-center">

          <p className="text-4xl lg:text-6xl font-black leading-tight">

            "Opportunities don't happen.

            <span className="block mt-4 bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">

              You create them."

            </span>

          </p>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="reveal py-36 px-8">

        <div className="max-w-6xl mx-auto">

          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-pink-500/10 backdrop-blur-xl p-16 text-center">

            <div className="absolute -top-24 -left-24 h-60 w-60 rounded-full bg-cyan-500/20 blur-[120px]" />

            <div className="absolute -bottom-24 -right-24 h-60 w-60 rounded-full bg-violet-500/20 blur-[120px]" />

            <div className="relative z-10">

              <h2 className="text-5xl lg:text-6xl font-black">
                Ready to Build
                <span className="block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Your Career?
                </span>
              </h2>

              <p className="mt-8 max-w-3xl mx-auto text-lg text-white/70 leading-9">

                Join thousands of developers, students, and recruiters who
                trust Hire Sphere to discover new opportunities and build
                meaningful professional connections.

              </p>

              

            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <Footer />

    </div>
  );
}