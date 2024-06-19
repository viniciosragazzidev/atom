import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  FirstProfileDialogSchema,
  SecondProfileDialogSchema,
} from "./profile-dialog-schema";
import ErrorMessage from "@/components/error-message";
import { CircleAlert } from "lucide-react";
import { assert } from "console";
import { sendProfile } from "./actions/action";
import { PiSpinner } from "react-icons/pi";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface CompleteProfileDialogProps {
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
  setOnOpenAlert: (value: boolean) => void;
}
export function CompleteProfileDialog({
  onOpen,
  setOnOpen,
  setOnOpenAlert,
  confirmClose,
  setConfirmClose,
}: CompleteProfileDialogProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const getIfIsMobile = window.matchMedia("(max-width: 640px)");
      console.log(getIfIsMobile.matches);

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
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [errors, setErrors] = useState<any>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleNextStep = () => {
    const data = {
      name,
      surname,
      birthdate,
      gender,
      document,
    };
    if (currentStep === 1) {
      const verify = FirstProfileDialogSchema.safeParse(data);
      if (verify.success) {
        setCurrentStep(2);
        setErrors([]);
      } else {
        // setError(verify.error.issues || []);
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
      email,
      phone,
      address,
      city,
      state,
    };
    const verify = SecondProfileDialogSchema.safeParse(data);

    if (verify.success) {
      const itens = {
        name,
        surname,
        birthdate,
        gender,
        document,
        email,
        phone,
        address,
        city,
        state,
      };

      setSubmitLoading(true);
      const result = await sendProfile(itens);
      if (result) {
        toast("Dados salvos com sucesso", {});
        resetFields();
        setSubmitLoading(false);
        setOnOpen(false);
      }
    } else {
      const error = verify.error.issues;

      toast("Faltam dados a serem preenchidos", {
        icon: <CircleAlert className="text-primary text-sm" />,
      });
      setErrors(verify.error.issues);
    }
  };

  const resetFields = () => {
    setName("");
    setSurname("");
    setBirthdate("");
    setGender("");
    setDocument("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");

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
          Informações Pessoais
        </h2>
        <p className="text-sm text-muted-foreground">
          Preencha os dados abaixo para completar o seu cadastro.
        </p>
      </div>

      <div className="w-full">
        <form
          className="overflow-hidden relative"
          action=""
        >
          <div
            className={`flex flex-col gap-4 ${
              currentStep === 1
                ? "relative opacity-100 translate-x-0"
                : "opacity-0  absolute translate-x-[-100%]"
            } transition-all`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  className="text-sm"
                  htmlFor="name"
                >
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Nome"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  className="text-sm"
                  htmlFor="surname"
                >
                  Sobrenome
                </Label>
                <Input
                  id="surname"
                  placeholder="Sobrenome"
                  required
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <ErrorMessage
                  errors={errors}
                  name="surname"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  className="text-sm"
                  htmlFor="birthdate"
                >
                  Data de Nascimento
                </Label>
                <Input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
                <ErrorMessage
                  errors={errors}
                  name="birthdate"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  className="text-sm"
                  htmlFor="gender"
                >
                  Gênero
                </Label>
                <Select
                  name="gender"
                  value={gender}
                  onValueChange={setGender}
                >
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Feminino">Feminino</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <ErrorMessage
                  errors={errors}
                  name="gender"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  className="text-sm"
                  htmlFor="document"
                >
                  CPF
                </Label>
                <Input
                  id="document"
                  placeholder="000.000.000-00"
                  name="document"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                />

                <ErrorMessage
                  errors={errors}
                  name="document"
                />
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col gap-4 ${
              currentStep !== 1
                ? "relative opacity-100 translate-x-0"
                : "opacity-0  absolute translate-x-[100%]"
            } transition-all`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  className="text-sm"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  className="text-sm"
                  htmlFor="phone"
                >
                  Telefone
                </Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <ErrorMessage
                  errors={errors}
                  name="phone"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="flex flex-col col-span-3 gap-2">
                <Label
                  className="text-sm"
                  htmlFor="address"
                >
                  Endereço
                </Label>
                <Input
                  id="address"
                  placeholder="Endereço"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <ErrorMessage
                  errors={errors}
                  name="address"
                />
              </div>
              <div className="flex flex-col col-span-2 gap-2">
                <Label
                  className="text-sm"
                  htmlFor="city"
                >
                  Cidade
                </Label>
                <Input
                  id="city"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <ErrorMessage
                  errors={errors}
                  name="city"
                />
              </div>
              <div className="flex flex-col col-span-1 gap-2">
                <Label
                  className="text-sm"
                  htmlFor="state"
                >
                  Estado
                </Label>
                <Select
                  name="state"
                  value={state}
                  onValueChange={setState}
                >
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="RJ" />
                  </SelectTrigger>
                  <SelectContent
                    className="h-60"
                    side="top"
                  >
                    <SelectGroup>
                      {brStates.map((states) => (
                        <SelectItem
                          key={states}
                          value={states}
                        >
                          {states}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <ErrorMessage
                  errors={errors}
                  name="state"
                />
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
