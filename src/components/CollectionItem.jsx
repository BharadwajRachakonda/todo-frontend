import React, { useContext } from "react";
import CollectionContext from "../context/collection/collectionContext";

function CollectionItem(props) {
  const { collection } = props;

  const context = useContext(CollectionContext);
  const { deleteCollection, setOpenCollection, setOpeningCollection } = context;

  const del = (title) => {
    const obj = {
      title,
    };
    deleteCollection(obj);
  };

  return (
    <div className="md:m-0 m-5 Aboutbox w-52 h-48 flex flex-col justify-evenly items-center">
      <p>{collection.title} </p>
      <div className="flex">
        <p className="py-2 px-2">By {collection.author}</p>
        <p
          className="transition-all duration-300 ease-in-out button px-5 py-2 rounded-3xl bshadow hover:rounded-none cursor-pointer"
          onClick={() => {
            setOpenCollection(true), setOpeningCollection(collection);
          }}
        >
          Open
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <div onClick={() => del(collection.title)}>
          <i className="transition-all duration-500 cursor-pointer fa-solid fa-trash text-white hover:text-red-400"></i>{" "}
          {/* Delete a Collection */}
        </div>
      </div>
    </div>
  );
}

export default CollectionItem;
