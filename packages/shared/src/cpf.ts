const extractDigits = (cpf: string) => cpf.replace(/\D/g, "");

const hasInvalidLength = (digits: string) => digits.length !== 11;

const isAllSameDigit = (digits: string) => /^(\d)\1{10}$/.test(digits);

const calcVerifierDigit = (digits: string, length: number): number => {
  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += Number(digits[i]) * (length + 1 - i);
  }
  const remainder = (sum * 10) % 11;
  return remainder === 10 || remainder === 11 ? 0 : remainder;
};

export const isValidCpf = (raw: string): boolean => {
  const digits = extractDigits(raw);
  if (hasInvalidLength(digits) || isAllSameDigit(digits)) return false;
  const d1 = calcVerifierDigit(digits, 9);
  const d2 = calcVerifierDigit(digits, 10);
  return d1 === Number(digits[9]) && d2 === Number(digits[10]);
};

export const formatCpf = (raw: string): string => {
  const digits = extractDigits(raw).padEnd(11, "0").slice(0, 11);
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

export const maskCpf = (raw: string): string => {
  const digits = extractDigits(raw).slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};
