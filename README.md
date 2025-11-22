# Kicks
Kicks es una aplicación web para la gestión y venta de productos, diseñada para una tienda de calzado. El proyecto está dividido en dos partes principales: backend y frontend.

## Estructura del Proyecto

- **backend/**: API REST construida con Node.js y Express. Incluye controladores, modelos, rutas, servicios y middleware para la gestión de usuarios, productos, carrito, órdenes, autenticación, suscripciones, chat AI, y más.
- **frontend/**: Interfaz de usuario desarrollada con HTML, CSS y JavaScript. Incluye páginas para administración, tienda, cuenta de usuario, y componentes reutilizables.

## Características Principales

- Autenticación de usuarios (registro, login, recuperación de contraseña)
- Gestión de productos y carrito de compras
- Procesamiento de órdenes y recibos
- Suscripción a boletines
- Chat AI integrado
- Panel de administración
- Contacto y captcha
- Documentación Swagger para la API

## Instalación

1. Clona el repositorio:
	```pwsh
	git clone https://github.com/DannyyLC/Kicks.git
	```
2. Instala las dependencias del backend:
	```pwsh
	cd backend
	npm install
	```

3. Inicia la base de datos MySQL usando Docker:
   ```pwsh
   docker run -d --name mysql-backend -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=mi_app_db -e MYSQL_USER=mi_usuario -e MYSQL_PASSWORD=mi_password -p 3306:3306 -v mysql_datos:/var/lib/mysql mysql:8
   ```

4. Inicializa la base de datos desde el backend:
   ```pwsh
   npm run db
   ```

## Uso

1. Inicia el servidor backend:
	```pwsh
	cd backend
	npm start
	```
2. Abre el archivo `frontend/index.html` en tu navegador para acceder a la tienda.

## Documentación de la API

La documentación Swagger está disponible en el endpoint `/api/docs` del backend.

## Estructura de Carpetas

```
backend/
  controllers/
  models/
  routes/
  services/
  middleware/
  uploads/
  images/
frontend/
  components/
  css/
  js/
  cuenta/
  tienda/
  admin/
  assets/
```

## Tecnologías Utilizadas

- Node.js
- Express
- SQLite
- HTML, CSS, JavaScript
- Swagger

## Autores

- Daniel Limon Cervantes
- Samuel Cevada Salinas
- Carlos Gonzalez Quintanar
- Luis Manuel Ibrahim Gonzalez Sanchez