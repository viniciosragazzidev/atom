"use server";
import Logo from "@/components/logo";
import React from "react";
import { SelectUnitAndAccess } from "../select-unit";
import { BiBell, BiCog } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppNavbarHeader = ({
  companyAndUnits,
  completeNav,
}: {
  completeNav?: boolean;
  companyAndUnits: any;
}) => {
  return (
    <div className="w-full flex justify-center max-md:px-2 md:container  top-0 left-0 py-6  ">
      <header className="w-full h-full flex justify-between items-center">
        {!completeNav && <Logo />}

        {/* {completeNav && (
          <nav className="">
            <ul className=" gap-7 max-lg:gap-5 items-center hidden md:flex">
              <li className="text-blue-400 font-semibold">
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="#">Serviços</a>
              </li>
              <li>
                <a href="#">Vendas</a>
              </li>
              <li>
                <a href="#">Financeiro</a>
              </li>

              <li>
                <a href="#">Atendimento</a>
              </li>
            </ul>
          </nav>
        )} */}

        <div className="flex items-center w-full justify-end gap-3 n">
          <span className="hidden sm:block ">
            <SelectUnitAndAccess companyAndUnits={companyAndUnits} />
          </span>
          <div className=" block">
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
