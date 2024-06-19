"use client";

import React from "react";
import CardStepApp from "../card-step";
import { BiBuilding, BiUser } from "react-icons/bi";
import { CompleteProfileDialog } from "../../(dialogs)/complete-profile-dialog";
import { DialogAlertConfirm } from "@/components/dialog-alert-confirm";
import { IngressCompanyDialog } from "../../(dialogs)/ingress-company-dialog";

const CardsStepApp = () => {
  const [onOpenModalProfile, setOnOpenModalProfile] = React.useState(false);
  const [onOpenModalCompany, setOnOpenModalCompany] = React.useState(false);
  const [onOpenModalAlert, setOnOpenModalAlert] = React.useState(false);
  const [confirmClose, setConfirmClose] = React.useState(false);
  return (
    <div className="flex w-full justify-center container pb-10">
      <CompleteProfileDialog
        onOpen={onOpenModalProfile}
        confirmClose={confirmClose}
        setOnOpenAlert={setOnOpenModalAlert}
        setOnOpen={setOnOpenModalProfile}
        setConfirmClose={setConfirmClose}
      />

      <IngressCompanyDialog
        onOpen={onOpenModalCompany}
        confirmClose={confirmClose}
        setOnOpenAlert={setOnOpenModalAlert}
        setOnOpen={setOnOpenModalCompany}
        setConfirmClose={setConfirmClose}
      />

      <DialogAlertConfirm
        confirmClose={confirmClose}
        onOpenAlert={onOpenModalAlert}
        setConfirmClose={setConfirmClose}
        setOnOpenAlert={setOnOpenModalAlert}
      />
      <div className="flex flex-wrap max-sm:justify-start mt-5 sm:mt-8 w-full gap-5 ">
        <CardStepApp
          title="Complete seu perfil"
          buttonText="Completar Perfil"
          disabled={false}
          buttonIcon={<BiUser />}
          description="Complete seu perfil para ser possivel criar ou ingressar em uma empresa."
          completed={false}
          onOpenModal={onOpenModalProfile}
          setOnOpenModal={setOnOpenModalProfile}
        />
        <CardStepApp
          title="Ingresse em uma empresa"
          buttonText="Escolher método"
          disabled={true}
          buttonIcon={<BiBuilding />}
          description="Escolha o modo de ingresso. Crie ou una-se a uma já existente."
          completed={true}
          onOpenModal={onOpenModalCompany}
          setOnOpenModal={setOnOpenModalCompany}
        />
      </div>
    </div>
  );
};

export default CardsStepApp;
