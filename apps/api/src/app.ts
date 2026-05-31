import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { clientsRouter } from "./routes/clients.js";
import { swaggerSpec } from "./swagger.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/clients", clientsRouter);
