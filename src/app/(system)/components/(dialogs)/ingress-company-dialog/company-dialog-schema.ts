import { z } from "zod";

export const FirstCompanyDialogSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  document: z.string().min(11, { message: "CNPJ inválido" }),
  fundationDate: z
    .string()
    .min(1, { message: "Data de fundação é obrigatória" }),
  inscEstadual: z.string().optional(),
  inscMunicipal: z.string().optional(),
  areasOfActivity: z.string().min(1, { message: "Atividade é obrigatória" }),
});

export const SecondCompanyDialogSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Telefone inválido" }),
  street: z.string().min(1, { message: "Rua é obrigatório" }),
  numberAddress: z.string().min(1, { message: "Número é obrigatório" }),
  neighborhoodAddress: z.string().min(1, { message: "Bairro é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z.string().min(2, { message: "Estado é obrigatório" }),
  zipCode: z.string().min(8, { message: "CEP inválido" }),
});

export type CompanySchemaType = z.infer<
  typeof FirstCompanyDialogSchema & typeof SecondCompanyDialogSchema
>;
