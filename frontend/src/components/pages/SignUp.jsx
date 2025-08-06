import React, { useState } from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";
import { AddUserToServer } from "../../../services/Services";
import { useNavigate } from "react-router-dom";
import { BackgroundAnimation } from "../compo/anima";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    userType: "employee",
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match."]);
      return;
    }
    let er = await AddUserToServer(formData);
    setErrors(er.errors ? er.errors : null);
    if (errors === null) {
      navigate("/login");
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen bg-black">
      <NavHome active="signUpPage" />
      <BackgroundAnimation />
      <h1 className="text-4xl font-bold mb-6 text-white">Sign Up</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#0d212ec9] relative shadow-lg text-white rounded-lg p-8 w-[400px]"
      >
        {errors && (
          <div className="bg-[#330e0e] border-2 border-white  text-white p-3 rounded-md mb-4">
            {errors.map((error) => {
              return <li>{error}</li>;
            })}
          </div>
        )}
        <div className="mb-4">
          <div className="flex justify-around w-full border-b-2 border-b-white pb-4 mb-6">
            <button
              type="button"
              name="userType"
              value="recruiter"
              className={`${
                formData.userType == "recruiter"
                  ? "text-yellow-400 underline"
                  : "text-white"
              } text-lg `}
              onClick={handleChange}
            >
              Recruiter
            </button>

            <button
              type="button"
              name="userType"
              value="employee"
              className={`${
                formData.userType == "employee"
                  ? "text-yellow-400 underline"
                  : "text-white"
              } text-lg`}
              onClick={handleChange}
            >
              Employee
            </button>
          </div>
          <label className="block font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block  font-medium mb-2">Username (Email)</label>
          <input
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block  font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block  font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block  font-medium mb-2">User Type</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="employee"
                checked={formData.userType === "employee"}
                onChange={handleChange}
                className="mr-2"
              />
              Employee
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="recruiter"
                checked={formData.userType === "recruiter"}
                onChange={handleChange}
                className="mr-2"
              />
              Recruiter
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-900 transition"
        >
          Sign Up
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default SignUpPage;
