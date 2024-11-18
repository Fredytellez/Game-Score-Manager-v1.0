#!/bin/sh
npm run start:prod

# Esperar a que PostgreSQL esté listo
echo "Waiting for PostgreSQL to start..."
sleep 10

# Ejecutar las migraciones de Prisma
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Iniciar la aplicación
echo "Starting the application..."
node dist/main

dos2unix entrypoint.sh