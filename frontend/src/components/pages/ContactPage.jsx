import React from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";

const ContactPage = () => {
  return (
    <div className="m-0 flex flex-col min-h-screen">
      <NavHome active="contactPage" />
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-3xl font-bold">Contact Us Page</h1>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
