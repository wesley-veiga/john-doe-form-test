import { z } from "zod";
import { RAINBOW_COLORS } from "./colors.js";
import { isValidCpf } from "./cpf.js";

export const clientSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Nome completo é obrigatório")
    .refine((v) => v.trim().split(/\s+/).length >= 2, "Informe o nome completo"),

  cpf: z
    .string()
    .trim()
    .refine(isValidCpf, "CPF inválido"),

  email: z
    .string()
    .trim()
    .email("E-mail inválido"),

  favoriteColor: z.enum(RAINBOW_COLORS, {
    errorMap: () => ({ message: "Selecione uma cor do arco-íris" }),
  }),

  notes: z.string().trim().optional(),
});

export type ClientInput = z.infer<typeof clientSchema>;
