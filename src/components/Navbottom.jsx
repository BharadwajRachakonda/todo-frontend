import React from "react";
/*
  AcheivementsandContact takes props

  color(clr)
  
*/

function Navbottom(props) {
  return (
    <div className="w-screen md:flex flex-row items-center bg-slate-800 hidden text-white rounded-t-3xl justify-center absolute bottom-0 left-0">
      <div className="flex flex-col z-10">
        <h2 className="text-lg font-bold md:m-4">Contact</h2>
        <ul className="font-bold flex flex-row md:m-4 justify-between gap-10">
          <li className="transition-all rounded-md delay-150 duration-300 ease-in-out p-2 bg-neutral-500 hover:scale-125 hover:tracking-widest group">
            <i className="fa-brands fa-linkedin group-hover:animate-bounce"></i>
            <a href="https://www.linkedin.com/in/bharadwaj-rachakonda-b36658258/">
              {" "}
              Linkedin
            </a>
          </li>
          <li className="transition-all rounded-md delay-150 duration-300 ease-in-out p-2 bg-neutral-500 hover:scale-125 hover:tracking-widest group">
            <i className="fa-solid fa-laptop-code group-hover:animate-bounce"></i>
            <a href="https://leetcode.com/rbharadwaj022/"> LeetCode</a>
          </li>
          <li className="transition-all rounded-md delay-150 duration-300 ease-in-out p-2 bg-neutral-500 hover:scale-125 hover:tracking-widest group">
            <i className="fa-brands fa-hackerrank group-hover:animate-bounce"></i>
            <a href="https://www.hackerrank.com/profile/rbharadwaj022">
              {" "}
              HackerRank
            </a>
          </li>
          <li className="transition-all rounded-md delay-150 duration-300 ease-in-out p-2 bg-neutral-500 hover:scale-125 hover:tracking-widest group">
            <i className="fa-brands fa-github group-hover:animate-bounce"></i>
            <a href="https://github.com/BharadwajRachakonda"> GitHub</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbottom;
