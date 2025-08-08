import React from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";

const AboutPage = () => {
  return (
    <div className="bg-black text-white m-0 flex flex-col min-h-screen">
      <NavHome active="aboutPage" />
      <div className="pt-8 w-full flex-grow">
        {/* Section 1 */}
        <div className="flex justify-around mb-14">
          <img src="/about1.jpg" alt="About Us 1" className="h-64" />
          <p className="w-96">
            Hire Sphere is a dynamic, user-friendly platform designed to bridge
            the gap between employers and potential candidates. We strive to
            simplify the recruitment process by offering a seamless experience
            for both job seekers and hiring companies. Whether you're a fresh
            graduate looking for your first job or an experienced professional
            exploring new career opportunities, Hire Sphere provides you with
            all the tools and resources you need to make your hiring journey a
            success.
          </p>
        </div>
        {/* Section 2 */}
        <div className="flex justify-around mb-14">
          <p className="w-96">
            At Hire Sphere, we prioritize quality and relevance. Our platform
            uses cutting-edge technology to match job seekers with employers
            based on skills, experience, and preferences. We offer a range of
            services, including customized job listings, resume optimization
            tools, and interview scheduling, all aimed at helping candidates
            land their dream job and employers find the perfect fit for their
            open positions.
          </p>
          <img src="/about2.jpg" alt="About Us 2" className="h-64" />
        </div>
        {/* Section 3 */}
        <div className="flex justify-around mb-14">
          <img src="/about3.jpg" alt="About Us 3" className="h-64" />
          <p className="w-96">
            <strong>Our Mission:</strong>
            <br />
            To create a trusted, efficient, and comprehensive platform for
            recruitment that connects top talent with the best companies in the
            industry.
            <br />
            <br />
            <strong>Our Vision:</strong>
            <br />
            To empower job seekers and employers to make smarter, more informed
            decisions during the hiring process.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
