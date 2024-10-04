import React from "react";

function About() {
  return (
    <div className="h-screen flex flex-col justify-center items-center p-4">
      <br />
      <br />
      <br />
      <div className="flex flex-col justify-center Aboutbox max-w-3xl gap-8 p-8">
        <h1>By Bharadwaj</h1>
        <p className="text-justify">
          Hello, folks! I’m Bharadwaj, the developer behind this MERN
          application. Allow me to give you an overview: The app is built using
          MongoDB, Express, React, and Node.js—a full-stack project. You can use
          it to create and manage your to-do lists. Need some collaborative
          power? You can add friends to your shared lists as readers or writers.
          Each collection of to-dos can be updated or deleted. And yes, each
          individual to-do item has similar properties. Plus, you can share a
          collection with more than one friend.
        </p>
      </div>
    </div>
  );
}

export default About;
