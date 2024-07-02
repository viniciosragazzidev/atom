"use server";
import React from "react";

import TableServices from "./components/TableServices";
import TableServicesPagination from "./components/table-services-pagination";
import TableServicesFilter from "./components/table-services-filter";
import { unitOrderServiceType } from "@/lib/@types";
import { getCompanyAndUnits } from "@/app/(system)/components/select-unit/action";
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
  const units = (await getCompanyAndUnits()).units;
  const unit = units?.find((unit: any) => unit.slug === params.unitSlug);

  const fetchServices = await getUnitOrdersServices(unit?.id || "");
  const services: unitOrderServiceType[] = fetchServices?.orders;

  const page = searchParams["page"] || 1;
  const perPage = searchParams["perPage"] || 5;
  const search = searchParams["q"] || "";

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);
  const bySearch = services?.filter(
    (service: unitOrderServiceType) =>
      service.UnitOrderServiceClient?.name &&
      service.UnitOrderServiceClient.name.includes(String(search).toLowerCase())
  );
  const entries = bySearch?.slice(start, end);
  return (
    <main>
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Serviços</h1>
        <TableServicesFilter />
      </header>

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
    </main>
  );
};

export default ListServices;
