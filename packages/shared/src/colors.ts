export const RAINBOW_COLORS = [
  "vermelho",
  "laranja",
  "amarelo",
  "verde",
  "azul",
  "anil",
  "violeta",
] as const;

export type RainbowColor = (typeof RAINBOW_COLORS)[number];
