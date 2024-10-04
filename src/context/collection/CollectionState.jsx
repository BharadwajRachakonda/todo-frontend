import React, { useState, useCallback, useContext } from "react";
import collectionContext from "./collectionContext";
import loginContext from "../userlogin/loginContext";

const CollectionState = (props) => {
  const context = useContext(loginContext);
  const { authToken, setAuthToken } = context;

  // Fix the useState initialization
  const [authTokenCollection, setAuthTokenCollection] = useState("");

  const collections = [];
  const [collection, setCollection] = useState(collections);
  const host = "https://todo-backend-eight-nu.vercel.app";

  const [openCollection, setOpenCollection] = useState(false);
  const [openingCollection, setOpeningCollection] = useState({});

  // get all collections
  const getAllCollections = useCallback(async () => {
    const myHeaders = new Headers();
    myHeaders.append("auth-token", authToken);

    const myRequest = new Request(
      `${host}/api/collection/fetchallcollections`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );

    const response = await fetch(myRequest);
    const json = await response.json();
    setCollection(json);
  }, [host, authToken]);

  // add a collection
  const addCollection = useCallback(
    async (collecting) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("auth-token", authToken);

      const myRequest = new Request(`${host}/api/collection/addcollection`, {
        method: "POST",
        body: JSON.stringify({
          title: collecting.title,
          password: collecting.password,
        }),
        headers: myHeaders,
      });

      const response = await fetch(myRequest);
      getAllCollections(); // Update the collection list after adding
    },
    [host, getAllCollections, authToken]
  );

  // delete a collection
  const deleteCollection = useCallback(
    async (collecting) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("auth-token", authToken);

      const myRequest = new Request(`${host}/api/collection/deletecollection`, {
        method: "DELETE",
        body: JSON.stringify({
          title: collecting.title,
        }),
        headers: myHeaders,
      });

      const response = await fetch(myRequest);
      getAllCollections(); // Update the collection list after deleting
    },
    [host, getAllCollections, authToken]
  );

  // get a collection
  const getCollection = useCallback(async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("auth-token", authToken);
      myHeaders.append("auth-token-collection", authTokenCollection);

      const myRequest = new Request(`${host}/api/collection/getcollection`, {
        method: "POST",
        headers: myHeaders,
      });

      const response = await fetch(myRequest);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error getting collection:", errorData);
        throw new Error("Failed to get collection");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during getCollection:", error);
      throw error;
    }
  }, [host, authToken, authTokenCollection]);

  // collection login
  const collectionLogin = useCallback(
    async (collecting) => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("auth-token", authToken);
        myHeaders.append("Content-Type", "application/json");

        const myRequest = new Request(
          `${host}/api/collection/collectionlogin`,
          {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(collecting),
          }
        );

        const response = await fetch(myRequest);

        if (!response.ok) {
          // Log the response for debugging
          const errorData = await response.json();
          console.error("Login failed with response:", errorData);
          throw new Error("Login failed");
        }

        const data = await response.json();

        return data.authToken;
      } catch (error) {
        console.error("Error during collection login:", error);
        throw error;
      }
    },
    [host, authToken]
  );

  // add a todo to a collection
  const addToDo = useCallback(
    async (collecting) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("auth-token", authToken);
      myHeaders.append("auth-token-collection", authTokenCollection);

      const myRequest = new Request(
        `${host}/api/collection/getcollection/addtodo`,
        {
          method: "POST",
          body: JSON.stringify({
            todo_title: collecting.todo_title,
            value: collecting.value,
          }),
          headers: myHeaders,
        }
      );

      const response = await fetch(myRequest);
    },
    [host, getCollection, getAllCollections, authToken, authTokenCollection]
  );

  // edit readers and writers of a collection
  const updateAccess = useCallback(
    async (collecting) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("auth-token", authToken);
      myHeaders.append("auth-token-collection", authTokenCollection);

      const myRequest = new Request(
        `${host}/api/collection/getcollection/updateaccess`,
        {
          method: "POST",
          body: JSON.stringify({
            read_access: collecting.read_access,
            write_access: collecting.write_access,
          }),
          headers: myHeaders,
        }
      );

      const response = await fetch(myRequest);
    },
    [host, getCollection, getAllCollections, authToken, authTokenCollection]
  );

  // delete a todo
  const deleteToDo = useCallback(
    async (collecting) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("auth-token", authToken);
      myHeaders.append("auth-token-collection", authTokenCollection);

      const myRequest = new Request(
        `${host}/api/collection/getcollection/deletetodo`,
        {
          method: "DELETE",
          body: JSON.stringify({
            todo_title: collecting.todo_title,
          }),
          headers: myHeaders,
        }
      );

      const response = await fetch(myRequest);
    },
    [host, getCollection, getAllCollections, authToken, authTokenCollection]
  );

  return (
    <collectionContext.Provider
      value={{
        collection,
        setCollection,
        addCollection,
        deleteCollection,
        getAllCollections,
        getCollection,
        addToDo,
        updateAccess,
        deleteToDo,
        openCollection,
        setOpenCollection,
        openingCollection,
        setOpeningCollection,
        collectionLogin,
        authTokenCollection,
        setAuthTokenCollection,
        setAuthToken,
      }}
    >
      {props.children}
    </collectionContext.Provider>
  );
};

export default CollectionState;
