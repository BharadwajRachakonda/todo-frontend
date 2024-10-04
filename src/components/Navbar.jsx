import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="navpropertyes border-gray-200 dark:border-gray-700 fixed w-screen rounded-b-3xl top-0 left-0 right-0 z-30">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            ToDo On The Cloud
          </span>
        </Link>
        <button
          onClick={handleToggle}
          type="button"
          className="transition-all ease-in-out duration-500 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-multi-level"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={
                  `hover:tracking-wider transition-all ease-in-out duration-500 block py-2 px-3 text-white rounded md:bg-transparent hover:underline md:p-0 md:dark:bg-transparent navtextshadow ` +
                  (location.pathname == "/"
                    ? `bg-pink-700 dark:bg-pink-600 md:dark:text-pink-500 md:text-pink-700`
                    : ``)
                }
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shared"
                className={
                  `hover:tracking-wider transition-all ease-in-out duration-500 block py-2 px-3 text-white rounded md:bg-transparent hover:underline md:p-0 md:dark:bg-transparent navtextshadow ` +
                  (location.pathname == "/shared"
                    ? `bg-pink-700 dark:bg-pink-600 md:dark:text-pink-500 md:text-pink-700`
                    : ``)
                }
              >
                Shared
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={
                  `hover:tracking-wider transition-all ease-in-out duration-500 block py-2 px-3 text-white rounded md:bg-transparent hover:underline md:p-0 md:dark:bg-transparent navtextshadow ` +
                  (location.pathname == "/about"
                    ? `bg-pink-700 dark:bg-pink-600 md:dark:text-pink-500 md:text-pink-700`
                    : ``)
                }
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="mailto:rbaharadwaj022@gmail.com"
                className="hover:tracking-wider transition-all ease-in-out duration-500 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-white hover:underline md:dark:hover:text-pink-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent navtextshadow"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
