<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Olympia - Your Payment System</h1>

<p align="center">
  <img src="https://img.shields.io/badge/node-18.x%20alpine-green?logo=node.js" alt="Node Alpine" />
  <img src="https://img.shields.io/badge/NestJS-Framework-red?logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/Jest-Testing-blue?logo=jest" alt="Jest" />
  <img src="https://img.shields.io/badge/TypeORM-ORM-orange" alt="TypeORM" />
  <img src="https://img.shields.io/badge/Postgres-Database-blue?logo=postgresql" alt="Postgres" />
  <img src="https://img.shields.io/badge/Dockerfile-Build-lightblue?logo=docker" alt="Dockerfile" />
  <img src="https://img.shields.io/badge/Docker%20Compose-Orchestration-informational?logo=docker" alt="Docker Compose" />
</p>

<br/>

## 📌 Description

Olympia is a backend service built with **NestJS**, **TypeORM** and **Postgres**, designed to provide a scalable and maintainable payment system.  
It runs inside **Docker containers** for development and production, ensuring consistent environments.

## API Documentation

```http
  http://localhost:3000/api/docs#/
```

---

## 🛠 Development Flow

We follow a **branch per task** workflow to ensure collaboration and code quality:

1. **Criação de branch por task**  
    - Cada nova tarefa deve ser desenvolvida em uma branch própria.  
    - Nomeie no padrão:

```ts
  feature/nome-da-feature
  fix/nome-do-fix
  chore/nome-da-tarefa
```

2. **Solicitar Code Review no GitHub**  
    - Após finalizar a implementação, abra um **Pull Request (PR)** para a branch principal (`main`).  
    - Marque os colegas de equipe como revisores.

3. **Merge após aprovação**  
   - O gerente/revisor responsável fará o **merge** do PR somente após o **Code Review ser aprovado**.

### Git commands

```bash
  # Verificar em qual branch você está
  git branch

  # Atualizar a branch principal (ex: main ou develop)
  git checkout main
  git pull origin main

  # Criar e mudar para uma nova branch (exemplo: feature/login)
  git checkout -b <nome_nova_branch>

  # verifica branch atual
  git branch

  # Adiciona todas as alterações
  git add .

  # Criar commit
  git commit -m "feat: implementa login de usuário"

  # Enviar branch para o repositório remoto
  git push origin feature/login
```

---

## ⚙️ Pre-requirements

- [WSL2](https://learn.microsoft.com/pt-br/windows/wsl/install) ou Linux
- [Docker](https://docs.docker.com/get-docker/)

---

## 🎨 Code Style & Naming Conventions

Para manter consistência no código, seguimos os seguintes padrões:

### 🔹 Classes

- **PascalCase**

- Exemplo:  

```ts
  export class UserService {}
  export class PaymentController {}
```

## Variáveis e funções

- camelCase

Exemplo:

```ts
  const userName = "John";
  function getUserProfile() {}
```

## 🔹 Constantes

UPPER_SNAKE_CASE

Exemplo:

```ts
  const MAX_RETRY_COUNT = 3;
  const API_URL = "https://api.example.com";
```

## 🔹 Arquivos

kebab-case (minúsculo e separado por -)

Exemplo:

```ts
  user.controller.ts
  payment.service.ts
  auth.module.ts
```

## 🔹 DTOs (Data Transfer Objects)

Nome do arquivo em kebab-case + .dto.ts

Classe em PascalCase

Exemplo:

```ts
create-user.dto.ts

export class CreateUserDto {
  name: string;
  email: string;
}
```

## 🔹 Entidades (TypeORM)

### Classe em PascalCase

- Nome da tabela no singular (recomendado)

Exemplo:

```ts
  @Entity("user")
  export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
  }
```

🔹 Testes

- Arquivos terminam com .spec.ts

Exemplo:

user.service.spec.ts
payment.controller.spec.ts

## 🚀 Project setup

### Install dependencies

```bash
npm install
```

### 🐳 Docker setup

Com objetivo de não rodar localmente, o Docker instancia dois serviços
(backend + banco de dados)

```bash
  # Build and run services
  docker compose up --build

  # Access backend container
  docker exec -it backend_nest sh
```

### 📦 Compile and run the project

```bash
  # development
  npm run start

  # watch mode
  npm run start:dev

  # production mode
  npm run start:prod
```

## Database ORM

Antes de rodar as migrations abra o terminal do Node do docker

```bash
  migration:create # cria uma nova migration

  migration:up # roda a última migration

  migration:down # desfaz a última migration
```

## Running tests

```bash
  # unit tests
  npm run test

  # e2e tests
  npm run test:e2e

  # test coverage
  npm run test:cov
```
