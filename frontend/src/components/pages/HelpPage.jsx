import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    title: "How do I create an account?",
    text: "Click on Sign Up, enter your details, verify your account, and complete your profile. Recruiters can post jobs while job seekers can build their resumes and apply instantly.",
  },
  {
    title: "How do I search for jobs?",
    text: "Use the Job Search page and filter by skills, location, company, experience level, salary, and keywords to quickly find opportunities that match your interests.",
  },
  {
    title: "How do I apply for a job?",
    text: "Open the job details page and click Apply Now. You can track every application directly from your dashboard.",
  },
  {
    title: "How do employers post jobs?",
    text: "Employers can create a detailed job listing from their dashboard, including skills, salary, location, experience requirements, and application deadlines.",
  },
  {
    title: "Need more help?",
    text: "Our support team is available 24/7. Visit the Contact page or email us anytime and we'll respond as quickly as possible.",
  },
];

const HelpPage = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

 useEffect(() => {
  const ctx = gsap.context(() => {

    // Hero Animation
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
      }
    ).fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
      },
      "-=0.4"
    );

    // FAQ Cards
    cardsRef.current.forEach((card) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Floating Background
    gsap.to(".blob1", {
      x: 30,
      y: 25,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".blob2", {
      x: -30,
      y: -25,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    ScrollTrigger.refresh();

  });

  return () => ctx.revert();
}, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <NavHome active="helpPage" />

      {/* Background */}
      <div className="absolute w-96 h-96 bg-purple-700/20 blur-[150px] rounded-full top-10 left-10 blob1"></div>

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[180px] rounded-full bottom-0 right-0 blob2"></div>

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">

        <h1
          ref={titleRef}
          className="text-6xl font-black text-center mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          Need Help?
        </h1>

        <p
          ref={subtitleRef}
          className="text-center text-gray-400 text-lg max-w-3xl mx-auto mb-20 leading-8"
        >
          Don't worry—we've got you covered. Browse our most frequently asked
          questions below. Whether you're looking for your dream job or hiring
          talented developers, we're here to make the process simple.
        </p>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:border-cyan-400 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,255,255,.15)]"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold shrink-0">
                  {index + 1}
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition">
                    {faq.title}
                  </h2>

                  <p className="text-gray-400 leading-8 text-lg">
                    {faq.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Box */}

        <div className="mt-24 text-center bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-400/20 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">
            Still have questions?
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            Our support team is available 24/7 to help you solve any issue.
          </p>

          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition text-lg font-semibold">
            Contact Support
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpPage;