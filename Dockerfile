# Usar la imagen oficial de Node.js 20
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar pnpm correctamente con corepack
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# Definir el binario global para pnpm
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Copiar package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install

# Copiar el resto del código
COPY . .

# Compilar
RUN pnpm run build

# Instalar `serve` globalmente
RUN pnpm add -g serve

# Exponer puerto
EXPOSE 5173

# Comando para servir los archivos compilados
CMD ["serve", "-s", "dist", "-l", "5173"]