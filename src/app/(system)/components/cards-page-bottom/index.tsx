"use client";

import { DialogAlertConfirm } from "@/components/dialog-alert-confirm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BiBuilding, BiBuildingHouse } from "react-icons/bi";
import { BsFilePerson } from "react-icons/bs";
import { PiPerson } from "react-icons/pi";
import { CreateUnitDialog } from "../(dialogs)/create-unit-dialog";
import { CreateUserCompanyDialog } from "../(dialogs)/create-company-user";

const CardsPageBottom = ({ unitList }: any) => {
  const [onOpenModalCreateUnit, setOnOpenModalCreateUnit] =
    React.useState(false);
  const [onOpenModalCreateUser, setOnOpenModalCreateUser] =
    React.useState(false);
  const [onOpenModalAlert, setOnOpenModalAlert] = React.useState(false);
  const [confirmClose, setConfirmClose] = React.useState(false);
  return (
    <div className="flex w-full justify-center container pb-10 mt-5">
      <CreateUnitDialog
        onOpen={onOpenModalCreateUnit}
        confirmClose={confirmClose}
        setOnOpenAlert={setOnOpenModalAlert}
        setOnOpen={setOnOpenModalCreateUnit}
        setConfirmClose={setConfirmClose}
      />
      <CreateUserCompanyDialog
        onOpen={onOpenModalCreateUser}
        confirmClose={confirmClose}
        setOnOpenAlert={setOnOpenModalAlert}
        setOnOpen={setOnOpenModalCreateUser}
        setConfirmClose={setConfirmClose}
        unitsList={unitList}
      />
      <DialogAlertConfirm
        confirmClose={confirmClose}
        onOpenAlert={onOpenModalAlert}
        setConfirmClose={setConfirmClose}
        setOnOpenAlert={setOnOpenModalAlert}
      />
      <div className="flex flex-wrap max-sm:justify-start mt-5 sm:mt-8 w-full gap-14 ">
        <div className="flex  justify-center  gap-3 border p-5 rounded-xl w-full flex-1 border-border/50">
          <span className="">
            <BiBuilding className="text-3xl text-primary/60" />
          </span>
          <div className="flex flex-col">
            <h3 className=" font-semibold">Perfil da Empresa</h3>
            <p className="text-sm text-foreground/80">
              Gerencie as informaçoes em geral da sua empresa{" "}
            </p>

            <Button
              variant={"outline"}
              className="mt-5"
              size={"sm"}
            >
              {" "}
              Acessar Perfil
            </Button>
          </div>
        </div>
        <div className="flex  justify-center  gap-3 border p-5 rounded-xl w-full flex-1 border-border/50">
          <span className="">
            <BiBuildingHouse className="text-3xl text-primary/60" />
          </span>
          <div className="flex flex-col">
            <h3 className=" font-semibold">Nova Unidade</h3>
            <p className="text-sm text-foreground/80">
              Crie uma nova unidade ligada a sua empresa principal.
            </p>

            <Button
              onClick={() => {
                setOnOpenModalCreateUnit(!onOpenModalCreateUnit);
              }}
              variant={"outline"}
              className="mt-5"
              size={"sm"}
            >
              {" "}
              Criar Unidade
            </Button>
          </div>
        </div>
        <div className="flex  justify-center  gap-3 border p-5 rounded-xl w-full flex-1 border-border/50">
          <span className="">
            <PiPerson className="text-3xl text-primary/60" />
          </span>
          <div className="flex flex-col">
            <h3 className=" font-semibold">Novo Colaborador</h3>
            <p className="text-sm text-foreground/80">
              Adicione um novo colaborador que terá acesso ao sistema.
            </p>

            <Button
              variant={"outline"}
              onClick={() => {
                setOnOpenModalCreateUser(!onOpenModalCreateUser);
              }}
              className="mt-5"
              size={"sm"}
            >
              {" "}
              Adicionar
            </Button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default CardsPageBottom;
