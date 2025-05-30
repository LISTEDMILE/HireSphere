import React, { useState } from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";
import { LoginUserToServer } from "../../../services/Services";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../store";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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

  const handleSubmit =async (e) => {
      e.preventDefault();
      let user =await LoginUserToServer(formData);
      setErrors(user.errors ? user.errors : null);
      if (errors === null) {
          dispatch(userActions.Login({
              username: user.username,
              firstname: user.firstname,
              userType: user.userType,
              lastname: user.lastname,
          }))
          
        navigate("/");
      }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <NavHome active="signUpPage"/>
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
          >
              {errors && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {errors.map((error) => {
                return (
                  <li>{error}</li>
                );
              })}
            </div>
          )}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          Login
        </button>
          </form>
          <Footer />
    </div>
  );
}