# Base image
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar dependências
COPY package.json package-lock.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta padrão do NestJS
EXPOSE 8000
