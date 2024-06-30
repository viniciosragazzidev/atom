"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PiAtom } from "react-icons/pi";
const TopStarsContainer = ({
  title,
  subtitle,
  buttonText,
  buttonIcon,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
}) => {
  return (
    <div className="w-full max-md:min-h-72 md:h-72  container flex justify-center ">
      <div className="w-full h-full overflow-hidden bg-slate-900 dark:bg-slate-900/20 flex items-center shadow-lg   text-slate-100 rounded-xl p-5 py-7 sm:p-10 ">
        <div id="stars" className="z-40"></div>
        <div id="stars2" className="z-40"></div>
        <div id="stars3" className="z-40"></div>
        <div className="flex max-w-lg flex-col gap-1 z-50">
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          <p className="text-sm text-slate-100/90">{subtitle}</p>
          <Button
            variant={"default"}
            size={"sm"}
            className="w-full mt-5  sm:max-w-[280px] flex items-center gap-1"
          >
            {buttonIcon} {buttonText}
          </Button>
        </div>
        <div className=" w-full flex justify-end md:pr-10 relative max-sm:hidden items-center z-50">
          <span className=" text-9xl md:text-[280px]  text-[#294269] ">
            <PiAtom />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopStarsContainer;
