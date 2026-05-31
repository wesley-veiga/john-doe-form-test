import swaggerJsdoc from "swagger-jsdoc";
import { RAINBOW_COLORS } from "shared";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "John Doe Form API",
      version: "1.0.0",
      description: "API de cadastro de clientes",
    },
    components: {
      schemas: {
        ClientInput: {
          type: "object",
          required: ["fullName", "cpf", "email", "favoriteColor"],
          properties: {
            fullName: {
              type: "string",
              example: "João Silva",
              description: "Nome completo (mínimo 2 palavras)",
            },
            cpf: {
              type: "string",
              example: "111.444.777-35",
              description: "CPF válido (com ou sem formatação)",
            },
            email: {
              type: "string",
              format: "email",
              example: "joao@exemplo.com",
            },
            favoriteColor: {
              type: "string",
              enum: [...RAINBOW_COLORS],
              example: "azul",
            },
            notes: {
              type: "string",
              example: "Observações livres",
            },
          },
        },
        Client: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            full_name: { type: "string" },
            cpf: { type: "string" },
            email: { type: "string" },
            favorite_color: { type: "string" },
            notes: { type: "string", nullable: true },
            created_at: { type: "string", format: "date-time" },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            error: {
              type: "object",
              properties: {
                code: { type: "string", example: "VALIDATION_ERROR" },
                issues: { type: "array", items: { type: "object" } },
              },
            },
          },
        },
        ConflictError: {
          type: "object",
          properties: {
            error: {
              type: "object",
              properties: {
                code: { type: "string", example: "CPF_ALREADY_EXISTS" },
                message: { type: "string", example: "CPF já cadastrado" },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
