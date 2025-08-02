import LandingPage from "./components/pages/LandingPage";
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HelpPage from "./components/pages/HelpPage";
import ContactPage from "./components/pages/ContactPage";
import AboutPage from "./components/pages/AboutPage";
import SignUpPage from "./components/pages/SignUp";
import LoginPage from "./components/pages/Login";
import AddJob from "./components/pages/host/AddJob";
import HostJobList from "./components/pages/host/HostJobList";
import { useDispatch } from "react-redux";
import { userActions } from "../store";
import StoreJobList from "./components/pages/store/storeJobList";
import StoreFavourites from "./components/pages/store/storeFavourites";
import StoreAddProfile from "./components/pages/store/storeAddProfile";
import StoreProfilesList from "./components/pages/store/storeProfileList";
import HostProfileList from "./components/pages/host/hostProfileList";
import FavouriteProfileList from "./components/pages/host/hostFavouriteProfiles";
import AppliedJobs from "./components/pages/store/applied";
import Applications from "./components/pages/host/Applications";
import ChoosenProfiles from "./components/pages/host/Choosens";
import Offers from "./components/pages/store/Offers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ApplicantProfiles from "./components/pages/host/ApplicantProfiles";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/me", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.isLoggedIn) {
          dispatch(
            userActions.Login({
              username: data.user.username,
              firstname: data.user.firstname,
              userType: data.user.userType,
              lastname: data.user.lastname,
            })
          );
        }
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    };

    fetchUser();
  }, []);

  const route = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/help", element: <HelpPage /> },
    { path: "/contact", element: <ContactPage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/signUp", element: <SignUpPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/host/addJob/:jobId", element: <AddJob /> },
    { path: "/host/addJob", element: <AddJob /> },
    { path: "/host/hostJobList", element: <HostJobList /> },
    { path: "/store/storeJobList", element: <StoreJobList /> },
    { path: "/store/favourite", element: <StoreFavourites /> },
    { path: "/store/addProfile", element: <StoreAddProfile /> },
    { path: "/store/addProfile/:profileId", element: <StoreAddProfile /> },
    { path: "/store/storeProfileList", element: <StoreProfilesList /> },
    { path: "/host/hostProfileList", element: <HostProfileList /> },
    { path: "/host/favouriteProfile", element: <FavouriteProfileList /> },
    { path: "/store/appliedJobs", element: <AppliedJobs /> },
    { path: "/host/hostApplications", element: <Applications /> },
    { path: "host/choosenProfiles", element: <ChoosenProfiles /> },
    { path: "store/offers", element: <Offers /> },
    { path: "host/applicantProfiles/:applicantId", element: <ApplicantProfiles /> }
    
  ]);
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
