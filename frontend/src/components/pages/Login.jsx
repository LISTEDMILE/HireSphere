import React, { useState } from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";
import { LoginUserToServer } from "../../../services/Services";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../store";
import { useDispatch } from "react-redux";
import { BackgroundAnimation } from "../compo/anima";
import Loader from "../compo/loader";
import Errors from "../compo/Errors";

export default function LoginPage() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setErrors(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let user = await LoginUserToServer(formData);
    if (!user.errors) {
      dispatch(
        userActions.Login({
          username: user.username,
          firstname: user.firstname,
          userType: user.userType,
          lastname: user.lastname,
        }),
      );
      navigate("/");
    } else {
      setErrors(user.errors);
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-[100vw] flex flex-col items-center justify-center min-h-screen bg-black">
      <NavHome active="login" />
      <BackgroundAnimation />

      <h1 className="text-4xl font-bold mb-6 text-white">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#0d212ec9] relative shadow-lg rounded-lg p-8 w-[95%] sm:w-[400px] "
      >
        <Errors errors={errors} />

        <div className="mb-4">
          <div className="flex justify-around w-full border-b-2 border-b-white pb-4 mb-6">
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
          <div className="w-full focus-within:ring-2 focus-within:ring-cyan-500 flex items-center justify-between rounded border text-white">
            <input
              type={`${display ? "text" : "password"}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 outline-none"
              required
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setDisplay(!display);
              }}
              className="mr-2"
            >
              {" "}
              {display ? "👁️" : "🙈"}
            </button>
          </div>
        </div>
        <div className="my-8  text-white">
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
          Login
        </button>

        <div className="mt-10 flex gap-3 items-center self-center">
          <h1 className="text-md text-white">If not registered </h1>{" "}
          <a
            href="/signUp"
            className="px-4 py-2 text-lg text-white bg-amber-600 rounded-lg"
          >
            SignUp
          </a>
        </div>
      </form>

      <Loader isLoading={isLoading} />

      <Footer />
    </div>
  );
}
