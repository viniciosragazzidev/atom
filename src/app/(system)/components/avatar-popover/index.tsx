"use server";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { auth, signOut } from "../../../../../auth";

const AvatarPopover = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-52   mr-4">
        <ul className="flex flex-col w-full gap-2">
          <li className="cursor-pointer w-full px-2 hover:bg-secondary py-1 rounded-full">
            <span className="flex items-center  gap-3">
              <FiUser className="text-primary text-lg" /> Perfil
            </span>
          </li>
          <li className="cursor-pointer w-full px-2 hover:bg-secondary py-1 rounded-full">
            <span className="flex items-center  gap-3">
              <FiSettings className="text-primary text-lg" /> Ajustes
            </span>
          </li>
          <li className="cursor-pointer w-full px-2 hover:bg-secondary py-1 rounded-full">
            <form
              action={async () => {
                "use server";
                await signOut({ redirect: true, redirectTo: "/" });
              }}
            >
              <button className="flex items-center  gap-3">
                <FiLogOut className="text-primary text-lg" /> Sair da conta
              </button>
            </form>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarPopover;
