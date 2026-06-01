# John Doe — Formulário de Cadastro

Desafio técnico Eteg (vaga Full Stack Pleno). Formulário de cadastro de clientes com validação ponta a ponta, API REST e persistência em PostgreSQL.

## Tecnologias

- **Monorepo:** Turborepo + npm workspaces
- **Web:** React 19 + Vite + TypeScript + Tailwind CSS v4
- **API:** Node.js + Express 5 + TypeScript
- **Shared:** Zod (schemas e validadores compartilhados entre web e API)
- **Banco:** PostgreSQL + node-pg-migrate (migrations SQL)
- **Testes:** Vitest

Print: Mobile  

<img width="1438" height="1105" alt="Screenshot 2026-06-01 at 10 07 43" src="https://github.com/user-attachments/assets/5d150dfe-8e2e-41d8-98a9-4fb89efce884" />

Print: Tablet / horizontal

<img width="1438" height="1105" alt="Screenshot 2026-06-01 at 10 09 15" src="https://github.com/user-attachments/assets/531f6b1a-a49d-4c99-a168-024dfab6422c" />

Print: Web / Responsivo

<img width="1782" height="1105" alt="Screenshot 2026-06-01 at 10 07 18" src="https://github.com/user-attachments/assets/0fde60d6-795c-4b76-b283-00f8e9da3ecf" />

Print: Modal de Sucesso

<img width="1438" height="1105" alt="Screenshot 2026-06-01 at 10 12 05" src="https://github.com/user-attachments/assets/c8aa9bc8-850e-4c70-826f-b116ab7c0ac7" />



---

## Rodando com Docker

Pré-requisito: [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado e em execução.

```bash
docker compose up --build
```

Isso sobe três serviços em ordem:
1. **postgres** — banco de dados (aguarda healthcheck antes de liberar a API)
2. **api** — roda as migrations automaticamente, depois inicia o servidor
3. **web** — nginx servindo o frontend estático

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost |
| API | http://localhost:3000 |
| Swagger | http://localhost:3000/docs |

Para parar:
```bash
docker compose down        # para os containers, mantém os dados
docker compose down -v     # para os containers e apaga os dados do banco
```

---

## Rodando localmente (sem Docker)

### Pré-requisitos

- Node.js 22+
- PostgreSQL rodando localmente

### Configuração

```bash
# Instala todas as dependências do monorepo
npm install
```

Crie os arquivos `.env` a partir dos exemplos:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Edite `apps/api/.env` com a connection string do seu banco:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/johndoe
PORT=3000
```

### Migrations

```bash
npm run migrate --workspace=apps/api
```

### Desenvolvimento

```bash
npm run dev
```

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:3000 |
| Swagger | http://localhost:3000/docs |

---

## Consultando clientes cadastrados

**Via psql dentro do container:**

```bash
docker compose exec postgres psql -U postgres -d johndoe -c "SELECT * FROM clients;"
```

ou

```bash
npm rum clients
```

---

## Testes

Apenas os testes do pacote shared.

```bash
npm run test
```

---

## Decisão de arquitetura: feature-based no frontend

O frontend adota uma estrutura orientada a features em vez de uma estrutura técnica (pasta `components/`, pasta `hooks/`, etc. na raiz):

```
src/
  components/          # componentes genuinamente reutilizáveis (input, button, alert)
  features/            # features separadas (login, home, cadastro, etc.)
    clientForm/
      clientForm.tsx   # layout e composição da feature
      useClientForm.ts # estado e chamada à API
      components/
        form/          # montagem dos campos do formulário
        colorSelect/   # select customizado de cores
```

**Motivação:** Em projetos maiores, a estrutura técnica força o desenvolvedor a navegar entre pastas distantes para entender uma única funcionalidade. Agrupar por feature mantém tudo o que pertence ao formulário de cadastro junto — lógica, campos e componentes específicos — facilitando a leitura e a manutenção por quem assume o código depois.

Componentes que são de fato reutilizáveis entre features (`TextInput`, `PrimaryButton`, `SuccessAlert`) continuam na pasta `components/` global. A distinção é simples: se o componente só existe por causa de uma feature específica, ele mora nela.

---

## Estrutura do monorepo

```
apps/
  api/      # Express + TypeScript (REST)
  web/      # React + Vite (formulário)
packages/
  shared/   # Zod schemas, enum de cores, validador de CPF — fonte única de verdade
```

O pacote `shared` é importado tanto pelo frontend quanto pela API, garantindo que as mesmas regras de validação se apliquem nos dois lados sem duplicação.
