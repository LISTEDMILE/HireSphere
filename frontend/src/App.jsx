import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store";

//routes
import LandingPage from "./components/pages/LandingPage";
import HelpPage from "./components/pages/HelpPage";
import ContactPage from "./components/pages/ContactPage";
import AboutPage from "./components/pages/AboutPage";
import SignUpPage from "./components/pages/SignUp";
import LoginPage from "./components/pages/Login";
import AddJob from "./components/pages/host/AddJob";
import HostJobList from "./components/pages/host/HostJobList";
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
import ApplicantProfiles from "./components/pages/host/ApplicantProfiles";
import HostJobDetails from "./components/pages/host/hostJobDetails";
import HostProfileDetails from "./components/pages/host/hostProfileDetails";
import StoreJobDetails from "./components/pages/store/storeJobDetails";
import StoreProfileDetails from "./components/pages/store/storeProfileDetails";
import AboutRecruiter from "./components/pages/store/aboutRecruiter";
import AddAboutEmployee from "./components/pages/store/addAboutEmployee";
import AddAboutRecruiter from "./components/pages/host/addAboutRecruiter";
import AboutEmployee from "./components/pages/host/aboutEmployee";
import StoreOffererJobs from "./components/pages/store/storeOffererJobs";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://localhost:3000/api/me`, {
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
              userId: data.user._id,
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
    {
      path: "host/applicantProfiles/:applicantId",
      element: <ApplicantProfiles />,
    },
    {
      path: "store/storeOffererJobs/:offererId",
      element: <StoreOffererJobs />,
    },
    { path: "host/hostJobDetails/:jobId", element: <HostJobDetails /> },
    {
      path: "host/hostProfileDetails/:profileId",
      element: <HostProfileDetails />,
    },
    { path: "store/storeJobDetails/:jobId", element: <StoreJobDetails /> },
    {
      path: "store/storeProfileDetails/:profileId",
      element: <StoreProfileDetails />,
    },
    { path: "/store/aboutRecruiter/:userId", element: <AboutRecruiter /> },
    { path: "/store/addAboutEmployee", element: <AddAboutEmployee /> },
    { path: "/host/addAboutRecruiter", element: <AddAboutRecruiter /> },
    { path: "/host/aboutEmployee/:userId", element: <AboutEmployee /> },
  ]);
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
