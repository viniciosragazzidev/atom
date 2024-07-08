import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import React from "react";
import { FiFilter } from "react-icons/fi";
import { usePathname, useSearchParams } from "next/navigation";
import { constructUrl } from "@/lib/utils";

const FilterPopover = () => {
  const path = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "";
  const perPage = searchParams.get("perPage") || "";
  const q = searchParams.get("q") || "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size={"sm"}
          variant="default"
          className=" flex items-center gap-1"
        >
          <FiFilter /> Filtros
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-min  min-w-44 p-0 flex flex-col   text-sm">
        <DropdownMenuItem>
          <Link
            href={constructUrl({ path, f: "", q, page, perPage })}
            className="cursor-pointer w-full px-2 hover:bg-secondary py-2  rounded-md"
          >
            Todos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={constructUrl({ path, f: "Aberto", q, page, perPage })}
            className="cursor-pointer w-full px-2 hover:bg-secondary py-2  rounded-md"
          >
            Abertos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={constructUrl({ path, f: "Fechado", q, page, perPage })}
            className="cursor-pointer w-full px-2 hover:bg-secondary py-2  rounded-md"
          >
            Fechados
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={constructUrl({ path, f: "Pronto", q, page, perPage })}
            className="cursor-pointer w-full px-2 hover:bg-secondary py-2  rounded-md"
          >
            Prontos
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterPopover;
