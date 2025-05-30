import React from "react";

const NavHome = ({ active }) => {
  const getClassName = (page) =>
    active === page
      ? "bg-red-600 shadow-black shadow-lg py-2 px-4 rounded transition duration-300 no-underline text-white"
      : "hover:shadow-black shadow-lg hover:bg-red-500 py-2 px-4 rounded transition duration-300 no-underline text-white";

  return (
    <header className="bg-teal-700 flex items-center justify-around py-2 w-full mb-5">
      <div className="flex items-center space-x-4">
        <a href="/" className={getClassName("landingPage")}>
          Home
        </a>
        <a href="/help" className={getClassName("helpPage")}>
          Help
        </a>
        <a href="/contact" className={getClassName("contactPage")}>
          Contact-Us
        </a>
        <a href="/about" className={getClassName("aboutPage")}>
          About-Us
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <button className={getClassName("loginPage")}>Login</button>
          <div className="hidden group-hover:block absolute top-full left-0 bg-white border border-gray-300 rounded shadow-lg">
            <a
              href="/login/employee"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Employee
            </a>
            <a
              href="/login/recruiter"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Recruiter
            </a>
          </div>
        </div>
        <div className="relative group">
          <button className={getClassName("signUpPage")}>Sign-Up</button>
          <div className="hidden group-hover:block absolute top-full left-0 bg-white border border-gray-300 rounded shadow-lg">
            <a
              href="/signUp/recruiter"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Recruiter
            </a>
            <a
              href="/signUp/employee"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Employee
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavHome;