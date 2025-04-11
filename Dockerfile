# Usar la imagen oficial de Node.js 20
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm (versión global)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Instalar dependencias con pnpm
RUN pnpm install

# Copiar el resto del código
COPY . .

# Compilar el proyecto
RUN pnpm run build

# Instalar el paquete 'serve' para servir los archivos estáticos
RUN pnpm add -g serve

# Exponer el puerto 5173 (por defecto para Vite o serve)
EXPOSE 5173

# Ejecutar la app en modo producción
CMD ["serve", "-s", "dist", "-l", "5173"]