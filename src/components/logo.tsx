import React from "react";
import { PiAtomBold } from "react-icons/pi";
import light from "../images/light.png";
import dark from "../images/dark.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
const Logo = ({ className }: { className?: string }) => {
  return (
    // <span className="text-2xl text-[hsl(222, 47%, 11%)] dark:text-white   flex items-center  tracking-wide gap-2">
    //   <PiAtomBold className="text-blue-400 text-xl" /> Atom
    // </span>
    <>
      <div
        className={cn(
          `hidden dark:block  w-full max-w-28 relative ${className}`
        )}
      >
        <Image src={light} alt="logo" className="w-full h-full" />
      </div>

      <div
        className={cn(
          `block dark:hidden w-full max-w-28 relative ${className}`
        )}
      >
        <Image src={dark} alt="logo" className="w-full h-full" />
      </div>
    </>
  );
};

export default Logo;
