import CollectionContext from "../context/collection/collectionContext";
import { React, useContext } from "react";
import CollectionItem from "./CollectionItem";

function Collections() {
  const context = useContext(CollectionContext);
  const { collection } = context;
  return (
    <div className="flex flex-wrap gap-16 min-h-full justify-center items-center">
      {collection.map((collect, index) => (
        <CollectionItem collection={collect} key={index} />
      ))}
    </div>
  );
}

export default Collections;
