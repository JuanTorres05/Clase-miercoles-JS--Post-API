# 🚀 Guía Práctica: De Proyecto Base a Producción (Node.js + MySQL)

Esta guía detalla los pasos exactos realizados para tomar un proyecto backend base, implementar endpoints POST y desplegarlo públicamente en la nube con Base de Datos usando **Railway**.

---

## Fase 1: Entorno Local (Preparación)

Lo primero que todo estudiante debe hacer al clonar un repositorio base es levantar sus cimientos:

1. **Instalar dependencias:** Abrir la carpeta `backend/` en la terminal y ejecutar **`npm install`**. (Sin esto, módulos como *express* o *mysql2* darán error y el servidor no encenderá).
2. **Validar los módulos:** Asegurarse de que en `package.json` exista la línea `"type": "module"` para poder usar `import` en lugar del antiguo `require`.
3. **Crear Variables de Entorno:** Duplicar el archivo `.env.example`, renombrarlo a `.env`, colocar allí las credenciales locales de la base de datos (generalmente usuario `root` en el puerto `3306`) y asegurarse de que el archivo `.env` **esté incluido dentro del `.gitignore`**. *(Ningún archivo `.env` o credencial debe llegar jamás a GitHub).*
4. **Base de Datos Local:** Abrir su gestor (como phpMyAdmin, HeidiSQL o DBeaver), crear la base de datos `datavet`, y correr todo el contenido de `database/schema.sql` para generar las tablas.

---

## Fase 2: Desarrollo del Código (El Requerimiento)

El objetivo era crear dos endpoints que insertaran datos (`POST`). Esto requiere seguir el patrón de arquitectura MVC separando Controladores y Rutas:

### 1. El Controlador (`controllers/vet.controller.js`)
Creamos las funciones que contienen la **lógica** de negocio.
- Usamos el pool de conexiones de `mysql2/promise` para ejecutar queries SQL con `async/await`.
- Se validó que ningún campo obligatorio llegara vacío (`if(!nombre)`).
- Todo se envolvió en un bloque `try-catch` para capturar errores.
- **Códigos HTTP de respuesta:** Usamos el `201` para indicar que el registro fue un éxito, el `400` para datos faltantes y el `500` para errores de servidor interno.

### 2. Las Rutas (`routes/vet.routes.js`)
Se configuró el `express.Router` de forma plana y sencilla.
- Asociamos el endpoint `POST /clientes` a la función `createCliente` que creamos en el controlador (y lo mismo para `/mascotas`).

### 3. La Integración (`routes/index.js`)
- Importamos nuestras nuevas rutas y las "montamos" en el enrutador principal en la ruta base `/`. Con esto, terminaron bajo el prefijo definido en `app.js` (quedando como `/api/clientes`).

### 4. Prueba en Local
- Encendimos el servidor con **`npm run dev`**.
- Usamos **Thunder Client** (o la consola `fetch` del navegador) mandando peticiones `POST` a `http://localhost:3000/api/clientes` con el tipo de contenido `application/json`. ¡Devolvió éxito 201!

---

## Fase 3: Control de Versiones (GitHub)

Ya que el proyecto local estaba funcionando, había que asegurar el código en la nube:

1. Agregamos un repositorio remoto usando `git remote add origin URL`.
2. Se hizo un commit: `git commit -m "feat: agrega POST /api/clientes..."`.
3. **El problema de Auth:** Nos enfrentamos a un error 403 al hacer *push*. **La solución** fue ir a GitHub `> Settings > Developer Settings`, crear un "Token de Acceso Personal Clásico" con permisos de `repo`, y hacer push enviando el token como contraseña en la terminal:
   `git push https://USUARIO:TOKEN@github.com/USUARIO/REPO.git main`

---

## Fase 4: Despliegue en la Nube (Railway)

Este es el proceso para que la API pase a ser pública y real en Internet. Railway aloja tanto la Base de Datos como el código Node.js.

### A. La Base de Datos (Provision MySQL)
1. En el proyecto de Railway creamos un nuevo servicio "MySQL".
2. Fuimos a la pestaña **Data** (Query) y pegamos el mismo código de `database/schema.sql` para que las tablas existan en la nube.

### B. El Backend (Desplegar desde GitHub)
1. Seleccionamos "New > GitHub Repo" y elegimos nuestro repositorio.
2. ⚠️ **Configuración Crítica 1 (Root Directory):** Falla en el primer intento porque Railway busca el `package.json` en la raíz. Tuvimos que ir a los `Settings > Build` y configurar el **Root Directory** en `/backend`.
3. ⚠️ **Configuración Crítica 2 (Variables):** La API fallará hasta que se le pasen las variables `.env`. En la pestaña **Variables** colocamos los datos que Railway nos da de su propio MySQL (`MYSQL_HOST`, `DB_USER`, `DB_PASSWORD` larga autogenerada, etc.).
4. **Dominio Público:** En `Settings > Networking`, clic en *"Generate Domain"* para que nos entregara un link tipo `xxxx.up.railway.app`.

### C. ¡Prueba Final!
Realizamos nuestra misma petición `POST` en formato JSON, pero apuntando por fin a nuestro nuevo dominio público de Railway en lugar de localhost. 

> *El sistema procesó la llamada, se comunicó con el servidor de bases de datos de la plataforma y nos devolvió un 201 Created. Misión completamente terminada.*
