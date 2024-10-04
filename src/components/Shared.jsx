import React, { useState, useContext } from "react";
import CollectionContext from "../context/collection/collectionContext";
import ToDo from "./ToDo";

function Shared() {
  const [localCollection, setLocalCollection] = useState({
    title: "",
    password: "",
    author: "",
  });

  const [showToDo, setShowToDo] = useState(false);

  const onChange = (e) => {
    setLocalCollection({ ...localCollection, [e.target.name]: e.target.value });
  };

  const context = useContext(CollectionContext);
  const {
    collectionLogin,
    setAuthTokenCollection,
    setOpeningCollection,
    getCollection,
    setOpenCollection,
  } = context;

  const open = async (e) => {
    e.preventDefault();
    const obj = {
      password: localCollection.password,
      title: localCollection.title,
      author: localCollection.author,
    };
    try {
      const authToken = await collectionLogin(obj);
      await setAuthTokenCollection(authToken);
      await setOpeningCollection(await getCollection());
      await setOpenCollection(true);
      setShowToDo(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      {showToDo ? (
        <ToDo />
      ) : (
        <div className="z-20 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-full max-w-xs">
            <form
              className="Aboutbox shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={open}
            >
              <div className="mb-4">
                <label className="block mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-pink-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={localCollection.title}
                  onChange={onChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="author">
                  Author
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-pink-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="author"
                  type="text"
                  placeholder="Author"
                  name="author"
                  value={localCollection.author}
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
                  type="submit"
                >
                  Open
                </button>
              </div>
              <div className="text-gray-600">Click twise</div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shared;
