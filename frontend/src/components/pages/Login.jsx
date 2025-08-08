import React, { useState } from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";
import { LoginUserToServer } from "../../../services/Services";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../store";
import { useDispatch } from "react-redux";
import { BackgroundAnimation } from "../compo/anima";
import { apiURL } from "../../../apiUrl";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userType: "employee",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = await LoginUserToServer(formData);
    if (!user.errors) {
      dispatch(
        userActions.Login({
          username: user.username,
          firstname: user.firstname,
          userType: user.userType,
          lastname: user.lastname,
        })
      );
      navigate("/");
    } else {
      setErrors(user.errors);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen bg-black">
      <NavHome active="login" />
      <BackgroundAnimation />

      <h1 className="text-4xl font-bold mb-6 text-white">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#0d212ec9] relative shadow-lg rounded-lg p-8 w-[400px] "
      >
        {errors && (
          <div className=" border-2  bg-red-100 text-red-900  p-3 rounded-md mb-4">
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
          <label className="block text-white font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full p-2 border rounded bg-blue-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2 border rounded text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-900 transition"
        >
          Login
        </button>
      </form>
      <Footer />
    </div>
  );
}
