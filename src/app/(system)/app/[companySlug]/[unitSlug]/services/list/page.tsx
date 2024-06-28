import React from "react";

import TableServices from "./components/TableServices";
import TableServicesPagination from "./components/table-services-pagination";
import TableServicesFilter from "./components/table-services-filter";
import { OSType } from "@/lib/@types";

const ListServices = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const services: OSType[] = [];
  const page = searchParams["page"] || 1;
  const perPage = searchParams["perPage"] || 5;
  const search = searchParams["q"] || "";

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);
  const bySearch = services.filter((service: OSType) =>
    service.name.toLowerCase().includes(String(search).toLowerCase())
  );
  const entries = bySearch.slice(start, end);
  return (
    <main>
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Serviços</h1>
        <TableServicesFilter />
      </header>

      <section className="flex flex-col gap-2 w-full   h-full px-2">
        <TableServices entries={entries} />

        <TableServicesPagination
          hasNextPage={end < services.length}
          hasPreviousPage={start > 0}
          entries={services}
        />
      </section>
    </main>
  );
};

export default ListServices;
