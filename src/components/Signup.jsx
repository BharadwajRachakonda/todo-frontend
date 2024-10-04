import React, { useState, useContext } from "react";
import loginContext from "../context/userlogin/loginContext";

function Signup({ setAuthPending, switchToLogin }) {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const context = useContext(loginContext);
  const { setAuthToken } = context;

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const signup_me = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const myRequest = new Request(
      `https://todo-backend-eight-nu.vercel.app/api/authentication/createuser`,
      {
        method: "POST",
        body: JSON.stringify({
          name: credentials.name,
          password: credentials.password,
        }),
        headers: myHeaders,
      }
    );

    try {
      const response = await fetch(myRequest);
      const json = await response.json();

      if (json.errors) {
        if (json.errors.msg) {
          alert(json.errors.msg);
        } else if (Array.isArray(json.errors)) {
          alert(json.errors.map((err) => err.msg).join("\n"));
        } else {
          alert("An error occurred. " + json.errors);
        }
      } else if (json.authToken) {
        setAuthToken(json.authToken);
        setAuthPending(false);
      } else {
        alert("Unexpected response structure.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Failed to sign up. Please try again later.");
    }
  };

  return (
    <div>
      <div className="z-20 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="w-full max-w-xs">
          <form
            className="Aboutbox shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={signup_me}
          >
            <div className="mb-4">
              <label className="block mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-pink-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="UserName"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-pink-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
              <p className="text-blue-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <button
                className="transition-all duration-300 button px-6 py-2 rounded-3xl hover:rounded-none cursor-pointer"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div className="mt-4">
              <p className="text-blue-500 text-xs italic">
                Already have an account?{" "}
                <span
                  className="cursor-pointer underline"
                  onClick={switchToLogin}
                >
                  Log in
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
