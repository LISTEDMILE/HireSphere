import LandingPage from "./components/pages/LandingPage"
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HelpPage from "./components/pages/HelpPage";
import ContactPage from "./components/pages/ContactPage";
import AboutPage from "./components/pages/AboutPage";
import SignUpPage from "./components/pages/SignUp";
import LoginPage from "./components/pages/Login";

function App() {
    const route = createBrowserRouter([
        {path: "/", element: <LandingPage />,  },
        {path:"/help", element:<HelpPage/>,},
        {path:"/contact", element: <ContactPage/>},
        { path: "/about", element: <AboutPage /> },
        { path: "/signUp", element: <SignUpPage /> },  
        { path: "/login", element: <LoginPage />}, 
        
      ]);
    return (
        <RouterProvider router={route}></RouterProvider>
    )
}

export default App
