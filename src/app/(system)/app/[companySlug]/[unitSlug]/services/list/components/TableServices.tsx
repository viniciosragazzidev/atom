import StatusBadge from "@/app/(system)/components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { FiEdit } from "react-icons/fi";
import AddService from "./add-service";
import { unitOrderServiceType } from "@/lib/@types";
import { formateDate } from "@/lib/data/company";

const TableServices = ({ entries }: { entries: unitOrderServiceType[] }) => {
  const tableHeaders = [
    "ID",
    "Cliente",
    "Equipamento(s)",
    "Status",
    "Data",
    "Valor",
    "",
  ];

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries?.map((entry: unitOrderServiceType, index: number) => (
          <TableRow key={index}>
            <TableCell>{entry.id}</TableCell>
            <TableCell>
              <div className="flex flex-col text-nowrap">
                <span className="font-bold">
                  {entry.UnitOrderServiceClient?.name || ""}
                </span>
                <span> {entry.UnitOrderServiceClient?.phone}</span>
              </div>
            </TableCell>
            <TableCell className="text-nowrap">
              <div className="flex flex-col">
                <span>
                  {entry.UnitOrderServiceItems![0].name}{" "}
                  {entry.UnitOrderServiceItems![0].brand}
                </span>
                <span> {entry.UnitOrderServiceItems![0].model} </span>
              </div>
            </TableCell>
            <TableCell>
              <StatusBadge status={entry.status} />
            </TableCell>
            <TableCell className="text-nowrap">
              {formateDate(new Date(entry.createdAt))}
            </TableCell>
            <TableCell>{entry.amountValue}</TableCell>
            <TableCell>
              {" "}
              <AddService currentOs={entry}>
                <FiEdit className="hover:text-primary cursor-pointer hover:scale-95 transition-all" />{" "}
              </AddService>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableServices;
