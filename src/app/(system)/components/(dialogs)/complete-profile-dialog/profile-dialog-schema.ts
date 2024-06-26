import { z } from "zod";

export const FirstProfileDialogSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  surname: z.string().min(1, { message: "Sobrenome é obrigatório" }),
  birthdate: z.string().min(1, { message: "Data de nascimento é obrigatória" }),
  gender: z.enum(["Masculino", "Feminino", "Outro"], {
    message: "Gênero é obrigatório",
  }),
  document: z.string().min(11, { message: "CPF inválido" }),
});

export const SecondProfileDialogSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Telefone inválido" }),
  address: z.string().min(1, { message: "Endereço é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z.string().min(2, { message: "Estado é obrigatório" }),
});
