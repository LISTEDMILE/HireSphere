import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
} from "lucide-react";

import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden relative">
      <NavHome active="contactPage" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full top-10 -left-24 animate-pulse"></div>

        <div className="absolute w-[500px] h-[500px] bg-purple-600/10 blur-[180px] rounded-full bottom-0 -right-32 animate-pulse"></div>
      </div>

      <main className="relative z-10 flex-grow max-w-7xl mx-auto px-6 py-20 w-full">

        {/* Hero */}

        <div className="text-center mb-20">

          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Contact Us
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-8">
            Have questions, suggestions, or facing any issue? We'd love to hear
            from you. Fill out the form below or reach out through any of our
            contact channels.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left Side */}

          <div className="space-y-6">

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-7 hover:border-cyan-400 transition">
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Mail className="text-cyan-400" size={26} />
                </div>

                <div>
                  <h2 className="font-bold text-xl">Email</h2>
                  <p className="text-gray-400">
                    support@hiresphere.com
                  </p>
                </div>

              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-7 hover:border-purple-400 transition">
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Phone className="text-purple-400" size={26} />
                </div>

                <div>
                  <h2 className="font-bold text-xl">Phone</h2>
                  <p className="text-gray-400">
                    +91 98765 43210
                  </p>
                </div>

              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-7 hover:border-pink-400 transition">
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <MapPin className="text-pink-400" size={26} />
                </div>

                <div>
                  <h2 className="font-bold text-xl">Address</h2>
                  <p className="text-gray-400">
                    Hire Sphere Headquarters
                    <br />
                    New Delhi, India
                  </p>
                </div>

              </div>
            </div>

            {/* Social */}

            <div className="pt-6">

              <h2 className="text-2xl font-bold mb-4">
                Follow Us
              </h2>

              <div className="flex gap-5">

                <button className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 transition flex justify-center items-center">
                  <Github />
                </button>

                <button className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400 transition flex justify-center items-center">
                  <Linkedin />
                </button>

              </div>

            </div>

          </div>

          {/* Contact Form */}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">

            <h2 className="text-3xl font-bold mb-8">
              Send us a Message
            </h2>

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-400"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-400"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none resize-none focus:border-cyan-400"
              ></textarea>

              <button
                type="submit"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-[1.02] transition font-semibold text-lg"
              >
                <Send size={20} />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;