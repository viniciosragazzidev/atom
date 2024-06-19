"use client";

import React from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

const Floating = () => {
  const { setTheme } = useTheme();

  return (
    <div className="fixed bottom-5 right-5 ">
      <div className=" w-10 h-10 rounded-xl   text-slate-200  overflow-hidden relative cursor-pointer text-xl hover:scale-95 active:scale-90 transition-all bg-primary">
        <span
          className="w-10 h-10 absolute transition-transform flex justify-center items-center translate-x-20 dark:translate-x-0"
          onClick={() => setTheme("light")}
        >
          <BiSun />
        </span>
        <span
          className="w-10 h-10 absolute transition-transform  flex justify-center items-center translate-x-0 dark:-translate-x-20"
          onClick={() => setTheme("dark")}
        >
          <BiMoon />
        </span>
      </div>
    </div>
  );
};

export default Floating;
