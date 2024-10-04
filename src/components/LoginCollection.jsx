import React, { useContext, useState, useEffect } from "react";
import collectionContext from "../context/collection/collectionContext";
import ToDo from "./ToDo";

function LoginCollection() {
  const context = useContext(collectionContext);
  const {
    setOpenCollection,
    setOpeningCollection,
    openingCollection,
    collectionLogin,
    setAuthTokenCollection,
    authTokenCollection,
  } = context;

  const [logedIn, setLogedIn] = useState(false);

  const onChange = (e) => {
    setLocalCollection({ ...localCollection, [e.target.name]: e.target.value });
  };

  const [localCollection, setLocalCollection] = useState({
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    const obj = {
      password: localCollection.password,
      title: openingCollection.title,
      author: openingCollection.author,
    };
    setOpenCollection(true);
    try {
      const authToken = await collectionLogin(obj);
      setAuthTokenCollection(authToken);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (authTokenCollection) {
      setLogedIn(true);
    }
  }, [authTokenCollection]);

  return (
    <div>
      {!logedIn && (
        <div className="z-20 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-full max-w-xs">
            <form
              className="Aboutbox shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={login}
            >
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
                  value={localCollection.password}
                  onChange={onChange}
                />
                <p className="text-blue-500 text-xs italic">
                  Please choose a password.
                </p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <button
                  className="transition-all duration-300 button px-6 py-2 rounded-3xl hover:rounded-none cursor-pointer"
                  type="button"
                  onClick={login}
                >
                  Open
                </button>
                <button
                  className="transition-all duration-300 button px-6 py-2 rounded-3xl hover:rounded-none cursor-pointer"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenCollection(false);
                    setOpeningCollection({});
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {logedIn && <ToDo />}
    </div>
  );
}

export default LoginCollection;
