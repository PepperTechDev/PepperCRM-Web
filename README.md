# PepperCRM-Web: CRM desarrollado con React, Vite y JavaScript

PepperCRM-Web es una aplicación web diseñada para la gestión de relaciones con clientes (CRM). Este proyecto utiliza **React** como biblioteca principal para la interfaz de usuario, **Vite** como herramienta de construcción y desarrollo, y **JavaScript** como lenguaje principal. 

El objetivo de este proyecto es proporcionar una solución moderna, rápida y escalable para la gestión de leads, contactos, tareas y más.

---

## **Requisitos previos**
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

### **Para instalación local**
- **Node.js** (versión 18 o superior): [Descargar Node.js](https://nodejs.org/)
- **pnpm** (gestor de paquetes): Puedes instalarlo ejecutando:
  ```bash
  npm install -g pnpm
  ```

### **Para instalación con Docker**
- **Docker**: [Descargar Docker](https://www.docker.com/)
- **Docker Compose** (opcional, si no está incluido con Docker): [Descargar Docker Compose](https://docs.docker.com/compose/install/)

---

## **Instalación**

### **1. Instalación local**
Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/PepperTechDev/PepperCRM-Web.git
   ```

2. **Accede al directorio del proyecto**:
   ```bash
   cd PepperCRM-Web
   ```

3. **Instala las dependencias**:
   ```bash
   pnpm install
   ```

4. **Inicia el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```
   Esto abrirá la aplicación en tu navegador en la dirección [http://localhost:5173](http://localhost:5173).

---

### **2. Instalación con Docker**
Sigue estos pasos para ejecutar el proyecto utilizando Docker:


## **Variables de entorno**
El archivo `.env` se utiliza para configurar las variables de entorno necesarias para la aplicación. Asegúrate de crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_URL=https://api.tu-backend.com
```

Reemplaza `https://api.tu-backend.com` con la URL de tu backend.
