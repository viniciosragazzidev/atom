"use client";

import React, { useEffect, useState } from "react";
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
import { areasDeAtuacao, brStates } from "@/lib/constants";

import { toast } from "sonner";
import {
  FirstCompanyDialogSchema,
  SecondProfileDialogSchema,
} from "./company-dialog-schema";
import { CircleAlert } from "lucide-react";
import { sendProfile } from "./actions/action";
import ErrorMessage from "@/components/error-message";
import { PiSpinner } from "react-icons/pi";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";

interface FormCreateCompanyProps {
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;

  setOnOpenAlert: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
}
const FormCreateCompany = ({
  onOpen,
  setOnOpen,
  setOnOpenAlert,
  confirmClose,
  setConfirmClose,
}: FormCreateCompanyProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [inscEstadual, setInscEstadual] = useState("");
  const [inscMunicipal, setInscMunicipal] = useState("");
  const [fundationDate, setFundationDate] = useState("");
  const [areasOfActivity, setAreasOfActivity] = useState<string>("");

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
      document,
      fundationDate,
      inscEstadual,
      inscMunicipal,
      areasOfActivity,
    };
    if (currentStep === 1) {
      const verify = FirstCompanyDialogSchema.safeParse(data);
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
        document,
        fundationDate,
        inscEstadual,
        inscMunicipal,
        areasOfActivity,
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
    setFundationDate("");
    setInscEstadual("");
    setInscMunicipal("");
    setAreasOfActivity(""); //
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

    return () => {
      setConfirmClose(false);
      setCurrentStep(1);
      setErrors([]);
    };
  }, [confirmClose, onOpen]);
  return (
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
                htmlFor="document"
              >
                CNPJ
              </Label>
              <Input
                id="document"
                placeholder="00.000.000/0000-00"
                required
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
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label
                className="text-sm"
                htmlFor="inscEstadual"
              >
                Inscrição Estadual
              </Label>
              <Input
                id="inscEstadual"
                placeholder="00.000.000/0000-00"
                required
                value={inscEstadual}
                onChange={(e) => setInscEstadual(e.target.value)}
              />
              <ErrorMessage
                errors={errors}
                name="inscEstadual"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                className="text-sm"
                htmlFor="inscMunicipal"
              >
                Inscrição Municipal
              </Label>
              <Input
                id="inscMunicipal"
                placeholder="00.000.000/0000-00"
                required
                name="inscMunicipal"
                value={inscMunicipal}
                onChange={(e) => setInscMunicipal(e.target.value)}
              />
              <ErrorMessage
                errors={errors}
                name="inscMunicipal"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col col-span-1 gap-2">
              <Label
                className="text-sm"
                htmlFor="fundationDate"
              >
                Data de Fundação
              </Label>
              <Input
                id="fundationDate"
                name="fundationDate"
                type="date"
                value={fundationDate}
                onChange={(e) => setFundationDate(e.target.value)}
              />
              <ErrorMessage
                errors={errors}
                name="fundationDate"
              />
            </div>
            <div className="flex flex-col col-span-1 gap-2">
              <Label
                className="text-sm"
                htmlFor="areasOfActivity"
              >
                Areas de Atuação
              </Label>
              <Select
                name="areasOfActivity"
                value={areasOfActivity}
                onValueChange={setAreasOfActivity}
              >
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent
                  className="h-60"
                  side="top"
                >
                  <SelectGroup>
                    {areasDeAtuacao.map((areas, index) => (
                      <SelectItem
                        key={index}
                        value={areas}
                      >
                        {areas}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <ErrorMessage
                errors={errors}
                name="areasOfActivity"
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

        <AlertDialogFooter className="pt-5 ">
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
        </AlertDialogFooter>
      </form>
    </div>
  );
};

export default FormCreateCompany;
