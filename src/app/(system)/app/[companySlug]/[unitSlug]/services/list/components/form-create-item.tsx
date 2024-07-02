"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { garaty_days, status_itens } from "@/shared/constants";
import { statusData } from "@/lib/constants";
import { BiPlus, BiTrash, BiX } from "react-icons/bi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React, { useCallback, useEffect } from "react";
import { UnitOrderServiceItemsType } from "@/lib/@types";

const OrderItem = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, "Nome não pode ser vazio"),
  brand: z.string().min(1, "A marca não pode ser vazio"),
  model: z.string().min(1, "O modelo não pode ser vazio"),
  numberSerie: z.string().optional(),
  color: z.string().optional(),
  status: z.string().optional(),
  occurrenceDescription: z.string().min(1, "A descrição não pode ser vazio"),
  acessories: z.array(z.string()).default([]).optional(),
  images: z.array(z.string()).default([]),
  coustAmountValue: z.string().optional(),
  amountValue: z.string().optional(),
  garantyDays: z.string().optional(),
  paymentType: z.string().optional().default("avista"),
  employeeId: z.string().optional(),
  finallyDescription: z.string().optional(),
  createdAt: z.date().default(new Date()),
  editedAt: z.date().optional(),
  unitOrderId: z.number().optional(),
});

export type orderItemType = z.infer<typeof OrderItem>;

const FormCreateItem = ({
  setItems,
  items,
  setOpenCreateItem,
  openCreateItem,
  currentItem,
  setCurrentItem,
}: {
  setItems: React.Dispatch<React.SetStateAction<any>>;
  items: UnitOrderServiceItemsType[];
  setOpenCreateItem: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateItem: boolean;
  currentItem?: any;
  setCurrentItem: any;
}) => {
  const [acessories, setAccessories] = React.useState<string[]>([]);
  const [currentAcessorie, setCurrentAcessorie] = React.useState<string>("");
  const [inputAcessoriesFocus, setInputAcessoriesFocus] = React.useState(false);
  const [status, setStatus] = React.useState<string>("PENDING");
  const [garantyDaysValue, setGarantyDaysValue] = React.useState<string>("30");
  const [employeeValue, setEmployeeValue] = React.useState<string>("");
  const [paymentTypeValue, setPaymentTypeValue] =
    React.useState<string>("avista");

  useEffect(() => {
    if (!openCreateItem) setAccessories([]);
  }, [openCreateItem]);

  const handleCreateItem = () => {
    if (acessories.includes(currentAcessorie)) {
      return;
    }
    if (currentAcessorie === "") return;
    setAccessories([currentAcessorie, ...acessories]);
    setCurrentAcessorie("");
  };

  if (inputAcessoriesFocus) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleCreateItem();
      }
    });
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<orderItemType>({
    resolver: zodResolver(OrderItem),
  });

  const reset = () => {
    setValue("name", "");
    setValue("brand", "");
    setValue("model", "");
    setValue("numberSerie", "");
    setValue("color", "");
    setValue("status", "");
    setValue("occurrenceDescription", "");
    setValue("acessories", []);
    setValue("images", []);
    setValue("coustAmountValue", "");
    setValue("amountValue", "");
    setValue("garantyDays", "");
    setValue("paymentType", "avista");
    setValue("employeeId", "");
    setValue("finallyDescription", "");

    setAccessories([]);
    setCurrentAcessorie("");
    setGarantyDaysValue("30");
    setPaymentTypeValue("avista");
    setEmployeeValue("");
    setStatus("PENDING");
  };
  const onSubmit = (data: any) => {
    const item = {
      ...data,
      id: data.id || Math.random().toString(36).slice(2),
      status: status,
      acessories: acessories,
      garantyDays: garantyDaysValue,
      paymentType: paymentTypeValue,
      employeeId: employeeValue,
    };

    if (!currentItem) {
      toast.success("🎉 Item criado com sucesso");
      setItems([...items, item]);
      reset();
      setOpenCreateItem(false);
    } else {
      const itemsCopy = [...items];
      const index = itemsCopy.findIndex((i: any) => i.id === currentItem.id);

      itemsCopy[index] = item;

      setItems(itemsCopy);
      reset();
      setOpenCreateItem(false);
      toast.success("🎉 Item alterado com sucesso");
    }
  };

  const onDelete = () => {
    const itemsCopy = [...items];
    const index = itemsCopy.findIndex((i: any) => i.id === currentItem?.id);
    itemsCopy.splice(index, 1);
    setItems(itemsCopy);
    setOpenCreateItem(false);
    reset();
    toast.success("🎉 Item excluído com sucesso");
  };

  const setItemsByCurrentItem = useCallback(() => {
    if (currentItem) {
      setValue("name", currentItem?.name);
      setValue("brand", currentItem?.brand);
      setValue("model", currentItem?.model);
      setValue("numberSerie", currentItem?.numberSerie);
      setValue("color", currentItem?.color);
      setValue("status", currentItem?.status);
      setValue("occurrenceDescription", currentItem?.occurrenceDescription);
      setValue("acessories", currentItem?.acessories);
      setValue("images", currentItem.images);
      setValue("coustAmountValue", currentItem?.coustAmountValue);
      setValue("amountValue", currentItem?.amountValue);
      setValue("garantyDays", currentItem?.garantyDays);
      setValue("paymentType", currentItem?.paymentType);
      setValue("employeeId", currentItem?.employeeId);
      setValue("finallyDescription", currentItem?.finallyDescription);

      setAccessories(currentItem?.acessories);
      setGarantyDaysValue(currentItem?.garantyDays);
      setPaymentTypeValue(currentItem?.paymentType);
      setEmployeeValue(currentItem?.employee);
      setStatus(currentItem?.status);

      //console.log("currentItem", currentItem);
    }
  }, [currentItem, setValue]);

  useEffect(() => {
    if (currentItem && currentItem) {
      setItemsByCurrentItem();
    }

    if (!openCreateItem && currentItem) {
      reset();
      setCurrentItem(null);
    }
  }, [currentItem, openCreateItem]);
  return (
    <Sheet open={openCreateItem} onOpenChange={setOpenCreateItem}>
      <SheetContent className="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader className="border-b border-primary/5 pb-5 px-3">
            <SheetTitle>
              {currentItem ? "Edite o item abaixo" : "Adicione um novo item"}
            </SheetTitle>
            <SheetDescription>
              {!currentItem
                ? " Informe abaixo as informações nescessárias para a criação de um novo item."
                : "Edite abaixo as informações que você deseja."}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="grid  py-4 h-[calc(100vh-160px)]">
            <div className="grid gap-4 px-3 pb-2">
              <div className="grid grid-cols-2 gap-2 items-center">
                <div className="grid grid-cols-1 items-center gap-4 pb-3 relative">
                  <Label
                    htmlFor="name"
                    className="text-left flex items-center gap-1 text-primary"
                  >
                    Nome do Item
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Teclado..."
                    className="col-span-3"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                      {errors.name.message + ""}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 items-center gap-4 pb-3">
                  <Label
                    htmlFor="brand"
                    className="text-left flex items-center gap-1 text-primary"
                  >
                    Marca
                  </Label>
                  <Input
                    id="brand"
                    {...register("brand")}
                    placeholder="Logitech..."
                    className="col-span-3"
                  />
                  {errors.brand && (
                    <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                      {errors.brand.message + ""}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid grid-cols-1 items-center gap-4 pb-3">
                  <Label
                    htmlFor="model"
                    className="text-left flex items-center gap-1 text-primary"
                  >
                    Modelo
                  </Label>
                  <Input
                    id="model"
                    {...register("model")}
                    placeholder="456TA"
                    className="col-span-3"
                  />
                  {errors.model && (
                    <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                      {errors.model.message + ""}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 items-center gap-4 pb-3">
                  <Label
                    htmlFor="numberSerie"
                    className="text-left flex items-center gap-1 text-primary"
                  >
                    Número de serie
                  </Label>
                  <Input
                    id="numberSerie"
                    {...register("numberSerie")}
                    placeholder="5A6GF33A"
                    className="col-span-3"
                  />
                  {errors.numberSerie && (
                    <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                      {errors.numberSerie.message + ""}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid grid-cols-1 items-center gap-4 pb-3">
                  <Label
                    htmlFor="color"
                    className="text-left flex items-center gap-1 text-primary"
                  >
                    Cor
                  </Label>
                  <Input
                    id="color"
                    {...register("color")}
                    placeholder="Preto"
                    className="col-span-3"
                  />
                  {errors.color && (
                    <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                      {errors.color.message + ""}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 items-center gap-4 pb-3">
                  <Label
                    htmlFor="status"
                    className="text-left flex items-center gap-1 text-primary"
                  >
                    Status
                  </Label>
                  <Select
                    {...register("status")}
                    defaultValue={status}
                    onValueChange={(value) => setStatus(value)}
                    value={status}
                    required
                  >
                    <SelectTrigger className="w-full rounded-xl">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statusData.map((status: string, index: number) => (
                          <SelectItem key={index} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                      {errors.status.message + ""}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full gap-4">
                <Label
                  htmlFor="acessories"
                  className="text-left flex items-center gap-1 text-primary"
                >
                  Acessórios
                </Label>

                <div className="flex gap-1">
                  <Input
                    id="acessories"
                    value={currentAcessorie}
                    onFocus={() => {
                      setInputAcessoriesFocus(true);
                    }}
                    onBlur={() => {
                      setInputAcessoriesFocus(false);
                    }}
                    onChange={(e) => {
                      setCurrentAcessorie(e.target.value);
                    }}
                    placeholder="Teclado..."
                    className="w-full "
                  />
                  <Button
                    onClick={handleCreateItem}
                    type="button"
                    variant={"outline"}
                  >
                    <BiPlus />
                  </Button>
                </div>
                {acessories && acessories.length > 0 ? (
                  <ScrollArea className="flex w-full h-20 gap-1">
                    <div className="flex flex-col gap-1">
                      {acessories.map((acessory: any) => (
                        <span
                          className="text-sm group text-muted-foreground px-3 w-full flex items-center justify-between cursor-pointer hover:text-primary hover:bg-accent py-2 rounded-lg"
                          key={acessory}
                        >
                          {acessory}
                          <BiX
                            className="text-accent-foreground hover:text-red-500 text-lg hidden group-hover:block"
                            onClick={() => {
                              setAccessories(
                                acessories.filter(
                                  (item: any) => item !== acessory
                                )
                              );
                            }}
                          />
                        </span>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex justify-center items-center w-full h-10 gap-1">
                    <span className="text-sm text-muted-foreground">
                      Nenhum item adicionado
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full gap-4">
                <Label
                  htmlFor="occurrenceDescription"
                  className="text-left flex items-center gap-1 text-primary"
                >
                  Descrição da ocorência
                </Label>
                <Textarea
                  id="occurrenceDescription"
                  {...register("occurrenceDescription")}
                  placeholder="Descrição do item..."
                  className="resize-none"
                />
                {errors.occurrenceDescription && (
                  <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                    {errors.occurrenceDescription.message + ""}
                  </span>
                )}
              </div>

              <div className="w-full flex flex-col gap-4 pt-3">
                <header className="flex flex-col gap-1 pb-4">
                  <h3>Dados do orçamento</h3>
                  <p className="text-sm text-muted-foreground">
                    Adicione abaixo as informações do orçamento do item
                    individualmente.
                  </p>
                </header>

                <div className="grid grid-cols-2 gap-2">
                  <div className="grid grid-cols-1 items-center gap-4 pb-3">
                    <Label
                      htmlFor="coutsAmountValue"
                      className="text-left flex items-center gap-1 text-primary"
                    >
                      Valor de custo
                    </Label>
                    <Input
                      {...register("coustAmountValue")}
                      id="coustAmountValue"
                      placeholder="R$ 0,00"
                      className="col-span-3"
                    />
                    {errors.coustAmountValue && (
                      <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                        {errors.coustAmountValue.message + ""}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4 pb-3">
                    <Label
                      htmlFor="amountValue"
                      className="text-left flex items-center gap-1 text-primary"
                    >
                      Valor do orçamento
                    </Label>
                    <Input
                      id="amountValue"
                      {...register("amountValue")}
                      placeholder="R$ 0,00"
                      className="col-span-3"
                    />
                    {errors.amountValue && (
                      <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                        {errors.amountValue.message + ""}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="grid grid-cols-1 items-center gap-4 pb-3">
                    <Label
                      htmlFor="garantyDays"
                      className="text-left flex items-center gap-1 text-primary"
                    >
                      Garantia em dias
                    </Label>
                    <Select
                      {...register("garantyDays")}
                      defaultValue={garantyDaysValue}
                      value={garantyDaysValue}
                      onValueChange={setGarantyDaysValue}
                      required
                    >
                      <SelectTrigger className="w-full rounded-xl">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={"30"}>30 dias</SelectItem>
                          <SelectItem value={"60"}>60 dias</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.garantyDays && (
                      <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                        {errors.garantyDays.message + ""}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4 pb-3">
                    <Label
                      htmlFor="paymentType"
                      className="text-left flex items-center gap-1 text-primary"
                    >
                      Forma de pagamento
                    </Label>
                    <Select
                      {...register("paymentType")}
                      defaultValue={"avista"}
                      value={paymentTypeValue}
                      onValueChange={setPaymentTypeValue}
                      required
                    >
                      <SelectTrigger className="w-full rounded-xl">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="avista">A vista</SelectItem>
                          <SelectItem value="parcelado">Parcelado</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.paymentType && (
                      <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                        {errors.paymentType.message + ""}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 items-center gap-4 pb-3">
                  <Label
                    htmlFor="employeeId"
                    className="text-left flex items-center gap-1 text-primary"
                  >
                    Funcionário responsável
                  </Label>
                  <Select
                    {...register("employeeId")}
                    value={employeeValue}
                    onValueChange={setEmployeeValue}
                    defaultValue={"1"}
                  >
                    <SelectTrigger className="w-full rounded-xl">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">Fulano 1</SelectItem>
                        <SelectItem value="2">Fulano 2</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.employeeId && (
                    <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                      {errors.employeeId.message + ""}
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full gap-4">
                  <Label
                    htmlFor="finallyDescription"
                    className="text-left flex items-center gap-1 text-primary"
                  >
                    Descrição do orçamento
                  </Label>
                  <Textarea
                    id="finallyDescription"
                    {...register("finallyDescription")}
                    placeholder="Descrição do orçamento"
                    className="resize-none"
                  />
                  {errors.finallyDescription && (
                    <span className="text-red-500 text-xs peer absolute bottom-[-5px]">
                      {errors.finallyDescription.message + ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
          <SheetFooter className="px-2">
            <div className="w-full flex justify-between items-center">
              {currentItem && (
                <Button size={"sm"} onClick={onDelete} variant={"destructive"}>
                  <BiTrash />
                </Button>
              )}
              <div className="flex gap-2 w-full justify-end items-center">
                <SheetClose asChild>
                  <Button size={"sm"} variant={"outline"}>
                    Cancelar
                  </Button>
                </SheetClose>
                <Button
                  size={"sm"}
                  type={inputAcessoriesFocus ? "button" : "submit"}
                >
                  {currentItem ? "Atualizar item" : "Adicionar item "}
                </Button>
              </div>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default FormCreateItem;
