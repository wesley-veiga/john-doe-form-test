import { describe, it, expect } from "vitest";
import { isValidCpf, formatCpf } from "../cpf.js";

describe("isValidCpf", () => {
  it("aceita CPF válido sem formatação", () => {
    expect(isValidCpf("11144477735")).toBe(true);
  });

  it("aceita CPF válido com formatação", () => {
    expect(isValidCpf("111.444.777-35")).toBe(true);
  });

  it("rejeita CPF com todos os dígitos iguais", () => {
    expect(isValidCpf("11111111111")).toBe(false);
    expect(isValidCpf("00000000000")).toBe(false);
  });

  it("rejeita CPF com tamanho incorreto", () => {
    expect(isValidCpf("123")).toBe(false);
    expect(isValidCpf("")).toBe(false);
  });

  it("rejeita CPF com dígitos verificadores errados", () => {
    expect(isValidCpf("11144477700")).toBe(false);
  });
});

describe("formatCpf", () => {
  it("formata dígitos crus", () => {
    expect(formatCpf("11144477735")).toBe("111.444.777-35");
  });

  it("mantém formato quando já está formatado", () => {
    expect(formatCpf("111.444.777-35")).toBe("111.444.777-35");
  });
});
