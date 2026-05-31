-- Up Migration
CREATE TABLE clients (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name      TEXT        NOT NULL,
  cpf            TEXT        NOT NULL UNIQUE,
  email          TEXT        NOT NULL UNIQUE,
  favorite_color TEXT        NOT NULL,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Down Migration
-- DROP TABLE clients;
