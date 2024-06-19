import React from "react";
import { PiAtomBold } from "react-icons/pi";

const Logo = () => {
  return (
    <span className="text-3xl text-[hsl(222, 47%, 11%)] dark:text-white font-bold flex items-center  tracking-wide">
      At
      <PiAtomBold className="text-blue-400 text-2xl" />m
    </span>
  );
};

export default Logo;
