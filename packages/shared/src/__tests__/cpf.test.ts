import { describe, it, expect } from "vitest";
import { isValidCpf, formatCpf, maskCpf } from "../cpf.js";

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

describe("maskCpf", () => {
  it("retorna só dígitos quando há 3 ou menos", () => {
    expect(maskCpf("1")).toBe("1");
    expect(maskCpf("11")).toBe("11");
    expect(maskCpf("111")).toBe("111");
  });

  it("insere primeiro ponto ao digitar o 4º dígito", () => {
    expect(maskCpf("1114")).toBe("111.4");
    expect(maskCpf("111444")).toBe("111.444");
  });

  it("insere segundo ponto ao digitar o 7º dígito", () => {
    expect(maskCpf("1114447")).toBe("111.444.7");
    expect(maskCpf("111444777")).toBe("111.444.777");
  });

  it("insere hífen ao digitar o 10º dígito", () => {
    expect(maskCpf("1114447773")).toBe("111.444.777-3");
    expect(maskCpf("11144477735")).toBe("111.444.777-35");
  });

  it("ignora caracteres não numéricos na entrada", () => {
    expect(maskCpf("111.444.777-35")).toBe("111.444.777-35");
    expect(maskCpf("111abc444")).toBe("111.444");
  });

  it("trunca em 11 dígitos mesmo com mais entrada", () => {
    expect(maskCpf("111444777359999")).toBe("111.444.777-35");
  });

  it("retorna string vazia para entrada vazia", () => {
    expect(maskCpf("")).toBe("");
  });
});
