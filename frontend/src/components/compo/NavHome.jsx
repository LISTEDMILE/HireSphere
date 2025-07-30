import React from "react";
import { useSelector } from "react-redux";

const NavHome = () => {
  const { isLoggedIn, userType } = useSelector((store) => store.userInfo);

  return (
    <header className="bg-cyan-950  flex items-center justify-around py-2 w-full mb-5 text-white">
      <a href="/" className="underline bg-red-600 text-white rounded-lg px-6 py-2 text-xl">
        Home
      </a>
      {!isLoggedIn && (
        <div className="flex items-center space-x-8 underline">
          <a href="/help" className="">
            Help
          </a>
          <a href="/contact" className="">
            Contact-Us
          </a>
          <a href="/about" className="">
            About-Us
          </a>
          
        </div>
        
      )}
      {
        !isLoggedIn && (
          <div className="flex items-center space-x-8">
            <a href="/login" className="bg-orange-600 underline text-white rounded-lg px-6 py-2 text-xl ">
        Login
      </a>
      <a href="/signUp" className="border-2 border-orange-600 underline text-white rounded-lg px-6 py-2 text-xl">
        SignUp
      </a>
          </div>
        )
      }

      {isLoggedIn && userType === "employee" && (
        <div className="flex items-center space-x-4">
          <a href="/store/favourite" className="">
            Favourites
          </a>

          <a href="/store/storeJobList" className="">
            Vacancies
          </a>

          <a href="/store/appliedJobs" className="">
            Applied
          </a>

          <a href="/store/addProfile" className="">
            Add Resume
          </a>

          <a href="/store/storeProfileList" className="">
            Resumes
          </a>

          <a href="/store/chooseProfile/" className="">
            Choosens
          </a>
        </div>
      )}

      {isLoggedIn && userType === "recruiter" && (
        <div className="flex items-center space-x-4">
          <a href="/host/addJob" className="">
            Add Vacancy
          </a>

          <a href="/host/hostJobList" className="">
            Added by you
          </a>

          <a href="/host/hostApplications" className="">
            Applications
          </a>

          <a href="/host/hostProfileList" className="">
            Resumes
          </a>

          <a href="/host/favouriteProfile" className="">
            Favourites
          </a>

          <a href="/host/chooseProfile" cclassName="">
            Choosens
          </a>
        </div>
      )}
    </header>
  );
};

export default NavHome;
