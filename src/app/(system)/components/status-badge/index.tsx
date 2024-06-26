import { Badge } from "@/components/ui/badge";
import React from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiSend,
  FiTool,
  FiXCircle,
} from "react-icons/fi";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge variant="outline">
      <span className="flex items-center gap-1 py-1">
        <span className="text-base">
          {status === "Aberto" ? (
            <FiAlertCircle className="" />
          ) : status === "Entregue" ? (
            <FiSend className="text-teal-500" />
          ) : status === "Cancelado" ? (
            <FiXCircle className="text-red-500" />
          ) : status === "Iniciado" ? (
            <FiTool className="text-blue-500" />
          ) : status === "Aguardando" ? (
            <FiClock className="text-yellow-500" />
          ) : (
            <FiCheckCircle className="text-green-500" />
          )}
        </span>
        {status}
      </span>
    </Badge>
  );
};

export default StatusBadge;
