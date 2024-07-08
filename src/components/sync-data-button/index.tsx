"use client";
import React from "react";
import { Button } from "../ui/button";
import { BiSync } from "react-icons/bi";
import { revalidateCustomTag } from "./action";

const SyncDataButton = ({ tag }: { tag: string }) => {
  const revalidate = async ({ tag }: { tag: string }) => {
    await revalidateCustomTag({ tag });
  };
  return (
    <Button
      onClick={() => revalidate({ tag })}
      variant="outline"
      size={"sm"}
      className=" flex items-center gap-1"
    >
      <BiSync /> Atualizar
    </Button>
  );
};

export default SyncDataButton;
