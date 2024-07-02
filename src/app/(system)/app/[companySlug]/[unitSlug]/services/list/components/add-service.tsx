"use client";
import { DialogAlertConfirm } from "@/components/dialog-alert-confirm";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { OrderServiceDialog } from "./create-services-dialog";
import { unitOrderServiceType } from "@/lib/@types";
import { useParams, usePathname } from "next/navigation";

const AddService = ({
  children,
  currentOs,
}: {
  children: React.ReactNode;
  currentOs?: unitOrderServiceType;
}) => {
  const [confirmClose, setConfirmClose] = React.useState(false);
  const [onOpenModalAlert, setOnOpenModalAlert] = React.useState(false);
  const [onOpenModalCreateService, setOnOpenModalCreateService] =
    React.useState(false);

  const currentPathname = usePathname();
  const params = useParams();
  const unitSlug = params.unitSlug as string;

  return (
    <>
      <DialogAlertConfirm
        confirmClose={confirmClose}
        onOpenAlert={onOpenModalAlert}
        setConfirmClose={setConfirmClose}
        setOnOpenAlert={setOnOpenModalAlert}
      />
      <OrderServiceDialog
        onOpen={onOpenModalCreateService}
        confirmClose={confirmClose}
        setOnOpenAlert={setOnOpenModalAlert}
        setOnOpen={setOnOpenModalCreateService}
        setConfirmClose={setConfirmClose}
        currentOs={currentOs}
        unitSlug={unitSlug}
      />
      <Button
        onClick={() => setOnOpenModalCreateService(true)}
        size={"sm"}
        variant="outline"
        className=" flex items-center gap-1"
      >
        {children}
      </Button>
    </>
  );
};

export default AddService;
