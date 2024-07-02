"use server";
import React, { Suspense } from "react";

import TableServices from "./components/TableServices";
import TableServicesPagination from "./components/table-services-pagination";
import TableServicesFilter from "./components/table-services-filter";
import { unitOrderServiceType } from "@/lib/@types";
import { getUnitOrdersServices } from "@/lib/services/requisitions";

const ListServices = async ({
  searchParams,
  params,
}: {
  params: { companySlug: string; unitSlug: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const page = searchParams["page"] || 1;
  const perPage = searchParams["perPage"] || 5;
  const search = searchParams["q"] || "";

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  const filters = `${search ? `&q=${search}` : ""}${
    page ? `&page=${page}` : ""
  }${perPage ? `&perPage=${perPage}` : ""}`;
  const fetchServices = await getUnitOrdersServices({
    unitSlug: params.unitSlug,
    filters: filters,
  });
  const services: unitOrderServiceType[] = fetchServices?.orders;

  const entries = services?.slice(start, end);
  return (
    <main>
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Serviços</h1>
        <TableServicesFilter />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        {entries?.length > 0 ? (
          <section className="flex flex-col gap-2 w-full   h-full px-2">
            <TableServices entries={entries} />

            <TableServicesPagination
              hasNextPage={end < services?.length}
              hasPreviousPage={start > 0}
              entries={services}
            />
          </section>
        ) : (
          <div className="w-full flex justify-center items-center min-h-96">
            <p className="text-center">Nenhum item encontrado</p>
          </div>
        )}
      </Suspense>
    </main>
  );
};

export default ListServices;
