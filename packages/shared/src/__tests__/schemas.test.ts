import { describe, it, expect } from "vitest";
import { clientSchema } from "../schemas.js";

const validClient = {
  fullName: "João Silva",
  cpf: "111.444.777-35",
  email: "joao@exemplo.com",
  favoriteColor: "azul" as const,
  notes: "Observação opcional",
};

describe("clientSchema", () => {
  it("aceita payload válido", () => {
    expect(clientSchema.safeParse(validClient).success).toBe(true);
  });

  it("aceita payload sem notes", () => {
    const { notes: _, ...withoutNotes } = validClient;
    expect(clientSchema.safeParse(withoutNotes).success).toBe(true);
  });

  it("rejeita nome com apenas uma palavra", () => {
    const result = clientSchema.safeParse({ ...validClient, fullName: "João" });
    expect(result.success).toBe(false);
  });

  it("rejeita CPF inválido", () => {
    const result = clientSchema.safeParse({ ...validClient, cpf: "000.000.000-00" });
    expect(result.success).toBe(false);
  });

  it("rejeita e-mail inválido", () => {
    const result = clientSchema.safeParse({ ...validClient, email: "nao-é-email" });
    expect(result.success).toBe(false);
  });

  it("rejeita cor fora do arco-íris", () => {
    const result = clientSchema.safeParse({ ...validClient, favoriteColor: "rosa" });
    expect(result.success).toBe(false);
  });

  it("faz trim de espaços em fullName e email", () => {
    const result = clientSchema.safeParse({
      ...validClient,
      fullName: "  João Silva  ",
      email: "  joao@exemplo.com  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("João Silva");
      expect(result.data.email).toBe("joao@exemplo.com");
    }
  });
});
