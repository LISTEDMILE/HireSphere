import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaDiscord,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#0b0b12] via-black to-black text-white w-screen mt-6">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-20 h-80 w-80 rounded-full bg-violet-500/10 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-8 py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Logo */}

          <div>

            <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Hire Sphere
            </h2>

            <p className="mt-6 text-white/60 leading-8">
              Connecting talented developers and ambitious companies
              through a modern recruitment experience.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-white/60">

              <li>
                <Link to="/" className="hover:text-cyan-400 transition">
                  Home
                </Link>
              </li>

             

              <li>
                <Link to="/about" className="hover:text-cyan-400 transition">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Contact
            </h3>

            <ul className="space-y-5 text-white/60">

              <li className="flex gap-3 items-center">
                <FaEnvelope className="text-cyan-400" />
                support@hiresphere.com
              </li>

              <li className="flex gap-3 items-center">
                <FaPhoneAlt className="text-green-400" />
                +91 98765 43210
              </li>

              <li className="flex gap-3 items-center">
                <FaMapMarkerAlt className="text-red-400" />
                New Delhi, India
              </li>

            </ul>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Follow Us
            </h3>

            <div className="flex flex-wrap gap-5">

              {[
                {
                  icon: <FaInstagram />,
                  color: "hover:text-pink-400",
                },
                {
                  icon: <FaLinkedin />,
                  color: "hover:text-blue-400",
                },
                {
                  icon: <FaGithub />,
                  color: "hover:text-gray-300",
                },
                {
                  icon: <FaDiscord />,
                  color: "hover:text-indigo-400",
                },
                {
                  icon: <FaYoutube />,
                  color: "hover:text-red-500",
                },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl transition-all duration-300 hover:-translate-y-2 ${item.color}`}
                >
                  {item.icon}
                </button>
              ))}

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">

          <p>
          {new Date().getFullYear()} Hire Sphere.
          </p>

          <div className="flex gap-8 mt-4 md:mt-0">

            <Link
              to=""
              className="hover:text-cyan-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to=""
              className="hover:text-cyan-400 transition"
            >
              Terms of Service
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;