import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";
import gsap from "gsap";

export default function ErrorPage() {
  const cardRef = useRef();
  const avatarRef = useRef();
  const buttonRef = useRef();
  const messagesRef = useRef([]);
  const [visibleMessages, setVisibleMessages] = useState([]);
  
  useEffect(() => {
 

  let index = 0;

  const timer = setInterval(() => {
    setVisibleMessages((prev) => [...prev, messages[index]]);
    index++;

    if (index >= messages.length) {
      clearInterval(timer);

      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
      });
    }
  }, 850);

  return () => clearInterval(timer);
}, []);

  const messages = [

  "Bro... 🤨",
  "I literally watched you type that URL. 👀",
  "I was hoping you'd stop halfway...",
  "You didn't. 😭",
  "You really thought changing one letter would unlock a secret page? 💀",
  "That's not how websites work, my guy. 😭",
  "The server actually laughed at you. 😂",
  "Even the database replied: 'nah bro.'",
  "Frontend is confused. 🤷",
  "Backend doesn't know you. 🚪",
  "There's nothing here.",
  "Not even a typo survived. 💀",
  "Congratulations! 🎉",
  "You unlocked... ✨Premium Nothing✨",
  "Now click the Home button before you accidentally delete the internet. 🚀"
];

  

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col">

      <NavHome />

      <div className="flex-1 flex justify-center items-center px-5 py-16">

        <div
          ref={cardRef}
          className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          {/* Header */}

          <div className="flex items-center gap-4 border-b border-zinc-800 px-6 py-5">

            <div
              ref={avatarRef}
              className="h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-2xl font-bold"
            >
              👀
            </div>

            <div>

              <h2 className="font-bold text-lg">
              Route Protection Squad 🛡️
              </h2>

              <p className="text-sm text-green-400">
                ● Online
              </p>

            </div>

          </div>

          {/* Chat */}

          <div className="space-y-4 p-8">

            {visibleMessages.map((msg, index) => (
              <div
                key={index}
                ref={(el) => (messagesRef.current[index] = el)}
                className="flex"
              >
                <div className="rounded-2xl bg-zinc-800 px-5 py-3 text-zinc-100 max-w-md leading-7">
                  {msg}
                </div>
              </div>
            ))}

            <div className="flex justify-end">

              <div className="rounded-2xl bg-violet-600 px-5 py-3 max-w-xs">
                Okay... my bad 😭
              </div>

            </div>

            <div className="pt-6">

              <Link
                ref={buttonRef}
                to="/"
                className="inline-flex items-center gap-3 rounded-full bg-white text-black px-7 py-3 font-bold transition-all duration-300 hover:scale-105"
              >
                😔 Aight... I'm Leaving
              </Link>

            </div>

          </div>

          {/* Footer */}

          <div className="border-t border-zinc-800 px-6 py-5 text-center text-sm text-zinc-500">

            Conversation ended successfully.

            <br />

            Thanks for not breaking the website. ❤️

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}