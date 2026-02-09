# 🎓 The Perfect Mentor API

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-13.6-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8-white?logo=socket.io&logoColor=black)](https://socket.io/)
[![License](https://img.shields.io/badge/License-ISC-blue)](LICENSE)

> **API RESTful para plataforma de mentoría que conecta mentores con aprendices mediante un sistema de matching inteligente, mensajería en tiempo real y gestión de reportes.**

[📖 Ver Documentación API](#api-documentation) | [🚀 Guía Rápida](#getting-started) | [📊 Demo](#demo)

---

## 📖 Acerca del Proyecto / About

**The Perfect Mentor API** es el backend de una plataforma de mentoría diseñada para conectar profesionales experimentados (mentores) con personas que buscan guía y desarrollo profesional (aprendices/mentees).

### 🎯 Objetivo Principal

Facilitar conexiones significativas entre mentores y aprendices mediante:

- **Matching inteligente** basado en habilidades y objetivos
- **Comunicación en tiempo real** entre usuarios conectados
- **Gestión de perfiles** completa con avatares y habilidades
- **Sistema de reportes** para mantener la calidad y seguridad

### ✨ Características Principales / Key Features

- 🔐 **Autenticación Segura** con Firebase Admin SDK y JWT
- 👥 **Gestión de Usuarios** con roles (Mentor/Mentee) y perfiles detallados
- 🔗 **Sistema de Matching** con solicitudes, aceptaciones y rechazos
- 💬 **Mensajería Real-time** mediante WebSockets (Socket.io)
- 📊 **Sistema de Reportes** para gestión de incidencias
- 📁 **Storage de Archivos** con Cloudinary para avatares
- 📚 **Documentación API** automática con Swagger/OpenAPI 3.0
- 🧪 **Testing Completo** con Jest y Supertest
- 🔧 **Code Quality** con ESLint y Prettier

---

## 🏗️ Stack Tecnológico / Tech Stack

### Backend / Core

- **[Node.js](https://nodejs.org/)** - Entorno de ejecución JavaScript
- **[Express.js](https://expressjs.com/)** - Framework web minimalista
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático para JavaScript

### Base de Datos / Database

- **[MongoDB](https://www.mongodb.com/)** - Base de datos NoSQL orientada a documentos
- **[Mongoose](https://mongoosejs.com/)** - ODM para MongoDB con TypeScript

### Autenticación / Authentication

- **[Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)** - Gestión de autenticación
- **JWT Tokens** - Tokens de acceso seguros

### Real-time / Comunicación

- **[Socket.io](https://socket.io/)** - Comunicación bidireccional en tiempo real
- **WebSockets** - Protocolo de comunicación persistente

### Storage & Media

- **[Cloudinary](https://cloudinary.com/)** - Almacenamiento de imágenes en la nube
- **[Multer](https://www.npmjs.com/package/multer)** - Manejo de uploads de archivos

### Desarrollo & Calidad

- **[Jest](https://jestjs.io/)** - Framework de testing
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formato de código consistente
- **[Swagger](https://swagger.io/)** - Documentación de API automática

### Validación & Seguridad

- **[express-validator](https://express-validator.github.io/)** - Validación de datos de entrada
- **CORS** - Políticas de origen cruzado
- **Helmet** - Seguridad HTTP headers

---

## 🚀 Getting Started / Comenzando

### Prerrequisitos / Prerequisites

Asegúrate de tener instalado:

- **Node.js** 18+ y npm
- **MongoDB** (local o conexión remota)
- **Cuenta Firebase** con proyecto configurado
- **Cuenta Cloudinary** (opcional, para avatares)

### Instalación / Installation

```bash
# Clonar el repositorio
git clone <repository-url>
cd the-perfect-mentor-api

# Instalar dependencias
npm install

# Copiar archivo de entorno y configurar
cp .env.example .env
```

### Configuración de Variables de Entorno / Environment Setup

Crea un archivo `.env` con las siguientes variables:

```env
# Configuración del Servidor
PORT=3000
ORIGIN=http://localhost:3000
NODE_ENV=development

# Base de Datos
DB_URI=mongodb://localhost:27017/perfect-mentor

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----

# Cloudinary (Opcional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Opcional)
EMAIL=your-email@domain.com
EMAIL_PASSWORD=your-email-password

# OTROS
EMAIL_FROM=noreply@perfectmentor.com
```

### Ejecución / Running the Application

```bash
# Modo Desarrollo (con hot-reload)
npm run dev

# Compilar TypeScript a JavaScript
npm run build

# Ejecutar en Producción
npm start

# Testing
npm test

# Linting
npm run lint

# Formateo de código
npm run format
```

### Verificación / Verification

1. **API en funcionamiento**: `http://localhost:3000`
2. **Documentación Swagger**: `http://localhost:3000/api-docs`
3. **Health check**: `GET /` debe retornar "Hello World"

---

## 📁 Estructura del Proyecto / Project Structure

```
src/
├── config/              # Configuración de la aplicación
│   ├── cloudinaryConfig.ts    # Configuración Cloudinary
│   ├── createRoles.ts          # Creación inicial de roles
│   ├── swagger.ts              # Configuración Swagger
│   └── token.ts                # Configuración tokens
├── controllers/         # Lógica de controladores HTTP
│   ├── UserController.ts       # Gestión de usuarios
│   ├── MatchController.ts      # Sistema de matching
│   ├── ReportController.ts     # Sistema de reportes
│   └── ...
├── db/                  # Conexión a base de datos
│   └── index.ts                  # Configuración MongoDB
├── firebase/            # Configuración Firebase
│   └── firebase-admin.ts        # SDK Admin de Firebase
├── middlewares/         # Middleware Express
│   ├── isAuth.ts               # Autenticación de usuarios
│   ├── isAdmin.ts              # Verificación de admin
│   └── ...
├── models/              # Modelos Mongoose
│   ├── User.ts                 # Modelo de usuario
│   ├── Match.ts                # Modelo de matches
│   ├── Report.ts               # Modelo de reportes
│   └── ...
├── routes/              # Definición de rutas
│   ├── index.routes.ts         # Router principal
│   ├── user.routes.ts          # Rutas de usuarios
│   ├── match.routes.ts         # Rutas de matching
│   └── ...
├── schemas/             # Validación de datos
│   ├── addUserSchema.ts        # Validación creación usuario
│   ├── sendMatchSchema.ts      # Validación solicitudes
│   └── ...
├── services/            # Lógica de negocio
│   ├── UserService.ts          # Servicio de usuarios
│   ├── MatchService.ts         # Servicio de matching
│   ├── SocketService.ts        # Servicio WebSocket
│   └── ...
├── types/               # Definiciones TypeScript
│   └── express.d.ts            # Tipos personalizados
├── utils/               # Utilidades varias
│   └── email.ts                # Servicios de email
└── index.ts             # Punto de entrada principal
```

---

## 📚 API Documentation / Documentación de la API

### Autenticación / Authentication

La API utiliza **Firebase Admin SDK** para la autenticación. Todos los endpoints protegidos requieren un token JWT en el header:

```http
Authorization: Bearer <firebase-token>
```

### Endpoints Principales / Main Endpoints

#### 📚 **Documentación Completa**: [Swagger UI](http://localhost:3000/api-docs)

#### 👥 **Gestión de Usuarios**

```http
GET    /api/users          # Listar usuarios
POST   /api/users          # Crear usuario
GET    /api/users/:id      # Obtener usuario
PUT    /api/users/:id      # Actualizar usuario
DELETE /api/users/:id      # Eliminar usuario
```

#### 🔗 **Sistema de Matching**

```http
POST   /api/matches        # Enviar solicitud
GET    /api/matches        # Listar matches
PUT    /api/matches/:id    # Responder solicitud
DELETE /api/matches/:id    # Cancelar match
```

#### 💬 **Mensajería**

```http
POST   /api/md             # Enviar mensaje
GET    /api/md/:userId     # Obtener conversación
PUT    /api/md/:id         # Marcar como leído
DELETE /api/md/:id         # Eliminar mensaje
```

#### 📊 **Reportes**

```http
POST   /api/reports        # Crear reporte
GET    /api/reports        # Listar reportes
PUT    /api/reports/:id    # Actualizar estado
DELETE /api/reports/:id    # Eliminar reporte
```

#### 🎭 **Roles**

```http
GET    /api/roles          # Listar roles
POST   /api/roles          # Crear rol
```

### Formatos de Respuesta / Response Formats

#### ✅ **Éxito**

```json
{
  "_id": "64a1b2c3d4e5f6789012345",
  "id": "firebase-uid-123",
  "username": "john_doe",
  "email": "john@example.com",
  "fullname": "John Doe",
  "role": "MENTOR"
}
```

#### ❌ **Error**

```json
{
  "error": true,
  "message": "Usuario no encontrado"
}
```

#### 🔒 **No Autorizado**

```json
{
  "error": "No autorizado. Formato de token inválido"
}
```

---

## 🎯 Características Detalladas / Detailed Features

### 👥 **Gestión de Usuarios**

- **Registro y Autenticación**: Integración con Firebase Authentication
- **Roles de Usuario**: MENTOR y MENTEE con permisos diferenciados
- **Perfiles Completos**: Nombre, apellido, país, habilidades, avatar
- **Avatares**: Subida y gestión de imágenes con Cloudinary
- **Verificación**: Sistema de verificación de cuentas por email

### 🔗 **Sistema de Matching**

- **Solicitudes de Conexión**: Usuarios pueden solicitar ser mentores/aprendices
- **Estados de Match**: PENDING, ACCEPTED, REJECTED
- **Gestión Bidireccional**: Control de solicitudes enviadas y recibidas
- **Notificaciones**: Sistema de notificaciones en tiempo real

### 💬 **Mensajería Real-time**

- **Chat Directo**: Comunicación entre usuarios conectados
- **Socket.io**: Conexiones WebSocket para mensajería instantánea
- **Estados de Lectura**: Control de mensajes leídos/no leídos
- **Historial**: Persistencia completa de conversaciones

### 📊 **Sistema de Reportes**

- **Reporte de Usuarios**: Sistema para reportar comportamiento inapropiado
- **Gestión de Reportes**: Dashboard para administración de incidencias
- **Mensajes de Reporte**: Sistema de mensajería para gestión de reportes
- **Estados**: Pendiente, Resuelto, Rechazado

### 🔄 **Real-time Features**

- **Socket Service**: Gestión centralizada de conexiones WebSocket
- **Eventos Personalizados**: Matching, mensajería, notificaciones
- **Desconexión Automática**: Limpieza de conexiones inactivas
- **Escalabilidad**: Arquitectura preparada para múltiples conexiones

---

## 🧪 Testing / Pruebas

### Ejecución de Tests / Running Tests

```bash
# Ejecutar todos los tests (modo watch)
npm test

# Ejecutar tests una sola vez (CI)
npm run test:ci

# Ejecutar test específico
npm run test:single __test__/User.test.ts
```

### Estructura de Tests / Test Structure

```
__test__/
├── User.test.ts        # Tests de UserController
├── Match.test.ts       # Tests de MatchService
├── Report.test.ts      # Tests de ReportController
└── utils/              # Utilidades de testing
```

### Coverage / Cobertura

- **Unit Tests**: Pruebas de servicios y controladores
- **Integration Tests**: Pruebas de endpoints completos
- **Mocking**: Supertest para testing HTTP
- **Timeout**: 100000ms para tests asíncronos

---

## 🔧 Development / Desarrollo

### Scripts Disponibles / Available Scripts

```bash
# 🚀 Desarrollo
npm run dev              # Servidor con hot-reload
npm run build            # Compilar TypeScript
npm start                # Ejecutar producción

# 🧪 Testing
npm test                 # Tests en modo watch
npm run test:ci          # Tests para CI/CD
npm run test:single <file> # Test específico

# 🔍 Calidad de Código
npm run lint             # Verificar linting
npm run lint:fix         # Auto-corregir linting
npm run format           # Formatear con Prettier
```

### Convenciones de Código / Code Conventions

- **TypeScript**: Tipado estricto con paths configurados
- **ESLint**: Configuración con Prettier y TypeScript
- **Nomenclatura**:
  - Archivos: `PascalCase.ts` para clases, `camelCase.ts` para utilities
  - Clases: `PascalCase`
  - Funciones/Variables: `camelCase`
  - Constantes: `UPPER_SNAKE_CASE`

### Patrones Arquitectónicos / Architectural Patterns

- **MVC**: Separación de controllers, services, models
- **Repository Pattern**: Abstracción de base de datos
- **Dependency Injection**: Inyección de dependencias
- **Error Handling**: Manejo centralizado de errores
- **Validation**: Validación de datos con schemas

---

## 🚀 Deployment / Despliegue

### Variables de Entorno de Producción / Production Environment

```env
NODE_ENV=production
PORT=3000
ORIGIN=https://yourdomain.com
DB_URI=mongodb+srv://user:pass@cluster.mongodb.net/production
```

### Build y Despliegue / Build and Deploy

```bash
# Compilar para producción
npm run build

# Iniciar servidor producción
npm start
```

### Consideraciones de Producción / Production Considerations

- **HTTPS**: Configurar SSL/TLS certificates
- **Rate Limiting**: Implementar límites de solicitud
- **CORS**: Configurar orígenes permitidos
- **Security**: Configurar headers de seguridad con Helmet
- **Monitoring**: Implementar logging y monitorización
- **Backups**: Configurar backups automáticos de MongoDB

### Docker / Opcional

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing / Contribuir

### Guía para Desarrolladores / Developer Guide

1. **Fork** el repositorio
2. **Crear rama** feature: `git checkout -b feature/amazing-feature`
3. **Hacer commit** de cambios: `git commit -m 'Add amazing feature'`
4. **Push** a la rama: `git push origin feature/amazing-feature`
5. **Abrir Pull Request**

### Requisitos para Contribución / Contribution Requirements

- **Tests**: Todos los tests deben pasar
- **Linting**: Código debe cumplir reglas ESLint
- **Documentation**: Actualizar docs si es necesario
- **Types**: Mantener tipado TypeScript completo

### Code Review Process / Proceso de Code Review

1. **Revisión de Funcionalidad**: Verificar comportamiento correcto
2. **Revisión de Código**: Calidad y convenciones
3. **Revisión de Tests**: Cobertura adecuada
4. **Revisión de Docs**: Documentación actualizada

---

## 📞 Support / Soporte

### Contacto / Contact

- **Email de Soporte**: Configurar en `EMAIL_FROM`
- **Issues de GitHub**: Reportar bugs en GitHub Issues
- **Documentation**: Ver [Swagger Docs](http://localhost:3000/api-docs)

### FAQ / Preguntas Frecuentes

**Q: ¿Cómo configuro Firebase para autenticación?**
A: Ve a Firebase Console → Project Settings → Service Accounts → Generate new private key

**Q: ¿Cómo cambio el puerto del servidor?**
A: Modifica la variable de entorno `PORT` en tu archivo `.env`

**Q: ¿Cómo agrego nuevos roles de usuario?**
A: Modifica `src/config/createRoles.ts` y `src/models/Role.ts`

---

## 📜 License / Licencia

Este proyecto está licenciado bajo la **ISC License** - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 🔄 Changelog / Historial de Cambios

### v1.0.0 (En Desarrollo)

- ✅ Sistema de autenticación con Firebase
- ✅ Gestión completa de usuarios y roles
- ✅ Sistema de matching bidireccional
- ✅ Mensajería real-time con Socket.io
- ✅ Sistema de reportes completo
- ✅ Documentación automática con Swagger
- ✅ Testing completo con Jest

---

## 🙏 Acknowledgments / Agradecimientos

- **[Firebase](https://firebase.google.com/)** - Servicios de autenticación
- **[MongoDB](https://www.mongodb.com/)** - Base de datos NoSQL robusta
- **[Socket.io](https://socket.io/)** - Comunicación real-time
- **[Cloudinary](https://cloudinary.com/)** - Servicios de imagen en la nube
- **[Express](https://expressjs.com/)** - Framework web minimalista

---