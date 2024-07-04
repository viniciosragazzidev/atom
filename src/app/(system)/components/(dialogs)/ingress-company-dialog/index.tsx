import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { BiBuilding, BiMailSend, BiUser } from "react-icons/bi";
import FormCreateCompany from "./form-create-company";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface IngressCompanyDialogProps {
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
  setOnOpenAlert: (value: boolean) => void;
}
export function IngressCompanyDialog({
  onOpen,
  setOnOpen,
  setOnOpenAlert,
  confirmClose,
  setConfirmClose,
}: IngressCompanyDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [modeIngress, setModeIngress] = useState<"create" | "invite">("create");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const getIfIsMobile = window.matchMedia("(max-width: 640px)");
      ////console.log(getIfIsMobile.matches);

      setIsMobile(getIfIsMobile.matches);
    });
  }, []);

  useEffect(() => {
    if (confirmClose) {
      setOnOpen(false);
    }
    const getIfIsMobile = window.matchMedia("(max-width: 640px)");
    if (getIfIsMobile.matches) {
      setIsMobile(true);
    }

    return () => {
      setConfirmClose(false);
      setCurrentStep(1);
    };
  }, [confirmClose, onOpen]);
  return (
    <>
      <AlertDialog
        open={onOpen && !isMobile}
        onOpenChange={!isMobile ? setOnOpen : undefined}
      >
        <AlertDialogContent className="w-full  px-6 hidden sm:flex flex-col">
          <ItemsData
            currentStep={currentStep}
            confirmClose={confirmClose}
            modeIngress={modeIngress}
            onOpen={onOpen}
            setConfirmClose={setConfirmClose}
            setCurrentStep={setCurrentStep}
            setModeIngress={setModeIngress}
            setOnOpen={setOnOpen}
            setOnOpenAlert={setOnOpenAlert}
          />
        </AlertDialogContent>
      </AlertDialog>
      <div className=" sm:hidden">
        <Drawer
          open={onOpen && isMobile}
          onOpenChange={isMobile ? setOnOpen : undefined}
        >
          <DrawerContent className="w-full  px-6 flex sm:hidden flex-col">
            <ItemsData
              currentStep={currentStep}
              confirmClose={confirmClose}
              modeIngress={modeIngress}
              onOpen={onOpen}
              setConfirmClose={setConfirmClose}
              setCurrentStep={setCurrentStep}
              setModeIngress={setModeIngress}
              setOnOpen={setOnOpen}
              setOnOpenAlert={setOnOpenAlert}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export function ItemsData({
  currentStep,
  modeIngress,
  setModeIngress,
  setCurrentStep,
  setOnOpenAlert,
  onOpen,
  setOnOpen,
  setConfirmClose,
  confirmClose,
}: {
  currentStep: number;
  modeIngress: "create" | "invite";
  setModeIngress: (value: "create" | "invite") => void;
  setCurrentStep: (value: number) => void;
  setOnOpenAlert: (value: boolean) => void;
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
}) {
  return (
    <div className="z-[1000] flex flex-col gap-4 ">
      <div className="text-start flex flex-col gap-1 max-sm:pb-5 max-sm:pt-10">
        <h2 className="flex items-center gap-1 text-lg font-semibold">
          <span>
            <BiUser className="text-primary" />
          </span>{" "}
          Informações da Empresa
        </h2>
        <p className="text-sm text-muted-foreground">
          {currentStep === 1
            ? "Escolha abaixo como você deseja ingressar na sua conta."
            : modeIngress === "create"
            ? "Informe abaixo as informações da sua empresa."
            : "Ingresse por convite em uma empresa já criada."}
        </p>
      </div>
      {currentStep === 1 ? (
        <div>
          <div className="w-full flex justify-between flex-col sm:flex-row gap-6 items-center">
            <Card
              onClick={() => {
                setModeIngress("create");
                setCurrentStep(2);
              }}
              className="w-full h-min flex-1 p-4 cursor-pointer hover:bg-secondary/30 transition-all"
            >
              <BiBuilding className="text-primary text-5xl mb-4" />
              <h3 className="text-lg font-bold">Criar empresa</h3>
              <p className="text-sm text-muted-foreground">
                Crie uma nova empresa e gerencie do zero.
              </p>
            </Card>
            <Card className="w-full h-min flex-1 p-4 cursor-pointer hover:bg-secondary/30 transition-all">
              <BiMailSend className="text-primary text-5xl mb-4" />
              <h3 className="text-lg font-bold">Entrar por convite</h3>
              <p className="text-sm text-muted-foreground">
                Ingresse por convite em uma empresa já criada.
              </p>
            </Card>
          </div>
          <div className="pt-5 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <div className="w-full flex justify-between items-center">
              <Button
                type="button"
                // disabled={submitLoading}
                variant={"outline"}
                onClick={() => {
                  setOnOpenAlert(true);
                  //   setCurrentStep(1);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {modeIngress === "create" ? (
            <FormCreateCompany
              setOnOpen={setOnOpen}
              onOpen={onOpen}
              setOnOpenAlert={setOnOpenAlert}
              confirmClose={confirmClose}
              setConfirmClose={setConfirmClose}
            />
          ) : (
            <>
              <h1>Invite</h1>
            </>
          )}
        </>
      )}
    </div>
  );
}
