import React from "react";
import { useSelector } from "react-redux";

const NavHome = ({ active }) => {
  const getClassName = (page) =>
    active === page
      ? "bg-red-600 shadow-black shadow-lg py-2 px-4 rounded transition duration-300 no-underline text-white"
      : "hover:shadow-black shadow-lg hover:bg-red-500 py-2 px-4 rounded transition duration-300 no-underline text-white";
  
  const { isLoggedIn, userType } = useSelector((store) => store.userInfo);

  return (
    <header className="bg-teal-700 flex items-center justify-around py-2 w-full mb-5">
     
      <a href="/" className={getClassName("landingPage")}>
          Home
        </a>
        {!isLoggedIn &&  <div className="flex items-center space-x-4"> <a href="/help" className={getClassName("helpPage")}>
          Help
        </a>
        <a href="/contact" className={getClassName("contactPage")}>
          Contact-Us
        </a>
        <a href="/about" className={getClassName("aboutPage")}>
          About-Us
        </a>
        </div>}

      
      {isLoggedIn && userType === 'employee' && <div className="flex items-center space-x-4">
        <a href="/store/favourite" class="<%= active === 'favourite' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
        Favourites</a>

    <a href="/store/storeJobList" class="<%= active === 'jobList' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
        Vacancies</a>

        <a href="/store/apply" class="<%= active === 'applied' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
            Applied</a>



            <a href="/store/addProfile" class="<%= active === 'addProfile' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
                Add Resume</a>
        
            <a href="/store/storeProfileList" class="<%= active === 'storeProfileList' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
                Resumes</a>
        
                <a href="/store/chooseProfile/" class="<%= active === 'choosenProfiles' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
          Choosens</a></div>}
      

      {isLoggedIn && userType === 'recruiter' && <div className="flex items-center space-x-4">
        <a href="/host/addJob" class="<%= active === 'addJob' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
        Add Vacancy</a>

    <a href="/host/hostJobList" class="<%= active === 'hostJobList' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
        Added by you</a>

        <a href="/host/hostApplications" class="<%= active === 'hostApplied' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
            Applications</a>


            <a href="/host/profileList" class="<%= active === 'profileList' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
                Resumes</a>


                <a href="/host/favouriteProfile" class="<%= active === 'favouriteProfiles' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
                    Favourites</a>


                    <a href="/host/chooseProfile" class="<%= active === 'choosenProfiles' ? 'bg-red-600 shadow-black shadow-lg' : 'hover:shadow-black shadow-lg hover:bg-red-500' %> py-2 px-4 rounded transition duration-300 no-underline">
          Choosens</a>
        
      </div>}

        
       
      
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