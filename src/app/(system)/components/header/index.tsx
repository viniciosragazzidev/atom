"use server";
import Logo from "@/components/logo";
import React from "react";
import { SelectUnitAndAccess } from "../select-unit";
import { BiBell, BiCog } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppNavbarHeader = ({ companyAndUnits }: { companyAndUnits: any }) => {
  return (
    <div className="w-full flex justify-center container  top-0 left-0 py-6">
      <header className="w-full h-full flex justify-between items-center">
        <Logo />

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <SelectUnitAndAccess companyAndUnits={companyAndUnits} />
          </span>
          <div className="flex">
            <Button variant={"ghost"}>
              <BiCog className="text-lg" />
            </Button>
            <Button variant={"ghost"}>
              <BiBell className="text-lg" />
            </Button>
          </div>
          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
    </div>
  );
};

export default AppNavbarHeader;
