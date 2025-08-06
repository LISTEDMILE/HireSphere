import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoMdMenu , IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const NavHome = () => {
  const { isLoggedIn, userType, userId } = useSelector((store) => store.userInfo);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="  flex items-center justify-between py-4 w-full mb-5 text-white z-30 ">
      <a
        href="/"
        className=" bg-red-800 text-white rounded-md px-4 py-1.5 text-xl ml-8 hover:underline hover:bg-red-600 transition-all duration-300 ease-in-out"
      >
        Home
      </a>
      {!isLoggedIn && (
        <div className="flex items-center text-lg space-x-14">
          <a
            href="/help"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Help
          </a>
          <a
            href="/contact"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Contact-Us
          </a>
          <a
            href="/about"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            About-Us
          </a>
        </div>
      )}
      {!isLoggedIn && (
        <div className="flex items-center space-x-8 mr-8">
          <a
            href="/signUp"
            className="border-2 border-orange-600 text-white rounded-lg px-4 py-1.5 text-xl hover:bg-orange-800 hover:underline transition-all duration-300 ease-in-out"
          >
            SignUp
          </a>
          <a
            href="/login"
            className="bg-orange-800 text-white rounded-lg px-4 py-1.5 text-xl hover:bg-orange-600 hover:underline transition-all duration-300 ease-in-out"
          >
            Login
          </a>
        </div>
      )}

      {isLoggedIn && userType === "employee" && (
        <div className="flex items-center space-x-4 text-lg">
          <a
            href="/store/favourite"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Favourites
          </a>

          <a
            href="/store/storeJobList"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Vacancies
          </a>

          <a
            href="/store/appliedJobs"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Applied
          </a>

          <a
            href="/store/addProfile"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Add Resume
          </a>

          <a
            href="/store/storeProfileList"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Resumes
          </a>

          <a
            href="/store/offers/"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Choosens
          </a>
        </div>
      )}

      {isLoggedIn && userType === "recruiter" && (
        <div className="flex items-center space-x-4 texl-lg">
          <a
            href="/host/addJob"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Add Vacancy
          </a>

          <a
            href="/host/hostJobList"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Added by you
          </a>

          <a
            href="/host/hostApplications"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Applications
          </a>

          <a
            href="/host/hostProfileList"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Resumes
          </a>

          <a
            href="/host/favouriteProfile"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Favourites
          </a>

          <a
            href="/host/choosenProfiles"
            className="hover:underline hover:text-red-100 bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
          >
            Choosens
          </a>
        </div>
      )}

      {isLoggedIn && <>
        <button className="text-3xl mr-12 hover:cursor-pointer"
          onClick={() => {
            setNavOpen(true);
          }}><IoMdMenu /></button>
        {navOpen &&
        
          <div className="flex absolute  right-12 min-h-[50vh] items-start bg-rose-950 p-6 pr-24 top-6 flex-col gap-12 ">
            <button className="text-3xl mr-12 hover:cursor-pointer"
          onClick={() => {
            setNavOpen(false);
        }}><IoMdClose /></button>
          <Link
            className="flex gap-3 items-center"
                to={`/store/addAboutEmployee/${userId}`}
              >
            
              <div className="h-[50px] w-[50px] bg-yellow-700"></div>
             <p className="text-lg hover:underline">Profile</p> </Link>
       
        <div>Logout</div>
        
      </div>}
        </>
      }
    </header>
  );
};

export default NavHome;
