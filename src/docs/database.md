# Documentação do Módulo de Banco de Dados

![Arquitetura do Banco de Dados]()

Este documento fornece informações abrangentes sobre a implementação do módulo de banco de dados no Sistema de Pagamento Olympia.

## Visão Geral

O módulo de banco de dados é responsável por estabelecer e gerenciar a conexão com o banco de dados PostgreSQL usando TypeORM em nossa aplicação NestJS.

## Arquivos de Configuração

### `database.module.ts`

O arquivo principal do módulo que configura a conexão TypeORM usando variáveis de ambiente. Principais características:

- Configuração assíncrona usando `TypeOrmModule.forRootAsync`
- Integração com ConfigService para gerenciamento de variáveis de ambiente
- Carregamento automático de entidades
- Suporte a migrações
- Logging habilitado para desenvolvimento

### `typeorm.config.ts`

Fornece a configuração do DataSource do TypeORM para migrações e operações CLI. A configuração inclui:

- Detalhes de conexão com PostgreSQL
- Caminhos das entidades e migrações
- Nome personalizado da tabela de migrações

## Variáveis de Ambiente

As seguintes variáveis de ambiente são necessárias:

```env
POSTGRES_HOST=<host do banco>
POSTGRES_PORT=<porta do banco>
POSTGRES_USER=<usuário do banco>
POSTGRES_PASSWORD=<senha do banco>
POSTGRES_DB=<nome do banco>
```

## Migrações

### Localização

As migrações são armazenadas no diretório `src/database/migrations`.

### Comandos

```bash
# Criar uma nova migração
npm run migration:create -- -n NomeDaMigracao

# Executar migrações pendentes
npm run migration:up

# Reverter última migração
npm run migration:down
```

### Migrações Atuais

- `1756509827111-User.ts`: Criação inicial da tabela de usuários

## Seeds (Dados Iniciais)

Localizado em `src/database/seeds`, o sistema de seeds ajuda a popular o banco de dados com dados iniciais:

- `seed.module.ts`: Configuração do módulo de seeds
- `user.seed.ts`: Dados iniciais de usuários

## Notas Importantes

1. **Sincronização**:
   - `synchronize: false` em produção para segurança dos dados
   - Sempre use migrações para alterações no esquema do banco

2. **Carregamento de Entidades**:
   - Entidades são carregadas automaticamente (`autoLoadEntities: true`)
   - Arquivos de entidades devem estar em `src/entities/**/*.entity.{ts,js}`

3. **Logging**:
   - Logging de queries SQL está habilitado (`logging: true`)
   - Útil para desenvolvimento e depuração

## Boas Práticas

1. Sempre crie migrações para alterações no banco de dados
2. Nunca habilite sincronização em produção
3. Mantenha os arquivos de migração pequenos e focados
4. Use nomes significativos para as migrações
5. Teste as migrações tanto para cima quanto para baixo
6. Mantenha dados de seed para ambiente de desenvolvimento

## Solução de Problemas

Se você encontrar problemas de conexão:

1. Verifique se as variáveis de ambiente estão configuradas corretamente
2. Certifique-se de que o serviço PostgreSQL está em execução
3. Verifique a conectividade de rede e configurações de firewall
4. Verifique as permissões do usuário do banco de dados
