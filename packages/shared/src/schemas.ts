import { z } from "zod";
import { RAINBOW_COLORS } from "./colors.js";
import { isValidCpf } from "./cpf.js";

export const clientSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Nome completo é obrigatório")
    .refine(
      (v) => {
        const words = v.trim().split(/\s+/).filter(Boolean);
        return words.length >= 2 && words.every((w) => w.length >= 2);
      },
      "Informe nome e sobrenome completos"
    ),

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
