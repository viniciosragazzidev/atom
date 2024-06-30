import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brStates } from "@/lib/constants";

import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { toast } from "sonner";
import {
  FirstUnitCreateSchema,
  SecondUnitCreateSchema,
} from "./unit-dialog-schema";
import ErrorMessage from "@/components/error-message";
import { CircleAlert } from "lucide-react";
import { sendProfile } from "./actions/action";
import { PiSpinner } from "react-icons/pi";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface CreateUnitDialogProps {
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
  setOnOpenAlert: (value: boolean) => void;
}
export function CreateUnitDialog({
  onOpen,
  setOnOpen,
  setOnOpenAlert,
  confirmClose,
  setConfirmClose,
}: CreateUnitDialogProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const getIfIsMobile = window.matchMedia("(max-width: 640px)");
      //console.log(getIfIsMobile.matches);

      setIsMobile(getIfIsMobile.matches);
    });
  }, []);

  return (
    <>
      <AlertDialog
        open={onOpen && !isMobile}
        onOpenChange={!isMobile ? setOnOpen : undefined}
      >
        <AlertDialogContent className="z-50">
          <ItemsData
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            setOnOpenAlert={setOnOpenAlert}
            confirmClose={confirmClose}
            setConfirmClose={setConfirmClose}
            setIsMobile={setIsMobile}
          />
        </AlertDialogContent>
      </AlertDialog>

      <div className=" sm:hidden">
        <Drawer
          open={onOpen && isMobile}
          onOpenChange={isMobile ? setOnOpen : undefined}
        >
          <DrawerContent className="w-full  px-10 flex sm:hidden flex-col">
            <ItemsData
              onOpen={onOpen}
              setOnOpen={setOnOpen}
              setOnOpenAlert={setOnOpenAlert}
              confirmClose={confirmClose}
              setConfirmClose={setConfirmClose}
              setIsMobile={setIsMobile}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export function ItemsData({
  onOpen,
  setOnOpen,
  confirmClose,
  setConfirmClose,
  setOnOpenAlert,
  setIsMobile,
}: {
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
  setOnOpenAlert: (value: boolean) => void;
  setIsMobile: (value: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userManagerId, setuserManagerId] = useState("");

  const [street, setStreet] = useState("");
  const [numberAddress, setNumberAddress] = useState("");
  const [neighborhoodAddress, setNeighborhoodAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [errors, setErrors] = useState<any>();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleNextStep = () => {
    const data = {
      name,
      phone,
      email,
      userManagerId,
    };
    if (currentStep === 1) {
      const verify = FirstUnitCreateSchema.safeParse(data);
      if (verify.success) {
        setCurrentStep(2);
        setErrors([]);
      } else {
        const error = verify.error.issues;
        toast("Faltam dados a serem preenchidos", {
          icon: <CircleAlert className="text-primary text-sm" />,
        });

        setErrors(error);
      }
    }
  };

  const handleSubmit = async () => {
    const data = {
      street,
      numberAddress,
      neighborhoodAddress,
      city,
      state,
      zipCode,
    };
    const verify = SecondUnitCreateSchema.safeParse(data);

    if (verify.success) {
      const items = {
        name,
        phone,
        email,
        userManagerId,
        street,
        numberAddress,
        neighborhoodAddress,
        city,
        state,
        zipCode,
      };

      setSubmitLoading(true);
      const result = await sendProfile(items);
      if (result) {
        toast("Dados salvos com sucesso", {});
        resetFields();
        setSubmitLoading(false);
        setOnOpen(false);
      }
    } else {
      toast("Faltam dados a serem preenchidos", {
        icon: <CircleAlert className="text-primary text-sm" />,
      });
      setErrors(verify.error.issues);
    }
  };

  const resetFields = () => {
    setName("");
    setPhone("");
    setEmail("");
    setuserManagerId("");

    setStreet("");
    setNumberAddress("");
    setNeighborhoodAddress("");
    setCity("");
    setState("");
    setZipCode("");

    setErrors([]);
  };

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
      setErrors([]);
    };
  }, [confirmClose, onOpen]);

  return (
    <>
      <div className="text-start flex flex-col gap-1 max-sm:pb-5 max-sm:pt-10">
        <h2 className="flex items-center gap-1 text-lg font-semibold">
          <span>
            <BiUser className="text-primary" />
          </span>{" "}
          Informações da Unidade
        </h2>
        <p className="text-sm text-muted-foreground">
          Preencha os dados abaixo para completar o cadastro da unidade.
        </p>
      </div>

      <div className="w-full">
        <form className="overflow-hidden relative" action="">
          <div
            className={`flex flex-col gap-4 ${
              currentStep === 1
                ? "relative opacity-100 translate-x-0"
                : "opacity-0 absolute translate-x-[-100%]"
            } transition-all`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="name">
                  Nome da Unidade
                </Label>
                <Input
                  id="name"
                  placeholder="Nome da Unidade"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <ErrorMessage errors={errors} name="name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="userManagerId">
                  Gerente da Unidade
                </Label>
                <Input
                  id="userManagerId"
                  placeholder="Gerente"
                  required
                  value={userManagerId}
                  onChange={(e) => setuserManagerId(e.target.value)}
                />
                <ErrorMessage errors={errors} name="userManagerId" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="phone">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <ErrorMessage errors={errors} name="phone" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <ErrorMessage errors={errors} name="email" />
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col gap-4 ${
              currentStep !== 1
                ? "relative opacity-100 translate-x-0"
                : "opacity-0 absolute translate-x-[100%]"
            } transition-all`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="street">
                  Rua
                </Label>
                <Input
                  id="street"
                  placeholder="Rua"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <ErrorMessage errors={errors} name="street" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="numberAddress">
                  Número
                </Label>
                <Input
                  id="numberAddress"
                  placeholder="Número"
                  required
                  value={numberAddress}
                  onChange={(e) => setNumberAddress(e.target.value)}
                />
                <ErrorMessage errors={errors} name="numberAddress" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="neighborhoodAddress">
                  Bairro
                </Label>
                <Input
                  id="neighborhoodAddress"
                  placeholder="Bairro"
                  required
                  value={neighborhoodAddress}
                  onChange={(e) => setNeighborhoodAddress(e.target.value)}
                />
                <ErrorMessage errors={errors} name="neighborhoodAddress" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="city">
                  Cidade
                </Label>
                <Input
                  id="city"
                  placeholder="Cidade"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <ErrorMessage errors={errors} name="city" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="state">
                  Estado
                </Label>
                <Select
                  onValueChange={setState}
                  value={state}
                  name="state"
                  required
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {brStates.map((states) => (
                        <SelectItem key={states} value={states}>
                          {states}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <ErrorMessage errors={errors} name="state" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="zipCode">
                  CEP
                </Label>
                <Input
                  id="zipCode"
                  placeholder="00000-000"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <ErrorMessage errors={errors} name="zipCode" />
              </div>
            </div>
          </div>
          <div className="py-5 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <div className="w-full flex justify-between items-center">
              <Button
                type="button"
                disabled={submitLoading}
                variant={"outline"}
                onClick={() => {
                  setOnOpenAlert(true);
                  //   setCurrentStep(1);
                }}
              >
                Cancelar
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  disabled={submitLoading}
                  className={`${currentStep !== 1 ? "block" : "hidden"}`}
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                  }}
                  variant={"ghost"}
                >
                  Voltar
                </Button>
                <Button
                  type="button"
                  disabled={submitLoading}
                  className={`${currentStep === 1 ? "block" : "hidden"}`}
                  onClick={handleNextStep}
                >
                  Próximo
                </Button>
                <Button
                  type="button"
                  disabled={submitLoading}
                  onClick={handleSubmit}
                  className={`${currentStep !== 1 ? "block" : "hidden"}`}
                >
                  {submitLoading ? (
                    <PiSpinner className="w-4 h-4 animate-spin " />
                  ) : (
                    "Concluir"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
