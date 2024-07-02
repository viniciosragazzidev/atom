"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

interface TableServicesPaginationProps {
  entries: any;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
const TableServicesPagination = ({
  entries,
  hasNextPage,
  hasPreviousPage,
}: TableServicesPaginationProps) => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("perPage") || "5";
  const q = searchParams.get("q") || "";

  return (
    <div className="flex justify-end w-full text-sm pr-16">
      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-2 w-full ">
          <span className="text-nowrap">Serviços por página</span>
          <Select
            onValueChange={(value) => router.push(`${path}?perPage=${value}`)}
            value={perPage}
            name="perPage"
          >
            <SelectTrigger className="w-full rounded-xl">
              <SelectValue placeholder="10" className="text-sm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <span className="text-nowrap">
          Pagina {entries?.current_page} de {Math.ceil(entries?.total_pages)}
        </span>

        <div className="flex items-center gap-2">
          <Button
            disabled={!hasPreviousPage}
            onClick={() =>
              router.push(
                `${path}?page=1&perPage=${perPage}${
                  q && q.length > 0 ? `&q=${q}` : q
                }`
              )
            }
            size={"sm"}
            className="px-2 py-0 "
            variant={"outline"}
          >
            <BsChevronDoubleLeft className="text-sm" />
          </Button>
          <Button
            disabled={!hasPreviousPage}
            onClick={() =>
              router.push(
                `${path}?page=${Number(page) - 1}&perPage=${perPage}${
                  q && q.length > 0 ? `&q=${q}` : q
                }`
              )
            }
            size={"sm"}
            className="px-2 py-0 "
            variant={"outline"}
          >
            <BsChevronLeft className="text-sm" />
          </Button>
          <Button
            disabled={!hasNextPage}
            onClick={() =>
              router.push(
                `${path}?page=${Number(page) + 1}&perPage=${perPage}${
                  q && q.length > 0 ? `&q=${q}` : q
                }`
              )
            }
            size={"sm"}
            className="px-2 py-0 "
            variant={"outline"}
          >
            <BsChevronRight className="text-sm" />
          </Button>
          <Button
            disabled={!hasNextPage}
            onClick={() =>
              router.push(
                `${path}?page=${Math.ceil(
                  entries?.total_pages
                )}&perPage=${perPage}${q && q.length > 0 ? `&q=${q}` : q}`
              )
            }
            size={"sm"}
            className="px-2 py-0 "
            variant={"outline"}
          >
            <BsChevronDoubleRight className="text-sm" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableServicesPagination;
