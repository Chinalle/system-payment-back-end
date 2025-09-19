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
 ├── constants.ts           # Configurações (ex: chave secreta do JWT e Refresh)
 ├── jwt.strategy.ts        # Estratégia Passport para validar tokens JWT
 ├── jwt-auth.guard.ts      # Guard customizado que protege rotas com JWT
 ├── jwt-refresh.guard.ts   # Guard para proteção das rotas de refresh token
 ├── jwt-refresh.strategy.ts# Estratégia Passport para validar refresh tokens
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

* **constants.ts** contém o segredo do JWT (`constants.jwtSecret`) e Refresh Token (`constants.jwtRefreshSecret`).
  ➝ Em produção, use variáveis de ambiente (`process.env.JWT_SECRET`) e nunca deixe segredos hardcoded.

* O `JwtModule` foi configurado no `auth.module.ts` com opções de expiração (`signOptions: { expiresIn: '15m' }`).

* Senhas devem ser sempre **hashadas** antes de salvar no banco (`bcrypt`).

---

## � Refresh Token

O sistema implementa um mecanismo de refresh token para maior segurança:

1. **Como funciona:**
   * Access Token tem vida curta (15 minutos)
   * Refresh Token tem vida mais longa (7 dias)
   * Quando o access token expira, use o refresh token para obter um novo

2. **Endpoints:**
   * `POST /auth/refresh` → Gera novo access token usando refresh token válido
   * Requer header: `Authorization: Bearer <refresh_token>`

3. **Implementação:**
   * `jwt-refresh.strategy.ts` → Valida refresh tokens
   * `jwt-refresh.guard.ts` → Protege rota de refresh
   * Refresh token armazenado no payload do JWT

4. **Segurança:**
   * Refresh tokens são invalidados no logout
   * Verificação dupla: token válido + token ativo no sistema

---

## 🛡️ Rate Limiting

O sistema implementa proteção contra excesso de requisições usando `ThrottlerModule`:

```typescript
ThrottlerModule.forRoot([
  {
    ttl: 60000,    // Janela de tempo em millisegundos
    limit: 10,     // Número máximo de requisições na janela
  },
]),
```

1. **Configuração Global:**
   * Limite de 10 requisições por minuto por IP
   * Aplicado globalmente através do `APP_GUARD`
   * Customizável por rota usando decorators

2. **Decorators Disponíveis:**
   * `@SkipThrottle()` → Desativa throttling para uma rota
   * `@Throttle(limit, ttl)` → Define limites específicos

3. **Headers de Resposta:**
   * `X-RateLimit-Limit`: Limite total de requisições
   * `X-RateLimit-Remaining`: Requisições restantes
   * `Retry-After`: Tempo para próxima tentativa (quando bloqueado)

---

## 🚀 Melhorias Recomendadas

1. **Blacklist de Tokens**
   * Implementar lista negra para tokens revogados
   * Integrar com Redis para melhor performance

2. **Roles Guard**
   * Adicionar controle de acesso baseado em papéis
   * Usar decorator `@Roles('admin')`

3. **Env Vars**
   * Mover secrets para `.env`
   * Configurar rate limits por ambiente

4. **Segurança Adicional**
   * Implementar 2FA
   * Adicionar CAPTCHA em rotas sensíveis
   * Usar cookies HttpOnly para tokens

---

✅ Com isso, o sistema oferece uma autenticação robusta com:

* Login seguro
* Refresh tokens
* Proteção contra ataques de força bruta
* Rate limiting
* Estrutura escalável para futuras melhorias
