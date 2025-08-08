import React from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";

const HelpPage = () => {
  return (
    <div className="bg-black text-white m-0 flex flex-col min-h-screen">
      <NavHome active="helpPage" />
      <div className="flex flex-col justify-items-center p-8 flex-grow">
        <h1 className="text-5xl mb-14">
          Facing any problem....Don't worry.........
        </h1>
        <p className="mb-8">
          Welcome to the Help section! Here, you can find answers to frequently
          asked questions and get support to make your experience on Hire Sphere
          smooth and successful. Below are some common inquiries and guides:
        </p>
        <h2 className="mb-4 text-2xl">1. How do I create an account?</h2>
        <p className="mb-16">
          To get started on Hire Sphere, click on the “Sign Up” button at the
          top right corner of the page. Enter your personal details, such as
          your name, username, and password. Once you’ve completed the
          registration process, you’ll be able to create your profile (if you're
          a job seeker), or post job openings (if you're an employer).
        </p>
        <h2 className="mb-4 text-2xl">2. How do I search for jobs?</h2>
        <p className="mb-16">
          Once logged in, click on the “Job Search” tab. You can filter your
          search based on job titles, industries, locations, and other
          preferences. Use relevant keywords to narrow down your search and find
          the positions that best match your skills and experience.
        </p>
        <h2 className="mb-4 text-2xl">3. How do I apply for a job?</h2>
        <p className="mb-16">
          Once you’ve found a job that interests you, click on the job listing
          to view the full details. If you meet the qualifications, click on the
          “Apply Now” button. You can also track the status of your applications
          directly through your profile.
        </p>
        <h2 className="mb-4 text-2xl">4. How do I post a job listing?</h2>
        <p className="mb-16">
          If you are an employer, click on the “Post a Job” button from your
          dashboard. Fill out the job description, required skills, and other
          relevant details. Once submitted, your job listing will be available
          for candidates to view and apply.
        </p>
        <h2 className="mb-4 text-2xl">5. How do I get support?</h2>
        <p className="mb-16">
          If you need assistance or have specific questions, please reach out to
          us by clicking on the “Contact Us” page at the bottom of the site. Our
          customer support team is available 24/7 to provide help and resolve
          any issues you might encounter.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default HelpPage;
