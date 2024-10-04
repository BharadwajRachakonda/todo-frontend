import React, { useContext, useEffect, useState } from "react";
import collectionContext from "../context/collection/collectionContext";
import ToDoItem from "./ToDoItem";
import AddAccess from "./AddAccess";

function ToDo() {
  const context = useContext(collectionContext);
  const [createToDo, setCreateToDo] = useState(false);
  const [addAccess, setAddAccess] = useState(false);
  const [collection, setCollection] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const {
    setOpenCollection,
    setOpeningCollection,
    setAuthTokenCollection,
    getCollection,
    addToDo,
  } = context;

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setDeleting(false);
        const collectionData = await getCollection();
        setCollection(collectionData);
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [getCollection, loading, deleting, addAccess]);

  const back = () => {
    setOpenCollection(false);
    setOpeningCollection({});
    setAuthTokenCollection("");
  };

  const onChange = (e) => {
    setLocalCollection({ ...localCollection, [e.target.name]: e.target.value });
  };

  const [localCollection, setLocalCollection] = useState({
    todo_title: "",
    value: "",
  });

  const create = (e) => {
    e.preventDefault();
    setCreateToDo(false);
    addToDo(localCollection);
    setLocalCollection({ todo_title: "", value: "" });
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center p-4">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="h-screen flex flex-col justify-center items-center p-4">
        <h1>No Collection Data</h1>
      </div>
    );
  }

  // Transform todos object to array of arrays
  const todosArray = collection.todos ? Object.entries(collection.todos) : [];

  if (addAccess) {
    return <AddAccess addAccess={AddAccess} setAddAccess={setAddAccess} />;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center p-4">
      <div
        className="transition-all duration-300 ease-in-out button px-6 py-2 fixed top-28 left-5 rounded-3xl hover:rounded-none cursor-pointer"
        onClick={() => {
          setCreateToDo(true);
        }}
      >
        Add a ToDo
      </div>
      <div
        className="transition-all duration-300 ease-in-out button px-6 py-2 fixed top-28 right-5 rounded-3xl hover:rounded-none cursor-pointer"
        onClick={() => {
          back();
        }}
      >
        Back
      </div>

      <div className="flex flex-col absolute top-40 justify-center items-center">
        <h1 className="md:text-3xl text-lg">Collection: {collection.title}</h1>
        <h2 className="md:text-xl text-sm">Author: {collection.author}</h2>
        <div className="text-gray-400">
          <div className="flex flex-wrap gap-2 mb-2">
            <span>Readers: </span>
            {collection.read_access.length === 0 ? (
              <span>None</span>
            ) : (
              collection.read_access.map((reader, index) => (
                <span key={index}>{reader}</span>
              ))
            )}
            <i
              className="transition-all duration-300 ease-in-out cursor-pointer fa-solid fa-pen-to-square hover:text-red-500"
              onClick={() => {
                setAddAccess(true);
              }}
            ></i>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span>Writers: </span>
            {collection.write_access.length === 0 ? (
              <span>None</span>
            ) : (
              collection.write_access.map((writer, index) => (
                <span key={index}>{writer}</span>
              ))
            )}
          </div>
        </div>
      </div>

      {createToDo && (
        <div className="z-20 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-full max-w-xs">
            <form
              className="Aboutbox shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={create}
            >
              <div className="mb-4">
                <label className="block mb-2" htmlFor="todo_title">
                  ToDo Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-pink-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="todo_title"
                  type="text"
                  placeholder="ToDo Title"
                  name="todo_title"
                  value={localCollection.todo_title}
                  onChange={onChange}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2" htmlFor="value">
                  Value
                </label>
                <input
                  className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-pink-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="value"
                  type="text"
                  placeholder="ToDo"
                  name="value"
                  value={localCollection.value}
                  onChange={onChange}
                />
                <p className="text-blue-500 text-xs italic">Enter ToDo</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <button
                  className="transition-all duration-300 button px-6 py-2 rounded-3xl hover:rounded-none cursor-pointer"
                  type="submit"
                >
                  Create
                </button>
                <button
                  className="transition-all duration-300 button px-6 py-2 rounded-3xl hover:rounded-none cursor-pointer"
                  type="button"
                  onClick={() => {
                    setCreateToDo(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <br />
      <br />
      <br />
      <br />

      <div className="flex flex-row flex-wrap md:gap-16 justify-center items-center w-screen overflow-y-scroll scrollbar-hide">
        {todosArray.map(([key, value], index) => (
          <ToDoItem
            todo={{ title: key, value: value }}
            key={index}
            deleting={deleting}
            setDeleting={setDeleting}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDo;
