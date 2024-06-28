import { z } from "zod";

export const FirstEmployeeCompanyCreateSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  phone: z.string().min(9, { message: "Telefone inválido" }),
  email: z.string().email({ message: "Email inválido" }),
  accessPassword: z.string().min(1, { message: "Gerente é obrigatório" }),
});

export const SecondEmployeeCompanyCreateSchema = z.object({
  unitsListWithAccess: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        role: z.enum(["admin", "user"]),
      })
    )
    .min(1, { message: "É nescessário selecionar pelo menos uma unidade" }),
});

export type EmployeeCompanySchemaType = z.infer<
  typeof FirstEmployeeCompanyCreateSchema &
    typeof SecondEmployeeCompanyCreateSchema
>;
