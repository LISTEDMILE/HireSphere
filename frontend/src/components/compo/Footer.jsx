import React from "react";
import {
  FaInstagram,
  FaDiscord,
  FaYoutube,
  FaPhone,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-[95%] my-10 bg-gradient-to-r from-gray-950 via-gray-700 to-gray-950 text-white px-8 pt-12 pb-24 flex flex-col md:flex-row justify-around items-start md:items-center shadow-lg rounded-2xl self-center">
      
      {/* Left - Social Media */}
      <div className="mb-8 md:mb-0">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Connect With Us
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 hover:translate-x-2 transition-all cursor-pointer">
            <FaInstagram className="text-pink-500 text-xl" />
            <span>@ttshks123</span>
          </li>
          <li className="flex items-center gap-3 hover:translate-x-2 transition-all cursor-pointer">
            <FaDiscord className="text-indigo-400 text-xl" />
            <span>discord.gg/lsfjdls</span>
          </li>
          <li className="flex items-center gap-3 hover:translate-x-2 transition-all cursor-pointer">
            <FaYoutube className="text-red-500 text-xl" />
            <span>@skjdfkl</span>
          </li>
        </ul>
      </div>

      {/* Right - Contact */}
      <div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent mb-4">
          Contact Us
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <FaPhone className="text-green-400 text-lg" />
            <span>+91 98765 43210</span>
          </li>
          <li className="flex items-center gap-3">
            <FaPhoneAlt className="text-green-400 text-lg" />
            <span>+91 91234 56780</span>
          </li>
          <li className="flex items-center gap-3">
            <FaEnvelope className="text-yellow-400 text-lg" />
            <span>dkljf4324@gmail.com</span>
          </li>
        </ul>
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-400 text-sm opacity-70">
        © {new Date().getFullYear()} HireSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
