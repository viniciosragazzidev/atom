import { z } from "zod";

export const FirstUnitCreateSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  phone: z.string().min(9, { message: "Telefone inválido" }),
  email: z.string().email({ message: "Email inválido" }),
  userManager: z.string().min(1, { message: "Gerente é obrigatório" }),
});

export const SecondUnitCreateSchema = z.object({
  street: z.string().min(1, { message: "Rua é obrigatório" }),
  numberAddress: z.string().min(1, { message: "Número é obrigatório" }),
  neighborhoodAddress: z.string().min(1, { message: "Bairro é obrigatório" }),
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
  zipCode: z.string().min(8, { message: "CEP inválido" }),
});

export type UnitSchemaType = z.infer<
  typeof FirstUnitCreateSchema & typeof SecondUnitCreateSchema
>;
