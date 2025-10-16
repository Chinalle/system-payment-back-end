#!/bin/sh

# Roda as migrations do banco de dados
echo "Running database migrations..."
npm run migration:run:prod

# Inicia a aplicação principal (o comando passado para o Docker)
echo "Migrations finished. Starting application..."
exec "$@"