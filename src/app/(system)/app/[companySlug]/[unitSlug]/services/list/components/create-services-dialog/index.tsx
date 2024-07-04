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
import { brStates, statusData } from "@/lib/constants";

import { useEffect, useState } from "react";
import { BiPaperPlane, BiSearch, BiUser } from "react-icons/bi";
import { toast } from "sonner";
import {
  ClientServiceSchema,
  ServiceDataSchema,
} from "./services-dialog-schema";
import ErrorMessage from "@/components/error-message";
import { CircleAlert } from "lucide-react";
import { sendOrder, updateOrder } from "./actions/action";
import { PiSpinner } from "react-icons/pi";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { errorFieldVerify } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiEye, FiPlus } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/app/(system)/components/status-badge";
import { Textarea } from "@/components/ui/textarea";
import FormCreateItem from "../form-create-item";
import { UnitOrderServiceItemsType, unitOrderServiceType } from "@/lib/@types";
import { useParams } from "next/navigation";
import db from "@/lib/services/db";
import {
  verifyIfDocumentClientOsExist,
  verifyIfEmailClientOsExist,
} from "@/lib/services/requisitions";

interface OrderServiceDialogProps {
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
  setOnOpenAlert: (value: boolean) => void;
  currentOs?: unitOrderServiceType;
  unitSlug?: string;
}
export function OrderServiceDialog({
  onOpen,
  setOnOpen,
  setOnOpenAlert,
  confirmClose,
  setConfirmClose,
  currentOs,
  unitSlug,
}: OrderServiceDialogProps) {
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
        <AlertDialogContent className="z-50 max-w-2xl">
          <ItemsData
            onOpen={onOpen}
            setOnOpen={setOnOpen}
            setOnOpenAlert={setOnOpenAlert}
            confirmClose={confirmClose}
            setConfirmClose={setConfirmClose}
            setIsMobile={setIsMobile}
            currentOs={currentOs}
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
              currentOs={currentOs}
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
  currentOs,
}: {
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
  setOnOpenAlert: (value: boolean) => void;
  setIsMobile: (value: boolean) => void;
  currentOs?: unitOrderServiceType;
}) {
  const params = useParams();
  const companySlug = params.companySlug as string;
  const unitSlug = params.unitSlug as string;
  const [currentStep, setCurrentStep] = useState(1);

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [numberAddress, setNumberAddress] = useState("");
  const [neighborhoodAddress, setNeighborhoodAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("RJ");
  const [zipCode, setZipCode] = useState("");
  const [osStatus, setOsStatus] = useState("Aberto");

  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<any>();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleNextStep = async () => {
    const data = {
      name,
      document,
      phone,
      email,

      street,
      numberAddress,
      neighborhoodAddress,
      city,
      state,
      zipCode,
    };
    if (currentStep === 1) {
      const verify = ClientServiceSchema.safeParse(data);
      if (verify.success) {
        const verifyIfEmailExist = await verifyIfEmailClientOsExist({
          companySlug,
          email,
          unitSlug,
        });
        const resultVerify = document !== verifyIfEmailExist?.document;
        if (verifyIfEmailExist && resultVerify) {
          console.log(verifyIfEmailExist);
          toast("Email já pertence ao outro cliente", {
            icon: <CircleAlert className="text-primary text-sm" />,
          });
          setErrors([
            {
              code: "too_small",
              minimum: 1,
              type: "string",
              inclusive: true,
              exact: false,
              message: "Email já pertence ao outro cliente",
              path: ["email"],
            },
          ]);
        } else {
          console.log(verifyIfEmailExist);

          setCurrentStep(2);
          setErrors([]);
        }
      } else {
        const error = verify.error.issues;
        toast("Faltam dados a serem preenchidos", {
          icon: <CircleAlert className="text-primary text-sm" />,
        });
        console.log(error);

        setErrors(error);
      }
    }
  };

  // ------------ Items Area --------------------

  const [openCreateItem, setOpenCreateItem] = useState(false);
  const [items, setItems] = useState<UnitOrderServiceItemsType[]>([]);
  const [currentItem, setCurrentItem] = useState<any>();
  // ==============END ITEMS AREA ===============

  const handleSubmit = async () => {
    const data = {
      status: osStatus,
      description,
    };
    const verify = ServiceDataSchema.safeParse(data);

    if (verify.success && items.length > 0) {
      const osData = {
        name,
        document,
        phone,
        email,
        street,
        numberAddress,
        neighborhoodAddress,
        city,
        state,
        zipCode,
        description,

        status: osStatus,
        items,
        unitSlug: unitSlug,
        companySlug: companySlug,
      };

      setSubmitLoading(true);
      if (!currentOs) {
        const result = await sendOrder(osData);
        if (result) {
          toast("Dados salvos com sucesso", {});
          resetFields();
          setSubmitLoading(false);
          setOnOpen(false);
        }
      } else {
        const result = await updateOrder(osData);
        if (result) {
          toast("Dados atualizados com sucesso", {});
          resetFields();
          setSubmitLoading(false);
          setOnOpen(false);
        }
      }
    } else {
      toast("Faltam dados a serem preenchidos", {
        icon: <CircleAlert className="text-primary text-sm" />,
      });
      setErrors(verify?.error?.issues);
    }
  };

  const resetFields = () => {
    setName("");
    setPhone("");
    setEmail("");
    setDocument("");
    setStreet("");
    setNumberAddress("");
    setNeighborhoodAddress("");
    setCity("");
    setState("RJ");
    setZipCode("");
    setOsStatus("Aguardando");
    setItems([]);
    setDescription("");
    setCurrentItem(null);
    setErrors([]);
  };

  // -------------- MODE  VIEW / EDIT =====================

  useEffect(() => {
    if (currentOs) {
      setOsStatus(currentOs.status);
      setDescription(currentOs.description);
      setItems(currentOs.UnitOrderServiceItems || []);
      setName(currentOs.UnitOrderServiceClient?.name || "");
      setDocument(currentOs.UnitOrderServiceClient?.document || "");
      setPhone(currentOs.UnitOrderServiceClient?.phone || "");
      setEmail(currentOs.UnitOrderServiceClient?.email || "");
      setStreet(currentOs.UnitOrderServiceClient?.street || "");
      setNumberAddress(currentOs.UnitOrderServiceClient?.numberAddress || "");
      setNeighborhoodAddress(
        currentOs.UnitOrderServiceClient?.neighborhoodAddress || ""
      );
      setCity(currentOs.UnitOrderServiceClient?.city || "");
      setState(currentOs.UnitOrderServiceClient?.state || "RJ");
      setOsStatus(currentOs.status);
      setZipCode(currentOs.UnitOrderServiceClient?.zipCode || "");
    }
    //console.log(currentOs?.status);
  }, [currentOs]);

  // ================= END MODE VIEW / EDIT =================

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

  const setDataCurrentClient = ({ result }: { result: any }) => {
    console.log(result);

    setName(result.name);
    setEmail(result.email || "");
    setPhone(result.phone);
    setDocument(result.document);
    setStreet(result.street);
    setNumberAddress(result.numberAddress);
    setNeighborhoodAddress(result.neighborhoodAddress);
    setCity(result.city);
    setState(result.state);
    setZipCode(result.zipCode);
  };
  const verifyIfDocumentClientOsExistFunc = async () => {
    if (document.length === 11) {
      const result = await verifyIfDocumentClientOsExist({
        companySlug,
        document,
        unitSlug,
      });

      if (result) {
        toast("Esse cliente ja existe no sistema! Importando...", {
          icon: <CircleAlert className="text-primary text-sm" />,
        });
        setDataCurrentClient({ result });
      } else {
        toast("Esse cliente não existe no sistema!", {
          icon: <CircleAlert className="text-primary text-sm" />,
        });
      }
    }
  };
  useEffect(() => {
    if (!currentOs) {
      verifyIfDocumentClientOsExistFunc();
    }
  }, [document]);

  return (
    <>
      <FormCreateItem
        items={items}
        openCreateItem={openCreateItem}
        setCurrentItem={setCurrentItem}
        setItems={setItems}
        setOpenCreateItem={setOpenCreateItem}
        currentItem={currentItem}
      />
      <div className="text-start flex flex-col gap-1 max-sm:pb-5 max-sm:pt-10">
        <h2 className="flex items-center gap-1 text-lg font-semibold">
          {currentStep === 1 ? (
            <>
              {" "}
              <span>
                <BiUser className="text-primary" />
              </span>
              Informações do Cliente
            </>
          ) : (
            <>
              <span>
                <BiPaperPlane className="text-primary" />
              </span>{" "}
              Informações da Ordem
            </>
          )}
        </h2>
        <p className="text-sm text-muted-foreground">
          Preencha os dados nescessários para a criação da Ordem
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
                  Nome do Cliente
                </Label>
                <Input
                  id="name"
                  placeholder="Nome do cliente"
                  required
                  value={name}
                  className={`${
                    errorFieldVerify({
                      errors,
                      name: "name",
                    })
                      ? "border-red-500 animate-shake "
                      : ""
                  }`}
                  onChange={(e) => setName(e.target.value)}
                />
                {/* <ErrorMessage errors={errors} name="name" /> */}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm" htmlFor="document">
                  CPF
                </Label>
                <Input
                  id="document"
                  placeholder="000.000.000-00"
                  required
                  className={`${
                    errorFieldVerify({
                      errors,
                      name: "document",
                    })
                      ? "border-red-500 animate-shake "
                      : ""
                  }`}
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                />
                {/* <ErrorMessage errors={errors} name="document" /> */}
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
                  className={`${
                    errorFieldVerify({
                      errors,
                      name: "phone",
                    })
                      ? "border-red-500 animate-shake "
                      : ""
                  }`}
                />
                {/* <ErrorMessage errors={errors} name="phone" /> */}
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
                  className={`${
                    errorFieldVerify({
                      errors,
                      name: "email",
                    })
                      ? "border-red-500 animate-shake "
                      : ""
                  }`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <ErrorMessage errors={errors} name="email" /> */}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="flex flex-col gap-2 col-span-3">
                <Label className="text-sm" htmlFor="street">
                  Rua
                </Label>
                <Input
                  id="street"
                  placeholder="Rua"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={`${
                    errorFieldVerify({
                      errors,
                      name: "street",
                    })
                      ? "border-red-500 animate-shake "
                      : ""
                  }`}
                />
                {/* <ErrorMessage errors={errors} name="street" /> */}
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                <Label className="text-sm" htmlFor="numberAddress">
                  N°
                </Label>
                <Input
                  id="numberAddress"
                  type="string"
                  placeholder="000"
                  className={`${
                    errorFieldVerify({
                      errors,
                      name: "numberAddress",
                    })
                      ? "border-red-500 animate-shake "
                      : ""
                  }`}
                  value={numberAddress}
                  onChange={(e) => setNumberAddress(e.target.value)}
                />
                {/* <ErrorMessage errors={errors} name="numberAddress" /> */}
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <Label className="text-sm" htmlFor="neighborhoodAddress">
                  Bairro
                </Label>
                <Input
                  id="neighborhoodAddress"
                  type="string"
                  placeholder="000"
                  className={`${
                    errorFieldVerify({
                      errors,
                      name: "neighborhoodAddress",
                    })
                      ? "border-red-500 animate-shake "
                      : ""
                  }`}
                  value={neighborhoodAddress}
                  onChange={(e) => setNeighborhoodAddress(e.target.value)}
                />
                {/* <ErrorMessage errors={errors} name="neighborhoodAddress" /> */}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="flex flex-col gap-2 col-span-2">
                <Label className="text-sm" htmlFor="zipCode">
                  CEP
                </Label>
                <Input
                  id="zipCode"
                  placeholder="00000-000"
                  value={zipCode}
                  className={`${
                    errorFieldVerify({
                      errors,
                      name: "zipCode",
                    })
                      ? "border-red-500 animate-shake "
                      : ""
                  }`}
                  onChange={(e) => setZipCode(e.target.value)}
                />
                {/* <ErrorMessage errors={errors} name="zipCode" /> */}
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <Label className="text-sm" htmlFor="city">
                  Cidade
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Cidade"
                  value={city}
                  className={`${
                    errorFieldVerify({
                      errors,
                      name: "city",
                    })
                      ? "border-red-500 animate-shake "
                      : ""
                  }`}
                  onChange={(e) => setCity(e.target.value)}
                />
                {/* <ErrorMessage errors={errors} name="city" /> */}
              </div>
              <div className="flex w-full flex-col gap-2 col-span-2">
                <Label className="text-sm" htmlFor="state">
                  Estado
                </Label>
                <Select
                  onValueChange={setState}
                  defaultValue="RJ"
                  value={state}
                  name="state"
                  required
                >
                  <SelectTrigger className="w-full">
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
            </div>
          </div>

          <div
            className={`flex flex-col gap-4 ${
              currentStep !== 1
                ? "relative opacity-100 translate-x-0"
                : "opacity-0 absolute translate-x-[1000%]"
            } transition-all`}
          >
            <div className="flex flex-col gap-2 relative">
              <div className="flex items-center">
                <Label className="text-sm" htmlFor="unitsListWithAccess">
                  Itens da Ordem de Serviço
                </Label>

                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setOpenCreateItem(true);
                  }}
                  className="ml-auto"
                  variant="outline"
                  size="sm"
                >
                  <FiPlus />
                </Button>
              </div>

              <ScrollArea
                className={`w-full h-48 ${currentStep === 1 ? "hidden" : ""}`}
              >
                {items.length > 0 ? (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Marca</TableHead>
                          <TableHead>Modelo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map(
                          (item: UnitOrderServiceItemsType, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.brand}</TableCell>
                              <TableCell>{item.model}</TableCell>
                              <TableCell>
                                <StatusBadge status={item.status} />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  type="button"
                                  onClick={() => {
                                    setCurrentItem(item);
                                    setOpenCreateItem(true);
                                  }}
                                  size={"sm"}
                                >
                                  <FiEye className="cursor-pointer hover:text-primary hover:scale-95 transition-all" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </>
                ) : (
                  <>
                    <div className="w-full h-full min-h-40 flex items-center justify-center">
                      <p className="text-center text-sm">
                        Nenhum item encontrado
                      </p>
                    </div>
                  </>
                )}
              </ScrollArea>
              <ErrorMessage errors={errors} name="unitsListWithAccess" />
            </div>
            <div className="grid grid-cols-4 gap-3 px-2">
              <div className="flex flex-col col-span-3 gap-2">
                <Label className="text-sm" htmlFor="description">
                  Descricão
                </Label>

                <Textarea
                  id="description"
                  placeholder="Descricão"
                  value={description}
                  className={`resize-none ${
                    errorFieldVerify({
                      errors,
                      name: "description",
                    })
                      ? "border-red-500 animate-shake "
                      : ""
                  }`}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <ErrorMessage errors={errors} name="description" />
              </div>

              <div className="flex flex-col col-span-1 gap-2">
                <Label className="text-sm" htmlFor="status">
                  Status
                </Label>
                <Select
                  onValueChange={setOsStatus}
                  defaultValue="Aberto"
                  value={osStatus}
                  name="status"
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statusData.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
