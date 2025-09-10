# AI Agent Instructions for Olympia Payment System

## Project Overview

Olympia is a NestJS-based payment system backend with TypeORM and PostgreSQL. The codebase follows a modular architecture with clear separation of concerns.

## Key Architecture Patterns

### Module Structure

- Modules are self-contained units (see `src/users/user.module.ts` as example)
- Each module contains:
  - Controller (`*.controller.ts`) - HTTP endpoints
  - Service (`*.service.ts`) - Business logic
  - Repository (`repository/*.repository.ts`) - Data access layer
  - Interface (`repository/*.interface.ts`) - Repository contracts
  - DTOs (`src/dtos/*/*.dto.ts`) - Data transfer objects
  - Entity (`src/entities/*.entity.ts`) - Database models

### Database Patterns

- Uses TypeORM with PostgreSQL
- Follows repository pattern with interfaces for testability
- Migrations in `src/database/migrations/`
- Seeding system in `src/database/seeds/`
- All database config centralized in `src/database/typeorm.config.ts`

## Development Workflows

### Environment Setup

```bash
# Start development environment
docker compose up --build

# Access backend container
docker exec -it backend_nest sh
```

### Database Migrations

```bash
# Create new migration
npm run migration:create --name=MigrationName

# Run migrations
npm run migration:up

# Revert migrations
npm run migration:down
```

### Code Conventions

#### Naming

- Files: kebab-case (`user.service.ts`)
- Classes: PascalCase (`UserService`)
- Variables/Functions: camelCase (`getUserProfile`)
- Constants: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)

#### File Organization

- DTOs: `src/dtos/<module>/*.dto.ts`
- Entities: `src/entities/*.entity.ts`
- Modules: `src/<module>/*`
- Configuration: `src/config/*`

### Key Integration Points

1. Email Service (`src/mailer/`)
   - SMTP configuration via environment variables
   - Service injection pattern for email notifications

2. Swagger API Documentation
   - Auto-generated at `/api/docs`
   - DTOs must include Swagger decorators
   - See `src/config/swagger.ts` for setup

## Common Tasks

### Adding a New Entity

1. Create entity class in `src/entities/`
2. Create migration in `src/database/migrations/`
3. Create DTOs in `src/dtos/<module>/`
4. Create repository interface & implementation
5. Set up module with controller & service
6. Add to `AppModule` imports

### Error Handling

- Use NestJS built-in exception filters
- Repository methods should throw descriptive errors
- Validate DTOs using class-validator decorators

### Security Patterns

- Password hashing using bcrypt (see `UserRepository`)
- Environment variables for sensitive data
- Data validation using class-validator

## Testing

- Unit tests: `*.spec.ts` next to implementation files
- E2E tests: `/test/*.e2e-spec.ts`
- Test database config separate from development

## Always Consider

- Add Swagger decorators to new DTOs
- Follow existing module structure patterns
- Use repository pattern for database access
- Add proper validation to DTOs
