import React, { useState } from "react";
import { useSelector } from "react-redux";

import { IoMdMenu, IoMdClose, IoMdHome } from "react-icons/io";
import {
  FaHeart,
  FaBriefcase,
  FaFileAlt,
  FaGift,
  FaListUl,
  FaCheckCircle,
} from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { apiURL } from "../../../apiUrl";

const NavHome = ({active}) => {
  const navigate = useNavigate();
  const { isLoggedIn, userType } = useSelector((store) => store.userInfo);
  const [navOpen, setNavOpen] = useState(false);
  const [pass, setPass] = useState("");

  const LogOut = async () => {
    const response = await fetch(`${apiURL}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();

    if (data.success == true) {
      navigate("/");
      window.location.reload();
    } else if (data.success == false) {
      alert(data.errors);
    }
  };

  const DeleteAccount = async () => {
    const response = await fetch(`${apiURL}/api/deleteAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password: pass }),
    });
    const data = await response.json();
    if (data.success == true) {
      navigate("/");
      window.location.reload();
    } else {
      alert("Wrong Credentials");
    }
  };

  return (
    <header className="  flex items-center justify-between py-4 w-full mb-5 text-white z-30 ">
      <a
        href="/"
        className=" bg-red-800 text-white rounded-md px-4 py-1.5 flex gap-1 text-xl ml-8 hover:underline hover:bg-red-600 transition-all duration-300 ease-in-out"
      >
        <IoMdHome className="text-2xl" /> Home
      </a>
      {!isLoggedIn && (
        <>
          <div className="hidden sm:flex items-center text-lg space-x-14 ">
            <a
              href="/help"
              className={` hover:underline ${active ==="helpPage" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
            >
              Help
            </a>
            <a
              href="/contact"
              className={` hover:underline ${active ==="contactPage" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
            >
              Contact-Us
            </a>
            <a
              href="/about"
              className={` hover:underline ${active ==="aboutPage" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
            >
              About-Us
            </a>
          </div>

          <div className="hidden sm:flex items-center space-x-8 mr-8 ">
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
        </>
      )}

      {isLoggedIn && userType === "employee" && (
        <div className="hidden sm:flex items-center space-x-4 text-lg">
          <a
            href="/store/favourite"
            className={` hover:underline ${active ==="storeFavourites" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Favourites
          </a>

          <a
            href="/store/storeJobList"
            className={` hover:underline ${active ==="storeJobList" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Vacancies
          </a>

          <a
            href="/store/appliedJobs"
            className={` hover:underline ${active ==="appliedJobs" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Applied
          </a>

          <a
            href="/store/addProfile"
            className={` hover:underline ${active ==="addProfile" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Add Resume
          </a>

          <a
            href="/store/storeProfileList"
            className={` hover:underline ${active ==="storeProfileList" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Resumes
          </a>

          <a
            href="/store/offers/"
            className={` hover:underline ${active ==="offers" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Offers
          </a>
        </div>
      )}

      {isLoggedIn && userType === "recruiter" && (
        <div className="hidden sm:flex items-center space-x-4 texl-lg">
          <a
            href="/host/addJob"
            className={` hover:underline ${active ==="addJob" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Add Vacancy
          </a>

          <a
            href="/host/hostJobList"
            className={` hover:underline ${active ==="hostJobList" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Added by you
          </a>

          <a
            href="/host/hostApplications"
            className={` hover:underline ${active ==="hostApplications" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Applications
          </a>

          <a
            href="/host/hostProfileList"
            className={` hover:underline ${active ==="hostProfileList" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Resumes
          </a>

          <a
            href="/host/favouriteProfile"
            className={` hover:underline ${active ==="favouriteProfile" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Favourites
          </a>

          <a
            href="/host/choosenProfiles"
            className={` hover:underline ${active ==="choosenProfiles" ? "underline bg-[#0f584aab]" : "bg-transparent"} hover:text-red-100 
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out`}
          >
            Selected
          </a>
        </div>
      )}

      <button
        className="text-3xl mr-8 hover:cursor-pointer"
        onClick={() => {
          setNavOpen(true);
        }}
      >
        <IoMdMenu />
      </button>
      {navOpen && (
        <>
          <div
            className="inset-0 fixed bg-black opacity-70"
            onClick={() => setNavOpen(false)}
          ></div>
          <div
            className="flex fixed overflow-y-scroll overflow-x-hidden z-30 top-0  right-0 min-h-[50vh] items-start bg-gradient-to-b from-gray-900 via-gray-800 to-black
 p-6 w-72 flex-col gap-8 h-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <button
              className="text-3xl self-end  hover:cursor-pointer"
              onClick={() => {
                setNavOpen(false);
              }}
            >
              <IoMdClose />
            </button>
            {userType === "employee" && (
              <Link
                className="flex border-b pb-1.5 w-full gap-5 items-center"
                to={`/store/addAboutEmployee`}
              >
                <img
                  src={"/AlternateProfilePic.png"}
                  className="w-[50px] h-[50px]  rounded-full "
                />
                <p className="text-lg hover:underline">Profile</p>{" "}
              </Link>
            )}

            {userType === "recruiter" && (
              <Link
                className="flex border-b pb-1.5 w-full gap-5 items-center"
                to={`/host/addAboutRecruiter`}
              >
                <img
                  src={"/AlternateProfilePic.png"}
                  className="w-[50px] h-[50px]  rounded-full "
                />
                <p className="text-lg hover:underline">Profile</p>{" "}
              </Link>
            )}

            {isLoggedIn && userType === "employee" && (
              <div className="flex items-start flex-col gap-3 text-lg">
                <a
                  href="/store/favourite"
                  className="hover:underline hover:text-red-100 bg-transparent flex gap-3 items-center
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <FaHeart className="text-red-400" /> Favourites
                </a>

                <a
                  href="/store/storeJobList"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <FaBriefcase className="text-blue-400" /> Vacancies
                </a>

                <a
                  href="/store/appliedJobs"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <MdOutlineWork className="text-green-400" /> Applied
                </a>

                <a
                  href="/store/addProfile"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <FaFileAlt className="text-yellow-400" /> Add Resume
                </a>

                <a
                  href="/store/storeProfileList"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <FaFileAlt className="text-indigo-400" /> Resumes
                </a>

                <a
                  href="/store/offers/"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <FaGift className="text-purple-400" /> Offers
                </a>
              </div>
            )}

            {isLoggedIn && userType === "recruiter" && (
              <div className="flex items-start flex-col gap-3 texl-lg">
                <a
                  href="/host/addJob"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <FaBriefcase className="text-blue-400" /> Add Vacancy
                </a>

                <a
                  href="/host/hostJobList"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <FaListUl className="text-orange-400" /> Added by you
                </a>

                <a
                  href="/host/hostApplications"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <MdOutlineWork className="text-green-400" /> Applications
                </a>

                <a
                  href="/host/hostProfileList"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <FaFileAlt className="text-indigo-400" /> Resumes
                </a>

                <a
                  href="/host/favouriteProfile"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center not-only-of-type:bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <FaHeart className="text-pink-500" /> Favourites
                </a>

                <a
                  href="/host/choosenProfiles"
                  className="hover:underline hover:text-red-100  flex gap-3 items-center bg-transparent
          hover:bg-[#183b34ab] px-4 py-1 rounded transition-all duration-300 ease-in-out"
                >
                  <FaCheckCircle className="text-teal-400" /> Selected
                </a>
              </div>
            )}

            <div className="flex flex-col gap-1 mb-2 mt-6">
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

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => LogOut()}
                  className="bg-cyan-800 hover:bg-cyan-950 hover:cursor-pointer py-2 px-4 rounded-lg"
                >
                  Logout
                </button>
                <button
                  onClick={() => DeleteAccount()}
                  className="bg-red-800 hover:bg-red-950 hover:cursor-pointer py-2 px-4 rounded-lg"
                >
                  Delete Account{" "}
                </button>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter Password for Deletion"
                  type="text"
                  onChange={(e) => setPass(e.target.value)}
                />
              </>
            ) : (
              <div className="flex items-center space-x-8 mr-8 ">
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
          </div>
        </>
      )}
    </header>
  );
};

export default NavHome;
