import { Router } from "express";
import { clientSchema } from "shared";
import {
  insertClient,
  cpfExists,
  emailExists,
} from "../db/clients.js";

export const clientsRouter = Router();

clientsRouter.post("/", async (req, res) => {
  const parsed = clientSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: { code: "VALIDATION_ERROR", issues: parsed.error.issues },
    });
    return;
  }

  const data = parsed.data;

  if (await cpfExists(data.cpf)) {
    res.status(409).json({
      error: { code: "CPF_ALREADY_EXISTS", message: "CPF já cadastrado" },
    });
    return;
  }

  if (await emailExists(data.email)) {
    res.status(409).json({
      error: { code: "EMAIL_ALREADY_EXISTS", message: "E-mail já cadastrado" },
    });
    return;
  }

  const client = await insertClient(data);
  res.status(201).json({ data: client });
});