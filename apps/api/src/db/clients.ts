import type { ClientInput } from "shared";
import { pool } from "./pool.js";

export type ClientRow = {
  id: string;
  full_name: string;
  cpf: string;
  email: string;
  favorite_color: string;
  notes: string | null;
  created_at: Date;
};

export const insertClient = async (data: ClientInput): Promise<ClientRow> => {
  const { rows } = await pool.query<ClientRow>(
    `INSERT INTO clients (full_name, cpf, email, favorite_color, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [data.fullName, data.cpf, data.email, data.favoriteColor, data.notes ?? null]
  );

  const row = rows[0];
  if (!row) throw new Error("Insert did not return a row");
  return row;
};

export const cpfExists = async (cpf: string): Promise<boolean> => {
  const { rows } = await pool.query<{ exists: boolean }>(
    "SELECT EXISTS(SELECT 1 FROM clients WHERE cpf = $1) AS exists",
    [cpf]
  );
  return rows[0]?.exists ?? false;
};

export const emailExists = async (email: string): Promise<boolean> => {
  const { rows } = await pool.query<{ exists: boolean }>(
    "SELECT EXISTS(SELECT 1 FROM clients WHERE email = $1) AS exists",
    [email]
  );
  return rows[0]?.exists ?? false;
};
