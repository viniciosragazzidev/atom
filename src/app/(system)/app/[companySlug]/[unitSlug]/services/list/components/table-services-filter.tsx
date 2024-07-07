"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiFilter, FiPlus, FiTag, FiX } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddService from "./add-service";
import FilterPopover from "../../../components/filter-popover";
import { constructUrl } from "@/lib/utils";
const TableServicesFilter = () => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "";
  const perPage = searchParams.get("perPage") || "";
  const f = searchParams.get("f") || "";
  const q = searchParams.get("q") || "";
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-3 items-center w-full ">
        <Input
          onChange={(e) =>
            router.push(
              `${path}?page=${page}&perPage=${perPage}${
                f || f.length > 0 ? f : ""
              }${e.target.value ? `&q=${e.target.value}` : ""}`
            )
          }
          placeholder="Pesquisar serviço"
          className="w-full max-w-xs"
        />
        <Button
          variant="outline"
          size={"sm"}
          className=" flex items-center text-sm gap-1"
        >
          <FiTag /> Tags
        </Button>

        <FilterPopover />

        {f.length > 0 && (
          <Button
            variant="ghost"
            size={"sm"}
            className=" opacity-55 flex items-center gap-1"
            onClick={() =>
              router.push(constructUrl({ path, f: "", page, perPage, q }))
            }
          >
            <FiX /> Limpar
          </Button>
        )}
      </div>

      <div className="flex gap-3 items-center w-full justify-end pr-3">
        <span className="text-sm text-muted-foreground">
          0 de 5 serviços selecionados
        </span>
        <AddService>
          {" "}
          <FiPlus />{" "}
        </AddService>
      </div>
    </div>
  );
};

export default TableServicesFilter;
