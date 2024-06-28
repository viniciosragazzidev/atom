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
import { useEffect, useState } from "react";
import { BiEnvelope, BiSearch, BiUser, BiX } from "react-icons/bi";
import { toast } from "sonner";

import ErrorMessage from "@/components/error-message";
import { CircleAlert } from "lucide-react";
import { sendProfile } from "./actions/action";
import { PiSpinner } from "react-icons/pi";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  FirstEmployeeCompanyCreateSchema,
  SecondEmployeeCompanyCreateSchema,
} from "./company-user-dialog-schema";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CreateEmployeeCompanyDialogProps {
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
  setOnOpenAlert: (value: boolean) => void;
  unitsList: { id: string; name: string; slug: string }[];
}

export type ListUnitWithAccessType = {
  id: string;
  name: string;
  slug: string;
  role: string;
};
export function CreateEmployeeCompanyDialog({
  onOpen,
  setOnOpen,
  setOnOpenAlert,
  confirmClose,
  setConfirmClose,
  unitsList,
}: CreateEmployeeCompanyDialogProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const getIfIsMobile = window.matchMedia("(max-width: 640px)");

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
            unitsList={unitsList}
          />
        </AlertDialogContent>
      </AlertDialog>

      <div className="sm:hidden">
        <Drawer
          open={onOpen && isMobile}
          onOpenChange={isMobile ? setOnOpen : undefined}
        >
          <DrawerContent className="w-full px-10 flex sm:hidden flex-col">
            <ItemsData
              onOpen={onOpen}
              setOnOpen={setOnOpen}
              setOnOpenAlert={setOnOpenAlert}
              confirmClose={confirmClose}
              setConfirmClose={setConfirmClose}
              setIsMobile={setIsMobile}
              unitsList={unitsList}
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
  unitsList,
}: {
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
  confirmClose: boolean;
  setConfirmClose: (value: boolean) => void;
  setOnOpenAlert: (value: boolean) => void;
  setIsMobile: (value: boolean) => void;
  unitsList: { id: string; name: string; slug: string }[];
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [accessPassword, setAccessPassword] = useState("");

  const [search, setSearch] = useState<string>("");
  const [unitsListWithAccess, setUnitsListWithAccess] = useState<
    ListUnitWithAccessType[]
  >([]);

  const [errors, setErrors] = useState<any>();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleNextStep = () => {
    const data = {
      name,
      phone,
      email,
      accessPassword,
    };
    if (currentStep === 1) {
      const verify = FirstEmployeeCompanyCreateSchema.safeParse(data);
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
      unitsListWithAccess,
    };
    const verify = SecondEmployeeCompanyCreateSchema.safeParse(data);

    if (verify.success) {
      const items = {
        name,
        phone,
        email,
        accessPassword,
        unitsListWithAccess,
      };

      setSubmitLoading(true);
      const result = await sendProfile(items);
      if (result) {
        toast("Dados salvos com sucesso", {});
        resetFields();
        setSubmitLoading(false);
        setCurrentStep(3);
        // setOnOpen(false);
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
    setAccessPassword("");
    setUnitsListWithAccess([]);
    setErrors([]);
  };

  const handleAddOrRemoveInListByAccess = (unit: any, isChecked: boolean) => {
    const listWithAccess = [...unitsListWithAccess];
    if (isChecked) {
      listWithAccess.push({ ...unit, role: "user" });
      toast(`Acesso ao ${unit.name} adicionado com sucesso`, {});
    } else {
      const index = listWithAccess.findIndex((item) => item.id === unit.id);
      listWithAccess.splice(index, 1);
      toast(`Acesso ao ${unit.name} removido com sucesso`, {});
    }
    setUnitsListWithAccess(listWithAccess);
  };

  const handleAddRoleInUnitByListWithAccess = (unit: any, role: string) => {
    const listWithAccess = [...unitsListWithAccess];
    const index = listWithAccess.findIndex((item) => item.id === unit.id);
    listWithAccess[index].role = role;
    setUnitsListWithAccess(listWithAccess);
  };

  const handleSelectAll = (isChecked: boolean) => {
    const a = unitsList.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    const unitsListAll = a.map((item) => ({
      ...item,
      role: "user",
    }));
    if (isChecked) {
      setUnitsListWithAccess(unitsListAll);
      toast(
        `Acesso às ${unitsListAll.length} unidades listadas selecionados com sucesso`,
        {}
      );
    } else {
      const remainingUnits = unitsList
        .filter((item) => !unitsListAll.some((unit) => unit.id === item.id))
        .map((item) => ({
          ...item,
          role: "user",
        }));
      setUnitsListWithAccess(remainingUnits);

      toast(
        `Acesso às ${unitsListAll.length} unidades listadas removido com sucesso`,
        {}
      );
    }
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
      {currentStep !== 3 ? (
        <>
          <div className="text-start flex flex-col gap-1 max-sm:pb-5 max-sm:pt-10">
            <h2 className="flex items-center gap-1 text-lg font-semibold">
              <span>
                <BiUser className="text-primary" />
              </span>{" "}
              Informações do Usuário
            </h2>
            <p className="text-sm text-muted-foreground">
              Preencha os dados abaixo para adicionar o novo usuário.
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
                      Nome do Usuário
                    </Label>
                    <Input
                      id="name"
                      placeholder="Nome do Usuário"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <ErrorMessage errors={errors} name="name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm" htmlFor="accessPassword">
                      Senha de Acesso
                    </Label>
                    <Input
                      id="accessPassword"
                      placeholder="Senha de Acesso"
                      required
                      type="password"
                      value={accessPassword}
                      onChange={(e) => setAccessPassword(e.target.value)}
                    />
                    <ErrorMessage errors={errors} name="accessPassword" />
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
                <div className="flex flex-col gap-2 relative">
                  <Label className="text-sm" htmlFor="unitsListWithAccess">
                    Unidades com Acesso
                  </Label>

                  <div
                    className={`${currentStep === 1 ? "hidden" : ""} relative`}
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <BiSearch />
                    </span>
                    <Input
                      type="text"
                      placeholder="Pesquisar por Unidade"
                      className="pl-9"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <ScrollArea
                    className={`w-full h-32 ${
                      currentStep === 1 ? "hidden" : ""
                    }`}
                  >
                    <div className=" w-full">
                      <table className="w-full">
                        <thead className="w-full ">
                          <tr className="w-full text-sm text-left">
                            <th>
                              <input
                                onChange={(e) =>
                                  handleSelectAll(e.target.checked)
                                }
                                type="checkbox"
                                checked={
                                  unitsListWithAccess.length ===
                                  unitsList.length
                                }
                              />
                            </th>
                            <th>Unidade</th>
                            <th>Cargo</th>
                          </tr>
                        </thead>

                        <tbody>
                          {unitsList
                            .filter((u: any) =>
                              String(u.name)
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            )
                            .map((unit: any, index: number) => (
                              <tr className="w-full text-sm" key={index}>
                                <td>
                                  <input
                                    className="cursor-pointer"
                                    id={`${unit.name}-${index}`}
                                    name={`${unit.name}-${index}`}
                                    checked={
                                      unitsListWithAccess.filter(
                                        (u: any) => u.id === unit.id
                                      ).length > 0
                                    }
                                    onChange={(e) =>
                                      handleAddOrRemoveInListByAccess(
                                        unit,
                                        e.target.checked
                                      )
                                    }
                                    type="checkbox"
                                  />{" "}
                                </td>
                                <td>
                                  <label
                                    className="cursor-pointer"
                                    htmlFor={`${unit.name}-${index}`}
                                  >
                                    {unit?.name}
                                  </label>
                                </td>
                                <td className="text-center  w-[200px]">
                                  <Select
                                    disabled={
                                      unitsListWithAccess.filter(
                                        (u: any) => u.id === unit.id
                                      ).length === 0
                                    }
                                    value={
                                      unitsListWithAccess.filter(
                                        (u: any) => u.id === unit.id
                                      )[0]?.role || ""
                                    }
                                    onValueChange={(e) => {
                                      handleAddRoleInUnitByListWithAccess(
                                        unit,
                                        e
                                      );
                                    }}
                                  >
                                    <SelectTrigger className="w-full ">
                                      <SelectValue placeholder="Selecione o cargo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="user">
                                          {" "}
                                          User{" "}
                                        </SelectItem>
                                        <SelectItem value="admin">
                                          {" "}
                                          Admin{" "}
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </ScrollArea>
                  <ErrorMessage errors={errors} name="unitsListWithAccess" />
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
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col pb-10">
          <div className="w-full flex justify-end items-center  ">
            <Button
              type="button"
              size={"icon"}
              variant={"outline"}
              onClick={() => {
                setOnOpen(false);
              }}
            >
              <BiX />
            </Button>
          </div>
          <span>
            <BiEnvelope className="text-6xl text-primary" />
          </span>
          <h1 className="text-lg font-medium">
            Solicitação enviada com sucesso!
          </h1>
          <p className="text-sm text-muted-foreground">
            Um e-mail de confirmação foi enviado para o email informado.
          </p>
        </div>
      )}
    </>
  );
}
