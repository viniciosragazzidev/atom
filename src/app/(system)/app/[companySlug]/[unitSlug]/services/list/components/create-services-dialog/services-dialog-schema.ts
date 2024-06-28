import { z } from "zod";

export const ClientServiceSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  document: z.string().min(11, { message: "CPF inválido" }),
  phone: z.string().min(9, { message: "Telefone inválido" }),
  email: z.string().email({ message: "Email inválido" }),
  street: z.string().min(1, { message: "Endereço é obrigatório" }),
  numberAddress: z.string().min(1, { message: "Numero é obrigatório" }),
  neighborhoodAddress: z.string().min(1, { message: "Bairro é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z.string().min(2, { message: "Estado é obrigatório" }),
  zipCode: z.string().min(1, { message: "CEP é obrigatório" }),
});

export const ServiceDataSchema = z.object({
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  status: z.string().min(1, { message: "Status é obrigatório" }),
});

export type ServicesDialogSchema = z.infer<
  typeof ClientServiceSchema & typeof ServiceDataSchema
>;
