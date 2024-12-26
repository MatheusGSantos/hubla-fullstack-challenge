# Base image
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar dependências
COPY package.json package-lock.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta padrão do Next.js
EXPOSE 3000

# Comando para rodar a aplicação
# CMD ["npm", "run", "dev"]
