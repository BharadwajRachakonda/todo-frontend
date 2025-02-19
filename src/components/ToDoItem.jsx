import React, { useContext, useState } from "react";
import collectionContext from "../context/collection/collectionContext";

function ToDoItem(props) {
  const context = useContext(collectionContext);
  const { deleteToDo } = context;

  const { todo, setDeleting } = props;

  const del = async (todo_title) => {
    await deleteToDo({ todo_title });
    setDeleting(true);
    alert("Deleted ToDo ", { todo_title });
  };

  return (
    <span className="p-4 border rounded shadow-md">
      <h3 className="text-lg font-bold">{todo.title}</h3>
      <div>{todo.value}</div>
      <div className="flex flex-row gap-4">
        <div onClick={() => del(todo.title)}>
          <i className="transition-all duration-500 cursor-pointer fa-solid fa-trash text-white hover:text-red-400"></i>{" "}
          {/* Delete a ToDo */}
        </div>
      </div>
    </span>
  );
}

export default ToDoItem;
