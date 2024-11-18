# Etapa de desarrollo
FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Generar Prisma Client (si estás usando Prisma)
RUN npx prisma generate

# Exponer el puerto donde la aplicación estará disponible
EXPOSE ${PORT}

# Comando para iniciar la aplicación en desarrollo
CMD ["npm", "run", "start:dev"] 
