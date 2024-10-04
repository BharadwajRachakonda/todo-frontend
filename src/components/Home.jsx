import React, { useState, useContext, useEffect } from "react";
import Collections from "./Collections";
import CollectionContext from "../context/collection/collectionContext";
import LoginCollection from "./LoginCollection";

function Home() {
  const [createCollection, setCreateCollection] = useState(false);
  const context = useContext(CollectionContext);
  const { addCollection, deleteCollection, getAllCollections, openCollection } =
    context;
  const [localCollection, setLocalCollection] = useState({
    title: "",
    password: "",
  });

  useEffect(() => {
    getAllCollections();
  }, [addCollection, deleteCollection, getAllCollections]);

  const onChange = (e) => {
    setLocalCollection({ ...localCollection, [e.target.name]: e.target.value });
  };

  const create = (e) => {
    e.preventDefault();
    setCreateCollection(false);
    addCollection(localCollection); // Create collection
    setLocalCollection({ title: "", password: "" }); // Reset form after creation
  };

  if (openCollection) {
    return <LoginCollection />;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center p-4 scrollbar-hide">
      <div
        className="transition-all duration-300 ease-in-out button px-6 py-2 absolute top-28 left-5 rounded-3xl hover:rounded-none cursor-pointer"
        onClick={() => {
          setCreateCollection(true);
        }}
      >
        Add a Collection
      </div>

      {createCollection && (
        <div className="z-20 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-full max-w-xs">
            <form
              className="Aboutbox shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={create}
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
                  onClick={create}
                >
                  Create
                </button>
                <button
                  className="transition-all duration-300 button px-6 py-2 rounded-3xl hover:rounded-none cursor-pointer"
                  type="button"
                  onClick={() => {
                    setCreateCollection(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="scrollbar-hide">
        <Collections />
      </div>
    </div>
  );
}

export default Home;
