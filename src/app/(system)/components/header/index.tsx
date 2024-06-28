"use server";
import Logo from "@/components/logo";
import React from "react";
import { SelectUnitAndAccess } from "../select-unit";
import { BiBell, BiCog } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import AvatarPopover from "../avatar-popover";

const AppNavbarHeader = ({
  companyAndUnits,
  completeNav,
  params,
}: {
  completeNav?: boolean;
  companyAndUnits: any;
  params?: any;
}) => {
  return (
    <div className="w-full flex justify-center max-md:px-2 md:container  top-0 left-0 py-3  ">
      <header className="w-full h-full flex justify-between items-center">
        {!completeNav && <Logo />}

        <div
          className={`flex items-center w-full ${
            completeNav ? "justify-between" : "justify-end"
          }  gap-3`}
        >
          <span className="hidden sm:block ">
            <SelectUnitAndAccess
              params={params}
              companyAndUnits={companyAndUnits}
            />
          </span>
          <div className="flex gap-3">
            <div className=" block">
              <Button variant={"ghost"}>
                <BiCog className="text-lg" />
              </Button>
              <Button variant={"ghost"}>
                <BiBell className="text-lg" />
              </Button>
            </div>
            <AvatarPopover />
          </div>
        </div>
      </header>
    </div>
  );
};

export default AppNavbarHeader;
