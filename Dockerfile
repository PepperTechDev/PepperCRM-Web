# Usar la imagen oficial de Node.js 20
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json al contenedor
COPY package.json package-lock.json ./

# Instalar la versión específica de npm (10.8.2)
RUN npm install -g npm@10.8.2

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos al contenedor
COPY . ./

# Compilar Javascript si es necesario
RUN npm run build

# Instalar el paquete 'serve' para servir los archivos estáticos
RUN npm install -g serve

#  Exponer el puerto en el que se va a correr la aplicación (puerto por defecto 5173)
EXPOSE 5173

# Comando para arrancar el servidor estático de producción
CMD ["serve", "-s", "dist", "-l", "5173"]
