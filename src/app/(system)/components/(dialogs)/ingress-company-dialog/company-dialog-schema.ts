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

export const SecondProfileDialogSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Telefone inválido" }),
  address: z.string().min(1, { message: "Endereço é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z.enum(
    [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ],
    { message: "Estado é obrigatório" }
  ),
});

export type CompanySchemaType = z.infer<
  typeof FirstCompanyDialogSchema & typeof SecondProfileDialogSchema
>;
