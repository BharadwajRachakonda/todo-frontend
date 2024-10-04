import React, { useContext, useState } from "react";
import collectionContext from "../context/collection/collectionContext";

function AddAccess(props) {
  const context = useContext(collectionContext);
  const { updateAccess } = context;

  const onChange = (e) => {
    setLocalCollection({ ...localCollection, [e.target.name]: e.target.value });
  };

  const [localCollection, setLocalCollection] = useState({
    read_access: "",
    write_access: "",
  });

  const add = async (e) => {
    e.preventDefault();
    await updateAccess(localCollection);
    setLocalCollection({});
    setAddAccess(false);
  };

  const { setAddAccess } = props;
  return (
    <div>
      {" "}
      <div className="z-20 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="w-full max-w-xs">
          <form
            className="Aboutbox shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={add}
          >
            <div className="mb-4">
              <label className="block mb-2" htmlFor="read_access">
                Read Access
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-pink-700 leading-tight focus:outline-none focus:shadow-outline"
                id="read_access"
                type="text"
                placeholder="read_access"
                name="read_access"
                value={localCollection.read_access}
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2" htmlFor="write_access">
                Write Access
              </label>
              <input
                className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-pink-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="write_access"
                type="text"
                placeholder="write_access"
                name="write_access"
                value={localCollection.write_access}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <button
                className="transition-all duration-300 button px-6 py-2 rounded-3xl hover:rounded-none cursor-pointer"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAccess;
