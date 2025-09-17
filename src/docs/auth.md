# 🔐 Autenticação no NestJS — LocalStrategy + JWT

Este módulo implementa autenticação no NestJS utilizando **Passport**, com duas estratégias principais:

* **LocalStrategy** → valida credenciais de login (usuário/senha).
* **JwtStrategy** → valida o token JWT para acessar rotas protegidas.

---

## 📂 Estrutura dos arquivos

```
src/auth/
 ├── auth.controller.ts     # Endpoints de autenticação (login, profile, etc.)
 ├── auth.module.ts         # Registro de módulos e providers (JwtModule, Passport)
 ├── auth.service.ts        # Regras de negócio: valida usuário e gera tokens
 ├── constants.ts           # Configurações (ex: chave secreta do JWT)
 ├── jwt.strategy.ts        # Estratégia Passport para validar tokens JWT
 ├── jwt-auth.guard.ts      # Guard customizado que protege rotas com JWT
 ├── local.strategy.ts      # Estratégia Passport para autenticação local (email/senha)
 └── local-auth.guard.ts    # Guard customizado que protege rotas usando LocalStrategy
```

---

## ⚙️ Fluxo de autenticação

1. **Login**

   * O usuário envia email e senha para `POST /auth/login`.
   * O `LocalAuthGuard` aciona a `LocalStrategy`.
   * A `LocalStrategy` chama `AuthService.validateUser()`.
   * Se válido, o `AuthService` retorna um **JWT** (token de acesso).

2. **Acesso a rotas protegidas**

   * O cliente envia o token no header:

     ```
     Authorization: Bearer <token>
     ```
   * O `JwtAuthGuard` aciona a `JwtStrategy`.
   * A `JwtStrategy` valida o token (assinatura + expiração).
   * Se válido, o payload do token é adicionado em `req.user`.

3. **Autorização (opcional)**

   * Com `roles` no payload do JWT, pode-se usar um `RolesGuard` para restringir acesso por papel.

---

## 📌 Principais arquivos

### `auth.controller.ts`

Define endpoints de autenticação:

* `POST /auth/login` → utiliza `@UseGuards(LocalAuthGuard)`, retorna um JWT.
* `GET /auth/profile` → utiliza `@UseGuards(JwtAuthGuard)`, retorna o usuário logado.

### `auth.module.ts`

* Importa `PassportModule` e `JwtModule`.
* Configura a chave secreta do JWT (em `constants.ts`).
* Declara `AuthService`, `LocalStrategy`, `JwtStrategy`.

### `auth.service.ts`

* Contém a lógica de autenticação.
* `validateUser(email, password)` → verifica credenciais.
* `login(user)` → gera um JWT com `JwtService`.

### `local.strategy.ts`

* Usa a estratégia `passport-local`.
* Espera `email` e `password`.
* Se válidos, retorna o usuário (vai para `req.user`).

### `jwt.strategy.ts`

* Usa a estratégia `passport-jwt`.
* Extrai token do header `Authorization: Bearer`.
* Valida a assinatura e expiração do token.
* Retorna payload (adicionado em `req.user`).

### `local-auth.guard.ts`

* Classe que estende `AuthGuard('local')`.
* Facilita reutilização e personalização de erros.

### `jwt-auth.guard.ts`

* Classe que estende `AuthGuard('jwt')`.
* Usada para proteger rotas privadas.

---

## 🔑 Exemplo de uso

### Login

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "access_token": "eyJhbGciOiJI..."
}
```

### Rota protegida

```bash
GET /auth/profile
Authorization: Bearer eyJhbGciOiJI...
```

Resposta:

```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "roles": ["user"]
}
```

---

## 🔒 Configurações importantes

* **constants.ts** contém o segredo do JWT (`jwtConstants.secret`).
  ➝ Em produção, use variáveis de ambiente (`process.env.JWT_SECRET`) e nunca deixe segredos hardcoded.

* O `JwtModule` foi configurado no `auth.module.ts` com opções de expiração (`signOptions: { expiresIn: '15m' }`).

* Senhas devem ser sempre **hashadas** antes de salvar no banco (`bcrypt`).

---

## 🚀 Melhorias recomendadas

1. **Refresh Tokens**
   Implementar `/auth/refresh` para renovar access tokens curtos sem pedir senha novamente.

2. **Roles Guard**
   Adicionar controle de acesso baseado em papéis com decorator `@Roles('admin')`.

3. **Env Vars**
   Mover `jwtConstants.secret` para `.env`.

4. **Cookies HttpOnly (opcional)**
   Usar cookies seguros em vez de headers, reduzindo riscos de XSS.

---

✅ Com isso, o fluxo de autenticação está completo: **login com credenciais → geração de token → acesso a rotas privadas com JWT**.